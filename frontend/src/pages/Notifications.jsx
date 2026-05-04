import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Bell, Check, MessageSquare, Repeat } from "lucide-react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchNotifications();
  }, [token]);

  const markAllRead = async () => {
    try {
      await axios.put("http://localhost:8000/api/notifications/read-all", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "swap_request": return <Repeat className="text-blue-500" size={20} />;
      case "swap_accepted": return <Check className="text-green-500" size={20} />;
      case "swap_rejected": return <Check className="text-red-500" size={20} />;
      case "message": return <MessageSquare className="text-purple-500" size={20} />;
      default: return <Bell size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Bell className="text-green-600" /> Notifications
          </h1>
          {notifications.some(n => !n.isRead) && (
            <button 
              onClick={markAllRead}
              className="text-sm font-medium text-green-600 hover:text-green-700 underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-white rounded-xl animate-pulse border border-gray-100"></div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Bell size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-500">No notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <Link
                key={notif._id}
                to={notif.link || "#"}
                className={`flex items-center gap-4 p-4 rounded-xl border transition shadow-sm ${
                  notif.isRead ? "bg-white border-gray-100" : "bg-green-50/50 border-green-200"
                } hover:shadow-md`}
              >
                <div className={`p-3 rounded-full ${notif.isRead ? "bg-gray-50" : "bg-white"} shadow-sm`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm md:text-base">
                    <span className="font-bold">{notif.sender?.name}</span> {notif.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
                {!notif.isRead && (
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
