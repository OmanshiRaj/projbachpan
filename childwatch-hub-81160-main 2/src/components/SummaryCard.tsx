import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  variant?: "active" | "solved";
}

const SummaryCard = ({ title, count, icon: Icon, variant = "active" }: SummaryCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
          <p className="text-4xl font-bold text-foreground">{count}</p>
        </div>
        <div className={`p-3 rounded-lg ${variant === "active" ? "bg-accent/10" : "bg-secondary/30"}`}>
          <Icon className={`h-6 w-6 ${variant === "active" ? "text-accent" : "text-primary"}`} />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
