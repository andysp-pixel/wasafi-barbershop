export function formSubmitAction(barber) {
  if (!/^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/.test(barber.email)) {
    throw new Error('A valid barber email is required.');
  }
  return `https://formsubmit.co/${encodeURIComponent(barber.email)}`;
}
