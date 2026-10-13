export function ottawaClock(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return { date: `${get('year')}-${get('month')}-${get('day')}`, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}
export function serviceMinutes(service) {
  return service.duration.includes('hr') ? 60 : 30;
}
export function bookingSlots(date, duration, now = new Date()) {
  const clock = ottawaClock(now);
  if (!date || date < clock.date) return [];
  const slots = [];
  for (let minutes = 600; minutes + duration <= 1320; minutes += 30) {
    if (date === clock.date && minutes <= clock.minutes) continue;
    const hour = Math.floor(minutes / 60);
    slots.push({ value: `${String(hour).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`, label: `${hour % 12 || 12}:${String(minutes % 60).padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}` });
  }
  return slots;
}
export function validateBooking(form, service, now = new Date()) {
  if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.date || !form.time) return 'Please fill in your name, phone, email, date and time.';
  if (form.phone.replace(/\D/g, '').length < 7) return 'Please enter a valid phone number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date)) return 'Please choose a valid date.';
  const parsed = new Date(`${form.date}T12:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0,10) !== form.date) return 'Please choose a valid date.';
  if (!bookingSlots(form.date, serviceMinutes(service), now).some((slot) => slot.value === form.time)) return 'Please choose a future time during opening hours in Ottawa.';
  return '';
}
