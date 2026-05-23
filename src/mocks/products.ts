import type { Product } from '@/reducers/ProductSlice';

const categories = ['Electronics', 'Home & Lifestyle', 'Medicine', 'Sports & Outdoor'];
const brands = ['Samsung', 'Apple', 'Huawei', 'Poco', 'Lenovo'];
const features = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory'];
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generate(count = 30): Product[] {
  const list: Product[] = [];
  for (let i = 0; i < count; i++) {
    const price = Math.round(50 + Math.random() * 950);
    const discount = Math.random() < 0.25 ? Math.round(Math.random() * 40) + 10 : undefined;
    const oldPrice = discount ? Math.round(price * (1 + discount / 100)) : undefined;
    const rating = Math.round(Math.random() * 5 * 10) / 10;
    list.push({
      id: `prod-${i}`,
      title: `${random(brands)} ${random(['Smartphone', 'Laptop', 'Headphones', 'Camera'])} ${i}`,
      category: random(categories),
      brand: random(brands),
      features: [random(features), random(features)],
      price,
      oldPrice,
      rating,
      reviews: Math.floor(Math.random() * 500),
      condition: random(['refurbished', 'new', 'old']) as any,
      colors: [random(colors), random(colors)],
      image: `https://picsum.photos/seed/${i}/400/400`,
      isNew: Math.random() < 0.15,
      discount,
    });
  }
  return list;
}

const mockProducts = generate();
export default mockProducts;
