import img1 from "../assets/sample_item_1.jpg";
import img2 from "../assets/sample-item-2.jpg";
import img3 from "../assets/sample-item-3.jpg";
import img4 from "../assets/sample-item-4.jpg";


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
    image: img2,
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
    image: img3,
    recommended: true,
    category: "shoes"
  },
  {
    id: 4,
    name: "Shoes",
    brand: "Nike",
    size: "9",
    price: 70,
    location: "LA",
    condition: "New",
    image: img4,
    recommended: true,
    category: "shoes"
  }
];

export default products;