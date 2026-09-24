import Link from 'next/link'
import Image from 'next/image'

export default function Plans() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/plans-hero-bg.png"
            alt="Lawn background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <span className="inline-block text-[#56C70B] text-sm font-bold tracking-wider uppercase mb-4">
                OUR PLANS
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                Choose the Autonomous<br/>Mowing Solution That&apos;s<br/>Right for You
              </h1>
              <div className="w-12 h-0.5 bg-[#56C70B] mb-4"></div>
              <p className="text-white text-sm md:text-base leading-relaxed max-w-lg">
                Whether you want to own your robotic mower outright or enjoy a completely hands-off property maintenance experience, iMowiT has a plan designed for you!
              </p>
            </div>
          </div>
        </div>
        {/* White section starts below */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-2xl"></div>
      </section>

      {/* Plans Section */}
      <section className="bg-white pt-32 pb-16 lg:py-24 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-visible">
            
            {/* Card 1: Buy an Autonomous Mower */}
            <div className="bg-white rounded-t-2xl rounded-b-2xl shadow-lg border-2 border-[#001F51] overflow-visible flex flex-col">
              <div className="bg-[#001F51] rounded-t-xl p-6 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center -mt-20 mb-3">
                  <Image
                    src="/buy-mower-icon.png"
                    alt="Buy Mower Icon"
                    width={96}
                    height={96}
                    className="w-20 h-20"
                  />
                </div>
                <h3 className="text-xl font-bold text-white text-center">Buy an Autonomous Mower</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col bg-white rounded-b-xl">
                <p className="text-[#56C70B] text-center text-sm font-medium mb-4">Own the Future of Lawn Care</p>
                
                <div className="mb-4">
                  <p className="text-xs font-bold text-[#001F51] uppercase mb-2">INCLUDES</p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Professional mower recommendation
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Optional professional installation
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Property mapping and setup
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Access to Husqvarna technology
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Full ownership of equipment
                    </li>
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-bold text-[#001F51] uppercase mb-2">PERFECT FOR</p>
                  <p className="text-sm text-gray-600">Homeowners who prefer to own their equipment</p>
                  <p className="text-sm text-gray-600">DIY-minded customers</p>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-bold text-[#001F51] uppercase mb-2">OPTIONAL ADD-ONS</p>
                  <ul className="space-y-1">
                    <li className="text-sm text-gray-600">• Professional installation</li>
                    <li className="text-sm text-gray-600">• Winter storage</li>
                    <li className="text-sm text-gray-600">• Annual maintenance</li>
                    <li className="text-sm text-gray-600">• Blade replacement & sharpening</li>
                  </ul>
                </div>

                <Link
                  href="/inquire"
                  className="mt-auto block w-full bg-[#001F51] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001a40] transition-colors text-center"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>

            {/* Card 2: iMow */}
            <div className="bg-white rounded-t-2xl rounded-b-2xl shadow-lg border-2 border-[#001F51] overflow-visible flex flex-col">
              <div className="bg-[#56C70B] rounded-t-xl p-6 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center -mt-20 mb-3">
                  <Image
                    src="/imow-icon.png"
                    alt="iMow Icon"
                    width={96}
                    height={96}
                    className="w-20 h-20"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#001F51] text-center">iMow</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col bg-white rounded-b-xl">
                <p className="text-[#56C70B] text-center text-sm font-medium mb-4">Autonomous Lawn Care Made Easy</p>
                
                <div className="mb-4">
                  <p className="text-xs font-bold text-[#001F51] uppercase mb-2">INCLUDES</p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Professional installation & setup
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Property mapping & virtual boundaries
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Seasonal system updates
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Annual blade sharpening
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Winter storage
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Ongoing support & monitoring
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-bold text-[#001F51] uppercase mb-2">PERFECT FOR</p>
                  <p className="text-sm text-gray-600">Homeowners who want a worry-free lawn</p>
                  <p className="text-sm text-gray-600">Customers who prefer maintenance included</p>
                  <p className="text-sm text-gray-600">Anyone looking to experience autonomous mowing without ownership responsibilities</p>
                </div>

                <Link
                  href="/inquire"
                  className="mt-auto block w-full bg-[#56C70B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#43a047] transition-colors text-center"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>

            {/* Card 3: iMow+ */}
            <div className="bg-white rounded-t-2xl rounded-b-2xl shadow-lg border-2 border-[#001F51] overflow-visible flex flex-col">
              <div className="bg-[#56C70B] rounded-t-xl p-6 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center -mt-20 mb-3">
                  <Image
                    src="/imow-plus-icon.png"
                    alt="iMow+ Icon"
                    width={96}
                    height={96}
                    className="w-20 h-20"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#001F51] text-center">iMow+</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col bg-white rounded-b-xl">
                <p className="text-[#56C70B] text-center text-sm font-medium mb-4">Lawn Care Beyond Just Mowing</p>
                
                <div className="mb-4">
                  <p className="text-xs font-bold text-[#001F51] uppercase mb-2">INCLUDES</p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Everything in iMow, plus:
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Spring cleanup
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Fall cleanup
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Fertilization services
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Professional weed whacking & trimming
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Seasonal property inspections
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Reduced-price mower purchase after 3 years*
                    </li>
                  </ul>
                </div>

                <p className="text-xs text-gray-500 mb-4">*Purchase price varies based on the mower model required for your property.</p>

                <div className="mb-4">
                  <p className="text-xs font-bold text-[#001F51] uppercase mb-2">PERFECT FOR</p>
                  <p className="text-sm text-gray-600">Homeowners seeking complete lawn care</p>
                  <p className="text-sm text-gray-600">Busy families</p>
                  <p className="text-sm text-gray-600">Cabin owners</p>
                  <p className="text-sm text-gray-600">Customers who want maximum value and convenience</p>
                </div>

                <Link
                  href="/inquire"
                  className="mt-auto block w-full bg-[#56C70B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#43a047] transition-colors text-center"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>

            {/* Card 4: iMow 365 */}
            <div className="bg-white rounded-t-2xl rounded-b-2xl shadow-xl border-2 border-[#001F51] overflow-visible flex flex-col">
              <div className="bg-[#001F51] rounded-t-xl p-6 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center -mt-20 mb-3">
                  <Image
                    src="/imow-365-icon.png"
                    alt="iMow 365 Icon"
                    width={96}
                    height={96}
                    className="w-20 h-20"
                  />
                </div>
                <h3 className="text-xl font-bold text-white text-center">iMow 365</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col bg-white rounded-b-xl">
                <p className="text-[#56C70B] text-center text-sm font-medium mb-4">Complete Property Care, All Year Long</p>
                
                <div className="mb-4">
                  <p className="text-xs font-bold text-[#001F51] uppercase mb-2">INCLUDES</p>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Everything in iMow+, plus:
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Snow service at 2-inch trigger
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Priority scheduling & support
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Year-round property maintenance
                    </li>
                    <li className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#56C70B] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      Reduced-price mower purchase after 3 years*
                    </li>
                  </ul>
                </div>

                <p className="text-xs text-gray-500 mb-4">*Purchase price varies based on the mower model required for your property.</p>

                <div className="mb-4">
                  <p className="text-xs font-bold text-[#001F51] uppercase mb-2">PERFECT FOR</p>
                  <p className="text-sm text-gray-600">Busy professionals</p>
                  <p className="text-sm text-gray-600">Seniors</p>
                  <p className="text-sm text-gray-600">Snowbirds and cabin owners</p>
                  <p className="text-sm text-gray-600">Homeowners seeking a truly maintenance-free property</p>
                  <p className="text-sm text-gray-600">One predictable payment for year-round service</p>
                </div>

                <Link
                  href="/inquire"
                  className="mt-auto block w-full bg-[#001F51] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#001a40] transition-colors text-center"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Which Plan Is Right For You? */}
      <section className="bg-[#F5F5F5] py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#001F51] text-center mb-12">
            Which Plan Is Right For You?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#001F51]">
                <Image
                  src="/buy-mower-icon.png"
                  alt="Buy Mower Icon"
                  width={64}
                  height={64}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="font-semibold text-[#001F51] mb-2">Buy an Autonomous Mower</h3>
              <p className="text-sm text-gray-600">Best for customers who want to own their equipment.</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#56C70B]">
                <Image
                  src="/imow-icon.png"
                  alt="iMow Icon"
                  width={64}
                  height={64}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="font-semibold text-[#001F51] mb-2">iMow</h3>
              <p className="text-sm text-gray-600">Best for customers who want simple, worry-free autonomous mowing.</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#56C70B]">
                <Image
                  src="/imow-plus-icon.png"
                  alt="iMow+ Icon"
                  width={64}
                  height={64}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="font-semibold text-[#001F51] mb-2">iMow+</h3>
              <p className="text-sm text-gray-600">Best for customers who want mowing, lawn care, and seasonal maintenance bundled together.</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md border-2 border-[#001F51]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#001F51]">
                <Image
                  src="/imow-365-icon.png"
                  alt="iMow 365 Icon"
                  width={64}
                  height={64}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="font-semibold text-[#001F51] mb-2">iMow 365</h3>
              <p className="text-sm text-gray-600">Best for customers who want complete year-round property maintenance with one monthly payment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-[#001F51] py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/imowit-cta-mower.png"
            alt="Lawn"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001F51] via-[#001F51]/90 to-transparent"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Start Your Autonomous Mowing Journey Today
            </h2>
            <p className="text-white/80 mb-6">
              Get a free property assessment and discover which iMowiT solution is right for your home, cabin, HOA, or commercial property.
            </p>
            <Link
              href="/inquire"
              className="inline-flex items-center bg-[#56C70B] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#43a047] transition-colors"
            >
              GET A FREE ASSESSMENT
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}