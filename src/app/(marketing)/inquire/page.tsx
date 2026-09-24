import StyledIMowiT from "@/components/StyledIMowiT"
import InquiryForm from "@/components/forms/InquiryForm"

export default function Inquire() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-[#001F51] mb-4">
          Get In Touch
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Interested in <StyledIMowiT /> autonomous mowing services? We&apos;d love to hear from you.
        </p>

        <InquiryForm />
      </div>
    </div>
  )
}