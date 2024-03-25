import { React, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import { LuPencil } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
// import AccountProfile from "../components/AccountProfile";
// import AccountTickets from "../components/AccountTickets";
// import AccountDonations from "../components/AccountDonations";
import { NavLink, Link, Outlet } from "react-router-dom";

export default function Account() {
  const person = {
    fname: "John",
    lname: "Doe",
    email: "john@gmail.com",
    phone: "890-8760-5432",
    address: "321 Main St",
    city: "Houston",
    state: "TX",
    zip: "77861",
  };
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className="min-h-screen">
      <UserNavbar />

      <div className="flex flex-col pt-36 pb-24 gap-y-20 font-inter">
        <div className="flex flex-col px-16 gap-y-20">
          <div className="flex flex-col gap-y-4">
            <h1 className="font-fanwoodText italic text-7xl">Account</h1>
            <p className="text-xl font-inter">
              Here you can customize your profile and view previous ticket
              transactions, store transactions, and donations.
            </p>
          </div>
          <div className="h-96">
            <img
              className="brightness-75 rounded-xl object-cover object-top h-full w-full outline outline-offset-8 outline-gray-50"
              src={Angelico}
              alt=""
            />
          </div>
          <div className="flex flex-row space-x-8 w-full border-b py-2">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Profile</p>
            </NavLink>

            <NavLink
              to="tickets"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Tickets</p>
            </NavLink>

            <NavLink
              to="purchases"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Purchases</p>
            </NavLink>

            <NavLink
              to="donations"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Donations</p>
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}
