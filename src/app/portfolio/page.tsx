import { WorkItem } from "@/components/work-item";
import { ThemeToggle } from "@/components/theme-toggle";

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
    <main className="px-6 pt-20 pb-12 max-w-lg">
      <div className="fixed bottom-0 right-0 px-6 py-6 z-40">
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xs text-muted-foreground">Experience</h2>
        <div className="flex flex-col gap-3">
          {work.map((w) => (
            <div key={w.title} className="py-4">
              <WorkItem {...w} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
