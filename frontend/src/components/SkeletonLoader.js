import React from 'react';

const InternshipCardSkeleton = ({ viewMode = 'list' }) => {
  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded w-28"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-gray-200 rounded-xl shrink-0"></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg shrink-0"></div>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full w-24"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-6 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InternshipListSkeleton = ({ count = 3, viewMode = 'list' }) => {
  return (
    <div
      className={
        viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'
      }
    >
      {[...Array(count)].map((_, index) => (
        <InternshipCardSkeleton key={index} viewMode={viewMode} />
      ))}
    </div>
  );
};

export { InternshipCardSkeleton, InternshipListSkeleton };
export default InternshipListSkeleton;
