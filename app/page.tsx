export default async function Home() {
  return (
    <main className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-sans text-balance font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Next.js 15 Server Actions and Supabase / Auth.
        </h1>
        <div className="space-x-4">
          <a
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-500 text-primary-foreground hover:bg-blue-500/90 h-11 px-8 rounded-md"
            href="/sign-in"
          >
            Get Started
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-11 px-8 rounded-md"
            href="https://github.com/danimarin24/todos-tutorial"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
