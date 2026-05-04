import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Users, Package, RefreshCcw, AlertTriangle } from "lucide-react";

function Admin() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    successfulSwaps: 0,
  });

  const [users, setUsers] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState("users");

  const token = localStorage.getItem("token");

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const [statsRes, usersRes, swapsRes, reportRes] = await Promise.all([
          axios.get("http://localhost:8000/api/admin/stats", config),
          axios.get("http://localhost:8000/api/admin/users", config),
          axios.get("http://localhost:8000/api/admin/swaps", config),
          axios.get("http://localhost:8000/api/admin/reports", config)
        ]);

        setStats(statsRes.data);
        setUsers(usersRes.data);
        setSwaps(swapsRes.data);
        setReport(reportRes.data);
      } catch (err) {
        console.error("Admin fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="pt-24 px-4 sm:px-6 md:px-10 bg-gray-50 min-h-screen pb-20">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <Users className="text-green-600 mb-2" />
            <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
            <p className="text-gray-500 text-sm">Total Users</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <Package className="text-green-600 mb-2" />
            <h2 className="text-2xl font-bold">{stats.totalListings}</h2>
            <p className="text-gray-500 text-sm">Active Listings</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <RefreshCcw className="text-green-600 mb-2" />
            <h2 className="text-2xl font-bold">{stats.successfulSwaps}</h2>
            <p className="text-gray-500 text-sm">Successful Swaps</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <AlertTriangle className="text-red-500 mb-2" />
            <h2 className="text-2xl font-bold">{report?.summary?.totalSwaps || 0}</h2>
            <p className="text-gray-500 text-sm">Total Requests</p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-6 border-b">
          {["users", "swaps", "reports"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 text-sm font-medium transition ${
                activeTab === tab 
                  ? "border-b-2 border-green-600 text-green-600" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {activeTab === "users" && (
            <>
              <div className="grid grid-cols-5 p-4 border-b text-gray-500 text-sm font-medium bg-gray-50">
                <span>User</span>
                <span>Location</span>
                <span>Listings</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              {users.map((user) => (
                <div key={user._id} className="grid grid-cols-5 p-4 border-b items-center hover:bg-gray-50 transition">
                  <span>{user.name}</span>
                  <span className="text-gray-500">{user.location}</span>
                  <span>{user.listings}</span>
                  <span><span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Active</span></span>
                  <span className="text-gray-400 cursor-pointer hover:text-red-500">🚫</span>
                </div>
              ))}
            </>
          )}

          {activeTab === "swaps" && (
            <>
              <div className="grid grid-cols-5 p-4 border-b text-gray-500 text-sm font-medium bg-gray-50">
                <span>Requester</span>
                <span>Owner</span>
                <span>Items</span>
                <span>Status</span>
                <span>Date</span>
              </div>
              {swaps.map((swap) => (
                <div key={swap._id} className="grid grid-cols-5 p-4 border-b items-center hover:bg-gray-50 transition">
                  <span>{swap.requester?.name}</span>
                  <span>{swap.owner?.name}</span>
                  <span className="text-xs truncate">
                    {swap.offeredProduct?.name} ↔️ {swap.requestedProduct?.name}
                  </span>
                  <span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      swap.status === 'accepted' ? 'bg-green-100 text-green-600' : 
                      swap.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {swap.status}
                    </span>
                  </span>
                  <span className="text-gray-400 text-xs">{new Date(swap.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </>
          )}

          {activeTab === "reports" && report && (
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Platform Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Total Swaps</span>
                      <span className="font-bold">{report.summary.totalSwaps}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Successful Swaps</span>
                      <span className="font-bold">{report.summary.successfulSwaps}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Conversion Rate</span>
                      <span className="font-bold text-green-600">{report.summary.conversionRate}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Category Breakdown</h3>
                  <div className="space-y-3">
                    {report.categories.map(cat => (
                      <div key={cat._id} className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">{cat._id || 'Uncategorized'}</span>
                        <span className="font-bold">{cat.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;