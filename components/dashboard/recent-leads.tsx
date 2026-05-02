import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUpRight, Users } from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; dot: string; text: string; bg: string }
> = {
  hot: {
    label: "Hot",
    dot: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive/10",
  },
  warm: {
    label: "Warm",
    dot: "bg-warning",
    text: "text-warning",
    bg: "bg-warning/10",
  },
  cold: {
    label: "Cold",
    dot: "bg-muted-foreground",
    text: "text-muted-foreground",
    bg: "bg-muted/50",
  },
};

export function RecentLeads({ leads }: { leads: Lead[] }) {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
            <Users className="h-4 w-4 text-success" strokeWidth={1.75} />
          </div>
          <div>
            <CardTitle className="text-sm font-medium">
              Recent leads
            </CardTitle>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">
              Latest activity
            </p>
          </div>
        </div>
        <button
          type="button"
          className="text-xs font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
        >
          View all
          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
        </button>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <div className="space-y-1">
          {leads.slice(0, 6).map((lead) => {
            const status = STATUS_CONFIG[lead.status];
            return (
              <div
                key={lead.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
              >
                <Avatar className="h-8 w-8 ring-1 ring-border">
                  <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                    {lead.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {lead.name}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium",
                        status.bg, status.text
                      )}
                    >
                      <span className={cn("h-1 w-1 rounded-full", status.dot)} />
                      {status.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 truncate">
                      {lead.property}
                    </span>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-end shrink-0">
                  <span className="text-[11px] font-medium text-foreground">
                    {lead.stage}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 font-mono tabular-nums">
                    {formatDistanceToNowStrict(new Date(lead.lastContactAt))} ago
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
