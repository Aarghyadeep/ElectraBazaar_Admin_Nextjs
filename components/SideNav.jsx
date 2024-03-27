import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { MdCategory } from "react-icons/md";


export default function SideNav() {
  
  const inactiveLink = 'flex gap-2 hover:text-white items-center group py-1 px-10';   
  const activeLink = inactiveLink+' text-white';
  const inactiveIcon = 'group-hover:animate-shake transition ease-in-out duration-150 group-hover:text-blue-300 text-2xl';
  const activeIcon = inactiveIcon+' text-orange-500';

  return (
    <aside className="p-4 bg-[#1E1E1E] text-gray-500 font-semibold">
      <nav className="space-y-4 mt-5">
        <Link href={"/"} className={activeLink}>
        <MdDashboard className={activeIcon} />
        Dashboard
        </Link>
        <Link href={"/"} className={inactiveLink}>
        <MdCategory className={inactiveIcon} />
        Categories
        </Link>
        <Link href={"/"} className={inactiveLink}>
        <FaBoxOpen className={inactiveIcon} />
        Products
        </Link>
        <Link href={"/"} className={inactiveLink}>
        <BsFillCartCheckFill className={inactiveIcon} />
        Orders
        </Link>
        <Link href={"/"} className={inactiveLink}>
        <IoMdSettings className={inactiveIcon} />
        Settings
        </Link>
      </nav>
    </aside>
  )
}
