"use client";
import { farms } from "@/data/mock";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Star, Call, Location } from "iconsax-react";

export default function FarmersAdmin() {
  return (
    <div>
      <div><h1 className="text-2xl font-bold text-ink">Farmers</h1><p className="text-sm text-muted">Direct contact with the people who grow your produce.</p></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {farms.map((f) => (
          <div key={f.id} className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <div className="flex items-center gap-4">
              <Avatar src={`https://i.pravatar.cc/100?u=${f.farmer}`} name={f.farmer} size={52} />
              <div className="flex-1"><p className="font-semibold">{f.farmer}</p><p className="flex items-center gap-1 text-xs text-muted"><Location size={12} /> {f.name}</p></div>
              <StatusBadge status={f.status} />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm"><Star size={14} variant="Bold" className="fill-amber-400 text-amber-400" /><span className="font-medium">{f.rating}</span><span className="text-muted">· {f.reviews} reviews</span></div>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{f.bio}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">{f.certifications.map((c) => <Badge key={c} tone="gray">{c}</Badge>)}</div>
            <div className="mt-4 flex gap-3 border-t border-border pt-3 text-sm"><span className="flex items-center gap-1.5 text-muted"><Call size={14} /> +971 5x xxx xxxx</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
