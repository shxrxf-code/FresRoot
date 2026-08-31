"use client";
import { Badge } from "./badge";

export function statusTone(status: string): "green" | "orange" | "red" | "yellow" | "blue" | "gray" | "purple" {
  const s = status.toLowerCase();
  if (["delivered", "active", "in stock", "paid", "success", "completed"].some((k) => s.includes(k))) return "green";
  if (["out of stock", "cancelled", "failed", "suspend", "suspended"].some((k) => s.includes(k))) return "red";
  if (["preparing", "pending", "paused", "low stock", "packed"].some((k) => s.includes(k))) return "yellow";
  if (["confirm", "assigned", "in progress"].some((k) => s.includes(k))) return "blue";
  if (["out for delivery"].includes(s)) return "purple";
  return "gray";
}

export function StatusBadge({ status }: { status: string }) {
  return <Badge tone={statusTone(status)}>{status}</Badge>;
}
