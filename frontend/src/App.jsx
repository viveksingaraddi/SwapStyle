import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import AddListing from "./pages/AddListing";
import Swaps from "./pages/Swaps";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProfile from "./pages/EditProfile";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
  path="/"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>

<Route
  path="/product/:id"
  element={
    <ProtectedRoute>
      <ProductPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/list-item"
  element={
    <ProtectedRoute>
      <AddListing />
    </ProtectedRoute>
  }
/>

<Route
  path="/swaps"
  element={
    <ProtectedRoute>
      <Swaps />
    </ProtectedRoute>
  }
/>

<Route
  path="/messages"
  element={
    <ProtectedRoute>
      <Messages />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/list-item" element={<AddListing />} />
        <Route path="/swaps" element={<Swaps />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

