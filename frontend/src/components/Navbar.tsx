import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/user/dashboard">User Dashboard</Link>
      <Link href="/user/login">User Login</Link>
      <Link href="/user/signup">User Signup</Link>
      <Link href="/admin/dashboard">Admin Dashboard</Link>
      <Link href="/admin/login">Admin Login</Link>
    </nav>
  );
};

export default Navbar;
