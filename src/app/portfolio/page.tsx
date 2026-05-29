import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { WorkItem } from "@/components/work-item";
import Link from "next/link";

const work = [
  {
    title: "Mous",
    role: "Midweight Graphic Designer",
    period: "2024 — now",
    desc: "CRM campaigns, ads and brand assets.",
    images: [
      "https://picsum.photos/seed/mous1/800/600",
      "https://picsum.photos/seed/mous2/800/600",
      "https://picsum.photos/seed/mous3/800/600",
      "https://picsum.photos/seed/mous4/800/600",
    ],
  },
  {
    title: "EO Charging",
    role: "Graphic Designer",
    period: "2021 — 2024",
    desc: "Brand, web and campaign design for a B2B EV charging company.",
    images: [
      "https://picsum.photos/seed/eo1/800/600",
      "https://picsum.photos/seed/eo2/800/600",
      "https://picsum.photos/seed/eo3/800/600",
    ],
  },
  {
    title: "Extreme E",
    role: "Graphic Designer",
    period: "2019 — 2020",
    desc: "Visual identity and race-day collateral for an off-road electric racing series.",
    images: [
      "https://picsum.photos/seed/ee1/800/600",
      "https://picsum.photos/seed/ee2/800/600",
      "https://picsum.photos/seed/ee3/800/600",
    ],
  },
];

export default function Portfolio() {
  return (
    <main className="max-w-xl mx-auto px-6 py-20 space-y-16">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-tight hover:text-muted-foreground transition-colors">
            Jes Marwaha
          </Link>
          <ThemeToggle />
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Work</h2>
        <div className="space-y-6">
          {work.map((w) => (
            <WorkItem key={w.title} {...w} />
          ))}
        </div>
      </section>

      <Separator />

      <footer className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Jes Marwaha
      </footer>
    </main>
  );
}
