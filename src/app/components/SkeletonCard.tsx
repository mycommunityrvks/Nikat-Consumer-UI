export function SkeletonCard() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-4">
        <div className="h-5 bg-muted rounded w-3/4 mb-3" />
        <div className="h-4 bg-muted rounded w-full mb-2" />
        <div className="h-4 bg-muted rounded w-5/6 mb-4" />
        <div className="flex items-center gap-4">
          <div className="h-4 bg-muted rounded w-20" />
          <div className="h-4 bg-muted rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCategoryCard() {
  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-card rounded-xl border border-border animate-pulse">
      <div className="w-14 h-14 rounded-full bg-muted" />
      <div className="w-full">
        <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2" />
        <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
      </div>
    </div>
  );
}
