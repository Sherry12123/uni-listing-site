import React from 'react';
import { Program } from '../types';
import { GraduationCap, Clock, Calendar } from 'lucide-react';

interface ProgramListProps {
  programs: Program[];
}

const ProgramList: React.FC<ProgramListProps> = ({ programs }) => {
  if (programs.length === 0) {
    return (
      <div className="text-center py-12">
        <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No programs found</h3>
        <p className="mt-1 text-sm text-gray-500">Enter a URL above to extract programs.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {program.title}
            </h3>
            {program.qualification && (
              <p className="text-sm font-medium text-blue-600 mb-3">
                {program.qualification}
              </p>
            )}
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {program.description}
            </p>
            <div className="space-y-2">
              {program.duration && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {program.duration}
                </div>
              )}
              {program.startDate && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {program.startDate}
                </div>
              )}
            </div>
          </div>
          {program.url && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <a
                href={program.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View Program →
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProgramList;