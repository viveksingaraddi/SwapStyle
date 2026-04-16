function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-16">

      {/* MAIN GRID */}
      <div className="container mx-auto px-4 md:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-3">
            SwapStyle
          </h2>
          <p className="text-sm leading-relaxed">
            Discover a smarter way to refresh your wardrobe. Swap clothes,
            reduce waste, and connect with people near you.
          </p>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-600 cursor-pointer">About Us</li>
            <li className="hover:text-green-600 cursor-pointer">Careers</li>
            <li className="hover:text-green-600 cursor-pointer">Blog</li>
            <li className="hover:text-green-600 cursor-pointer">Press</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-600 cursor-pointer">Help Center</li>
            <li className="hover:text-green-600 cursor-pointer">Safety</li>
            <li className="hover:text-green-600 cursor-pointer">Terms of Service</li>
            <li className="hover:text-green-600 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm mb-3">
            Get updates on new items and features.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 text-white px-4 text-sm rounded-r-md hover:bg-green-500 transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-300"></div>

      {/* BOTTOM BAR */}
      <div className="container mx-auto px-4 md:px-10 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">

        <p>© 2026 SwapStyle. All rights reserved.</p>

        <div className="flex gap-4">
          <span className="hover:text-green-600 cursor-pointer">Privacy</span>
          <span className="hover:text-green-600 cursor-pointer">Terms</span>
          <span className="hover:text-green-600 cursor-pointer">Cookies</span>
        </div>

      </div>

    </footer>
  );
}

export default Footer;