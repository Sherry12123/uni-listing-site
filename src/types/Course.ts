export interface Course {
  id: string;
  title: string;
  qualification: string;
  description: string;
  courseType: string;
  ucasCode: string;
  duration: string;
  startDates: string;
  url: string;
}

export interface CourseFilters {
  courseType: string | null;
  qualification: string | null;
  duration: string | null;
}