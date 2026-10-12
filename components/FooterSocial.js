export const INSTAGRAM_URL = "https://www.instagram.com/wasafibarbershopp?utm_source=ig_web_button_share_sheet&obrf=ZDNlZDc0MzIxNw==";
export const FACEBOOK_URL = "https://www.facebook.com/people/Wasafibarbershop/61580143397754/";

export default function FooterSocial() {
  return (
    <nav className="footer-social" aria-label="Follow Wasafi Barbershop on social media">
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
        <span>Instagram</span>
      </a>
      <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4A25 25 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9z" /></svg>
        <span>Facebook</span>
      </a>
    </nav>
  );
}
