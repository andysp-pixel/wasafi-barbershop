import { sitePath } from "./paths";

export const LOGO_URL = sitePath("/media/wasafi-logo.jpg");

export const GALLERY = [
  {
    src: sitePath("/media/cut-1.webp"),
    alt: "Sharp line-up and wave haircut by Wasafi Barbershop",
  },
  {
    src: sitePath("/media/cut-2.webp"),
    alt: "Kids haircut at Wasafi Barbershop",
  },
  {
    src: sitePath("/media/cut-3.webp"),
    alt: "Clean kids haircut from Wasafi Barbershop",
  },
  {
    src: sitePath("/media/cut-4.webp"),
    alt: "Fresh wave haircut and line-up",
  },
  {
    src: sitePath("/media/cut-5.webp"),
    alt: "Fade and beard grooming from Wasafi Barbershop",
  },
];

export const SERVICES = [
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


export const BARBERS = [
  { slug: "dj-kakou", name: "DJ Kakou", email: "Wasafibarbershop2025@gmail.com", phone: "+1 (613) 318-8858", tel: "+16133188858", image: sitePath("/media/dj-kakou.jpg") },
  { slug: "fabrice", name: "Fabrice", email: "Nkomezifabricee@gmail.com", phone: "+1 (819) 639-1584", tel: "+18196391584", image: sitePath("/media/fabrice.jpg") },
];
export const SHOP_ADDRESS = "274 Montreal Rd, Vanier, Ottawa, ON K1L 6C3";
