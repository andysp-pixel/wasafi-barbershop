# Booking kuri email — FormSubmit

Website irungika booking kuri email ya barber client yahisemwo:

| Barber | Email |
| --- | --- |
| DJ Kakou | Wasafibarbershop2025@gmail.com |
| Fabrice | Nkomezifabricee@gmail.com |

Form irungika izina, phone, email, hairstyle, igiciro muri CAD, duration, date, isaha ya Ottawa, adresse n’amakuru y’inyongera. Barber ashobora gukora Reply akishura client kuri email yashizemwo. Booking by call iragumaho.

## Kwemeza email rimwe

1. Deploy website nshasha kuri domain uzokoresha.
2. Hitamwo DJ Kakou, uhitemwo hairstyle, wandike amakuru yawe y’ikigeragezo, ufyonde **Send booking**, urangize reCAPTCHA ya FormSubmit.
3. DJ Kakou araba Inbox na Spam kuri **Wasafibarbershop2025@gmail.com**, afyonde link ya **Activate Form** muri email ya FormSubmit. Niwe yemeza email yiwe; nta password ukeneye kumpa.
4. Subiramwo kuri Fabrice, yemeze kuri **Nkomezifabricee@gmail.com**.
5. Nyuma yo kwemeza, subira urungike test booking kuri buri barber, mugenzure ko email iri mu inbox yiwe gusa kandi amakuru yose arimwo. Nimba uhinduye domain FormSubmit ishobora gusaba activation nshasha.

Nta API key canke backend ibikenewe. Nta test email yarungitswe na Codex; email activation n’ukwakira message nyayo biracakeneye kugenzurwa na ba barbers.

## Uko client abikoresha

**Choose barber → Select hairstyle → Date & details → Send booking.** Form irafungura FormSubmit kugira client arangize reCAPTCHA, hanyuma FormSubmit imwereke acknowledgement yo kwakira submission. Ibi ntivyemeza ko barber afise iyo saha libre; barber yemeza isaha akishura client. Website ntisoma agenda, ntibika appointment muri Google Calendar automatically kandi ntibuza clients babiri gusaba isaha imwe.

Source: https://formsubmit.co/
