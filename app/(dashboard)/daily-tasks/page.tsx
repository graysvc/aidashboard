import { DailyTasksClient } from "./daily-tasks-client";
import { ASSISTANT_FIRST_NAME, DAILY_TASKS } from "@/lib/data/assistant-demo";

export default function DailyTasksPage() {
  const urgentCount = DAILY_TASKS.filter((t) => t.urgency === "urgent").length;
  return (
    <DailyTasksClient
      firstName={ASSISTANT_FIRST_NAME}
      tasks={DAILY_TASKS}
      urgentCount={urgentCount}
    />
  );
}
