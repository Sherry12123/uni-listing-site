import React from 'react';
import { Course } from '../types/Course';
import { Sparkles } from 'lucide-react';

interface FeaturedCoursesProps {
  courses: Course[];
}

const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({ courses }) => {
  if (!courses.length) return null;

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900">Featured Courses</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="relative overflow-hidden group rounded-lg shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-80 z-10"></div>
            <div className="h-56 bg-gray-200 w-full">
              <img 
                src={`https://source.unsplash.com/random/400x300/?university,${course.title.split(' ').join(',')}`} 
                alt={course.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
              <div className="text-sm font-medium text-yellow-400 mb-1">
                {course.qualification}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                <a href={course.url} className="hover:underline">{course.title}</a>
              </h3>
              <div className="text-sm text-gray-300 mb-4">
                {course.duration} • {course.startDates}
              </div>
              <a 
                href={course.url}
                className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-medium text-sm text-white hover:bg-red-700 transition-colors"
              >
                View Course
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;