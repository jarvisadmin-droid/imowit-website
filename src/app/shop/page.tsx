export default function Shop() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-[#001F51] mb-4">
          Shop
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Browse our autonomous mowing equipment and accessories.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Placeholder Products */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
            <h3 className="text-xl font-semibold text-[#001F51] mb-2">iMowiT Pro Mower</h3>
            <p className="text-gray-600 mb-4">Advanced autonomous mower for residential lawns up to 1 acre.</p>
            <p className="text-2xl font-bold text-[#56C70B] mb-4">$2,499</p>
            <button className="w-full bg-[#001F51] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#001a40] transition-colors">
              Learn More
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
            <h3 className="text-xl font-semibold text-[#001F51] mb-2">iMowiT Lite Mower</h3>
            <p className="text-gray-600 mb-4">Perfect for smaller residential lawns up to 0.5 acres.</p>
            <p className="text-2xl font-bold text-[#56C70B] mb-4">$1,499</p>
            <button className="w-full bg-[#001F51] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#001a40] transition-colors">
              Learn More
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Accessory</span>
            </div>
            <h3 className="text-xl font-semibold text-[#001F51] mb-2">Charging Station</h3>
            <p className="text-gray-600 mb-4">Quick-install charging station for your autonomous mower.</p>
            <p className="text-2xl font-bold text-[#56C70B] mb-4">$299</p>
            <button className="w-full bg-[#001F51] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#001a40] transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}