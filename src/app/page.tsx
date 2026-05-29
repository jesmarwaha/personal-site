import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <div className="flex items-start justify-between px-6 py-6">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold tracking-tight">Jes Marwaha</span>
          <p className="text-sm text-muted-foreground leading-relaxed">
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
        <ThemeToggle />
      </div>
    </main>
  );
}
