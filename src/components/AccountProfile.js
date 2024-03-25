import { React, useState } from "react";
import UserNavbar from "./UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Footer from "./Footer";
import { LuPencil } from "react-icons/lu";
import { CgClose } from "react-icons/cg";

export default function AccountProfile() {
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
    <div className="pb-24 px-16">
      <form className={`${openEdit ? "flex flex-col space-y-12" : "hidden"}`}>
        <div className="flex flex-col space-y-20">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-5xl font-fanwoodText">
                Personal Information
              </h3>
              <CgClose
                className="size-6 hover:text-cinnabar"
                onClick={() => setOpenEdit(!openEdit)}
              />
            </div>
            <div className="flex flex-row space-x-12">
              <div className="flex flex-col space-y-6 w-1/2">
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">First Name</label>
                  <input
                    type="text"
                    name="fname"
                    value={person.fname}
                    className="bg-white border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">Last Name</label>
                  <input
                    type="text"
                    name="lname"
                    value={person.lname}
                    className="bg-white border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Email Address</label>
                  <input
                    type="text"
                    name="email"
                    value={person.email}
                    className="bg-white border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={person.phone}
                    className="bg-white border border-obsidian rounded-md p-2"
                  ></input>
                </div>
              </div>

              <div className="flex flex-col space-y-6 w-1/2">
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={person.address}
                    className="bg-white border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">City</label>
                  <input
                    type="text"
                    name="city"
                    value={person.city}
                    className="bg-white border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">State</label>
                  <input
                    type="text"
                    name="address"
                    value={person.address}
                    className="bg-white border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={person.zip}
                    className="bg-white border border-obsidian rounded-md p-2"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="bg-obsidian text-chalk rounded-md p-4 font-bold text-xl hover:bg-cinnabar transition-all duration-500 ease-in-out"
        >
          Save Changes
        </button>
      </form>

      <div className={`${openEdit ? "hidden" : "flex flex-col space-y-12"}`}>
        <div className="flex flex-col space-y-20">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-5xl font-fanwoodText">
                Personal Information
              </h3>
              <LuPencil
                className="size-6 hover:text-cinnabar"
                onClick={() => setOpenEdit(!openEdit)}
              />
            </div>

            <div className="flex flex-row space-x-12">
              <div className="flex flex-col space-y-6 w-1/2">
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">First Name</label>
                  <p className="">{person.fname}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">Last Name</label>
                  <p className="">{person.lname}</p>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Email Address</label>
                  <p className="">{person.email}</p>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Phone Number</label>
                  <p className="">{person.phone}</p>
                </div>
              </div>

              <div className="flex flex-col space-y-6 w-1/2">
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">Address</label>
                  <p className="">{person.address}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">City</label>
                  <p className="">{person.city}</p>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">State</label>
                  <p className="">{person.state}</p>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Zip Code</label>
                  <p className="">{person.zip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
