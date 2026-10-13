"use client";

import { useEffect, useRef, useState } from "react";
import { bookingSlots, ottawaClock, serviceMinutes, validateBooking } from "@/lib/booking.mjs";
import { formSubmitAction } from "@/lib/email-booking.mjs";

export default function BookingModal({ barber, service, onClose }) {
  const dialogRef = useRef(null);
  const nameRef = useRef(null);
  const errorRef = useRef(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [today, setToday] = useState("");
  const [error, setError] = useState("");
  const slots = bookingSlots(date, serviceMinutes(service));

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    setToday(ottawaClock().date);
    dialog.showModal();
    nameRef.current?.focus();
    document.body.classList.add("modal-open");
    return () => {
      dialog.close();
      document.body.classList.remove("modal-open");
      previousFocus?.focus();
    };
  }, []);

  function handleSubmit(event) {
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const message = validateBooking(values, service);
    if (message) {
      event.preventDefault();
      setError(message);
      requestAnimationFrame(() => errorRef.current?.focus());
    }
  }

  return (
    <dialog ref={dialogRef} className="appointment-dialog" aria-labelledby="booking-title" onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <div className="booking-shell">
        <div className="booking-head">
          <div><span className="eyebrow light">Step 3 · Date & details</span><h2 id="booking-title">Book with {barber.name}.</h2><p>Choose your date and time, then send your booking directly to {barber.name}. All times are in Ottawa (Eastern Time).</p></div>
          <button className="booking-close" type="button" onClick={onClose} aria-label="Close booking form">×</button>
        </div>
        <div className="booking-layout">
          <form className="booking-form booking-fields" action={formSubmitAction(barber)} method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value={`Wasafi booking · ${barber.name} · ${service.name} · ${date} ${time} (Ottawa)`} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="Barber" value={barber.name} />
            <input type="hidden" name="Hairstyle" value={service.name} />
            <input type="hidden" name="Price" value={`${service.price} CAD`} />
            <input type="hidden" name="Duration" value={service.duration} />
            <input type="hidden" name="Timezone" value="America/Toronto (Ottawa — Eastern Time)" />
            <input type="hidden" name="Address" value="274 Montreal Rd, Vanier, Ottawa, ON K1L 6C3" />
            <label className="booking-honey" aria-hidden="true">Leave this blank<input type="text" name="_honey" tabIndex={-1} autoComplete="off" /></label>
            <label className="booking-wide"><span>Full name</span><input ref={nameRef} name="name" type="text" autoComplete="name" required maxLength={100} placeholder="Your full name" /></label>
            <label><span>Email address</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
            <label><span>Phone number</span><input name="phone" type="tel" autoComplete="tel" required maxLength={40} placeholder="Your phone number" /></label>
            <label><span>Appointment date</span><input name="date" type="date" required min={today || undefined} value={date} onChange={(event) => { setDate(event.target.value); setTime(""); setError(""); }} /></label>
            <label><span>Appointment time</span><select name="time" required value={time} disabled={!date} onChange={(event) => { setTime(event.target.value); setError(""); }}><option value="">{date ? "Choose a time" : "Choose a date first"}</option>{slots.map((slot) => <option key={slot.value} value={slot.value}>{slot.label}</option>)}</select></label>
            <p className="booking-time-note booking-wide">Open daily, 10AM–10PM. {date && slots.length === 0 ? "No remaining times for this date. Please choose another date." : "Times shown are in Ottawa, including daylight saving time."}</p>
            <label className="booking-wide"><span>Additional notes (optional)</span><textarea name="notes" rows={3} maxLength={2000} placeholder="Anything your barber should know?" /></label>
            {error ? <p ref={errorRef} tabIndex={-1} role="alert" className="booking-error booking-wide">{error}</p> : null}
            <button className="btn btn-primary booking-wide" type="submit">Send booking →</button>
            <p className="booking-time-note booking-wide">Your details will be emailed to {barber.name}. Your barber will confirm your chosen time.</p>
          </form>
          <aside className="booking-summary">
            <div className="summary-barber"><img src={barber.image} alt="" /><div><span>Your barber</span><strong>{barber.name}</strong></div></div>
            <div className="summary-service"><span>Selected hairstyle</span><strong>{service.name}</strong><small>{service.price} CAD · {service.duration}</small><button className="change-style" type="button" onClick={onClose}>Change hairstyle</button></div>
            <div className="summary-note"><strong>274 Montreal Rd</strong><span>Vanier, Ottawa, ON K1L 6C3</span></div>
            <a className="summary-phone" href={`tel:${barber.tel}`}>Book by call<br /><strong>{barber.phone}</strong></a>
            <p className="summary-warning">Please wait for {barber.name} to confirm the appointment before visiting.</p>
          </aside>
        </div>
      </div>
    </dialog>
  );
}
