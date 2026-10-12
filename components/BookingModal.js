"use client";

import { useEffect, useRef, useState } from "react";
import { SHOP_ADDRESS } from "@/lib/shop";
import { ottawaClock, bookingSlots, serviceMinutes, validateBooking, bookingPayload } from "@/lib/booking.mjs";

export default function BookingModal({ barber, service, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const sendLock = useRef(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", time: "", notes: "", website: "" });
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [clock, setClock] = useState(() => ottawaClock());

  useEffect(() => {
    setReference(`WAS-${crypto.randomUUID().slice(0, 8).toUpperCase()}`);
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog.showModal();
    closeRef.current?.focus();
    document.body.classList.add("modal-open");
    const timer = window.setInterval(() => setClock(ottawaClock()), 30000);
    return () => { clearInterval(timer); dialog.close(); document.body.classList.remove("modal-open"); previousFocus?.focus(); };
  }, []);

  const slots = bookingSlots(form.date, serviceMinutes(service));
  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value, ...(name === "date" ? { time: "" } : {}) }));
    setError("");
  };
  const submit = async (event) => {
    event.preventDefault();
    if (sendLock.current || status === "sent") return;
    const validation = validateBooking(form, service);
    if (validation) { setError(validation); return; }
    if (form.website) return;
    sendLock.current = true;
    setStatus("sending"); setError("");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${barber.email}`, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(bookingPayload(form, barber, service, reference, window.location.href)),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || ![true, "true"].includes(result.success)) throw new Error("Submission not accepted");
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError("We could not verify that your request was sent. Please call your barber or use the email option below; check before sending again.");
    } finally { sendLock.current = false; }
  };
  const emailFallback = () => {
    const validation = validateBooking(form, service);
    if (validation) { setError(validation); return; }
    const payload = bookingPayload(form, barber, service, reference, window.location.href);
    const body = Object.entries(payload).filter(([key]) => !key.startsWith("_")).map(([key, value]) => `${key}: ${value}`).join("\n");
    window.location.href = `mailto:${barber.email}?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(body)}`;
  };
  const close = () => { if (status !== "sending") onClose(); };

  return (
    <dialog ref={dialogRef} className="appointment-dialog" aria-labelledby="booking-title" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="booking-shell">
        <div className="booking-head">
          <div><span className="eyebrow light">Step 3 · Date & details</span><h2 id="booking-title">Book with {barber.name}.</h2><p>Your request goes to {barber.name}. Your appointment is confirmed when your barber replies.</p></div>
          <button ref={closeRef} className="booking-close" type="button" onClick={close} disabled={status === "sending"} aria-label="Close booking form">×</button>
        </div>
        {status === "sent" ? (
          <div className="booking-success" role="status">
            <span className="success-check" aria-hidden="true">✓</span><h3>Request submitted.</h3>
            <p>{barber.name} will confirm your appointment by phone or email. Please wait for confirmation before coming in.</p>
            <p><strong>{reference}</strong><br />{service.name} · {service.price} CAD<br />{form.date} at {form.time} · Ottawa local time</p>
            <a href={`tel:${barber.tel}`}>Call {barber.name}: {barber.phone}</a>
            <button className="btn btn-primary" type="button" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="booking-layout">
              <fieldset className="booking-form booking-fields" disabled={status === "sending"}>
                <label><span>Your name *</span><input name="name" value={form.name} onChange={update} placeholder="Full name" autoComplete="name" required maxLength={100} /></label>
                <label><span>Phone *</span><input name="phone" value={form.phone} onChange={update} type="tel" placeholder="613-555-0123" autoComplete="tel" required maxLength={35} /></label>
                <label className="booking-wide"><span>Email *</span><input name="email" value={form.email} onChange={update} type="email" placeholder="you@example.com" autoComplete="email" required maxLength={254} /></label>
                <label><span>Date *</span><input name="date" value={form.date} onChange={update} type="date" min={clock.date} required /></label>
                <label><span>Preferred time *</span><select name="time" value={form.time} onChange={update} required disabled={!form.date}><option value="">{!form.date ? "Choose a date first" : slots.length ? "Choose a time" : "Choose another date"}</option>{slots.map((slot) => <option key={slot.value} value={slot.value}>{slot.label}</option>)}</select></label>
                <p className="booking-wide booking-time-note">All times are in Ottawa (Eastern Time). Your barber will confirm availability.</p>
                <label className="booking-wide"><span>Notes (optional)</span><textarea name="notes" value={form.notes} onChange={update} rows={3} maxLength={1000} placeholder="Anything your barber should know?" /></label>
                <label className="booking-honey" aria-hidden="true">Leave blank<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} /></label>
                {error ? <p className="booking-error booking-wide" role="alert">{error}</p> : null}
              </fieldset>
              <aside className="booking-summary">
                <div className="summary-barber"><img src={barber.image} alt="" /><div><span>Your barber</span><strong>{barber.name}</strong></div></div>
                <div className="summary-service"><span>Selected hairstyle</span><strong>{service.name}</strong><small>{service.price} CAD · {service.duration}</small><button className="change-style" type="button" onClick={close} disabled={status === "sending"}>Change hairstyle</button></div>
                <div className="summary-note"><strong>274 Montreal Rd</strong><span>Vanier, Ottawa, ON K1L 6C3</span></div>
                <a className="summary-phone" href={`tel:${barber.tel}`}>Book by call<br /><strong>{barber.phone}</strong></a>
                <p className="summary-warning">This is a request. Your selected time is confirmed only after {barber.name} replies.</p>
              </aside>
            </div>
            <div className="direct-booking-actions"><button className="btn btn-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send booking request →"}</button><a className="btn btn-white-outline" href={`tel:${barber.tel}`}>Book by call</a><button className="email-fallback" type="button" onClick={emailFallback} disabled={status === "sending"}>Use my email app</button><small>Your details are sent to {barber.name} through our email form service.</small></div>
          </form>
        )}
      </div>
    </dialog>
  );
}
