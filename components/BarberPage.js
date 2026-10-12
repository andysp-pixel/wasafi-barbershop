"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";
import FooterSocial from "./FooterSocial";
import { LOGO_URL, SERVICES, SHOP_ADDRESS } from "@/lib/shop";
import { sitePath } from "@/lib/paths";

export default function BarberPage({ barber }) {
  const [service, setService] = useState("");
  return (
    <main>
      <div className="barber-stripe" aria-hidden="true" />
      <header className="site-header barber-header">
        <a className="brand" href={sitePath("/")} aria-label="Wasafi Barbershop home">
          <img src={LOGO_URL} alt="Wasafi Barbershop logo" />
          <div><strong>wasafibarbershop</strong><span>Ottawa · Vanier</span></div>
        </a>
        <a className="back-link" href={sitePath("/#barbers")}>← Change barber</a>
        <a className="btn btn-primary btn-small" href={`tel:${barber.tel}`}>Call {barber.name}</a>
      </header>
      <section className={`barber-intro ${barber.slug}`}>
        <div className="container barber-intro-grid">
          <div className="barber-intro-copy">
            <div className="booking-steps" aria-label="Booking steps"><span>1 · Barber selected</span><strong>2 · Choose your hairstyle</strong><span>3 · Date & details</span></div>
            <span className="eyebrow light">Your barber at Wasafi</span>
            <h1>{barber.name}<span>Your next fresh look.</span></h1>
            <p>Choose a hairstyle below to see your price and request an appointment with {barber.name}.</p>
            <div className="barber-intro-links"><a href={`tel:${barber.tel}`}>{barber.phone}</a><a href={`mailto:${barber.email}`}>{barber.email}</a></div>
            <small>{SHOP_ADDRESS}<br />Open daily · 10AM–10PM · Ottawa local time</small>
          </div>
          <img className="barber-intro-photo" src={barber.image} alt={barber.name} />
        </div>
      </section>
      <section className="section services-section" id="hairstyles">
        <div className="container">
          <div className="section-heading"><span className="eyebrow">Hairstyles & prices</span><h2>Choose your cut.</h2><p>All prices in Canadian dollars. Photos show examples of Wasafi’s work. Select a hairstyle to continue.</p></div>
          <div className="service-grid">
            {SERVICES.map((item, index) => (
              <article className="service-card" key={item.name}>
                <div className="service-image"><img src={item.image} alt="Example of Wasafi Barbershop’s work" loading="lazy" /><span className="service-number">{String(index + 1).padStart(2, "0")}</span></div>
                <div className="service-body"><div><h3>{item.name}</h3><p>{item.duration}</p></div><strong className="price">{item.price}</strong></div>
                <button className="service-book" type="button" onClick={() => setService(item.name)}>Select hairstyle <span aria-hidden="true">→</span></button>
              </article>
            ))}
          </div>
          <div className="barber-phone-booking"><h3>Prefer to book by phone?</h3><p>Call {barber.name} to arrange your appointment.</p><a className="btn btn-primary" href={`tel:${barber.tel}`}>{barber.phone}</a></div>
        </div>
      </section>
      <footer className="footer"><div className="container barber-footer-social"><FooterSocial /></div><div className="container footer-bottom"><a href={sitePath("/")}>← Back to Wasafi Barbershop</a><span>© {new Date().getFullYear()} Wasafi Barbershop</span></div></footer>
      {service ? <BookingModal barber={barber} service={SERVICES.find((item) => item.name === service)} onClose={() => setService("")} /> : null}
    </main>
  );
}
