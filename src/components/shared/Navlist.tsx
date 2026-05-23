import { NavLink } from "react-router-dom";

interface NavItem {
  path: string;
  title: string;
}

const navItems: NavItem[] = [
  { path: "/", title: "Home" },
  { path: "/Contact", title: "Contact" },
  { path: "/About", title: "About" },
  { path: "/SignUp", title: "Sign Up" },
];

interface NavlistProps {
  mobile?: boolean;
  closeMenu?: () => void;
}

export default function Navlist({ mobile, closeMenu }: NavlistProps) {
  return (
    <nav className={`flex ${mobile ? "flex-col gap-5 p-4" : "flex-row gap-10 items-center"}`}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={closeMenu}
          className={({ isActive }) => `
            text-[16px] transition-all relative pb-1
            ${isActive ? "text-black border-b-2 border-black font-medium" : "text-black hover:opacity-70 font-normal"}
            ${mobile ? "text-lg border-b border-gray-100 w-full pb-2" : ""}
          `}
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}