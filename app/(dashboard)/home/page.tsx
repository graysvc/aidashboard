import { MorningBriefClient } from "./morning-brief-client";
import { ASSISTANT_FIRST_NAME, MORNING_BRIEF } from "@/lib/data/assistant-demo";
import { OPERATIONAL_EVENTS } from "@/lib/data/operational-timeline";

export default function MorningBriefPage() {
  return (
    <MorningBriefClient
      firstName={ASSISTANT_FIRST_NAME}
      brief={MORNING_BRIEF}
      events={OPERATIONAL_EVENTS}
    />
  );
}
