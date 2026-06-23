import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#001F51] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Future of <span className="text-[#56C70B]">Lawn Care</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Autonomous lawn mowing technology that gives you your weekends back.
            Smart, efficient, and eco-friendly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inquire"
              className="bg-[#56C70B] text-[#001F51] px-8 py-3 rounded-lg font-semibold hover:bg-[#4ab309] transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/technology"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#001F51] transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#001F51] mb-12">
            Why Choose iMowiT?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg">
              <div className="w-16 h-16 bg-[#001F51] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#56C70B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#001F51] mb-3">Save Time</h3>
              <p className="text-gray-600">
                No more pushing a mower in the heat. Let autonomous mowers handle your lawn while you enjoy your free time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg">
              <div className="w-16 h-16 bg-[#001F51] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#56C70B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#001F51] mb-3">Eco-Friendly</h3>
              <p className="text-gray-600">
                Electric autonomous mowers produce zero emissions and operate quietly compared to traditional mowers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg">
              <div className="w-16 h-16 bg-[#001F51] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#56C70B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#001F51] mb-3">Smart Technology</h3>
              <p className="text-gray-600">
                GPS-guided mowing with smart scheduling and app control for a perfectly maintained lawn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#001F51] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Lawn Care?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join the future of autonomous mowing today.
          </p>
          <Link
            href="/inquire"
            className="inline-block bg-[#56C70B] text-[#001F51] px-8 py-3 rounded-lg font-semibold hover:bg-[#4ab309] transition-colors"
          >
            Inquire Now
          </Link>
        </div>
      </section>
    </div>
  )
}