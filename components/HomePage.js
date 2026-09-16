"use client";

import { useEffect, useMemo, useState } from "react";

const BOOKING_URL = "https://wasafibarbershop.setmore.com/book";
const SETMORE_URL = "https://wasafibarbershop.setmore.com/";
const INSTAGRAM_URL = "https://www.instagram.com/wasafibarbershopp";
const FACEBOOK_URL = "https://www.facebook.com/people/Wasafibarbershop/61580143397754/";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=274+Montreal+Rd+Vanier+Ottawa+Ontario+K1L+6C3";
const MAP_EMBED =
  "https://www.google.com/maps?q=274%20Montreal%20Rd%20Vanier%20Ottawa%20Ontario%20K1L%206C3&output=embed";

const LOGO_URL =
  "https://avatar.setmore.com/files/img/fD2B2lLHxyi2/7e71fc49-144c-46e5-a995-bab9036b2487.jpeg?crop=962%3B962%3B95%3B440&h=128&w=128";

const GALLERY = [
  {
    src: "https://images.setmore.com/files/img/fm3Zmp1aQdEI/3bf120f1-b6e2-4b84-9fb0-8ab9c04e5d40.jpeg",
    alt: "Sharp line-up and wave haircut by Wasafi Barbershop",
  },
  {
    src: "https://images.setmore.com/files/img/fY5fFf9aJhaY/f17bed77-f6b0-4a38-abd1-20bb1f5642c2.webp",
    alt: "Kids haircut at Wasafi Barbershop",
  },
  {
    src: "https://images.setmore.com/files/img/fOMRSvX0KkwS/22fc9d70-ba51-4011-a7fa-03f98c896221.png",
    alt: "Clean kids haircut from Wasafi Barbershop",
  },
  {
    src: "https://images.setmore.com/files/img/fdiUQFV87ON0/f4e25b00-8195-4f40-b0e6-303f5112ff96.jpeg",
    alt: "Fresh wave haircut and line-up",
  },
  {
    src: "https://images.setmore.com/files/img/fyWBVZQTeBij/c7f03d29-3eca-4724-b74c-401301b8ddf6.jpeg",
    alt: "Fade and beard grooming from Wasafi Barbershop",
  },
];

const SERVICES = [
  { name: "BALD SHAVED HEAD", duration: "30 mins", price: "$30", image: GALLERY[0].src },
  { name: "KID CUT", duration: "30 mins", price: "$30", image: GALLERY[1].src },
  { name: "KEEPING SWEET & SHORRT -WOMAN", duration: "1 hr", price: "$30", image: GALLERY[2].src },
  { name: "LOW TAPER", duration: "30 mins", price: "$30", image: GALLERY[3].src },
  { name: "TAPER FADE", duration: "30 mins", price: "$30", image: GALLERY[4].src },
  { name: "REGULAR HAIRCUT", duration: "30 mins", price: "$30", image: GALLERY[0].src },
  { name: "LOW FADE", duration: "30 mins", price: "$30", image: GALLERY[3].src },
  { name: "MID FADE", duration: "30 mins", price: "$30", image: GALLERY[4].src },
  { name: "HIGH FADE", duration: "30 mins", price: "$30", image: GALLERY[0].src },
  { name: "REGULAR CUT & BEARD", duration: "30 mins", price: "$30", image: GALLERY[4].src },
  { name: "LINE-UP ONLY", duration: "30 mins", price: "$30", image: GALLERY[3].src },
  { name: "BEARD & LINE-UP", duration: "1 hr", price: "$30", image: GALLERY[4].src },
];

const HOURS = [
  ["Sunday", "10:00 - 22:00"],
  ["Monday", "10:00 - 22:00"],
  ["Tuesday", "10:00 - 22:00"],
  ["Wednesday", "10:00 - 22:00"],
  ["Thursday", "10:00 - 22:00"],
  ["Friday", "10:00 - 22:00"],
  ["Saturday", "10:00 - 22:00"],
];

const REVIEWS = [
  {
    name: "Romane Bernagene",
    quote:
      "Great place to get service. Very friendly environment, very professional. Highly recommended.",
    source: "Setmore",
  },
  {
    name: "Isidore Kamdem Domasang",
    quote: "Class hair cut. Would recommend any day.",
    source: "Setmore",
  },
  {
    name: "Henry",
    quote: "Excellent barber. I recommend him to anyone.",
    source: "Setmore",
  },
  {
    name: "B Ntambi",
    quote: "What really stands out is the consistent quality and customer service.",
    source: "Google",
  },
  {
    name: "Joel Gothard DJONTU",
    quote: "Great service, very professional and welcoming.",
    source: "Google",
  },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Icon({ name, size = 20 }) {
  const icons = {
    phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4 8 5 8-5V6l-8 5-8-5v2z",
    map: "M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0zm-9-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    clock: "M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2zm1 11h5v-2h-4V6h-2v7z",
    arrow: "M5 12h14M13 6l6 6-6 6",
    menu: "M3 6h18M3 12h18M3 18h18",
    close: "M6 6l12 12M18 6 6 18",
    check: "M20 6 9 17l-5-5",
    star: "M12 2.7l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z",
  };

  const isStroke = ["phone", "map", "arrow", "menu", "close", "check"].includes(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isStroke ? "none" : "currentColor"}
      stroke={isStroke ? "currentColor" : "none"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name]} />
    </svg>
  );
}

