import { IoMenuOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import LogoLight from "../assets/images/MFAH Logo light.svg";
import LogoDark from "../assets/images/MFAH Logo Dark.svg";
import { React, useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { TbShoppingCartStar } from "react-icons/tb";
import { LuShoppingCart } from "react-icons/lu";

export default function UserNavbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showLoginOption, setShowLoginOptions] = useState(false);
  const { currentAuthID, currentAuthRole, logout, currentCart } =
    useContext(AuthContext);
  const [color, setColor] = useState(false);

  const [openCartMenu, setOpenCartMenu] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 200) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  //   window.addEventListener('scroll', changeColor)

  return (
    <div
      className={` fixed top-0 z-40 w-full flex flex-col h-fit text-obsidian font-inter gap-y-20 p-6 px-10 ${
        openMenu
          ? "pb-16 bg-chalk border-b"
          : color
          ? "bg-chalk border-b"
          : null
      }
      }`}
    >
      <div
        className={`flex flex-row justify-between items-center z-20 ${
          openMenu ? "text-obsidian" : color ? "text-obsidian" : "text-chalk"
        }`}
      >
        {currentAuthID === null && currentAuthRole === null ? (
          <div
            className={`flex flex-row gap-x-4 items-center hover:text-cinnabar transition-colors ease-in-out duration-500 hover:cursor-pointer `}
            onClick={() => setShowLoginOptions(!showLoginOption)}
          >
            <GoPerson />
            <p className="text-sm font-medium ">Log in / Register</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={logout}
            className="flex flex-row gap-x-4 items-center hover:text-cinnabar transition-colors ease-in-out duration-500 hover:cursor-pointer"
          >
            <FiLogOut />
            <p className="text-sm font-medium">Log out</p>
          </button>
        )}

        <div>
          {color || openMenu ? (
            <img
              src={LogoDark}
              alt="Logo"
              className="h-6"
              onClick={() => {
                setOpenMenu(false);
                setShowLoginOptions(false);
              }}
            />
          ) : null
          }
        </div>
        <div className="flex flex-row items-center gap-x-8">
          <Link to ="/shop/checkout"
            className={`${
              currentAuthID !== null &&
              currentAuthRole === "Customer" &&
              currentCart !== null
                ? `visible`
                : `invisible`
            }`}
          >
            <LuShoppingCart size={20} className="hover:cursor-pointer hover:text-cinnabar transition-colors ease-in-out duration-500" />

          </Link>
          <div className="h-8">
            <IoMenuOutline
              className={`${
                !openMenu
                  ? "size-full hover:text-cinnabar transition-colors ease-in-out duration-500 hover:cursor-pointer"
                  : "hidden"
              }`}
              onClick={() => {
                setOpenMenu(!openMenu);
                setShowLoginOptions(false);
              }}
            />
            <IoCloseOutline
              className={`${
                openMenu
                  ? "size-full hover:text-cinnabar transition-colors ease-in-out duration-500 hover:cursor-pointer"
                  : "hidden"
              }`}
              onClick={() => {
                setOpenMenu(!openMenu);
                setShowLoginOptions(false);
              }}
            />
          </div>
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
            to="/departments"
            className={({ isActive }) =>
              [
                "hover:underline hover:underline-offset-8",
                isActive ? "text-cinnabar font-bold" : "",
              ].join(" ")
            }
          >
            <p>Curatorial Areas</p>
          </NavLink>
          <NavLink
            to="/artworks/search?"
            className={({ isActive }) =>
              [
                "hover:underline hover:underline-offset-8",
                isActive ? "text-cinnabar font-bold" : "",
              ].join(" ")
            }
          >
            <p>Search the Collection</p>
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

        {currentAuthID !== null && currentAuthRole === "Customer" ? (
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
        ) : null}
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
          to="/employee-login"
          className=" bg-rose-50 py-2 px-4 rounded-b-lg border-b border-x border-rose-400  text-cinnabar hover:text-chalk hover:bg-cinnabar hover:font-bold transition-all duration-500 ease-in-out"
        >
          Employee
        </Link>
      </div>
    </div>
  );
}
