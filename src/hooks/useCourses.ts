import { useState, useEffect, useMemo } from 'react';
import { Course, CourseFilters } from '../types/Course';
import { coursesData } from '../data/coursesData';

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CourseFilters>({
    courseType: null,
    qualification: null,
    duration: null
  });
  
  useEffect(() => {
    // In a real application, we might fetch this data from an API
    setCourses(coursesData);
  }, []);
  
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Apply text search
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !course.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Apply filters
      if (filters.courseType && course.courseType !== filters.courseType) {
        return false;
      }
      
      if (filters.qualification && course.qualification !== filters.qualification) {
        return false;
      }
      
      if (filters.duration && course.duration !== filters.duration) {
        return false;
      }
      
      return true;
    });
  }, [courses, searchQuery, filters]);
  
  // Select 3 featured courses - in a real app this might be determined by the backend
  const featuredCourses = useMemo(() => {
    return courses
      .filter(course => ['Accounting And Finance', 'Biology', 'Adult Nursing'].includes(course.title))
      .slice(0, 3);
  }, [courses]);
  
  return {
    courses,
    filteredCourses,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    featuredCourses
  };
};