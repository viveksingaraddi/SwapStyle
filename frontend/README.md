# 🛍️ SwapStyle – Sustainable Clothing Swap Platform

SwapStyle is a modern web application that allows users to list, browse, and swap clothing items locally — promoting sustainable fashion and reducing waste.

---

## 🚀 Features

### 🧾 Core Features

- Browse clothing listings by category
- Add new listings with images
- View detailed product pages
- Category-based filtering
- Recommended products section
- Similar products (internal linking)

### 📸 Listing Features

- Image upload (local preview)
- Form validation
- Category & size selection
- Condition tagging (New / Good / Excellent)

### 🔄 Swap System (UI Ready)

- Swap request UI (Pending / Accepted / Rejected)
- Clean OLX / Flipkart style design

### 💾 Data Handling

- Static products (from local data)
- Dynamic products (stored in localStorage)
- Merged product system (static + user-added)

---

## 🛠️ Tech Stack

### Frontend

- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🔀 React Router DOM
- 🎯 Lucide Icons

### State & Storage

- React Hooks (useState, useEffect)
- Browser localStorage (temporary DB)

---

## 📁 Project Structure

frontend/
│
├── src/
│ ├── assets/ # Images
│ ├── components/ # Reusable UI components
│ │ ├── Navbar.jsx
│ │ ├── ItemCard.jsx
│ │ ├── Footer.jsx
│ │
│ ├── data/
│ │ └── products.jsx # Static products
│ │
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── AddListing.jsx
│ │ ├── ProductPage.jsx
│ │
│ ├── App.jsx
│ └── main.jsx

---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/swapstyle.git
cd swapstyle
```

### 2. Install dependencies

npm install

### 3. Run the app

npm run dev

### 4. Open in browser

http://localhost:5173
