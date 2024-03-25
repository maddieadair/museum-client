import { Link, NavLink, Outlet } from "react-router-dom";
// import Placeholder from "../assets/Abstract-Avatar-17-Circle--Streamline-Abstract-2.svg";
import { React, useState } from "react";
import Placeholder from "../assets/images/Abstract-Avatar-17-Square--Streamline-Abstract.svg";


export default function AdminBar({title, desc}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="h-16 w-full text-slate-700 flex flex-row justify-between items-center gap-x-4 font-inter">
        <div className="flex flex-col font-hk-grotesk">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-md">{desc}</p>
        </div>
      <div className="flex flex-row gap-x-4 items-center">
          <p className="font-bold">John Doe</p>
          <img src={Placeholder} alt="Placeholder" className="h-10 hover:cursor-pointer rounded-xl" onClick={() => setShowMenu(!showMenu)}/>
      </div>
      {/* <div className="h-full">
        <img src={Placeholder} alt="Placeholder" className="h-full border-2" />
      </div> */}

      <div className={`${showMenu ? "shadow-md text-gray-500 w-64 bg-white rounded-2xl flex flex-col pt-4 top-24 right-8 absolute" : "hidden"}`}>
        <div className="px-6 pb-4 break-words">
          <p className="font-bold text-gray-700">John Doe</p>
          <p className="">email@gmail.com</p>
        </div>
        <hr></hr>
        <Link to="/admin/account" className="px-6 py-3 hover:bg-gray-100">Profile</Link>
        <hr></hr>
        <p className="rounded-b-2xl px-6 py-3 hover:bg-gray-100">Sign Out</p>
      </div>
    </div>
  );
}
