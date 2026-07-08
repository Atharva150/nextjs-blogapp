import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex gap-6 bg-blue-600 p-4 text-white">
      <Link href="/">Home</Link>

      <Link href="/blogs">Blogs</Link>
    </nav>
  );
};

export default Navbar;