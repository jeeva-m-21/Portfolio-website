export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4">
        <div className="mx-auto h-4 w-48 animate-pulse rounded bg-bg-secondary" />
        <div className="mx-auto h-3 w-32 animate-pulse rounded bg-bg-secondary" />
      </div>
    </div>
  );
}
