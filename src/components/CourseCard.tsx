import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Course } from '../types/Course';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
      data-testid="course-card"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1 hover:text-red-600 transition-colors">
              <a href={course.url}>{course.title}</a>
            </h2>
            <div className="text-sm font-medium text-red-600 mb-3">{course.qualification}</div>
          </div>
          <div className="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
            {course.ucasCode}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          {expanded ? (
            <>
              <span>Show less</span>
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              <span>Show details</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
        
        <div className={`grid grid-cols-2 gap-3 text-sm ${expanded ? 'block' : 'hidden'}`}>
          <div>
            <span className="text-gray-500">Course type</span>
            <p className="font-medium text-gray-900">{course.courseType}</p>
          </div>
          <div>
            <span className="text-gray-500">Duration</span>
            <p className="font-medium text-gray-900">{course.duration}</p>
          </div>
          <div>
            <span className="text-gray-500">Start Date(s)</span>
            <p className="font-medium text-gray-900">{course.startDates}</p>
          </div>
          <div>
            <span className="text-gray-500">Qualification</span>
            <p className="font-medium text-gray-900">{course.qualification}</p>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <a 
          href={course.url}
          className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors w-full md:w-auto"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default CourseCard;