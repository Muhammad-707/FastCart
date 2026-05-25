import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();
  return (
    <footer className="w-full bg-black text-white font-sans pt-16 pb-6 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:grid md:grid-cols-5 gap-8 text-left pb-12 border-b border-zinc-800">
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-2xl font-bold tracking-tight text-white">
            {t("text39")}
          </Link>
          <h3 className="text-lg font-medium text-zinc-100">{t("text40")}</h3>
          <p className="text-sm text-zinc-300">{t("text41")}</p>
          <div className="relative mt-2 max-w-[240px] md:w-full">
            <input
              type="email"
              placeholder={t("text42")}
              className="w-full bg-transparent border border-white rounded-md py-2.5 pl-4 pr-10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 transition-colors"
              aria-label="Send email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2 md:mt-0">
          <h3 className="text-lg font-medium text-white">{t("text43")}</h3>
          <p className="text-sm text-zinc-300 leading-relaxed max-w-[200px]">
            {t("text44")} <br /> {t("text44a")}
          </p>
          <a href="mailto:exclusive@gmail.com" className="text-sm text-zinc-300 hover:text-white transition-colors">
            {t("text45")}
          </a>
          <a href="tel:+8801588889999" className="text-sm text-zinc-300 hover:text-white transition-colors">
            +88015-8888-9999
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 md:contents">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium text-white">{t("text47")}</h3>
            <nav className="flex flex-col gap-2.5 text-sm text-zinc-300">
              <p className="hover:text-white transition-colors">{t("text48")}</p>
              <p className="hover:text-white transition-colors">{t("text49")}</p>
              <p className="hover:text-white transition-colors">{t("text50")}</p>
              <p className="hover:text-white transition-colors">{t("text51")}</p>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium text-white">{t("text52")}</h3>
            <nav className="flex flex-col gap-2.5 text-sm text-zinc-300">
              <p className="hover:text-white transition-colors">{t("text53")}</p>
              <p className="hover:text-white transition-colors">{t("text54")}</p>
              <p className="hover:text-white transition-colors">{t("text55")}</p>
              <p className="hover:text-white transition-colors">{t("text56")}</p>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2 md:mt-0">
          <h3 className="text-lg font-medium text-white">{t("text7")}</h3>
          <div className="flex items-center gap-6 text-white mt-1">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8H7v3h2v9h3v-9h2.721L15 8h-3V6.83c0-.853.174-1.29 1.174-1.29H15V2h-2.784C9.713 2 9 3.515 9 5.83V8z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full text-center pt-6 text-zinc-600 text-sm font-light">
        <p>&copy; {t("text57a")}</p>
      </div>
    </footer>
  );
}