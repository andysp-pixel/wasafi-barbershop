# Wasafi Barbershop

Next.js static website with DJ Kakou and Fabrice hairstyle pages and direct email bookings through FormSubmit. Existing photos, backgrounds, prices, barber cards and social links are preserved.

## Booking

Choose barber → hairstyle → client details, date and Ottawa time → Send booking. The form posts directly to the chosen barber’s FormSubmit email endpoint. DJ Kakou receives submissions at Wasafibarbershop2025@gmail.com; Fabrice receives submissions at Nkomezifabricee@gmail.com. Client email is used for Reply-To. FormSubmit’s CAPTCHA and acknowledgement run on FormSubmit.

Each barber must activate their FormSubmit email once. See **FormSubmit_Setup.md** (Kirundi). No API keys or Google Apps Script setup are required. The barber confirms the appointment time; this version does not create Google Calendar events or check calendar availability. Live email delivery has not yet been tested or activated by Codex.

## Run and build

```sh
npm ci
npm run dev
npm run test:booking
npm run build
```

Static output is written to `out/`. Use an empty `NEXT_PUBLIC_BASE_PATH` on a root-domain deployment. Vercel: Next.js framework, build `npm run build`, output `out`. Use the dedicated Workers source ZIP and its Workers setup guide for Cloudflare Workers. The prebuilt Pages ZIP is for Pages Direct Upload only.

## Verification

Routing tests cover both supplied barber addresses. Validation tests cover required fields, invalid dates, past times, opening hours, service duration and Ottawa daylight saving time. No emails are sent by these tests. A live delivery check requires each barber to activate FormSubmit and submit a test from the deployed website.
