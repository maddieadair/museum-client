import { IoMenuOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import Logo from "../assets/images/MFAH Logo Dark.svg";
import { React, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

export default function UserNavbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showLoginOption, setShowLoginOptions] = useState(false);

  return (
    <div
      className={`bg-chalk fixed top-0 z-50 w-full flex flex-col h-fit border-b text-obsidian font-inter gap-y-20 p-6 ${
        openMenu ? "pb-16" : ""
      }`}
    >
      <div className="flex flex-row justify-between items-center z-20">
        <div
          className="flex flex-row gap-x-4 items-center hover:text-cinnabar transition-colors ease-in-out duration-500 hover:cursor-pointer"
          onClick={() => setShowLoginOptions(!showLoginOption)}
        >
          <GoPerson />
          <p className="text-sm font-medium ">Login / Register</p>
        </div>

        <Link to="/">
          <img src={Logo} alt="Logo" className="h-6" onClick={() => {setOpenMenu(false); setShowLoginOptions(false)}}
 />
        </Link>
        <div className="h-8">
          <IoMenuOutline
            className={`${
              !openMenu
                ? "size-full hover:text-cinnabar transition-colors ease-in-out duration-500 hover:cursor-pointer"
                : "hidden"
            }`}
            onClick={() => {setOpenMenu(!openMenu); setShowLoginOptions(false)}}
          />
          <IoCloseOutline
            className={`${
              openMenu
                ? "size-full hover:text-cinnabar transition-colors ease-in-out duration-500 hover:cursor-pointer"
                : "hidden"
            }`}
            onClick={() => {setOpenMenu(!openMenu); setShowLoginOptions(false)}}
          />
        </div>
      </div>

      <div
        className={`${
          openMenu
            ? "font-light text-2xl text-gravel opacity-100 translate-y-0 flex flex-col gap-y-20"
            : "hidden"
        }`}
      >
        <div className="flex flex-col gap-y-2 uppercase">
            <NavLink
              to="/"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Home</p>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>About</p>
            </NavLink>
            <NavLink
              to="/collections"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Collections</p>
            </NavLink>
            <NavLink
              to="/exhibitions"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Exhibitions</p>
            </NavLink>
            <NavLink
              to="/donate"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Donate</p>
            </NavLink>
            <NavLink
              to="/tickets"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Get Tickets</p>
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Shop</p>
            </NavLink>
        </div>

        <NavLink
          to="/account"
          className={({ isActive }) =>
            [
              "hover:border-b hover:border-gravel flex flex-row gap-x-4 w-fit pb-1 items-center font-bold",
              isActive ? "text-cinnabar hover:border-cinnabar font-bold" : "",
            ].join(" ")
          }
        >
        <GoPerson />
          <p className="text-sm">Account</p>
        </NavLink>
      </div>




      <div
        className={`${
          showLoginOption
            ? "absolute top-16 flex flex-col  w-fit font-inter shadow-sm"
            : "hidden"
        }`}
      >
        <Link
          to="/user-login"
          className=" bg-rose-50 py-2 px-4 rounded-t-lg border-t border-x border-rose-400 text-cinnabar hover:text-chalk hover:bg-cinnabar hover:font-bold transition-all duration-500 ease-in-out"
        >
          Customer
        </Link>
        <Link
          to="/admin-login"
          className=" bg-rose-50 py-2 px-4 rounded-b-lg border-b border-x border-rose-400  text-cinnabar hover:text-chalk hover:bg-cinnabar hover:font-bold transition-all duration-500 ease-in-out"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}
