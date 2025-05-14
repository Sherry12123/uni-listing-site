import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { CourseFilters } from '../types/Course';

interface FiltersProps {
  filters: CourseFilters;
  setFilters: (filters: CourseFilters) => void;
  courseCount: number;
  totalCount: number;
}

const Filters: React.FC<FiltersProps> = ({ 
  filters, 
  setFilters,
  courseCount,
  totalCount
}) => {
  const courseTypes = [
    'All',
    'Undergraduate',
    'Undergraduate with Foundation Year',
    'Postgraduate'
  ];
  
  const qualifications = [
    'All',
    'BSc (Hons)',
    'BA (Hons)',
    'BN (Hons)',
    'MBiol',
    'MSci'
  ];
  
  const durations = [
    'All',
    '3 Years',
    '4 Years'
  ];

  const handleCourseTypeChange = (courseType: string) => {
    setFilters({
      ...filters,
      courseType: courseType === 'All' ? null : courseType
    });
  };

  const handleQualificationChange = (qualification: string) => {
    setFilters({
      ...filters,
      qualification: qualification === 'All' ? null : qualification
    });
  };

  const handleDurationChange = (duration: string) => {
    setFilters({
      ...filters,
      duration: duration === 'All' ? null : duration
    });
  };

  const resetFilters = () => {
    setFilters({
      courseType: null,
      qualification: null,
      duration: null
    });
  };

  const hasActiveFilters = filters.courseType || filters.qualification || filters.duration;

  return (
    <div className="bg-white shadow rounded-lg p-6 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h2>
        {hasActiveFilters && (
          <button 
            onClick={resetFilters}
            className="text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
      
      <div className="text-sm text-gray-500 mb-6">
        Showing {courseCount} of {totalCount} courses
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Course Type</h3>
          <div className="space-y-2">
            {courseTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  checked={type === 'All' ? filters.courseType === null : filters.courseType === type}
                  onChange={() => handleCourseTypeChange(type)}
                />
                <span className="ml-2 text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Qualification</h3>
          <div className="space-y-2">
            {qualifications.map((qualification) => (
              <label key={qualification} className="flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  checked={qualification === 'All' ? filters.qualification === null : filters.qualification === qualification}
                  onChange={() => handleQualificationChange(qualification)}
                />
                <span className="ml-2 text-sm text-gray-700">{qualification}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Duration</h3>
          <div className="space-y-2">
            {durations.map((duration) => (
              <label key={duration} className="flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  checked={duration === 'All' ? filters.duration === null : filters.duration === duration}
                  onChange={() => handleDurationChange(duration)}
                />
                <span className="ml-2 text-sm text-gray-700">{duration}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;