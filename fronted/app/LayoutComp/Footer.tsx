import Image from 'next/image'

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1F2E] border-t border-[#2C4A5F] mt-10">

      <div className="max-w-7xl mx-auto px-5 py-10 grid md:grid-cols-4 gap-8 text-sm">

        {/* BRAND */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Image src="/Logo.svg" width={40} height={40} alt="logo" className="rounded-xl" />
            <span className="font-semibold text-white text-lg">
              LtsHavBiryani
            </span>
          </div>

          <p className="text-[#9CA3AF]">
            Biryani for <span className="text-[#F4B400]">every</span> emotion.
          </p>
        </div>

        {/* COMPANY */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold mb-2">Company</h3>
          <button className="text-[#9CA3AF] hover:text-white transition text-left">About</button>
          <button className="text-[#9CA3AF] hover:text-white transition text-left">Careers</button>
          <button className="text-[#9CA3AF] hover:text-white transition text-left">Contact</button>
        </div>

        {/* LEGAL */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold mb-2">Legal</h3>
          <button className="text-[#9CA3AF] hover:text-white transition text-left">Privacy Policy</button>
          <button className="text-[#9CA3AF] hover:text-white transition text-left">Terms</button>
          <button className="text-[#9CA3AF] hover:text-white transition text-left">Refund Policy</button>
        </div>

        {/* SOCIAL */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold">Follow Us</h3>

          <div className="flex gap-3">
            {[1,2,3].map((i) => (
              <button
                key={i}
                className="bg-[#1E3A4C] p-2 rounded-lg hover:bg-[#F4B400] transition"
              >
                <Image src="/Instagram.svg" width={20} height={20} alt="social" />
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-xs text-[#9CA3AF] pb-6">
        © {year} LtsHavBiryani. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer;