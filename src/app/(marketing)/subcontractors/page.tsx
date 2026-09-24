import StyledIMowiT from "@/components/StyledIMowiT"

export default function Subcontractors() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-[#001F51] mb-4">
          Become a Subcontractor
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
          Join the <StyledIMowiT /> network of independent contractors and grow your business with autonomous mowing technology.
        </p>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#001F51] text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-[#56C70B]">Low Startup Costs</h3>
            <p className="text-gray-300">
              Get started with minimal upfront investment. We offer flexible equipment leasing options.
            </p>
          </div>
          <div className="bg-[#001F51] text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-[#56C70B]">Steady Work</h3>
            <p className="text-gray-300">
              Consistent customer demand with scheduled mowing routes in your service area.
            </p>
          </div>
          <div className="bg-[#001F51] text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-[#56C70B]">Tech Support</h3>
            <p className="text-gray-300">
              Full technical support and training on our autonomous mowing systems.
            </p>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#001F51] mb-8 text-center">Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <span className="text-[#56C70B] mr-3">✓</span>
              <span className="text-gray-700">Valid driver&apos;s license and reliable transportation</span>
            </div>
            <div className="flex items-start">
              <span className="text-[#56C70B] mr-3">✓</span>
              <span className="text-gray-700">Ability to lift 50+ lbs</span>
            </div>
            <div className="flex items-start">
              <span className="text-[#56C70B] mr-3">✓</span>
              <span className="text-gray-700">Smartphone with data plan</span>
            </div>
            <div className="flex items-start">
              <span className="text-[#56C70B] mr-3">✓</span>
              <span className="text-gray-700">Clean background check</span>
            </div>
            <div className="flex items-start">
              <span className="text-[#56C70B] mr-3">✓</span>
              <span className="text-gray-700">Basic technical skills</span>
            </div>
            <div className="flex items-start">
              <span className="text-[#56C70B] mr-3">✓</span>
              <span className="text-gray-700">Availability during peak season</span>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#001F51] mb-8 text-center">Apply Now</h2>
          <form method="post" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56C70B] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56C70B] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56C70B] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56C70B] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                Service Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56C70B] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                Lawn Care Experience
              </label>
              <textarea
                id="experience"
                name="experience"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56C70B] focus:border-transparent"
                placeholder="Tell us about your experience..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#56C70B] text-[#001F51] px-8 py-3 rounded-lg font-semibold hover:bg-[#4ab309] transition-colors"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}