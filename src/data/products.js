/**
 * Mock product data for Crown Charms jewellery store.
 * Categories: rings, necklaces, bracelets, earrings
 * Materials: gold, rose gold, silver
 */

export const categories = [
  { id: 'rings', name: 'Rings', slug: 'rings' },
  { id: 'necklaces', name: 'Necklaces', slug: 'necklaces' },
  { id: 'bracelets', name: 'Bracelets', slug: 'bracelets' },
  { id: 'earrings', name: 'Earrings', slug: 'earrings' },
]

export const products = [
  {
    id: '1',
    name: 'Royal Solitaire Ring',
    slug: 'royal-solitaire-ring',
    price: 429,
    category: 'rings',
    material: 'gold colour',
    description: 'A classic solitaire look in gold-colour metal. Fashion jewellery with a lasting shine—not real gold.',
    care: 'Gold-colour finish (not solid gold). Store in a soft pouch; avoid contact with chemicals and water.',
    image: '/products/ring%201.jpeg',
    images: ['/products/ring%201.jpeg'],
    featured: true,
  },
  {
    id: '2',
    name: 'Pearl Drop Earrings',
    slug: 'pearl-drop-earrings',
    price: 189,
    category: 'earrings',
    material: 'gold',
    description: 'Freshwater pearls suspended from delicate gold hooks. Perfect for both day and evening.',
    care: 'Wipe with a soft cloth after wear. Keep away from perfumes and hairspray.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
      'https://images.unsplash.com/photo-1596944925780-e8fcf341dc5a?w=800',
    ],
    featured: true,
  },
  {
    id: '3',
    name: 'Champagne Pendant Necklace',
    slug: 'champagne-pendant-necklace',
    price: 279,
    category: 'necklaces',
    material: 'rose gold',
    description: 'A delicate chain with a small champagne-toned pendant. Designed to layer or wear alone.',
    care: 'Store flat to avoid tangling. Polish with a jewellery cloth when needed.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800',
    ],
    featured: true,
  },
  {
    id: '4',
    name: 'Infinity Bracelet',
    slug: 'infinity-bracelet',
    price: 159,
    category: 'bracelets',
    material: 'gold colour',
    description: 'Infinity symbol in gold colour. Dainty and everyday-friendly; gold-tone metal—not real gold.',
    care: 'Gold-colour finish (not solid gold). Remove before swimming; store in a dry place.',
    image: '/products/bracelet%201.jpeg',
    images: ['/products/bracelet%201.jpeg', '/products/bracelet%202.jpeg'],
    featured: true,
  },
  {
    id: '5',
    name: 'Twist Band Ring',
    slug: 'twist-band-ring',
    price: 199,
    category: 'rings',
    material: 'gold colour',
    description: 'Twisted band in gold colour. Lightweight and stackable; gold-tone finish—not real gold.',
    care: 'Gold-colour finish (not solid gold). Store separately to avoid scratching; keep dry.',
    image: 'https://images.unsplash.com/photo-1603561589922-0a7a0a82a565?w=800',
    images: ['https://images.unsplash.com/photo-1603561589922-0a7a0a82a565?w=800'],
    featured: false,
  },
  {
    id: '6',
    name: 'Crown Charm Necklace',
    slug: 'crown-charm-necklace',
    price: 249,
    category: 'necklaces',
    material: 'gold',
    description: 'Our signature crown charm on a fine gold chain. Wear your crown with pride.',
    care: 'Store in a dry place. Avoid contact with lotions and perfumes.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    ],
    featured: false,
  },
  {
    id: '7',
    name: 'Tennis Bracelet',
    slug: 'tennis-bracelet',
    price: 599,
    category: 'bracelets',
    material: 'gold colour',
    description: 'A line of sparkle in gold-colour setting. Statement piece for occasions; gold-tone finish—not real gold.',
    care: 'Gold-colour finish (not solid gold). Avoid water and chemicals; store in a soft pouch.',
    image: '/products/bracelet%203.jpeg',
    images: ['/products/bracelet%203.jpeg'],
    featured: false,
  },
  {
    id: '8',
    name: 'Hoop Earrings',
    slug: 'hoop-earrings',
    price: 129,
    category: 'earrings',
    material: 'gold',
    description: 'Classic gold hoops in a medium size. Effortlessly elegant for every day.',
    care: 'Wipe with a soft cloth. Store in a jewellery box to prevent bending.',
    image: 'https://images.unsplash.com/photo-1596944925780-e8fcf341dc5a?w=800',
    images: [
      'https://images.unsplash.com/photo-1596944925780-e8fcf341dc5a?w=800',
    ],
    featured: false,
  },
  {
    id: '9',
    name: 'Emerald Cut Ring',
    slug: 'emerald-cut-ring',
    price: 549,
    category: 'rings',
    material: 'gold',
    description: 'Emerald-cut stone in a sleek yellow gold setting. Modern and refined.',
    care: 'Handle by the band. Ultrasonic cleaning not recommended.',
    image: 'https://images.unsplash.com/photo-1603561589922-0a7a0a82a565?w=800',
    images: [
      'https://images.unsplash.com/photo-1603561589922-0a7a0a82a565?w=800',
    ],
    featured: false,
  },
  {
    id: '10',
    name: 'Layered Chain Set',
    slug: 'layered-chain-set',
    price: 319,
    category: 'necklaces',
    material: 'gold',
    description: 'Three delicate chains of varying lengths. Designed to be worn together for a curated look.',
    care: 'Store each chain separately or on a necklace stand to avoid tangling.',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800',
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800',
    ],
    featured: false,
  },
  {
    id: '11',
    name: 'Bangle Set',
    slug: 'bangle-set',
    price: 269,
    category: 'bracelets',
    material: 'gold colour',
    description: 'Three thin gold-colour bangles. Mix and match or wear as a trio; gold-tone metal—not real gold.',
    care: 'Gold-colour finish (not solid gold). Store in a soft pouch; avoid knocking against hard surfaces.',
    image: '/products/bracelet4.jpeg',
    images: ['/products/bracelet4.jpeg'],
    featured: false,
  },
  {
    id: '12',
    name: 'Stud Earrings',
    slug: 'stud-earrings',
    price: 149,
    category: 'earrings',
    material: 'silver',
    description: 'Simple sterling silver studs. A wardrobe essential that goes with everything.',
    care: 'Clean with a silver polishing cloth. Store in anti-tarnish bag.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    ],
    featured: false,
  },
]

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category) {
  if (!category) return products
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured)
}

export function getRelatedProducts(product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit)
}
