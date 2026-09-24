import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-white">
        {/* Background Image */}
        <Image
          src="/hero-background.png"
          alt="iMowiT Hero"
          fill
          className="object-cover object-bottom"
          priority
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Tag Pill */}
            <div className="flex justify-start mb-4">
              <span className="inline-flex items-center gap-1 bg-[#56C70B] text-white px-3 py-1 rounded-full text-xs font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Robotic mowing made effortless
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-left mb-3 max-w-2xl leading-tight drop-shadow-lg">
              A perfectly cut lawn, without lifting a finger.
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-white/90 text-left mb-6 max-w-xl leading-relaxed drop-shadow-lg">
              iMowiT installs a fully autonomous robotic mower for your yard — it trims a little every day, charges itself, and keeps your lawn flawless all season. No gas, no noise, no weekends lost to mowing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-start mb-8 max-w-2xl">
              <Link
                href="/inquire"
                className="bg-[#56C70B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#43a047] transition-colors text-sm text-center flex-1"
              >
                Get a quote
              </Link>
              <Link
                href="/plans"
                className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#001F51] transition-colors text-sm text-center flex-1"
              >
                Shop Plans
              </Link>
            </div>

            {/* Feature Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-2xl">
              <div className="bg-white/90 rounded-lg p-2 text-center">
                <div className="w-8 h-8 bg-[#56C70B] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-[#001F51] font-medium text-xs">GPS Guided</p>
              </div>

              <div className="bg-white/90 rounded-lg p-2 text-center">
                <div className="w-8 h-8 bg-[#56C70B] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[#001F51] font-medium text-xs">App Controlled</p>
              </div>

              <div className="bg-white/90 rounded-lg p-2 text-center">
                <div className="w-8 h-8 bg-[#56C70B] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-[#001F51] font-medium text-xs">100% Electric</p>
              </div>

              <div className="bg-white/90 rounded-lg p-2 text-center">
                <div className="w-8 h-8 bg-[#56C70B] rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <p className="text-[#001F51] font-medium text-xs">All Weather</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* One Solution Section - 4 Property Cards */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001F51] mb-4">
              One Solution. Every Property.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From steep hillsides and lake cabins to residential homes and HOA communities, iMowiT delivers autonomous lawn care that works while you relax.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <Image src="/mowing-residential.png" alt="Residential" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#001F51] mb-2">Residential</h3>
                <p className="text-gray-600 text-sm">Perfect for homeowners who want their lawn maintained effortlessly.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <Image src="/mowing-hills.png" alt="Hills & Slopes" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#001F51] mb-2">Hills & Slopes</h3>
                <p className="text-gray-600 text-sm">Advanced all-wheel drive mowers that handle steep terrain.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <Image src="/mowing-cabins.png" alt="Lake Cabins" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#001F51] mb-2">Lake Cabins</h3>
                <p className="text-gray-600 text-sm">Set it and forget it — perfect for vacation properties.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <Image src="/mowing-hoa.png" alt="HOA Communities" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#001F51] mb-2">HOA Communities</h3>
                <p className="text-gray-600 text-sm">Consistent, professional lawn care that meets community standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose iMowiT? */}
      <section className="py-16 lg:py-24 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#001F51] mb-12">
            Why Choose iMowiT?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
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

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001F51] mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with iMowiT is easy. Our team handles everything from installation to setup.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#56C70B] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-[#001F51] mb-2">Choose Your Plan</h3>
              <p className="text-gray-600">Select from our flexible subscription plans or buy your autonomous mower outright.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#56C70B] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-[#001F51] mb-2">We Install</h3>
              <p className="text-gray-600">Our team installs the boundary wire and sets up your mower with GPS guidance.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#56C70B] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-[#001F51] mb-2">Enjoy Your Lawn</h3>
              <p className="text-gray-600">Your mower works autonomously, keeping your lawn perfect while you relax.</p>
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
