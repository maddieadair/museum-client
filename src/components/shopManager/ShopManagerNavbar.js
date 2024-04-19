import Logo from "../../assets/images/unnamed.png";
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
import { GrCatalog } from "react-icons/gr";
import { BsShop } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";

import { Link, NavLink } from "react-router-dom";


export default function ShopManagerNavbar() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] w-60 flex flex-col py-12 px-2 gap-y-12 text-[#666666] justify-between font-inter text-sm border-r border-[#e7e7e7] font-medium">
      <img src={Logo} alt="Logo" className="px-6" />

      <div className="flex flex-col h-full gap-y-4">
        <NavLink
          to="/shop-manager"
          end= {true}
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
              ? "bg-[#ededed] text-[#34383f] font-bold"
              : "text-[#666666]",
            ].join(" ")
          }
        >
          <AiOutlineHome />
          <p>Dashboard</p>
        </NavLink>

        <NavLink
          to="/shop-manager/shop-catalog"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
              ? "bg-[#ededed] text-[#34383f] font-bold"
              : "text-[#666666]",
            ].join(" ")
          }
        >
          {" "}
          <GrCatalog />
          <p>Shop Catalog</p>
        </NavLink>

        <NavLink
          to="/shop-manager/shop-log"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
              ? "bg-[#ededed] text-[#34383f] font-bold"
              : "text-[#666666]",
            ].join(" ")
          }
        >
          {" "}
          <BsShop />
          <p>Transaction Log</p>
        </NavLink>

        <NavLink
          to="/shop-manager/report"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-lg p-2 px-4",
              isActive
              ? "bg-[#ededed] text-[#34383f] font-bold"
              : "text-[#666666]",
            ].join(" ")
          }
        >
          {" "}
          <TbReportAnalytics />
          <p>Report</p>
        </NavLink>

      </div>
    </div>
  );
}
