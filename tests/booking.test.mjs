import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { bookingSlots, ottawaClock, validateBooking } from '../lib/booking.mjs';
import { formSubmitAction } from '../lib/email-booking.mjs';

const shopSource = readFileSync(new URL('../lib/shop.js', import.meta.url), 'utf8').replace('"./paths"', JSON.stringify(new URL('../lib/paths.js', import.meta.url).href));
const { BARBERS, SERVICES } = await import('data:text/javascript;base64,' + Buffer.from(shopSource).toString('base64'));
assert.equal(formSubmitAction(BARBERS.find(b => b.slug === 'dj-kakou')), 'https://formsubmit.co/Wasafibarbershop2025%40gmail.com');
assert.equal(formSubmitAction(BARBERS.find(b => b.slug === 'fabrice')), 'https://formsubmit.co/Nkomezifabricee%40gmail.com');
assert.throws(() => formSubmitAction({ email: 'invalid/recipient' }));
const now = new Date('2026-10-13T14:15:00Z'); // Ottawa 10:15AM.
const cut = SERVICES.find(s => s.duration === '30 mins');
const longCut = SERVICES.find(s => s.duration === '1 hr');
const form = { name: 'Example Client', phone: '+1 613 555 0100', email: 'client@example.com', date: '2026-10-13', time: '10:30' };
assert.equal(validateBooking(form, cut, now), '');
for (const field of ['name','phone','email','date','time']) assert.ok(validateBooking({ ...form, [field]: '' }, cut, now));
assert.ok(validateBooking({ ...form, email: 'invalid' }, cut, now));
assert.ok(validateBooking({ ...form, phone: '123' }, cut, now));
assert.ok(validateBooking({ ...form, date: '2026-02-30' }, cut, new Date('2026-02-01T15:00:00Z')));
assert.ok(validateBooking({ ...form, time: '10:00' }, cut, now));
assert.ok(validateBooking({ ...form, date: '2026-10-12' }, cut, now));
assert.ok(validateBooking({ ...form, time: '22:00' }, cut, now));
assert.equal(validateBooking({ ...form, time: '21:30' }, cut, now), '');
assert.ok(validateBooking({ ...form, time: '21:30' }, longCut, now));
assert.equal(validateBooking({ ...form, time: '21:00' }, longCut, now), '');
assert.equal(ottawaClock(new Date('2026-07-01T14:00:00Z')).minutes, 600);
assert.equal(ottawaClock(new Date('2026-12-01T15:00:00Z')).minutes, 600);
assert.equal(bookingSlots('2026-10-13', 30, new Date('2026-10-14T02:00:00Z')).length, 0);
console.log('Booking routing, input validation, Ottawa timezone and duration checks passed. No emails were sent.');
