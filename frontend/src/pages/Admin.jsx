import Navbar from "../components/Navbar";
import { Users, Package, RefreshCcw, AlertTriangle } from "lucide-react";

function Admin() {
  const users = [
    { name: "Sarah M.", location: "New York, NY", listings: 3 },
    { name: "Alex K.", location: "New York, NY", listings: 5 },
    { name: "Jordan L.", location: "New York, NY", listings: 7 },
    { name: "Emma R.", location: "New York, NY", listings: 9 },
  ];

  return (
    <div>
      <Navbar />

      <div className="pt-24 px-4 sm:px-6 md:px-10 bg-gray-50 min-h-screen">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <Users className="text-green-600 mb-2" />
            <h2 className="text-2xl font-bold">12,483</h2>
            <p className="text-gray-500 text-sm">Total Users</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <Package className="text-green-600 mb-2" />
            <h2 className="text-2xl font-bold">34,210</h2>
            <p className="text-gray-500 text-sm">Active Listings</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <RefreshCcw className="text-green-600 mb-2" />
            <h2 className="text-2xl font-bold">10,847</h2>
            <p className="text-gray-500 text-sm">Successful Swaps</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <AlertTriangle className="text-red-500 mb-2" />
            <h2 className="text-2xl font-bold">23</h2>
            <p className="text-gray-500 text-sm">Reports</p>
          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-5 p-4 border-b text-gray-500 text-sm font-medium">
            <span>User</span>
            <span>Location</span>
            <span>Listings</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {/* ROWS */}
          {users.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-5 p-4 border-b items-center"
            >
              <span>{user.name}</span>
              <span className="text-gray-500">{user.location}</span>
              <span>{user.listings}</span>

              <span>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  Active
                </span>
              </span>

              <span className="text-gray-400 cursor-pointer">
                🚫
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Admin;