import Logo from "../../assets/images/unnamed.png";
import { AiOutlineHome } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { AiOutlinePicture } from "react-icons/ai";
import { MdOutlineCollections } from "react-icons/md";
import { BiCollection, BiData, BiDollarCircle} from "react-icons/bi";
import { LiaImages } from "react-icons/lia";
import { FiLogOut } from "react-icons/fi";
import { LuStore } from "react-icons/lu";
import { LuDot } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";
import { FiGift } from "react-icons/fi";
import { GrCatalog } from "react-icons/gr";
import { TbReportAnalytics } from "react-icons/tb";

import { Link, NavLink } from "react-router-dom";


export default function DirectorNavbar() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] w-60 flex flex-col py-12 px-2 gap-y-12 text-[#666666] justify-between font-inter text-sm border-r border-[#e7e7e7] font-medium">
      <img src={Logo} alt="Logo" className="px-6" />

      <div className="flex flex-col h-full gap-y-4">
        <NavLink
          to="/director"
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
          to="/director/employees"
          className={({ isActive }) =>
            [
              "flex flex-row gap-x-4 items-center w-full rounded-md p-2 px-4",
              isActive
              ? "bg-[#ededed] text-[#34383f] font-bold"
              : "text-[#666666]",
            ].join(" ")
          }
        >
          {" "}
          <GoPeople />
          <p>Employees</p>
        </NavLink>
        <NavLink
          to="/director/departments"
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
          <BiCollection />
          <p>Department</p>
        </NavLink>
        <NavLink
          to="/director/dept-report"
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
          <BiData />
          <p>Dept Report</p>
        </NavLink>
        <NavLink
          to="/director/exhibitions"
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
          <LiaImages />
          <p>Exhibitions</p>
        </NavLink>
        <NavLink
          to="/director/collections"
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
          <MdOutlineCollections />
          <p>Collections</p>
        </NavLink>
        <NavLink
          to="/director/artworks"
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
          <AiOutlinePicture />
          <p>Artworks</p>
        </NavLink>

        <NavLink
          to="/director/art-report"
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
          <p>Art Report</p>
        </NavLink>

        <NavLink
          to="/director/shop-catalog"
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
          to="/director/finance-report"
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
          <BiDollarCircle />
          <p>Finance Report</p>
        </NavLink>

        <NavLink
          to="/director/tickets"
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
          <IoTicketOutline />
          <p>Tickets</p>
        </NavLink>

        <NavLink
          to="/director/donations"
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
          <FiGift />
          <p>Donations</p>
        </NavLink>
      </div>
    </div>
  );
}
