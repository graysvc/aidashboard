import { dashboardData } from "@/lib/mock-data";

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function TeamPage() {
  const { agents } = dashboardData;

  const teamVolume = agents.reduce((a, ag) => a + ag.metrics.volumeClosedYTD, 0);
  const teamDeals = agents.reduce((a, ag) => a + ag.metrics.dealsClosedYTD, 0);
  const sorted = [...agents].sort((a, b) => b.metrics.volumeClosedYTD - a.metrics.volumeClosedYTD);

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Stats row */}
      <section className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Agents</p>
          <p className="text-2xl font-semibold">{agents.length}</p>
        </div>
        <div className="p-4 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Volume YTD</p>
          <p className="text-2xl font-semibold">{formatCurrency(teamVolume)}</p>
        </div>
        <div className="p-4 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Deals Closed</p>
          <p className="text-2xl font-semibold">{teamDeals}</p>
        </div>
      </section>

      {/* Agents list */}
      <section>
        <h2 className="text-sm font-medium mb-3">Team</h2>
        <div className="border border-border rounded-lg divide-y divide-border">
          {sorted.map((agent) => (
            <div key={agent.id} className="p-3 flex items-center gap-3">
              <div className={`h-8 w-8 rounded-full ${agent.avatarColor} flex items-center justify-center`}>
                <span className="text-xs font-medium text-white">{agent.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{agent.name}</p>
                <p className="text-xs text-muted-foreground">{agent.role}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formatCurrency(agent.metrics.volumeClosedYTD)}</p>
                <p className="text-xs text-muted-foreground">{agent.metrics.dealsClosedYTD} deals</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
