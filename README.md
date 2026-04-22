# Crown Charms — Jewellery Store

A modern, minimalist e-commerce frontend for **Crown Charms**, a luxury jewellery brand. Built with React, Vite, and Tailwind CSS.

## Features

- **Home** — Hero, featured products, categories, brand story, newsletter
- **Shop** — Product grid with filters (category, material, price) and sort
- **Product detail** — Gallery, description, material & care, quantity, related products
- **Cart** — Editable quantities, remove items, price breakdown, checkout CTA
- **Checkout** — Shipping form, Stripe-ready payment (mock by default)
- **About** — Brand story
- **Contact** — Contact form, email, location

## Tech stack

- **React 18** + **Vite**
- **Tailwind CSS** (custom palette: ivory, champagne gold, charcoal)
- **React Router**
- **React Context** (cart, theme, toast)
- **Lucide React** icons
- **Stripe** (`@stripe/stripe-js`, `@stripe/react-stripe-js`) — frontend ready; add your key for live payments

## Run the project

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Stripe (optional)

To enable real Stripe test checkout:

1. Create a [Stripe](https://stripe.com) account and get your **publishable key**.
2. Add to `.env`:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
3. Implement a backend that creates a PaymentIntent and returns the client secret; then pass it to Stripe Elements in `CheckoutForm`.

Without the key, checkout runs in **demo mode**: “Place order (demo)” clears the cart and shows a thank-you message.

## Project structure

```
src/
  components/   # Navbar, Footer, Button, Input, Modal, ProductCard, etc.
  context/      # CartContext, ThemeContext, ToastContext
  data/         # products.js (mock data)
  pages/        # Home, Shop, ProductDetail, Cart, Checkout, About, Contact
  App.jsx
  main.jsx
  index.css
```

## Design

- **Colours:** Soft ivory, champagne/rose gold, charcoal
- **Fonts:** Playfair Display (headings), Inter (body) via Google Fonts
- **Theme:** Light/dark toggle (optional), stored in `localStorage`

---

© Crown Charms. For portfolio / demo use.
