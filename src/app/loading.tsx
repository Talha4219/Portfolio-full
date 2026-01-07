
import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <div className="h-10 w-10 animate-pulse rounded-full bg-primary/20"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
