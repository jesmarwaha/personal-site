import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { WorkItem } from "@/components/work-item";

const links = [
  { label: "github", href: "https://github.com" },
  { label: "twitter", href: "https://twitter.com" },
  { label: "email", href: "mailto:hello@example.com" },
];

const work = [
  {
    title: "Mous",
    role: "Midweight Graphic Designer",
    period: "2024 — now",
    desc: "Building infrastructure for distributed systems at scale.",
    images: [
      "https://picsum.photos/seed/mous1/400/300",
      "https://picsum.photos/seed/mous2/400/300",
      "https://picsum.photos/seed/mous3/400/300",
      "https://picsum.photos/seed/mous4/400/300",
    ],
  },
  {
    title: "EO Charging",
    role: "Graphic Designer",
    period: "2021 — 2024",
    desc: "Full-stack product work on a consumer fintech app.",
    images: [
      "https://picsum.photos/seed/eo1/400/300",
      "https://picsum.photos/seed/eo2/400/300",
      "https://picsum.photos/seed/eo3/400/300",
    ],
  },
  {
    title: "Extreme E",
    role: "Graphic Designer",
    period: "2020 — 2019",
    desc: "First engineer. Wore every hat.",
    images: [
      "https://picsum.photos/seed/ee1/400/300",
      "https://picsum.photos/seed/ee2/400/300",
      "https://picsum.photos/seed/ee3/400/300",
    ],
  },
];

const writing = [
  { title: "On building in public", date: "Apr 2025", href: "#" },
  { title: "Why I switched to mono fonts everywhere", date: "Jan 2025", href: "#" },
  { title: "Notes on long-term technical decisions", date: "Oct 2024", href: "#" },
];

export default function Home() {
  return (
    <main className="max-w-xl mx-auto px-6 py-20 space-y-16">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Jes</h1>
          <ThemeToggle />
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm">
          Engineer, builder, occasional writer. I work on hard infrastructure
          problems and care a lot about simplicity. Based somewhere with good
          coffee.
        </p>
        <div className="flex gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </section>

      <Separator />

      {/* Work */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
          Work
        </h2>
        <div className="space-y-6">
          {work.map((w) => (
            <WorkItem key={w.title} {...w} />
          ))}
        </div>
      </section>

      <Separator />

      {/* Writing */}
      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
          Writing
        </h2>
        <div className="space-y-1">
          {writing.map((w) => (
            <a
              key={w.title}
              href={w.href}
              className="flex items-baseline justify-between gap-4 -mx-3 px-3 py-2 rounded-sm hover:bg-muted/60 transition-colors duration-200"
            >
              <span className="text-sm underline underline-offset-4 decoration-border">
                {w.title}
              </span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {w.date}
              </span>
            </a>
          ))}
        </div>
      </section>

      <Separator />

      {/* Footer */}
      <footer className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Jes. Built with Next.js.
      </footer>
    </main>
  );
}
