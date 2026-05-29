import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <div className="flex items-center justify-between px-6 py-6">
        <span className="text-sm font-semibold tracking-tight">Jes Marwaha</span>
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          Graphic designer. Something is coming — check back soon.
        </p>
        <div className="flex gap-4">
          <a
            href="https://instagram.com"
            className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          >
            instagram
          </a>
          <a
            href="https://linkedin.com"
            className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          >
            linkedin
          </a>
          <a
            href="mailto:hello@jesmarwaha.info"
            className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          >
            email
          </a>
        </div>
      </div>

      <div className="px-6 py-6">
        <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
      </div>
    </main>
  );
}
