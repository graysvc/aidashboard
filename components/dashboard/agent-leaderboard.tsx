import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import type { Agent } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  Agent["status"],
  { label: string; dot: string; text: string }
> = {
  top: {
    label: "Top",
    dot: "bg-success",
    text: "text-success",
  },
  rising: {
    label: "Rising",
    dot: "bg-primary",
    text: "text-primary",
  },
  steady: {
    label: "Steady",
    dot: "bg-muted-foreground",
    text: "text-muted-foreground",
  },
  "needs-coaching": {
    label: "Coaching",
    dot: "bg-warning",
    text: "text-warning",
  },
};

function formatCompactCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-[2px] h-6 w-14">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-primary/40 transition-all hover:bg-primary"
          style={{ height: `${(v / max) * 100}%`, minHeight: "2px" }}
        />
      ))}
    </div>
  );
}

export function AgentLeaderboard({ agents }: { agents: Agent[] }) {
  const sorted = [...agents]
    .sort((a, b) => b.metrics.volumeClosedYTD - a.metrics.volumeClosedYTD)
    .slice(0, 5);

  return (
    <Card className="bg-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-primary" strokeWidth={1.75} />
          </div>
          <div>
            <CardTitle className="text-sm font-medium">
              Agent leaderboard
            </CardTitle>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">
              Top performers by volume
            </p>
          </div>
        </div>
        <button
          type="button"
          className="text-xs font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
        >
          View team
          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
        </button>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <div className="space-y-1">
          {sorted.map((agent, idx) => {
            const status = STATUS_CONFIG[agent.status];
            return (
              <div
                key={agent.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
              >
                <span className="font-mono text-xs text-muted-foreground/60 w-4 tabular-nums">
                  {idx + 1}
                </span>
                <Avatar className="h-8 w-8 ring-1 ring-border">
                  <AvatarFallback
                    className={cn(
                      "text-[10px] font-semibold",
                      agent.avatarColor
                    )}
                  >
                    {agent.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate group-hover:text-foreground">
                    {agent.name}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full shrink-0",
                        status.dot
                      )}
                    />
                    <span className={cn("text-[10px] font-medium", status.text)}>
                      {status.label}
                    </span>
                  </div>
                </div>
                <Sparkline data={agent.trend} />
                <div className="text-right">
                  <div className="font-mono text-sm font-medium text-foreground tabular-nums">
                    {formatCompactCurrency(agent.metrics.volumeClosedYTD)}
                  </div>
                  <div className="text-[10px] text-muted-foreground/70 font-mono tabular-nums">
                    {agent.metrics.dealsClosedYTD} deals
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
