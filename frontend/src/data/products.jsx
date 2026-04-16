import img1 from "../assets/sample_item_1.jpg";

const products = [
  {
    id: 1,
    name: "Denim Jacket",
    brand: "Levi's",
    size: "M",
    price: 50,
    location: "New York, NY",
    condition: "Good",
    image: img1,
    recommended: true,
    category: "jackets"
  },
  {
    id: 2,
    name: "Sweater",
    brand: "H&M",
    size: "L",
    price: 30,
    location: "Chicago",
    condition: "Excellent",
    image: img1,
    recommended: false,
    category: "sweaters"
  },
  {
    id: 3,
    name: "Shoes",
    brand: "Nike",
    size: "9",
    price: 70,
    location: "LA",
    condition: "New",
    image: img1,
    recommended: true,
    category: "shoes"
  }
];

export default products;