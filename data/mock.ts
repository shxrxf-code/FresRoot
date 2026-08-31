import { Category, Farm, Product, Order, OrderItem, Subscription, User, QualityResult } from "./interface";

export const categories: Category[] = [
  { id: "c1", name: "Vegetables", slug: "vegetables", emoji: "🥬", productCount: 18, color: "#16a34a", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=60", desc: "Freshly harvested greens and vegetables" },
  { id: "c2", name: "Fruits", slug: "fruits", emoji: "🍎", productCount: 14, color: "#ea580c", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=60", desc: "Sun-ripened seasonal fruits, farm-selected" },
  { id: "c3", name: "Leafy Greens", slug: "leafy-greens", emoji: "🥗", productCount: 12, color: "#65a30d", image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&q=60", desc: "Crisp, tender leaves harvested at dawn" },
  { id: "c4", name: "Herbs", slug: "herbs", emoji: "🌿", productCount: 8, color: "#22c55e", image: "https://images.unsplash.com/photo-1603574670812-d24560880210?w=600&q=60", desc: "Fragrant herbs for every kitchen" },
  { id: "c5", name: "Microgreens", slug: "microgreens", emoji: "🌱", productCount: 6, color: "#4ade80", image: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&q=60", desc: "Chef-grade shoots, harvested daily" },
  { id: "c6", name: "Dates", slug: "dates", emoji: "🌴", productCount: 5, color: "#d97706", image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&q=60", desc: "Premium medjool & khalas dates" },
  { id: "c7", name: "Millets", slug: "millets", emoji: "🌾", productCount: 4, color: "#b45309", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=60", desc: "Ancient grains for everyday health" },
  { id: "c8", name: "Grains", slug: "grains", emoji: "🌾", productCount: 8, color: "#a16207", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=60", desc: "Rice, quinoa & wholesome grains" },
  { id: "c9", name: "Pulses", slug: "pulses", emoji: "🫘", productCount: 6, color: "#b45309", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600&q=60", desc: "Lentils & beans, pantry-ready" },
  { id: "c10", name: "Farm Boxes", slug: "farm-boxes", emoji: "📦", productCount: 8, color: "#14b8a6", image: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?w=600&q=60", desc: "Curated boxes for the whole week" },
  { id: "c11", name: "Organic Pantry", slug: "organic-pantry", emoji: "🥜", productCount: 10, color: "#a16207", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=60", desc: "Everything wholesome for your kitchen" },
];

export const farms: Farm[] = [
  { id: "f1", name: "Green Valley Farm", farmer: "Ahmed Al Mansouri", location: "Al Ain", city: "Al Ain", products: 24, rating: 4.9, reviews: 412, image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=60", status: "Active", farmingMethod: "Organic", certifications: ["GLOBALG.A.P.", "UAE Organic"], bio: "A family-owned organic farm in Al Ain's oases, growing over 24 varieties of vegetables with natural farming practices and sustainable drip irrigation." },
  { id: "f2", name: "Desert Bloom Farm", farmer: "Fatima Al Ameri", location: "Abu Dhabi", city: "Abu Dhabi", products: 18, rating: 4.8, reviews: 367, image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=60", status: "Active", farmingMethod: "Natural", certifications: ["UAE Organic"], bio: "Abu Dhabi's desert greenhouse pioneers — chemical-free tropical fruits and vegetables grown with treated greywater in temperature-controlled greenhouses." },
  { id: "f3", name: "Emirates Harvest Farm", farmer: "Omar Al Zaabi", location: "Al Ain", city: "Al Ain", products: 15, rating: 4.7, reviews: 298, image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=60", status: "Active", farmingMethod: "Organic", certifications: ["GLOBALG.A.P."], bio: "From heritage grains to leafy greens, Emirates Harvest cultivates traditional crops with modern hydroponic and regenerative techniques." },
  { id: "f4", name: "Pure Earth Farm", farmer: "Layla Al Noaimi", location: "Dubai", city: "Dubai", products: 12, rating: 4.6, reviews: 254, image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=60", status: "Active", farmingMethod: "Organic", certifications: ["ISO 22000", "UAE Organic"], bio: "Specialists in microgreens, herbs and salad leaves. Pure Earth brings the freshest leafy produce from Dubai's urban vertical farms." },
  { id: "f5", name: "Oasis Fresh Farm", farmer: "Khalid Al Shamsi", location: "Ras Al Khaimah", city: "Ras Al Khaimah", products: 20, rating: 4.8, reviews: 321, image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=60", status: "Active", farmingMethod: "Biodynamic", certifications: ["GLOBALG.A.P."], bio: "Rooted in Ras Al Khaimah's fertile soil, we grow premium dates, millets and grains that nourish the body and the soil they come from." },
  { id: "f6", name: "Ajman Family Farm", farmer: "Mariam Al Shehhi", location: "Ajman", city: "Ajman", products: 16, rating: 4.5, reviews: 132, image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=60", status: "Pending", farmingMethod: "Natural", certifications: ["ISO 22000"], bio: "A young Emirati collective in Ajman growing seasonal, heritage produce with traditional desert-farming wisdom and modern greenhouses." },
];

export const products: Product[] = [
  { id: "p1", name: "Organic Cherry Tomatoes", category: "Vegetables", categorySlug: "vegetables", price: 14.5, compareAtPrice: 19, unit: "250g", farm: "Green Valley Farm", farmId: "f1", rating: 4.8, reviews: 214, stockKg: 120, stock: "In Stock", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=60", images: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=60", "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&q=60", "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=600&q=60", "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "Vine-ripened cherry tomatoes bursting with sweetness, grown in Al Ain's sun-rich soil and harvested fresh daily.", badges: ["Farm Fresh", "Harvested Today", "Quality Checked"], location: "Al Ain, UAE", nutrition: [{ label: "Calories", value: "18 kcal" }, { label: "Vitamin C", value: "28%" }, { label: "Fiber", value: "1.2g" }] },
  { id: "p2", name: "Fresh Spinach", category: "Leafy Greens", categorySlug: "leafy-greens", price: 9, unit: "250g", farm: "Pure Earth Farm", farmId: "f4", rating: 4.7, reviews: 168, stockKg: 90, stock: "In Stock", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=60", images: ["https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=60", "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=60", "https://images.unsplash.com/photo-1596380003079-ac50ec0d9867?w=600&q=60", "https://images.unsplash.com/photo-1600420484776-b51afe4cf393?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "Tender, deep-green spinach leaves packed with iron, harvested the same morning they reach your door in Dubai.", badges: ["Farm Fresh", "Harvested Today", "Naturally Grown"], location: "Dubai, UAE", nutrition: [{ label: "Calories", value: "23 kcal" }, { label: "Iron", value: "15%" }, { label: "Vitamin A", value: "56%" }] },
  { id: "p3", name: "Butterhead Lettuce", category: "Leafy Greens", categorySlug: "leafy-greens", price: 12, unit: "piece", farm: "Green Valley Farm", farmId: "f1", rating: 4.9, reviews: 204, stockKg: 40, stock: "In Stock", image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=600&q=60", images: ["https://images.unsplash.com/photo-1518843875459-f738682238a6?w=600&q=60", "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&q=60", "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=600&q=60", "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "Freshly harvested butterhead lettuce grown using responsible farming practices, carefully packed for temperature-controlled UAE-wide delivery.", badges: ["Farm Fresh", "Harvested Today", "Quality Checked"], location: "Al Ain, UAE", nutrition: [{ label: "Calories", value: "15 kcal" }, { label: "Vitamin A", value: "188%" }, { label: "Folate", value: "22%" }] },
  { id: "p4", name: "Organic Cucumber", category: "Vegetables", categorySlug: "vegetables", price: 11.5, unit: "500g", farm: "Desert Bloom Farm", farmId: "f2", rating: 4.6, reviews: 143, stockKg: 140, stock: "In Stock", image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&q=60", images: ["https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&q=60", "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&q=60", "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=60", "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=60"], farmingMethod: "Natural", harvestDate: "Today", description: "Cool, hydrating cucumbers grown in Abu Dhabi's climate-controlled greenhouses — crisp, refreshing and chemical free.", badges: ["Farm Fresh", "Harvested Today"], location: "Abu Dhabi, UAE", nutrition: [{ label: "Calories", value: "15 kcal" }, { label: "Vitamin K", value: "16%" }, { label: "Water", value: "95%" }] },
  { id: "p5", name: "Broccoli", category: "Vegetables", categorySlug: "vegetables", price: 15, unit: "500g", farm: "Emirates Harvest Farm", farmId: "f3", rating: 4.6, reviews: 98, stockKg: 18, stock: "Low Stock", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&q=60", images: ["https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&q=60", "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=600&q=60", "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=600&q=60", "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "Fresh, tightly-packed broccoli florets packed with antioxidants, grown hydroponically in Al Ain and delivered UAE-wide.", badges: ["Harvested Today", "Naturally Grown"], location: "Al Ain, UAE", nutrition: [{ label: "Calories", value: "34 kcal" }, { label: "Vitamin C", value: "135%" }, { label: "Vitamin K", value: "85%" }] },
  { id: "p6", name: "Fresh Basil", category: "Herbs", categorySlug: "herbs", price: 8.5, unit: "50g", farm: "Pure Earth Farm", farmId: "f4", rating: 4.9, reviews: 132, stockKg: 60, stock: "In Stock", image: "https://images.unsplash.com/photo-1603574670812-d24560880210?w=600&q=60", images: ["https://images.unsplash.com/photo-1603574670812-d24560880210?w=600&q=60", "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=60", "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&q=60", "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "Fragrant, aromatic basil leaves from Dubai's urban farms — perfect for pasta, salads and fresh pesto.", badges: ["Farm Fresh", "Harvested Today"], location: "Dubai, UAE", nutrition: [{ label: "Calories", value: "23 kcal" }, { label: "Vitamin K", value: "98%" }, { label: "Vitamin A", value: "17%" }] },
  { id: "p7", name: "Medjool Dates", category: "Dates", categorySlug: "dates", price: 32, compareAtPrice: 40, unit: "500g", farm: "Oasis Fresh Farm", farmId: "f5", rating: 5.0, reviews: 412, stockKg: 250, stock: "In Stock", image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&q=60", images: ["https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&q=60", "https://images.unsplash.com/photo-1611241893603-3c3597046a0c?w=600&q=60", "https://images.unsplash.com/photo-1516507733174-2f08565b8326?w=600&q=60", "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60"], farmingMethod: "Biodynamic", harvestDate: "This Week", description: "Premium hand-selected Medjool dates from Ras Al Khaimah's oasis groves — plump, caramel-sweet and naturally sun-ripened.", badges: ["Quality Checked", "Naturally Grown"], location: "Ras Al Khaimah, UAE", nutrition: [{ label: "Calories", value: "277 kcal" }, { label: "Fiber", value: "7g" }, { label: "Potassium", value: "20%" }] },
  { id: "p8", name: "Ragi Millet", category: "Millets", categorySlug: "millets", price: 18, unit: "500g", farm: "Emirates Harvest Farm", farmId: "f3", rating: 4.8, reviews: 178, stockKg: 250, stock: "In Stock", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=60", images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=60", "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=60", "https://images.unsplash.com/photo-1536303006682-2ee36ba49569?w=600&q=60", "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=60"], farmingMethod: "Organic", harvestDate: "This Week", description: "Ancient finger millet, rich in calcium and iron, stone-ground to preserve nutrients. A supergrain staple for UAE kitchens.", badges: ["Quality Checked", "Naturally Grown"], location: "Al Ain, UAE", nutrition: [{ label: "Calories", value: "329 kcal" }, { label: "Calcium", value: "34%" }, { label: "Iron", value: "15%" }] },
  { id: "p9", name: "Vine Tomatoes", category: "Vegetables", categorySlug: "vegetables", price: 16.5, unit: "500g", farm: "Green Valley Farm", farmId: "f1", rating: 4.7, reviews: 189, stockKg: 110, stock: "In Stock", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&q=60", images: ["https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&q=60", "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=60", "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=600&q=60", "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "Juicy plum tomatoes still on the vine, sun-ripened in Al Ain's greenhouses and packed within hours of harvest.", badges: ["Farm Fresh", "Harvested Today"], location: "Al Ain, UAE", nutrition: [{ label: "Calories", value: "18 kcal" }, { label: "Vitamin C", value: "21%" }, { label: "Lycopene", value: "High" }] },
  { id: "p10", name: "Baby Spinach", category: "Leafy Greens", categorySlug: "leafy-greens", price: 10.5, unit: "200g", farm: "Pure Earth Farm", farmId: "f4", rating: 4.6, reviews: 121, stockKg: 70, stock: "In Stock", image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&q=60", images: ["https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&q=60", "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=60", "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=60", "https://images.unsplash.com/photo-1596380003079-ac50ec0d9867?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "Tender baby spinach leaves harvested at peak freshness for salads, smoothies and sautés.", badges: ["New Arrival", "Harvested Today"], location: "Dubai, UAE", nutrition: [{ label: "Calories", value: "23 kcal" }, { label: "Iron", value: "15%" }, { label: "Vitamin A", value: "56%" }] },
  { id: "p11", name: "Rainbow Bell Peppers", category: "Vegetables", categorySlug: "vegetables", price: 21, unit: "500g", farm: "Green Valley Farm", farmId: "f1", rating: 4.7, reviews: 156, stockKg: 15, stock: "Low Stock", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&q=60", images: ["https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&q=60", "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&q=60", "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&q=60", "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "Thick-walled, sweet bell peppers in vibrant colours — red, yellow and orange — farm-fresh and full of flavour.", badges: ["Farm Fresh", "Harvested Today"], location: "Al Ain, UAE", nutrition: [{ label: "Calories", value: "31 kcal" }, { label: "Vitamin C", value: "157%" }, { label: "Vitamin A", value: "10%" }] },
  { id: "p12", name: "Hass Avocado", category: "Fruits", categorySlug: "fruits", price: 28, compareAtPrice: 34, unit: "2 pcs", farm: "Emirates Harvest Farm", farmId: "f3", rating: 4.9, reviews: 206, stockKg: 80, stock: "In Stock", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&q=60", images: ["https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&q=60", "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=600&q=60", "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=600&q=60", "https://images.unsplash.com/photo-1600403006286-fb9c65ad1abf?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "Creamy, buttery Hass avocados, ripened to perfection and ready for toasts, salads and guacamole.", badges: ["Quality Checked", "Naturally Grown"], location: "Al Ain, UAE", nutrition: [{ label: "Calories", value: "160 kcal" }, { label: "Fiber", value: "7g" }, { label: "Healthy Fats", value: "15g" }] },
  { id: "p13", name: "Strawberries", category: "Fruits", categorySlug: "fruits", price: 24, compareAtPrice: 30, unit: "250g", farm: "Desert Bloom Farm", farmId: "f2", rating: 4.9, reviews: 142, stockKg: 8, stock: "Low Stock", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=60", images: ["https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=60", "https://images.unsplash.com/photo-1543528176-61b239494933?w=600&q=60", "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=600&q=60", "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=600&q=60"], farmingMethod: "Natural", harvestDate: "Today", description: "Sweet, juicy strawberries grown in Abu Dhabi's climate-controlled farms, picked at perfect ripeness.", badges: ["New Arrival", "Harvested Today"], location: "Abu Dhabi, UAE", nutrition: [{ label: "Calories", value: "32 kcal" }, { label: "Vitamin C", value: "97%" }, { label: "Manganese", value: "19%" }] },
  { id: "p14", name: "Rainbow Chard", category: "Leafy Greens", categorySlug: "leafy-greens", price: 14, unit: "250g", farm: "Green Valley Farm", farmId: "f1", rating: 4.6, reviews: 87, stockKg: 50, stock: "In Stock", image: "https://images.unsplash.com/photo-1467453678174-768ec283a940?w=600&q=60", images: ["https://images.unsplash.com/photo-1467453678174-768ec283a940?w=600&q=60", "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=60", "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&q=60", "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "Vivid, nutrient-dense rainbow chard with tender leafy goodness and colourful stems.", badges: ["New Arrival"], location: "Al Ain, UAE", nutrition: [{ label: "Calories", value: "19 kcal" }, { label: "Vitamin K", value: "121%" }, { label: "Vitamin A", value: "44%" }] },
  { id: "p15", name: "Organic Mint", category: "Herbs", categorySlug: "herbs", price: 7.5, unit: "100g", farm: "Pure Earth Farm", farmId: "f4", rating: 4.5, reviews: 112, stockKg: 60, stock: "In Stock", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=60", images: ["https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=60", "https://images.unsplash.com/photo-1603574670812-d24560880210?w=600&q=60", "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&q=60", "https://images.unsplash.com/photo-1600420484776-b51afe4cf393?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "Fragrant mint leaves for chutneys, mojitos, salads and traditional Arabic mint tea.", badges: ["Farm Fresh", "Harvested Today"], location: "Dubai, UAE", nutrition: [{ label: "Calories", value: "6 kcal" }, { label: "Vitamin A", value: "8%" }, { label: "Fiber", value: "0.5g" }] },
  { id: "p16", name: "Microgreens Mix", category: "Microgreens", categorySlug: "microgreens", price: 22, unit: "100g", farm: "Pure Earth Farm", farmId: "f4", rating: 4.8, reviews: 96, stockKg: 40, stock: "In Stock", image: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&q=60", images: ["https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&q=60", "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&q=60", "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=60", "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "A chef-favourite blend of pea shoots, sunflower and radish microgreens — harvested daily from Dubai's vertical farm.", badges: ["Farm Fresh", "Harvested Today", "Chef Pick"], location: "Dubai, UAE", nutrition: [{ label: "Calories", value: "29 kcal" }, { label: "Vitamin C", value: "33%" }, { label: "Antioxidants", value: "High" }] },
  { id: "p17", name: "Sunflower Shoots", category: "Microgreens", categorySlug: "microgreens", price: 19, unit: "100g", farm: "Pure Earth Farm", farmId: "f4", rating: 4.7, reviews: 74, stockKg: 35, stock: "In Stock", image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&q=60", images: ["https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&q=60", "https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&q=60", "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&q=60", "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60"], farmingMethod: "Organic", harvestDate: "Today", description: "Crunchy, nutty sunflower shoots packed with protein and chlorophyll — a gourmet addition to any salad.", badges: ["New Arrival", "Chef Pick"], location: "Dubai, UAE", nutrition: [{ label: "Calories", value: "33 kcal" }, { label: "Protein", value: "4g" }, { label: "Fiber", value: "2g" }] },
  { id: "p18", name: "White Quinoa", category: "Grains", categorySlug: "grains", price: 26, unit: "500g", farm: "Oasis Fresh Farm", farmId: "f5", rating: 4.8, reviews: 165, stockKg: 220, stock: "In Stock", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=60", images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=60", "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=60", "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=60", "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=60"], farmingMethod: "Biodynamic", harvestDate: "This Week", description: "Light, fluffy white quinoa — a complete protein, triple-washed and ready to cook in 15 minutes.", badges: ["Quality Checked"], location: "Ras Al Khaimah, UAE", nutrition: [{ label: "Calories", value: "368 kcal" }, { label: "Protein", value: "14g" }, { label: "Fiber", value: "7g" }] },
  { id: "p19", name: "Red Lentils", category: "Pulses", categorySlug: "pulses", price: 13.5, unit: "500g", farm: "Oasis Fresh Farm", farmId: "f5", rating: 4.7, reviews: 143, stockKg: 280, stock: "In Stock", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600&q=60", images: ["https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600&q=60", "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=60", "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=60", "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=60"], farmingMethod: "Biodynamic", harvestDate: "This Week", description: "Sun-dried, machine-cleaned red lentils rich in protein and earthy flavour — ready for soups and stews.", badges: ["Quality Checked"], location: "Ras Al Khaimah, UAE", nutrition: [{ label: "Calories", value: "358 kcal" }, { label: "Protein", value: "25g" }, { label: "Fiber", value: "12g" }] },
  { id: "p20", name: "Khalas Dates", category: "Dates", categorySlug: "dates", price: 26, compareAtPrice: 33, unit: "500g", farm: "Oasis Fresh Farm", farmId: "f5", rating: 4.8, reviews: 188, stockKg: 240, stock: "In Stock", image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&q=60", images: ["https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&q=60", "https://images.unsplash.com/photo-1611241893603-3c3597046a0c?w=600&q=60", "https://images.unsplash.com/photo-1516507733174-2f08565b8326?w=600&q=60", "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60"], farmingMethod: "Biodynamic", harvestDate: "This Week", description: "Golden Khalas dates, the most loved Emirati variety — soft, caramel-sweet and perfect with Arabic coffee.", badges: ["Quality Checked"], location: "Ras Al Khaimah, UAE", nutrition: [{ label: "Calories", value: "282 kcal" }, { label: "Fiber", value: "6.7g" }, { label: "Potassium", value: "16%" }] },
  { id: "p21", name: "Foxtail Millet", category: "Millets", categorySlug: "millets", price: 16, unit: "500g", farm: "Emirates Harvest Farm", farmId: "f3", rating: 4.7, reviews: 121, stockKg: 230, stock: "In Stock", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=60", images: ["https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=60", "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=60", "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=60", "https://images.unsplash.com/photo-1536303006682-2ee36ba49569?w=600&q=60"], farmingMethod: "Organic", harvestDate: "This Week", description: "Gluten-free foxtail millet, a wholesome ancient grain perfect for healthy everyday meals.", badges: ["Quality Checked"], location: "Al Ain, UAE", nutrition: [{ label: "Calories", value: "351 kcal" }, { label: "Protein", value: "12g" }, { label: "Fiber", value: "8.5g" }] },
  { id: "p22", name: "Family Farm Box", category: "Farm Boxes", categorySlug: "farm-boxes", price: 89, compareAtPrice: 110, unit: "box", farm: "Green Valley Farm", farmId: "f1", rating: 4.9, reviews: 268, stockKg: 160, stock: "In Stock", image: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?w=600&q=60", images: ["https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?w=600&q=60", "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60", "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=60", "https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&q=60"], farmingMethod: "Organic", harvestDate: "This Week", description: "FRESROOT's signature box — 8 seasonal vegetables, 4 fruits, leafy greens and herbs, curated fresh from our farms.", badges: ["Farm Fresh", "Best Value", "Quality Checked"], location: "Al Ain, UAE", nutrition: [{ label: "Contents", value: "12+ items" }, { label: "Weight", value: "8 kg" }, { label: "Box", value: "Eco-friendly" }] },
  { id: "p23", name: "Salad Starter Box", category: "Farm Boxes", categorySlug: "farm-boxes", price: 49, unit: "box", farm: "Pure Earth Farm", farmId: "f4", rating: 4.8, reviews: 187, stockKg: 120, stock: "In Stock", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60", images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60", "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&q=60", "https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&q=60", "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=60"], farmingMethod: "Organic", harvestDate: "This Week", description: "Everything you need for perfect salads all week — lettuce, baby spinach, cherry tomatoes, cucumber, microgreens and herbs.", badges: ["New Arrival", "Chef Pick"], location: "Dubai, UAE", nutrition: [{ label: "Contents", value: "6 items" }, { label: "Weight", value: "3 kg" }, { label: "Box", value: "Recyclable" }] },
  { id: "p24", name: "Oranges", category: "Fruits", categorySlug: "fruits", price: 15, unit: "1kg", farm: "Desert Bloom Farm", farmId: "f2", rating: 4.7, reviews: 165, stockKg: 150, stock: "In Stock", image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&q=60", images: ["https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&q=60", "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&q=60", "https://images.unsplash.com/photo-1547514701-42782101795e?w=600&q=60", "https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&q=60"], farmingMethod: "Natural", harvestDate: "Today", description: "Juicy, seedless oranges rich in vitamin C, freshly picked from Abu Dhabi's groves.", badges: ["Farm Fresh", "Harvested Today"], location: "Abu Dhabi, UAE", nutrition: [{ label: "Calories", value: "47 kcal" }, { label: "Vitamin C", value: "88%" }, { label: "Fiber", value: "2.4g" }] },
  { id: "p25", name: "Brown Rice", category: "Grains", categorySlug: "grains", price: 18, unit: "1kg", farm: "Emirates Harvest Farm", farmId: "f3", rating: 4.7, reviews: 152, stockKg: 300, stock: "In Stock", image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&q=60", images: ["https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&q=60", "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=60", "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=600&q=60", "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=60"], farmingMethod: "Organic", harvestDate: "This Week", description: "Whole-grain brown rice, gently milled to keep its nutty flavour and fibre-rich bran intact for everyday UAE cooking.", badges: ["Quality Checked", "Naturally Grown"], location: "Al Ain, UAE", nutrition: [{ label: "Calories", value: "370 kcal" }, { label: "Fiber", value: "3.5g" }, { label: "Manganese", value: "88%" }] },
  { id: "p26", name: "Chickpeas", category: "Pulses", categorySlug: "pulses", price: 12.5, unit: "1kg", farm: "Oasis Fresh Farm", farmId: "f5", rating: 4.8, reviews: 96, stockKg: 260, stock: "In Stock", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=60", images: ["https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=60", "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60", "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=60", "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=60"], farmingMethod: "Biodynamic", harvestDate: "This Week", description: "Plump, sun-dried chickpeas — the heart of hummus, falafel and hearty stews, cleaned and quality checked at source.", badges: ["Quality Checked"], location: "Ras Al Khaimah, UAE", nutrition: [{ label: "Calories", value: "364 kcal" }, { label: "Protein", value: "19g" }, { label: "Fiber", value: "17g" }] },
  { id: "p27", name: "Seasonal Fruit Box", category: "Fruits", categorySlug: "fruits", price: 35, compareAtPrice: 45, unit: "box", farm: "Desert Bloom Farm", farmId: "f2", rating: 4.9, reviews: 231, stockKg: 90, stock: "In Stock", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=60", images: ["https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=60", "https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&q=60", "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=60", "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60"], farmingMethod: "Natural", harvestDate: "Today", description: "A rotating selection of the sweetest in-season fruits — oranges, strawberries, avocados and more, picked this morning.", badges: ["New Arrival", "Chef Pick"], location: "Abu Dhabi, UAE", nutrition: [{ label: "Contents", value: "6-8 fruits" }, { label: "Weight", value: "2.5 kg" }, { label: "Box", value: "Recyclable" }] },
];

export const users: User[] = [
  { id: "u1", name: "Amina Al Mansour", email: "customer@fresroot.com", phone: "+971 50 112 2233", role: "CUSTOMER", avatar: "https://i.pravatar.cc/150?img=47", greenPoints: 560, createdAt: "2024-01-15", address: "Villa 12, Al Barari, Dubai" },
  { id: "u2", name: "Admin User", email: "admin@fresroot.com", phone: "+971 4 000 0001", role: "ADMIN", avatar: "https://i.pravatar.cc/150?img=12", greenPoints: 0, createdAt: "2023-12-01", address: "Fresroot HQ, Dubai Internet City, Dubai" },
  { id: "u3", name: "Ali Al Rashedi", email: "ali@example.com", phone: "+971 55 445 5667", role: "CUSTOMER", avatar: "https://i.pravatar.cc/150?img=32", greenPoints: 320, createdAt: "2024-02-10", address: "Al Zahiyah, Abu Dhabi" },
  { id: "u4", name: "Sara Al Nuaimi", email: "sara@example.com", phone: "+971 52 889 9900", role: "CUSTOMER", avatar: "https://i.pravatar.cc/150?img=44", greenPoints: 180, createdAt: "2024-03-22", address: "Al Khan, Sharjah" },
  { id: "u5", name: "Omar Al Shamsi", email: "omar@example.com", phone: "+971 56 223 3344", role: "CUSTOMER", avatar: "https://i.pravatar.cc/150?img=59", greenPoints: 780, createdAt: "2024-01-05", address: "Al Jimi, Al Ain" },
  { id: "u6", name: "Ahmed Al Mansouri", email: "farmer@fresroot.com", phone: "+971 50 778 8990", role: "FARMER", avatar: "https://i.pravatar.cc/150?img=68", greenPoints: 0, createdAt: "2023-12-05", address: "Farm Office, Green Valley, Al Ain", farmId: "f1" },
];

export const subscriptionPlans = [
  { id: "s1", name: "Fresh Weekly Box", price: 129, per: "week", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60", items: ["6 Vegetables", "4 Fruits", "2 Leafy Greens", "1 Herbs bunch"], deliveryDay: "Monday", desc: "A balanced box of farm-fresh organic produce delivered to your door every single week.", save: "Save 15%" },
  { id: "s2", name: "Family Farm Box", price: 249, per: "week", img: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?w=600&q=60", items: ["10 Vegetables", "6 Fruits", "4 Leafy Greens", "3 Herbs", "8 Free-Range Eggs"], deliveryDay: "Thursday", desc: "The complete farm box for the whole family, delivered every week.", save: "Save 20%" },
  { id: "s3", name: "Organic Fruit Box", price: 119, per: "week", img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=60", items: ["8 Seasonal Fruits", "2 Tropical Fruits", "1 Fruit of the week"], deliveryDay: "Wednesday", desc: "A rainbow of seasonal fruits curated by our farmers.", save: "Save 10%" },
  { id: "s4", name: "Green Essentials", price: 179, per: "month", img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=60", items: ["Ragi", "Foxtail", "Brown Rice", "Quinoa", "Red Lentils", "Chickpeas"], deliveryDay: "1st of month", desc: "A monthly selection of heritage grains and pulses for wholesome everyday cooking.", save: "Save 12%" },
];

export const subscriptions: Subscription[] = [
  { id: "sub1", customerId: "u1", customer: "Amina Al Mansour", plan: "Fresh Weekly Box", frequency: "Weekly", price: 129, nextDelivery: "Tomorrow", status: "Active", deliveryDay: "Monday", items: ["6 Vegetables", "4 Fruits", "2 Leafy Greens", "1 Herbs bunch"] },
  { id: "sub2", customerId: "u3", customer: "Ali Al Rashedi", plan: "Family Farm Box", frequency: "Weekly", price: 249, nextDelivery: "Thursday", status: "Active", deliveryDay: "Thursday", items: ["10 Vegetables", "6 Fruits", "8 Free-Range Eggs"] },
  { id: "sub3", customerId: "u5", customer: "Omar Al Shamsi", plan: "Green Essentials", frequency: "Monthly", price: 179, nextDelivery: "1st of month", status: "Active", deliveryDay: "1st of month", items: ["Ragi", "Foxtail", "Brown Rice", "Quinoa"] },
  { id: "sub4", customerId: "u4", customer: "Sara Al Nuaimi", plan: "Organic Fruit Box", frequency: "Weekly", price: 119, nextDelivery: "Paused", status: "Paused", deliveryDay: "Wednesday", items: ["8 Seasonal Fruits", "2 Tropical Fruits"] },
];

function mkOrderItem(p: Product, qty: number): OrderItem {
  return { productId: p.id, name: p.name, price: p.price, unit: p.unit, qty, image: p.image, farm: p.farm };
}

export const orders: Order[] = [
  { id: "FR10001", customerId: "u1", customer: "Amina Al Mansour", items: [mkOrderItem(products[0], 2), mkOrderItem(products[6], 1), mkOrderItem(products[4], 1)], subtotal: 76, deliveryFee: 0, discount: 0, total: 76, paymentStatus: "Paid", orderStatus: "Out for Delivery", deliveryAddress: "Villa 12, Al Barari, Dubai", deliverySlot: "Tomorrow, 8 AM - 12 PM", createdAt: "Jun 20, 2024", agent: "Hassan" },
  { id: "FR10002", customerId: "u3", customer: "Ali Al Rashedi", items: [mkOrderItem(products[1], 2), mkOrderItem(products[15], 1)], subtotal: 40, deliveryFee: 0, discount: 0, total: 40, paymentStatus: "Paid", orderStatus: "Delivered", deliveryAddress: "Al Zahiyah, Abu Dhabi", deliverySlot: "Tomorrow, 12 PM - 4 PM", createdAt: "Jun 20, 2024", agent: "Maryam" },
  { id: "FR10003", customerId: "u4", customer: "Sara Al Nuaimi", items: [mkOrderItem(products[18], 2), mkOrderItem(products[17], 1)], subtotal: 53, deliveryFee: 0, discount: 0, total: 53, paymentStatus: "Paid", orderStatus: "Preparing", deliveryAddress: "Al Khan, Sharjah", deliverySlot: "Tomorrow, 4 PM - 8 PM", createdAt: "Jun 19, 2024", agent: "Hassan" },
  { id: "FR10004", customerId: "u5", customer: "Omar Al Shamsi", items: [mkOrderItem(products[21], 2)], subtotal: 178, deliveryFee: 0, discount: 18, total: 160, paymentStatus: "Paid", orderStatus: "Delivered", deliveryAddress: "Al Jimi, Al Ain", deliverySlot: "Tomorrow, 8 AM - 12 PM", createdAt: "Jun 19, 2024", agent: "Noor" },
  { id: "FR10005", customerId: "u1", customer: "Amina Al Mansour", items: [mkOrderItem(products[5], 2), mkOrderItem(products[14], 1)], subtotal: 24.5, deliveryFee: 10, discount: 0, total: 34.5, paymentStatus: "Paid", orderStatus: "Delivered", deliveryAddress: "Villa 12, Al Barari, Dubai", deliverySlot: "Today, 4 PM - 8 PM", createdAt: "Jun 18, 2024", agent: "Maryam" },
  { id: "FR10006", customerId: "u3", customer: "Ali Al Rashedi", items: [mkOrderItem(products[10], 1), mkOrderItem(products[23], 1)], subtotal: 36, deliveryFee: 0, discount: 0, total: 36, paymentStatus: "Pending", orderStatus: "Confirmed", deliveryAddress: "Al Zahiyah, Abu Dhabi", deliverySlot: "Tomorrow, 8 AM - 12 PM", createdAt: "Jun 18, 2024", agent: "Noor" },
  { id: "FR10007", customerId: "u4", customer: "Sara Al Nuaimi", items: [mkOrderItem(products[19], 1)], subtotal: 26, deliveryFee: 0, discount: 0, total: 26, paymentStatus: "Paid", orderStatus: "Cancelled", deliveryAddress: "Al Khan, Sharjah", deliverySlot: "Today, 12 PM - 4 PM", createdAt: "Jun 17, 2024", agent: "-" },
  { id: "FR10008", customerId: "u5", customer: "Omar Al Shamsi", items: [mkOrderItem(products[7], 2), mkOrderItem(products[20], 2)], subtotal: 68, deliveryFee: 0, discount: 0, total: 68, paymentStatus: "Paid", orderStatus: "Delivered", deliveryAddress: "Al Jimi, Al Ain", deliverySlot: "Today, 8 AM - 12 PM", createdAt: "Jun 17, 2024", agent: "Hassan" },
];

export const stats = {
  totalOrders: 1248,
  totalOrdersDelta: 18.6,
  totalCustomers: 982,
  totalCustomersDelta: 14.3,
  totalRevenue: 248600,
  totalRevenueDelta: 23.5,
  activeSubscriptions: 356,
  activeSubscriptionsDelta: 12.6,
  pendingDeliveries: 126,
  lowStockItems: 23,
};

export const salesChart = [
  { day: "Jun 13", revenue: 32000, orders: 148 },
  { day: "Jun 14", revenue: 41000, orders: 175 },
  { day: "Jun 15", revenue: 38000, orders: 162 },
  { day: "Jun 16", revenue: 52000, orders: 201 },
  { day: "Jun 17", revenue: 46000, orders: 188 },
  { day: "Jun 18", revenue: 61000, orders: 232 },
  { day: "Jun 19", revenue: 54000, orders: 210 },
];

export const orderDonut = [
  { name: "Delivered", value: 842, color: "#22C55E" },
  { name: "Preparing", value: 256, color: "#F59E0B" },
  { name: "Cancelled", value: 58, color: "#EF4444" },
  { name: "Returned", value: 92, color: "#9CA3AF" },
];

export const topProducts = [
  { product: "Cherry Tomatoes", sold: "320 kg", revenue: 4640 },
  { product: "Baby Spinach", sold: "280 kg", revenue: 2520 },
  { product: "Medjool Dates", sold: "250 kg", revenue: 8000 },
  { product: "Butterhead Lettuce", sold: "210 kg", revenue: 2520 },
  { product: "Strawberries", sold: "180 kg", revenue: 4320 },
];

export const inventory = products.map((p) => ({
  id: p.id, name: p.name, category: p.category, stockKg: p.stockKg, unit: p.unit, farm: p.farm, status: p.stock, lastUpdated: "Today 9:00 AM",
}));

export const customers = users.filter((u) => u.role === "CUSTOMER").map((u, i) => ({
  id: u.id, name: u.name, email: u.email, phone: u.phone, orders: 14 - i * 2, totalSpent: 4200 - i * 500, subscription: i === 0 ? "Weekly Veggie Box" : i === 2 ? "Grain & Millet Box" : i === 3 ? "Fruit Box" : "-", status: "Active", joined: u.createdAt, greenPoints: u.greenPoints,
}));

export const deliveries = [
  { id: "D-1021", order: "FR10001", customer: "Amina Al Mansour", agent: "Hassan", location: "Dubai", slot: "8 AM - 12 PM", status: "Out for Delivery" },
  { id: "D-1020", order: "FR10002", customer: "Ali Al Rashedi", agent: "Maryam", location: "Abu Dhabi", slot: "12 PM - 4 PM", status: "Delivered" },
  { id: "D-1019", order: "FR10003", customer: "Sara Al Nuaimi", agent: "Hassan", location: "Sharjah", slot: "4 PM - 8 PM", status: "Pending" },
  { id: "D-1018", order: "FR10006", customer: "Ali Al Rashedi", agent: "Noor", location: "Abu Dhabi", slot: "8 AM - 12 PM", status: "Pending" },
  { id: "D-1017", order: "FR10004", customer: "Omar Al Shamsi", agent: "Noor", location: "Al Ain", slot: "8 AM - 12 PM", status: "Delivered" },
  { id: "D-1016", order: "FR10008", customer: "Omar Al Shamsi", agent: "Hassan", location: "Al Ain", slot: "8 AM - 12 PM", status: "Delivered" },
];

export const promotions = [
  { id: "pr1", code: "GREEN10", description: "10% OFF", minOrder: 150, type: "Percentage", value: 10, status: "Active", uses: 1240, expiry: "Aug 30, 2024" },
  { id: "pr2", code: "FREESHIP", description: "Free Delivery", minOrder: 150, type: "Free delivery", value: 0, status: "Active", uses: 890, expiry: "Sep 15, 2024" },
  { id: "pr3", code: "WELCOME20", description: "AED 15 OFF First Order", minOrder: 80, type: "Fixed", value: 15, status: "Active", uses: 2100, expiry: "Oct 01, 2024" },
  { id: "pr4", code: "FARM15", description: "AED 15 OFF", minOrder: 100, type: "Fixed", value: 15, status: "Inactive", uses: 430, expiry: "Aug 30, 2024" },
];

export const offers = [
  { id: "o1", code: "WELCOME20", title: "20% Off Your First Order", desc: "New to FRESROOT? Enjoy 20% off storewide on your first order.", min: "Min. order AED 100 · Max discount AED 50", tone: "primary", icon: "🎉" },
  { id: "o2", code: "FRESH50", title: "AED 50 Off Farm Boxes", desc: "Big savings on Family Farm Box and all subscription boxes.", min: "Min. order AED 250", tone: "sand", icon: "📦" },
  { id: "o3", code: "FREESHIP", title: "Free Delivery", desc: "Skip the delivery fee on any order across all 7 Emirates.", min: "Min. order AED 200", tone: "green", icon: "🚚" },
  { id: "o4", code: "GREEN10", title: "10% Off Everything", desc: "Weekly green deal — flat 10% off your whole basket.", min: "Min. order AED 150", tone: "white", icon: "🌱" },
  { id: "o5", code: "FARM15", title: "AED 15 Off Farm Fresh", desc: "A little thank-you from our farms for your first order.", min: "Min. order AED 100", tone: "primary", icon: "🌿" },
];

export const deliverySlots = ["8 AM – 11 AM", "11 AM – 2 PM", "2 PM – 5 PM", "5 PM – 8 PM", "8 PM – 11 PM"];

export const popularSearches = ["Cherry Tomatoes", "Butterhead Lettuce", "Medjool Dates", "Strawberries", "Baby Spinach", "Hass Avocado"];

export const deliveryAreas = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Al Ain", "Ras Al Khaimah"];

export const journeyStages = [
  { step: "Farm", desc: "Grown by trusted, farm-verified UAE growers.", icon: "🌿" },
  { step: "Harvest", desc: "Picked at peak ripeness while still cool.", icon: "🕖" },
  { step: "Quality Check", desc: "Weight, appearance & temperature verified.", icon: "🧪" },
  { step: "Packed", desc: "Sealed in eco-friendly, temp-controlled pack.", icon: "📦" },
  { step: "Delivery", desc: "Refrigerated van to your door, never delayed.", icon: "🚚" },
  { step: "Customer", desc: "Fresh, traceable produce — ready to enjoy.", icon: "🏠" },
];

export function getProductJourney(p: Product) {
  const times = p.harvestDate === "Today" ? ["7:30 AM", "9:15 AM", "10:30 AM", "2:00 PM", "5–8 PM", "5:30 PM"] : ["Yesterday", "6:00 AM", "8:45 AM", "10:00 AM", "Tomorrow", "Tomorrow"];
  return journeyStages.map((s, i) => ({ ...s, time: times[i] }));
}

export const qualityChecks = ["Freshness", "Appearance", "Weight", "Packaging", "Temperature"];

export const userReviews = [
  { name: "Priya S.", rating: 5, date: "2 days ago", text: "Absolutely fresh and delicious! You can taste the difference from market produce.", location: "Dubai" },
  { name: "Mohammed R.", rating: 4, date: "1 week ago", text: "Great quality and the packing keeps everything crisp. Highly recommend.", location: "Abu Dhabi" },
  { name: "Fatima K.", rating: 5, date: "2 weeks ago", text: "The farm details on the page make all the difference. Trustworthy and fresh.", location: "Sharjah" },
  { name: "Daniel M.", rating: 4, date: "3 weeks ago", text: "Arrived exactly in the delivery slot, produce was cold and crisp. Will order again.", location: "Dubai" },
];

export const notifications = [
  { id: "n1", type: "Stock", title: "12 products are running low on stock.", time: "2 hours ago", unread: true },
  { id: "n2", type: "Order", title: "New order #FR10009 received.", time: "5 hours ago", unread: true },
  { id: "n3", type: "Delivery", title: "Delivery #FR10001 completed.", time: "Yesterday", unread: true },
  { id: "n4", type: "Payment", title: "Subscription payment received.", time: "Yesterday", unread: false },
  { id: "n5", type: "Farm", title: "New farm application submitted.", time: "2 days ago", unread: false },
];

export const deliveriesSummary = { total: 146, completed: 112, inProgress: 9, pending: 22, failed: 3 };

export const farmDeliverySlots = [
  { id: "ds1", slot: "8 AM – 11 AM", capacity: 30, booked: 24, status: "Open" },
  { id: "ds2", slot: "11 AM – 2 PM", capacity: 25, booked: 18, status: "Open" },
  { id: "ds3", slot: "2 PM – 5 PM", capacity: 25, booked: 25, status: "Full" },
  { id: "ds4", slot: "5 PM – 8 PM", capacity: 30, booked: 12, status: "Open" },
  { id: "ds5", slot: "8 PM – 11 PM", capacity: 20, booked: 6, status: "Open" },
];

export const farmOrders = orders
  .filter((o) => o.items.some((it) => it.farm === "Green Valley Farm"))
  .map((o) => ({ ...o, items: o.items.filter((it) => it.farm === "Green Valley Farm") }));

export const farmStats = {
  products: { total: 24, lowStock: 3, listed: 24 },
  revenueThisMonth: 12480,
  revenueDelta: 14.5,
  ordersThisMonth: 312,
  ordersDelta: 9.2,
  pendingVerifications: 5,
  verifiedBatches: 128,
  customerRating: 4.9,
  activeSlots: 3,
};

export const farmSalesChart = [
  { day: "Jun 13", revenue: 1480, orders: 38 },
  { day: "Jun 14", revenue: 1760, orders: 44 },
  { day: "Jun 15", revenue: 1620, orders: 41 },
  { day: "Jun 16", revenue: 2100, orders: 52 },
  { day: "Jun 17", revenue: 1950, orders: 48 },
  { day: "Jun 18", revenue: 2420, orders: 60 },
  { day: "Jun 19", revenue: 2150, orders: 54 },
];

export function defaultQualityResults(): QualityResult[] {
  return products
    .filter((p) => p.farmId === "f1")
    .map((p, i) => ({
      batch: `Q-${2200 + i}`,
      productId: p.id,
      product: p.name,
      farmer: "Ahmed Al Mansouri",
      date: "Today, 9:30 AM",
      results: qualityChecks.map((c, idx) => ({
        check: c,
        score: 100 - idx * 5 + (i % 3),
        status: "Pass" as const,
      })),
      status: ("Verified" as const),
      freshnessIndex: Math.min(99, 98 - i),
    }));
}