function SectionTitle({ eyebrow, title, copy, align = "left" }) {
  return (
    <div className={`section-heading ${align === "center" ? "center" : ""}`} data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

export default function HomePage() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);

  const isOpen = useMemo(() => {
    try {
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        hour: "2-digit",
        hour12: false,
      }).formatToParts(new Date());
      const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
      return hour >= 10 && hour < 22;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((i) => (i + 1) % REVIEWS.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="barber-stripe" aria-hidden="true" />

      <header className="site-header">
        <a href="#top" className="brand" aria-label="Wasafi Barbershop home" onClick={closeMenu}>
          <img src={LOGO_URL} alt="Wasafi Barbershop logo" referrerPolicy="no-referrer" />
          <div>
            <strong>wasafibarbershop</strong>
            <span>Ottawa · Vanier</span>
          </div>
        </a>

        <nav className={`nav ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a href="#reviews" onClick={closeMenu}>Reviews</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="header-actions">
          <a className="header-phone" href="tel:+16133188858" aria-label="Call Wasafi Barbershop">
            <Icon name="phone" size={18} />
            <span>613-318-8858</span>
          </a>
          <a className="btn btn-primary btn-small" href={BOOKING_URL} target="_blank" rel="noreferrer">
            Book now
          </a>
          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero-media" aria-hidden="true">
          <img src={GALLERY[0].src} alt="" referrerPolicy="no-referrer" />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="orb orb-one" aria-hidden="true" />
        <div className="orb orb-two" aria-hidden="true" />

        <div className="container hero-content">
          <div className="hero-copy">
            <div className="hero-kicker fade-up delay-1">
              <span className={`status-dot ${isOpen ? "open" : ""}`} />
              <span>{isOpen ? "Open now" : "Open daily"} · 10AM — 10PM</span>
            </div>
            <h1 className="fade-up delay-2">
              Clean cuts.
              <br />
              <span>Sharp fades.</span>
              <br />
              Wasafi confidence.
            </h1>
            <p className="hero-lead fade-up delay-3">
              Afro-Caribbean inspired barbering, precise line-ups, beard grooming and custom styles in Ottawa — for kids and adults.
            </p>
            <div className="hero-actions fade-up delay-4">
              <a className="btn btn-primary" href={BOOKING_URL} target="_blank" rel="noreferrer">
                Book appointment <Icon name="arrow" size={18} />
              </a>
              <a className="btn btn-ghost" href="tel:+16133188858">
                <Icon name="phone" size={18} /> Call us
              </a>
            </div>
            <div className="hero-proof fade-up delay-5">
              <div>
                <strong>5.0</strong>
                <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
                <small>55 Setmore reviews</small>
              </div>
              <span className="proof-divider" />
              <div>
                <strong>Walk-ins welcome</strong>
                <small>Appointments preferred</small>
              </div>
            </div>
          </div>

          <aside className="hero-card fade-up delay-4" aria-label="Booking information">
            <div className="hero-card-top">
              <img src={LOGO_URL} alt="Wasafi Barbershop logo" referrerPolicy="no-referrer" />
              <div>
                <span>WASAFI BARBERSHOP</span>
                <strong>Fresh looks start here.</strong>
              </div>
            </div>
            <div className="hero-card-image">
              <img src={GALLERY[4].src} alt="Fade and beard grooming" referrerPolicy="no-referrer" />
              <div className="floating-price">
                <span>Services from</span>
                <strong>$30</strong>
              </div>
            </div>
            <div className="hero-card-meta">
              <div><Icon name="map" size={18} /><span>274 Montreal Rd, Vanier</span></div>
              <div><Icon name="clock" size={18} /><span>Daily · 10:00 — 22:00</span></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="ticker" aria-label="Wasafi highlights">
        <div className="ticker-track">
          {[...Array(2)].flatMap((_, group) => [
            "SHARP FADES",
            "PRECISE LINE-UPS",
            "KIDS CUTS",
            "BEARD GROOMING",
            "AFRO-CARIBBEAN STYLES",
            "WALK-INS WELCOME",
          ].map((item, i) => (
            <span key={`${group}-${i}`}><i /> {item}</span>
          )))}
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="container">
          <SectionTitle
            eyebrow="Services"
            title="Choose your cut. Leave sharp."
            copy="Every listed service from the Wasafi booking page is here, with the same duration and price."
          />
          <div className="service-grid">
            {SERVICES.map((service, index) => (
              <article className="service-card" key={service.name} data-reveal style={{ "--delay": `${(index % 4) * 70}ms` }}>
                <div className="service-image">
                  <img src={service.image} alt="" referrerPolicy="no-referrer" loading="lazy" />
                  <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="service-body">
                  <div>
                    <h3>{service.name}</h3>
                    <p><Icon name="clock" size={16} /> {service.duration}</p>
                  </div>
                  <strong className="price">{service.price}</strong>
                </div>
                <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="service-book">
                  Book this service <Icon name="arrow" size={17} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="policy-section">
        <div className="container policy-grid">
          <div data-reveal>
            <span className="eyebrow light">Booking policy</span>
            <h2>Know before you come.</h2>
            <p>Bookings and walk-ins are both welcome for now. Appointments are preferred when you want to lock in your time.</p>
          </div>
          <div className="policy-list" data-reveal>
            <div><span>01</span><div><strong>Cash preferred</strong><p>Cash only please; otherwise an extra charge may apply.</p></div></div>
            <div><span>02</span><div><strong>No more e-transfers</strong><p>Please plan your payment before your appointment.</p></div></div>
            <div><span>03</span><div><strong>Free parking</strong><p>Free parking is available — park anywhere permitted around the shop.</p></div></div>
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="container about-grid">
          <div className="about-collage" data-reveal>
            <div className="about-main"><img src={GALLERY[3].src} alt="Fresh Wasafi haircut" referrerPolicy="no-referrer" loading="lazy" /></div>
            <div className="about-small"><img src={GALLERY[1].src} alt="Kids cut at Wasafi Barbershop" referrerPolicy="no-referrer" loading="lazy" /></div>
            <div className="about-badge"><span>LOCAL</span><strong>OTTAWA</strong><small>BARBERSHOP</small></div>
          </div>
          <div className="about-copy">
            <SectionTitle eyebrow="About Wasafi" title="More than a haircut — trust, respect and community." />
            <p data-reveal>
              Wasafi Barbershop is your local neighborhood barbershop, dedicated to clean cuts, sharp fades and quality service for kids and adults. Built on passion, consistency and attention to detail, we take pride in making every client feel confident and well taken care of.
            </p>
            <p data-reveal>
              From fresh fades and precise line-ups to beard trims and custom styles, our goal is simple: deliver professional results in a comfortable, welcoming environment.
            </p>
            <div className="about-points" data-reveal>
              <div><Icon name="check" size={20} /><span>Afro-Caribbean hairstyle specialization</span></div>
              <div><Icon name="check" size={20} /><span>Kids & adults</span></div>
              <div><Icon name="check" size={20} /><span>Professional, welcoming environment</span></div>
              <div><Icon name="check" size={20} /><span>Walk-ins welcome · appointments preferred</span></div>
            </div>
            <a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" data-reveal>
              Follow @wasafibarbershopp <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </section>

      <section id="gallery" className="section gallery-section">
        <div className="container">
          <SectionTitle
            eyebrow="Gallery"
            title="The finish speaks for itself."
            copy="Real work featured on the Wasafi Setmore gallery."
            align="center"
          />
          <div className="gallery-grid">
            {GALLERY.map((image, index) => (
              <figure className={`gallery-item gallery-item-${index + 1}`} key={image.src} data-reveal>
                <img src={image.src} alt={image.alt} referrerPolicy="no-referrer" loading="lazy" />
                <figcaption><span>Wasafi cut</span><strong>0{index + 1}</strong></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="section reviews-section">
        <div className="container reviews-layout">
          <div className="review-score" data-reveal>
            <span className="eyebrow">Reviews</span>
            <strong className="big-score">5.0</strong>
            <div className="large-stars">★★★★★</div>
            <p>55 reviews on the current Setmore booking page.</p>
            <div className="rating-bars" aria-label="Setmore rating distribution">
              <div><span>5</span><i><b style={{ width: "94.5%" }} /></i><strong>52</strong></div>
              <div><span>4</span><i><b style={{ width: "5.5%" }} /></i><strong>3</strong></div>
              <div><span>3</span><i><b style={{ width: "0%" }} /></i><strong>0</strong></div>
              <div><span>2</span><i><b style={{ width: "0%" }} /></i><strong>0</strong></div>
              <div><span>1</span><i><b style={{ width: "0%" }} /></i><strong>0</strong></div>
            </div>
            <p className="external-rating">Google listing info provided: <strong>4.9 / 5</strong> from 42 reviews · Facebook: <strong>5 / 5</strong> from 1 vote.</p>
          </div>

          <div className="review-slider" data-reveal>
            <div className="quote-mark">“</div>
            <div className="review-slide" key={activeReview}>
              <div className="large-stars">★★★★★</div>
              <blockquote>{REVIEWS[activeReview].quote}</blockquote>
              <div className="reviewer">
                <div className="avatar">{REVIEWS[activeReview].name.charAt(0)}</div>
                <div><strong>{REVIEWS[activeReview].name}</strong><span>{REVIEWS[activeReview].source} review</span></div>
              </div>
            </div>
            <div className="review-dots" aria-label="Review carousel controls">
              {REVIEWS.map((review, index) => (
                <button
                  key={review.name}
                  className={index === activeReview ? "active" : ""}
                  onClick={() => setActiveReview(index)}
                  aria-label={`Show review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container">
          <SectionTitle eyebrow="Visit Wasafi" title="Your chair is waiting." copy="274 Montreal Rd, Vanier, Ottawa, Ontario K1L 6C3." />
          <div className="contact-grid">
            <div className="contact-panel" data-reveal>
              <div className="contact-item">
                <div className="contact-icon"><Icon name="map" size={22} /></div>
                <div><span>Address</span><strong>274 Montreal Rd, Vanier<br />Ottawa, ON K1L 6C3</strong><a href={MAP_URL} target="_blank" rel="noreferrer">Get directions →</a></div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Icon name="phone" size={22} /></div>
                <div><span>Phone</span><strong>+1 613-318-8858</strong><a href="tel:+16133188858">Call the shop →</a></div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Icon name="mail" size={22} /></div>
                <div><span>Email</span><strong>wasafibarbershop2025@gmail.com</strong><a href="mailto:wasafibarbershop2025@gmail.com">Send an email →</a></div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Icon name="clock" size={22} /></div>
                <div><span>Hours</span><strong>Open daily · 10AM — 10PM</strong><small>Eastern Time</small></div>
              </div>
              <div className="contact-buttons">
                <a className="btn btn-primary" href={BOOKING_URL} target="_blank" rel="noreferrer">Book with Setmore <Icon name="arrow" size={18} /></a>
                <a className="btn btn-dark-outline" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
              </div>
            </div>

            <div className="hours-card" data-reveal>
              <div className="hours-top">
                <div><span className={`status-dot ${isOpen ? "open" : ""}`} /><strong>{isOpen ? "Open now" : "Opening hours"}</strong></div>
                <span>Eastern Time</span>
              </div>
              <div className="hours-list">
                {HOURS.map(([day, time]) => <div key={day}><span>{day}</span><strong>{time}</strong></div>)}
              </div>
            </div>
          </div>

          <div className="map-wrap" data-reveal>
            <iframe
              title="Wasafi Barbershop location map"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg" aria-hidden="true"><img src={GALLERY[4].src} alt="" referrerPolicy="no-referrer" /></div>
        <div className="cta-overlay" aria-hidden="true" />
        <div className="container cta-content" data-reveal>
          <img className="cta-logo" src={LOGO_URL} alt="Wasafi Barbershop logo" referrerPolicy="no-referrer" />
          <span className="eyebrow light">WASAFI BARBERSHOP</span>
          <h2>Ready for a fresh cut?</h2>
          <p>Book your chair online or walk in. We’ll take care of the rest.</p>
          <div>
            <a className="btn btn-primary" href={BOOKING_URL} target="_blank" rel="noreferrer">Book now <Icon name="arrow" size={18} /></a>
            <a className="btn btn-white-outline" href="tel:+16133188858">613-318-8858</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a href="#top" className="brand footer-brand">
              <img src={LOGO_URL} alt="Wasafi Barbershop logo" referrerPolicy="no-referrer" />
              <div><strong>wasafibarbershop</strong><span>Clean cuts · Sharp fades</span></div>
            </a>
            <p>Local neighborhood barbershop serving Ottawa with precision, consistency and community.</p>
          </div>
          <div><strong>Explore</strong><a href="#services">Services</a><a href="#about">About</a><a href="#gallery">Gallery</a><a href="#reviews">Reviews</a></div>
          <div><strong>Contact</strong><a href="tel:+16133188858">+1 613-318-8858</a><a href="mailto:wasafibarbershop2025@gmail.com">Email us</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@wasafibarbershopp</a><a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook</a></div>
          <div><strong>Booking</strong><a href={BOOKING_URL} target="_blank" rel="noreferrer">Book appointment</a><a href={SETMORE_URL} target="_blank" rel="noreferrer">Setmore profile</a><span>Walk-ins welcome</span></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Wasafi Barbershop. All rights reserved.</span><span>Ottawa, Ontario · Canada</span></div>
      </footer>
    </main>
  );
}
