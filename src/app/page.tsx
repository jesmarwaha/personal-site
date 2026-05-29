import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const links = [
  { label: "github", href: "https://github.com" },
  { label: "twitter", href: "https://twitter.com" },
  { label: "email", href: "mailto:hello@example.com" },
];

const work = [
  {
    title: "Some Company",
    role: "Senior Engineer",
    period: "2022 — now",
    desc: "Building infrastructure for distributed systems at scale.",
  },
  {
    title: "Another Place",
    role: "Software Engineer",
    period: "2019 — 2022",
    desc: "Full-stack product work on a consumer fintech app.",
  },
  {
    title: "Early Startup",
    role: "Engineer",
    period: "2017 — 2019",
    desc: "First engineer. Wore every hat.",
  },
];

const writing = [
  { title: "On building in public", date: "Apr 2025", href: "#" },
  { title: "Why I switched to mono fonts everywhere", date: "Jan 2025", href: "#" },
  { title: "Notes on long-term technical decisions", date: "Oct 2024", href: "#" },
];

const skills = ["TypeScript", "Go", "Rust", "React", "Postgres", "K8s"];

export default function Home() {
  return (
    <main className="max-w-xl mx-auto px-6 py-20 space-y-16">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-xl font-semibold tracking-tight">Jes</h1>
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
            <div key={w.title} className="space-y-1">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium">{w.title}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {w.period}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">{w.role}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {w.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <Badge key={s} variant="secondary" className="text-xs font-mono">
              {s}
            </Badge>
          ))}
        </div>
      </section>

      <Separator />

      {/* Writing */}
      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
          Writing
        </h2>
        <div className="space-y-3">
          {writing.map((w) => (
            <div key={w.title} className="flex items-baseline justify-between gap-4">
              <a
                href={w.href}
                className="text-sm underline underline-offset-4 hover:text-muted-foreground transition-colors"
              >
                {w.title}
              </a>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {w.date}
              </span>
            </div>
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
