import { Check } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  nextCheck?: string;
}

export function EmptyState({ 
  message = "Your operation is on track", 
  nextCheck = "Monday" 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center mb-3">
        <Check className="h-5 w-5 text-success" strokeWidth={2} />
      </div>
      <p className="text-sm font-medium text-foreground">{message}</p>
      <p className="text-xs text-muted-foreground mt-1">Next check: {nextCheck}</p>
    </div>
  );
}
