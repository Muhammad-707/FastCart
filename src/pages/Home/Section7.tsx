
import i1 from "@/assets/ps5-slim-goedkope-playstation_large 1 (1).png"
import i2 from "@/assets/attractive-woman-wearing-hat-posing-black-background 1 (2).png"
import i3 from "@/assets/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1.png"
import i4 from "@/assets/652e82cd70aa6522dd785109a455904c (1).png"

export default function Section7() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
        <span className="text-[#DB4444] font-semibold">Featured</span>
      </div>
      <h2 className="text-3xl font-semibold tracking-wider mb-10">New Arrival</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto">
        <div className="bg-black relative rounded-sm flex flex-col justify-end p-8 text-white min-h-[400px] md:min-h-[600px]">
          <img src={i1} alt="PS5" className="absolute inset-0 w-full h-full object-contain p-4" />
          <div className="relative z-10 flex flex-col gap-2 w-full md:w-1/2">
            <h3 className="text-2xl font-semibold">PlayStation 5</h3>
            <p className="text-sm text-gray-300">Black and White version of the PS5 coming out on sale.</p>
            <a href="#" className="underline underline-offset-8 mt-2 font-medium">Shop Now</a>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="bg-[#0D0D0D] h-[300px] md:h-[285px] rounded-sm flex items-center justify-between text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-2 w-1/2 md:w-2/5 pl-8">
              <h3 className="text-2xl font-semibold">Women’s Collections</h3>
              <p className="text-sm text-gray-300">Featured woman collections that give you another vibe.</p>
              <a href="#" className="underline underline-offset-8 mt-2 font-medium">Shop Now</a>
            </div>
            <img src={i2} alt="Woman" className="h-full right-0 object-cover"/>
          </div>
          <div className="grid grid-cols-2 gap-8 h-[300px] md:h-[285px]">
            <div className="bg-black rounded-sm flex flex-col justify-end p-6 text-white relative">
              <img src={i3} alt="Speakers" className="absolute inset-0 w-full h-full object-contain p-4" />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold">Speakers</h3>
                <p className="text-xs text-gray-300 mt-1">Amazon wireless speakers</p>
                <a href="#" className="underline underline-offset-8 mt-2 text-sm">Shop Now</a>
              </div>
            </div>
            <div className="bg-black rounded-sm flex flex-col justify-end p-6 text-white relative">
              <img src={i4} alt="Perfume" className="absolute inset-0 w-full h-full object-contain p-4" />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold">Perfume</h3>
                <p className="text-xs text-gray-300 mt-1">GUCCI INTENSE OUD EDP</p>
                <a href="#" className="underline underline-offset-8 mt-2 text-sm">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}