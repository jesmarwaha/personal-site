import { ThemeToggle } from "@/components/theme-toggle";
import { Mail } from "lucide-react";

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex items-start justify-between px-6 py-6">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold tracking-tight">Jes Marwaha</span>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            A British-Asian Graphic Designer. Currently working at{" "}
            <a
              href="https://mous.co"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-[width] after:duration-300 after:ease-in-out hover:after:w-full"
            >
              <strong>Mous</strong>
            </a>{" "}
            as a Midweight Graphic Designer. Crafting CRM campaigns, ads and brand assets.
          </p>
        </div>
        <a
          href="/portfolio"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          portfolio
        </a>
      </div>

      {/* Bottom bar */}
      <div className="mt-auto flex items-center justify-between px-6 py-6">
        <div className="flex gap-3">
          <a href="https://instagram.com/jes_marwaha" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
            <InstagramIcon />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
            <LinkedInIcon />
          </a>
          <a href="mailto:hello@jesmarwaha.info" aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail size={15} strokeWidth={1.5} />
          </a>
        </div>
        <ThemeToggle />
      </div>
    </main>
  );
}
