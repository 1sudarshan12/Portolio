export default function BlogLoading() {
  return (
    <div className="pt-32 sm:pt-40">
      <div className="container-px">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="h-3 w-24 rounded bg-muted" />
            <div className="mt-5 h-12 w-3/4 rounded-lg bg-muted" />
            <div className="mt-4 h-4 w-full max-w-xl rounded bg-muted" />
          </div>
          <div className="mt-14 grid gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-shimmer overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="aspect-[16/9] w-full bg-muted" />
                <div className="space-y-3 p-6">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="h-5 w-3/4 rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
