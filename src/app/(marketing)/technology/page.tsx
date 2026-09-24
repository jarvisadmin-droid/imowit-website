import StyledIMowiT from "@/components/StyledIMowiT"
import Image from "next/image"

export default function Technology() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-[#001F51] mb-4">
          Our Technology
        </h1>
        <p className="text-center text-gray-600 mb-16 text-lg max-w-3xl mx-auto">
          Cutting-edge autonomous mowing technology designed for reliability, efficiency, and precision.
        </p>

        {/* Navy Blue Divider Line */}
        <div className="w-full h-1 bg-[#001F51] mb-16"></div>

        {/* Technology Features */}
        <div className="space-y-16">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#001F51] mb-4">GPS-Guided Navigation</h2>
              <p className="text-gray-600 text-lg">
                Our mowers use advanced GPS technology to create a precise map of your lawn, 
                ensuring every inch is mowed efficiently without missing spots or overlapping.
              </p>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/gps-navigation.png"
                alt="GPS-Guided Navigation"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold text-[#001F51] mb-4">Smart Sensors</h2>
              <p className="text-gray-600 text-lg">
                Advanced obstacle detection sensors prevent collisions with pets, toys, 
                and furniture. Rain sensors automatically return the mower to base when weather changes.
              </p>
            </div>
            <div className="order-1 md:order-2 bg-gray-200 h-64 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/smart-sensors.png"
                alt="Smart Sensors"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#001F51] mb-4">App Control</h2>
              <p className="text-gray-600 text-lg">
                Monitor and control your mower from anywhere using our mobile app. 
                Schedule mowing times, track progress, and receive notifications.
              </p>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/app-control.png"
                alt="App Control"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Feature 4 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold text-[#001F51] mb-4">Eco-Friendly Design</h2>
              <p className="text-gray-600 text-lg">
                All <StyledIMowiT /> mowers are fully electric, producing zero direct emissions. 
                They operate at whisper-quiet levels, so you can mow any time without disturbing neighbors.
              </p>
            </div>
            <div className="order-1 md:order-2 bg-gray-200 h-64 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/eco-friendly.png"
                alt="Eco-Friendly Design"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/inquire"
            className="inline-block bg-[#56C70B] text-[#001F51] px-8 py-3 rounded-lg font-semibold hover:bg-[#4ab309] transition-colors"
          >
            Learn More About Our Services
          </a>
        </div>
      </div>
    </div>
  )
}