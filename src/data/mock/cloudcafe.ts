import type { RestaurantData } from "@/types";

/** Build a sized Unsplash URL from a photo id. */
const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const cloudCafe: RestaurantData = {
  business: {
    id: "biz_cloudcafe",
    slug: "cloudcafe",
    name: "Cloud Café",
    tagline: "Slow mornings, good coffee, and a corner that feels like home.",
    description:
      "A neighbourhood specialty coffee house in the heart of the city. We roast in small batches, bake fresh every morning, and pour every cup like it matters — because it does.",
    businessType: "Specialty Coffee & Brunch",
    theme: "cafe",
    logoUrl: img("1495474472287-4d71bcdd2085", 200),
    coverImageUrl: img("1501339847302-ac426a4a7cbb", 1600),
    currencySymbol: "₹",
    timezone: "Asia/Kolkata",
    phone: "+91 98200 41100",
    whatsapp: "919820041100",
    email: "hello@cloudcafe.in",
    address: "14 Linking Road, Bandra West, Mumbai 400050",
    googleMapsUrl: "https://maps.google.com/?q=Bandra+West+Mumbai",
    location: { lat: 19.0607, lng: 72.8362 },
    social: {
      instagram: "https://instagram.com/cloudcafe",
      facebook: "https://facebook.com/cloudcafe",
      website: "https://cloudcafe.in",
    },
    openingHours: {
      mon: { open: "08:00", close: "22:00" },
      tue: { open: "08:00", close: "22:00" },
      wed: { open: "08:00", close: "22:00" },
      thu: { open: "08:00", close: "22:00" },
      fri: { open: "08:00", close: "23:30" },
      sat: { open: "09:00", close: "23:30" },
      sun: { open: "09:00", close: "22:00" },
    },
    isPublished: true,
  },

  categories: [
    { id: "cat_coffee", name: "Coffee & Espresso", displayOrder: 1 },
    { id: "cat_breakfast", name: "Breakfast", displayOrder: 2 },
    { id: "cat_brunch", name: "All-Day Brunch", displayOrder: 3 },
    { id: "cat_bakery", name: "Bakery & Desserts", displayOrder: 4 },
    { id: "cat_cold", name: "Cold & Refreshers", displayOrder: 5 },
  ],

  menuItems: [
    // Coffee & Espresso
    {
      id: "mi_latte",
      categoryId: "cat_coffee",
      name: "Signature Cloud Latte",
      description:
        "Double shot of our house espresso, silky steamed milk, a whisper of vanilla and sea salt.",
      price: 260,
      imageUrl: img("1541167760496-1628856ab772"),
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      displayOrder: 1,
    },
    {
      id: "mi_cappuccino",
      categoryId: "cat_coffee",
      name: "Classic Cappuccino",
      description: "Equal parts espresso, steamed milk and dense velvet foam.",
      price: 220,
      imageUrl: img("1572442388796-11668a67e53d"),
      isVeg: true,
      isAvailable: true,
      isPopular: false,
      displayOrder: 2,
    },
    {
      id: "mi_cortado",
      categoryId: "cat_coffee",
      name: "Cortado",
      description: "A short, balanced cut of espresso and warm milk. No fuss.",
      price: 200,
      imageUrl: img("1510707577719-ae7c14805e3a"),
      isVeg: true,
      isAvailable: true,
      isPopular: false,
      displayOrder: 3,
    },
    {
      id: "mi_pourover",
      categoryId: "cat_coffee",
      name: "Single-Origin Pour Over",
      description:
        "Hand-poured filter coffee, rotating single origins. Ask us what's on today.",
      price: 280,
      imageUrl: img("1447933601403-0c6688de566e"),
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      displayOrder: 4,
    },

    // Breakfast
    {
      id: "mi_avotoast",
      categoryId: "cat_breakfast",
      name: "Smashed Avocado Toast",
      description:
        "Sourdough, smashed avocado, chilli flakes, lemon and a soft poached egg.",
      price: 340,
      imageUrl: img("1588137378633-dea1336ce1e2"),
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      displayOrder: 1,
    },
    {
      id: "mi_shakshuka",
      categoryId: "cat_breakfast",
      name: "Baked Shakshuka",
      description:
        "Eggs baked in a spiced tomato & pepper stew, served with warm focaccia.",
      price: 380,
      imageUrl: img("1525351484163-7529414344d8"),
      isVeg: true,
      isAvailable: true,
      isPopular: false,
      displayOrder: 2,
    },
    {
      id: "mi_granola",
      categoryId: "cat_breakfast",
      name: "House Granola Bowl",
      description:
        "Toasted oats & nuts, greek yoghurt, seasonal fruit and honey.",
      price: 290,
      imageUrl: img("1490474418585-ba9bad8fd0ea"),
      isVeg: true,
      isAvailable: false,
      isPopular: false,
      displayOrder: 3,
    },

    // All-Day Brunch
    {
      id: "mi_pancakes",
      categoryId: "cat_brunch",
      name: "Buttermilk Pancake Stack",
      description:
        "Three fluffy pancakes, maple butter, fresh berries and a dusting of sugar.",
      price: 360,
      imageUrl: img("1567620905732-2d1ec7ab7445"),
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      displayOrder: 1,
    },
    {
      id: "mi_frenchtoast",
      categoryId: "cat_brunch",
      name: "Brioche French Toast",
      description:
        "Caramelised brioche, mascarpone cream, roasted figs and honeycomb.",
      price: 380,
      imageUrl: img("1484723091739-30a097e8f929"),
      isVeg: true,
      isAvailable: true,
      isPopular: false,
      displayOrder: 2,
    },
    {
      id: "mi_club",
      categoryId: "cat_brunch",
      name: "The Cloud Club",
      description:
        "Triple-stack sandwich, smoked chicken, egg, greens and herbed mayo with fries.",
      price: 420,
      imageUrl: img("1528735602780-2552fd46c7af"),
      isVeg: false,
      isAvailable: true,
      isPopular: false,
      displayOrder: 3,
    },

    // Bakery & Desserts
    {
      id: "mi_croissant",
      categoryId: "cat_bakery",
      name: "Butter Croissant",
      description: "72-hour laminated, baked in-house every morning. Pure butter.",
      price: 180,
      imageUrl: img("1555507036-ab1f4038808a"),
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      displayOrder: 1,
    },
    {
      id: "mi_cinnamon",
      categoryId: "cat_bakery",
      name: "Cinnamon Roll",
      description: "Soft, gooey swirls with cream cheese glaze.",
      price: 220,
      imageUrl: img("1509365465985-25d11c17e812"),
      isVeg: true,
      isAvailable: true,
      isPopular: false,
      displayOrder: 2,
    },
    {
      id: "mi_tiramisu",
      categoryId: "cat_bakery",
      name: "Classic Tiramisu",
      description:
        "Espresso-soaked savoiardi, mascarpone cream and bitter cocoa.",
      price: 320,
      imageUrl: img("1578985545062-69928b1d9587"),
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      displayOrder: 3,
    },

    // Cold & Refreshers
    {
      id: "mi_coldbrew",
      categoryId: "cat_cold",
      name: "24-Hour Cold Brew",
      description:
        "Slow-steeped for a full day — smooth, chocolatey, low in acidity.",
      price: 280,
      imageUrl: img("1461023058943-07fcbe16d735"),
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      displayOrder: 1,
    },
    {
      id: "mi_matcha",
      categoryId: "cat_cold",
      name: "Iced Matcha Latte",
      description: "Ceremonial-grade matcha, milk of your choice, over ice.",
      price: 300,
      imageUrl: img("1515823662972-da6a2e4d3002"),
      isVeg: true,
      isAvailable: true,
      isPopular: false,
      displayOrder: 2,
    },
    {
      id: "mi_lemonade",
      categoryId: "cat_cold",
      name: "Sparkling Berry Lemonade",
      description: "Fresh lemon, muddled berries, mint and soda.",
      price: 240,
      imageUrl: img("1621263764928-df1444c5e859"),
      isVeg: true,
      isAvailable: true,
      isPopular: false,
      displayOrder: 3,
    },
  ],

  gallery: [
    {
      id: "g1",
      title: "The main room",
      imageUrl: img("1554118811-1e0d58224f24"),
      displayOrder: 1,
    },
    {
      id: "g2",
      title: "Morning light",
      imageUrl: img("1445116572660-236099ec97a0"),
      displayOrder: 2,
    },
    {
      id: "g3",
      title: "At the bar",
      imageUrl: img("1442512595331-e89e73853f31"),
      displayOrder: 3,
    },
    {
      id: "g4",
      title: "Fresh from the oven",
      imageUrl: img("1517433670267-08bbd4be890f"),
      displayOrder: 4,
    },
    {
      id: "g5",
      title: "A quiet corner",
      imageUrl: img("1509042239860-f550ce710b93"),
      displayOrder: 5,
    },
    {
      id: "g6",
      title: "Latte art, always",
      imageUrl: img("1495474472287-4d71bcdd2085"),
      displayOrder: 6,
    },
  ],

  offers: [
    {
      id: "o1",
      title: "Weekday Happy Hours",
      description:
        "Every weekday 3–6 PM — buy any two coffees and the second is half price.",
      imageUrl: img("1509042239860-f550ce710b93", 600),
      expiryDate: "2026-12-31",
      isActive: true,
    },
    {
      id: "o2",
      title: "Weekend Brunch Set",
      description:
        "Sat & Sun — any brunch plate with a coffee and fresh juice at a special price.",
      imageUrl: img("1533920379810-6bedac961555", 600),
      expiryDate: "2026-12-31",
      isActive: true,
    },
  ],
};
