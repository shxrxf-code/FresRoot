"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { TickCircle } from "iconsax-react";

const sections = [
  { title: "General", items: [{ label: "Store Name", desc: "Public name shown to customers" }, { label: "Support Email", desc: "Where customer queries go" }, { label: "Support Phone", desc: "Customer support line" }] },
  { title: "Delivery", items: [{ label: "Free Delivery Threshold", desc: "Orders above this amount ship free" }, { label: "Base Delivery Fee", desc: "Flat fee below threshold" }, { label: "Delivery Radius (km)", desc: "Max distance from farms" }] },
  { title: "Billing & Payments", items: [{ label: "Currency", desc: "Display currency" }, { label: "GST Rate (%)", desc: "Applied to orders" }] },
];

export default function SettingsAdmin() {
  const [saved, setSaved] = React.useState("");
  return (
    <div className="max-w-2xl">
      <div><h1 className="text-2xl font-bold text-ink">Settings</h1><p className="text-sm text-muted">Configure your Fresroot store.</p></div>

      <div className="mt-6 space-y-6">
        {sections.map((s) => (
          <div key={s.title} className="rounded-2xl border border-border bg-white p-6 shadow-soft">
            <h2 className="mb-4 font-semibold">{s.title}</h2>
            <div className="space-y-4">
              {s.items.map((it) => (
                <div key={it.label}>
                  <Label>{it.label}</Label>
                  <Input placeholder={`${it.label}...`} />
                  <p className="mt-1 text-xs text-muted">{it.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Button onClick={() => { setSaved("Settings saved"); setTimeout(() => setSaved(""), 2000); }}>Save Changes</Button>
        {saved && <span className="inline-flex items-center gap-1.5 text-sm text-secondary"><TickCircle size={16} /> {saved}</span>}
      </div>
    </div>
  );
}
