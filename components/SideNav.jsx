"use client"

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { usePathname } from 'next/navigation'


export default function SideNav() {
  
  const inactiveLink = 'flex gap-2 hover:text-white items-center group py-1 px-10';   
  const activeLink = inactiveLink+' text-white';
  const inactiveIcon = 'group-hover:animate-shake transition ease-in-out duration-150 group-hover:text-blue-300 text-2xl';
  const activeIcon = inactiveIcon+' text-orange-500';
  const pathname = usePathname();

  return (
    <aside className="p-4 bg-[#161311] text-gray-500 font-semibold">
      <nav className="space-y-4 mt-5">
        <Link href={"/"} className={pathname === '/' ? activeLink : inactiveLink}>
        <MdDashboard className={pathname === '/' ? activeIcon : inactiveIcon} />
        Dashboard
        </Link>
        <Link href={"/products"} className={pathname.includes('/products') ? activeLink : inactiveLink}>
        <FaBoxOpen className={pathname.includes('/products') ? activeIcon : inactiveIcon} />
        Products
        </Link>
        <Link href={"/categories"} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
        <MdCategory className={pathname.includes('/categories') ? activeIcon : inactiveIcon} />
        Categories
        </Link>
        <Link href={"/orders"} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
        <BsFillCartCheckFill className={pathname.includes('/orders') ? activeIcon : inactiveIcon} />
        Orders
        </Link>
        <Link href={"/settings"} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
        <IoMdSettings className={pathname.includes('/settings') ? activeIcon : inactiveIcon} />
        Settings
        </Link>
      </nav>
    </aside>
  )
}
