import App from "@/components/Hero";
import Cta from "@/components/cta";
import Image from "next/image";
import Link from "next/link";

const Navbar = [
  {
    id: 1,
    title: "Home",
    link: "/",
    isMain: false,
  },
  {
    id: 2,
    title: "About Us",
    link: "/about-us",
    isMain: false,
  },
  {
    id: 3,
    title: "Gallery",
    link: "/",
    isMain: false,
  },
  {
    id: 4,
    title: "Book Now",
    link: "/Destinations",
    isMain: true,
  },
  {
    id: 5,
    title: "Contact us",
    link: "/contact-us",
    isMain: false,
  },
  {
    id: 6,
    title: "Sign up",
    link: "/sign-up",
    isMain: false,
  },
  {
    id: 7,
    title: "Sign in",
    link: "/sign-in",
    isMain: false,
  },
];

export default function Home() {
  return (
    <main
      className="bg-transparent  h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header
        className="h-screen relative"
        style={{
          background:
            "linear-gradient(rgb(47 45 45 / 83%) 5%, transparent 50%)",
        }}
      >
        <nav
          className="border border-gray-400/40 top-0 absolute left-[25%] rounded-full  my-5
          bg-white/10 backdrop-blur-2xl
        "
        >
          <ul className="flex justify-center items-center text-gray-300 text-center gap-">
            {Navbar.map((item) => (
              <li
                key={item.id}
                className={` 
                
                ${
                  item.isMain ? "bg-sky-300/40 backdrop-blur-3xl text-gray-200 font-semibold px-5 py-3 rounded-full overflow-visible" : "px-4 py-3"
                }`}
              >
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </main>
  );
}
