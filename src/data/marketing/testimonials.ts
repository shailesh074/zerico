export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced our tattered paper menus in an afternoon. Guests keep telling us how good the page looks — it feels like us.",
    author: "Aarti Mehta",
    role: "Owner, Cloud Café",
  },
  {
    quote:
      "Updating prices used to mean reprinting everything. Now I change it from my phone between orders. That alone is worth it.",
    author: "Rohan Desai",
    role: "Founder, The Corner Roastery",
  },
  {
    quote:
      "The offers feature brings people back on slow weekdays. We can finally see what's actually popular, not just guess.",
    author: "Neha Kapoor",
    role: "Manager, Saffron Kitchen",
  },
];
