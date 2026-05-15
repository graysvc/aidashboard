/**
 * Demo data for the Assistant role views (Spanish copy).
 * These views are shown when role === "assistant" and run on hardcoded data
 * only — there is no DB-backed path yet.
 */

export type TaskUrgency = "urgent" | "today" | "this-week";

export type TaskAction = "call" | "message" | "send" | "done";

export type DailyTask = {
  id: string;
  client: string;
  action: string;
  context?: string;
  urgency: TaskUrgency;
  primaryAction: { kind: TaskAction; label: string };
};

export const ASSISTANT_FIRST_NAME = "María";

export const DAILY_TASKS: DailyTask[] = [
  {
    id: "t-1",
    client: "García",
    action: "Llamar sobre las opciones de piscina",
    context: "Prometiste mandar opciones hoy",
    urgency: "urgent",
    primaryAction: { kind: "call", label: "Llamar" },
  },
  {
    id: "t-2",
    client: "Ramírez",
    action: "Confirmar inspection antes de las 6 PM",
    context: "Deadline vence hoy",
    urgency: "urgent",
    primaryAction: { kind: "call", label: "Llamar" },
  },
  {
    id: "t-3",
    client: "Pérez",
    action: "Mandar comparables de Coral Gables",
    context: "Pidieron ayer por la tarde",
    urgency: "today",
    primaryAction: { kind: "send", label: "Mandar" },
  },
  {
    id: "t-4",
    client: "López",
    action: "Coordinar segunda visita a la casa de Brickell",
    context: "Disponibilidad este sábado",
    urgency: "today",
    primaryAction: { kind: "message", label: "Mensaje" },
  },
  {
    id: "t-5",
    client: "Castro",
    action: "Mandar contrato firmado al title company",
    context: "Cerraron oferta ayer",
    urgency: "today",
    primaryAction: { kind: "send", label: "Mandar" },
  },
  {
    id: "t-6",
    client: "Sánchez",
    action: "Confirmar fecha de appraisal",
    context: "Lender espera respuesta",
    urgency: "today",
    primaryAction: { kind: "message", label: "Mensaje" },
  },
  {
    id: "t-7",
    client: "García",
    action: "Preparar walkthrough final",
    context: "Closing en 8 días",
    urgency: "this-week",
    primaryAction: { kind: "done", label: "Marcar hecho" },
  },
  {
    id: "t-8",
    client: "Pérez",
    action: "Pedir referidos después de cerrar la oferta",
    urgency: "this-week",
    primaryAction: { kind: "done", label: "Marcar hecho" },
  },
];
