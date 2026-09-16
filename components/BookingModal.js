"use client";

import { useEffect, useMemo, useState } from "react";

const SHOP_EMAIL = "wasafibarbershop2025@gmail.com";
const SHOP_WHATSAPP = "16133188858";
const SHOP_ADDRESS = "274 Montreal Rd, Vanier, Ottawa, ON K1L 6C3";

function makeReference() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `WAS-${y}${m}${d}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function localDateInputValue() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60 * 1000).toISOString().split("T")[0];
}

function buildTimeSlots() {
  const values = [];
  for (let hour = 10; hour < 22; hour += 1) {
    for (const minute of [0, 30]) {
      const date = new Date(2000, 0, 1, hour, minute);
      values.push({
        value: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
        label: date.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit" }),
      });
    }
  }
  return values;
}

const TIME_SLOTS = buildTimeSlots();

export default function BookingModal({ open, onClose, services, initialService = "" }) {
  const [reference, setReference] = useState(makeReference);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: initialService || services?.[0]?.name || "",
    date: "",
    time: "",
    notes: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setReference(makeReference());
    setError("");
    setForm((current) => ({
      ...current,
      service: initialService || current.service || services?.[0]?.name || "",
    }));
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open, initialService, services]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const selected = useMemo(
    () => services?.find((service) => service.name === form.service),
    [form.service, services]
  );

  if (!open) return null;

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  };

  const validate = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.service || !form.date || !form.time) {
      setError("Please add your name, phone number, service, date and time.");
      return false;
    }
    return true;
  };

  const message = () => {
    const lines = [
      "WASAFI BARBERSHOP — BOOKING REQUEST",
      `Reference: ${reference}`,
      "",
      `Client: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : null,
      `Service: ${form.service}`,
      selected ? `Price: ${selected.price}` : null,
      selected ? `Duration: ${selected.duration}` : null,
      `Date: ${form.date}`,
      `Preferred time: ${form.time}`,
      form.notes.trim() ? `Notes: ${form.notes.trim()}` : null,
      "",
      `Location: ${SHOP_ADDRESS}`,
      "Status: REQUESTED — please confirm this appointment with the client.",
    ];
    return lines.filter(Boolean).join("\n");
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    window.open(`https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(message())}`, "_blank", "noopener,noreferrer");
  };

  const sendEmail = () => {
    if (!validate()) return;
    const subject = `Booking request ${reference} — ${form.name.trim()}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SHOP_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message())}`;
    window.open(gmail, "_blank", "noopener,noreferrer");
  };

  const sendDefaultEmail = () => {
    if (!validate()) return;
    const subject = `Booking request ${reference} — ${form.name.trim()}`;
    window.location.href = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message())}`;
  };

  const downloadPdf = () => {
    if (!validate()) return;

    const clean = (value) => String(value ?? "")
      .normalize("NFKD")
      .replace(/[^\x20-\x7E]/g, "-")
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");

    const wrap = (text, width = 78) => {
      const words = String(text || "").split(/\s+/);
      const lines = [];
      let line = "";
      words.forEach((word) => {
        const next = line ? `${line} ${word}` : word;
        if (next.length > width && line) {
          lines.push(line);
          line = word;
        } else {
          line = next;
        }
      });
      if (line) lines.push(line);
      return lines;
    };

    const content = [];
    content.push("BT /F2 22 Tf 50 742 Td (WASAFI BARBERSHOP) Tj ET");
    content.push(`BT /F1 10 Tf 50 723 Td (${clean("Booking request - " + reference)}) Tj ET`);
    content.push("0.88 0.12 0.18 RG 50 708 m 562 708 l S");

    let y = 680;
    const addRow = (label, value) => {
      content.push(`BT /F2 10 Tf 50 ${y} Td (${clean(label)}) Tj ET`);
      const lines = wrap(value, 60);
      lines.forEach((line, index) => {
        content.push(`BT /F1 10 Tf 170 ${y - index * 14} Td (${clean(line)}) Tj ET`);
      });
      y -= Math.max(28, lines.length * 14 + 8);
    };

    addRow("Client", form.name.trim());
    addRow("Phone", form.phone.trim());
    if (form.email.trim()) addRow("Email", form.email.trim());
    addRow("Service", form.service);
    if (selected) addRow("Price / Duration", `${selected.price} - ${selected.duration}`);
    addRow("Date", form.date);
    addRow("Preferred time", form.time);
    if (form.notes.trim()) addRow("Notes", form.notes.trim());
    addRow("Location", SHOP_ADDRESS);

    y -= 6;
    content.push(`BT /F2 10 Tf 50 ${y} Td (IMPORTANT) Tj ET`);
    y -= 18;
    wrap("This PDF is a booking request, not a final confirmation. Wasafi Barbershop will confirm the appointment by phone, WhatsApp or email.", 88).forEach((line) => {
      content.push(`BT /F1 9 Tf 50 ${y} Td (${clean(line)}) Tj ET`);
      y -= 13;
    });
    content.push("BT /F1 9 Tf 50 42 Td (+1 613-318-8858  -  wasafibarbershop2025@gmail.com) Tj ET");

    const stream = content.join("\n");
    const objects = [
      "<< /Type /Catalog /Pages 2 0 R >>",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
      `<< /Length ${new TextEncoder().encode(stream).length} >>\nstream\n${stream}\nendstream`,
    ];

    let pdf = "%PDF-1.4\n";
    const offsets = [0];
    objects.forEach((object, index) => {
      offsets.push(new TextEncoder().encode(pdf).length);
      pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });
    const xref = new TextEncoder().encode(pdf).length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    offsets.slice(1).forEach((offset) => {
      pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
    });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

    const blob = new Blob([new TextEncoder().encode(pdf)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wasafi-booking-${reference}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <button className="booking-backdrop" type="button" aria-label="Close booking form" onClick={onClose} />
      <div className="booking-shell">
        <div className="booking-head">
          <div>
            <span className="eyebrow light">Book your chair</span>
            <h2 id="booking-title">Request an appointment.</h2>
            <p>Fill this in once, then send it straight to Wasafi by WhatsApp or email.</p>
          </div>
          <button className="booking-close" type="button" onClick={onClose} aria-label="Close booking form">×</button>
        </div>

        <div className="booking-layout">
          <form className="booking-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              <span>Your name *</span>
              <input name="name" value={form.name} onChange={update} placeholder="Full name" autoComplete="name" />
            </label>
            <label>
              <span>Phone / WhatsApp *</span>
              <input name="phone" value={form.phone} onChange={update} placeholder="e.g. 613-555-0123" autoComplete="tel" inputMode="tel" />
            </label>
            <label className="booking-wide">
              <span>Email (optional)</span>
              <input name="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" type="email" />
            </label>
            <label className="booking-wide">
              <span>Service *</span>
              <select name="service" value={form.service} onChange={update}>
                {services.map((service) => (
                  <option key={service.name} value={service.name}>{service.name} — {service.price} · {service.duration}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Date *</span>
              <input name="date" value={form.date} onChange={update} type="date" min={localDateInputValue()} />
            </label>
            <label>
              <span>Preferred time *</span>
              <select name="time" value={form.time} onChange={update}>
                <option value="">Choose a time</option>
                {TIME_SLOTS.map((slot) => <option key={slot.value} value={slot.label}>{slot.label}</option>)}
              </select>
            </label>
            <label className="booking-wide">
              <span>Notes (optional)</span>
              <textarea name="notes" value={form.notes} onChange={update} rows="4" placeholder="Hair style, special request, child appointment, etc." />
            </label>
            {error ? <p className="booking-error booking-wide">{error}</p> : null}
          </form>

          <aside className="booking-summary">
            <span className="summary-label">Booking request</span>
            <strong className="summary-ref">{reference}</strong>
            <div className="summary-service">
              <span>Selected service</span>
              <strong>{form.service || "Choose a service"}</strong>
              {selected ? <small>{selected.price} · {selected.duration}</small> : null}
            </div>
            <div className="summary-note">
              <strong>Open daily</strong>
              <span>10:00 AM — 10:00 PM</span>
            </div>
            <div className="summary-note">
              <strong>274 Montreal Rd</strong>
              <span>Vanier, Ottawa, ON K1L 6C3</span>
            </div>
            <p className="summary-warning">Your requested time is confirmed only after Wasafi replies.</p>
          </aside>
        </div>

        <div className="booking-actions">
          <button className="booking-action whatsapp" type="button" onClick={sendWhatsApp}>
            <strong>Send to WhatsApp</strong><span>Fastest option</span>
          </button>
          <button className="booking-action gmail" type="button" onClick={sendEmail}>
            <strong>Send with Gmail</strong><span>Pre-filled email</span>
          </button>
          <button className="booking-action email" type="button" onClick={sendDefaultEmail}>
            <strong>Other email app</strong><span>Mail / Outlook etc.</span>
          </button>
          <button className="booking-action pdf" type="button" onClick={downloadPdf}>
            <strong>Download PDF</strong><span>Keep a copy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
