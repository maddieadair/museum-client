import Logo from "../assets/images/unnamed.png";
import { AiOutlineHome } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { AiOutlinePicture } from "react-icons/ai";
import { MdOutlineCollections } from "react-icons/md";
import { BiCollection } from "react-icons/bi";
import { LiaImages } from "react-icons/lia";
import { FiLogOut } from "react-icons/fi";
import { LuStore } from "react-icons/lu";
import { LuDot } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";
import { FiGift } from "react-icons/fi";

import { Link, NavLink } from "react-router-dom";

// "flex flex-row gap-x-4 items-center w-full  hover:bg-red-100 hover:text-red-400 rounded-lg p-4"

export default function AdminNavbar() {
  return (
    <div className="rounded-3xl min-h-screen bg-gradient-to-r from-[#fcfcfc] to-[#f8f8fa] w-1/6 flex flex-col py-12 gap-y-12 text-slate-700 justify-between ">
      <img src={Logo} alt="Logo" className="px-6" />

      <div className="flex flex-col h-full px-4 gap-y-4">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
                ? "text-red-400 bg-red-100"
                : "hover:bg-gray-100 hover:text-gray-700",
            ].join(" ")
          }
        >
          <AiOutlineHome />
          <p>Dashboard</p>
        </NavLink>
        <NavLink
          to="/admin/employees"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
                ? "text-red-400 bg-red-100"
                : "hover:bg-gray-100 hover:text-gray-700",
            ].join(" ")
          }
        >
          {" "}
          <GoPeople />
          <p>Employees</p>
        </NavLink>
        <NavLink
          to="/admin/departments"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
                ? "text-red-400 bg-red-100"
                : "hover:bg-gray-100 hover:text-gray-700",
            ].join(" ")
          }
        >
          {" "}
          <BiCollection />
          <p>Departments</p>
        </NavLink>
        <NavLink
          to="/admin/exhibitions"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
                ? "text-red-400 bg-red-100"
                : "hover:bg-gray-100 hover:text-gray-700",
            ].join(" ")
          }
        >
          {" "}
          <LiaImages />
          <p>Exhibitions</p>
        </NavLink>
        <NavLink
          to="/admin/collections"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
                ? "text-red-400 bg-red-100 "
                : "hover:bg-gray-100 hover:text-gray-700 ",
            ].join(" ")
          }
        >
          {" "}
          <MdOutlineCollections />
          <p>Collections</p>
        </NavLink>
        <NavLink
          to="/admin/artworks"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
                ? "text-red-400 bg-red-100 "
                : "hover:bg-gray-100 hover:text-gray-700",
            ].join(" ")
          }
        >
          {" "}
          <AiOutlinePicture />
          <p>Artworks</p>
        </NavLink>
        <NavLink
          to="/admin/shop"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
                ? "text-red-400 bg-red-100"
                : "hover:bg-gray-100 hover:text-gray-700 ",
            ].join(" ")
          }
        >
          {" "}
          <LuStore />
          <p>Gift Shop</p>
        </NavLink>

        <NavLink
          to="/admin/tickets"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
                ? "text-red-400 bg-red-100"
                : "hover:bg-gray-100 hover:text-gray-700 ",
            ].join(" ")
          }
        >
          {" "}
          <IoTicketOutline />
          <p>Tickets</p>
        </NavLink>

        <NavLink
          to="/admin/donations"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
                ? "text-red-400 bg-red-100"
                : "hover:bg-gray-100 hover:text-gray-700 ",
            ].join(" ")
          }
        >
          {" "}
          <FiGift />
          <p>Donations</p>
        </NavLink>
      </div>
    </div>
  );
}
