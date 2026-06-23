export default function Inquire() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-[#001F51] mb-4">
          Get In Touch
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Interested in iMowiT autonomous mowing services? We'd love to hear from you.
        </p>

        <form className="space-y-6">
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
                placeholder="John"
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
                placeholder="Doe"
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
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56C70B] focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
              Service Interest
            </label>
            <select
              id="serviceType"
              name="serviceType"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56C70B] focus:border-transparent"
            >
              <option value="">Select a service</option>
              <option value="residential">Residential Service</option>
              <option value="commercial">Commercial Service</option>
              <option value="subcontractor">Subcontractor Opportunity</option>
              <option value="partnership">Partnership Inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#56C70B] focus:border-transparent"
              placeholder="Tell us about your lawn care needs..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#56C70B] text-[#001F51] px-8 py-3 rounded-lg font-semibold hover:bg-[#4ab309] transition-colors"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  )
}