import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full pt-10 pb-15 bg-white dark:bg-zinc-950">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-20">
          <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-black dark:text-white">Contact</span>
        </div>
        <div className="flex lg:flex-row flex-col gap-8">
          <div className="p-8 shadow-lg rounded-md bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 h-fit">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#DB4444] p-2 rounded-full text-white">
                    <Phone size={20} />
                  </div>
                  <h3 className="font-semibold text-black dark:text-white">Call To Us</h3>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 flex flex-col gap-2">
                  <p>We are available 24/7, 7 days a week.</p>
                  <p>Phone: +8801611112222</p>
                </div>
              </div>

              <hr className="border-zinc-200 dark:border-zinc-700" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#DB4444] p-2 rounded-full text-white">
                    <Mail size={20} />
                  </div>
                  <h3 className="font-semibold text-black dark:text-white">Write To Us</h3>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 flex flex-col gap-2">
                  <p>Fill out our form and we will contact you within 24 hours.</p>
                  <p>Emails: customer@exclusive.com</p>
                  <p>Emails: support@exclusive.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 shadow-lg rounded-md w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            <form className="flex flex-col gap-4">
              <div className="grid md:grid-cols-3 gap-4">
                <input type="text" placeholder="Your Name *" className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded text-sm outline-none w-full" required />
                <input type="email" placeholder="Your Email *" className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded text-sm outline-none w-full" required />
                <input type="tel" placeholder="Your Phone *" className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded text-sm outline-none w-full" required />
              </div>
              <textarea placeholder="Your Message" rows={8} className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded text-sm outline-none w-full" />
              <div className="flex justify-end">
                <button type="submit" className="bg-[#DB4444] text-white px-10 py-4 rounded text-sm hover:bg-red-600 transition-colors">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}