import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import AddListing from "./pages/AddListing";
import Swaps from "./pages/Swaps";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/list-item" element={<AddListing />} />
        <Route path="/swaps" element={<Swaps />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;