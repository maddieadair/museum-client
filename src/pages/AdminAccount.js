import AdminNavbar from "../components/AdminNavbar";
import AdminBar from "../components/AdminBar";
import Placeholder from "../assets/images/Abstract-Avatar-17-Square--Streamline-Abstract.svg";
import { MdOutlineMail } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { React, useState } from "react";

export default function AdminAccount() {
  const [editInfo, setEditInfo] = useState(false);

  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [sex, setSex] = useState("M");
  const [DOB, setDOB] = useState("2002-08-08");
  const [address, setAddress] = useState("123 Main St");
  const [city, setCity] = useState("Houston");
  const [state, setState] = useState("TX");
  const [zipcode, setZipcode] = useState("77652");

  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("*****");

  return (
    <div className="bg-[#F7f2f3] min-h-screen text-slate-700 font-inter">
    <div className="flex flex-row gap-x-10 pb-8 p-6">
      <AdminNavbar />
      <div className="flex flex-col gap-y-8 w-full h-full p-2">
        <AdminBar title="Account" desc="Profile details" />

        <div className="bg-white h-fit rounded-3xl p-8">
          <div className="flex flex-row gap-x-6">
            <img src={Placeholder} alt="Logo" className="w-1/5 rounded-3xl" />
            <div className="w-full p-4 flex flex-col gap-y-10 justify-between">
              <div>
                <div className="flex flex-row justify-between">
                  <h2 className="text-3xl font-bold">John Doe</h2>
                  <p className="italic text-sm">1234567890</p>
                </div>
                <p className="text-lg">Curator</p>
                <p>Department: Optional</p>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-x-4">
                  <MdOutlineMail />
                  <p>johndoe@gmail.com</p>
                </div>
                <p>
                  <span className="font-bold">Reports to: </span>Kate Johnson
                </p>
              </div>
            </div>
          </div>
        </div>

        <form className="bg-white h-full rounded-3xl p-10 flex flex-col gap-y-6">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-bold">Details</h2>
            <div className="">
              <LuPencil
                className="size-full p-4 rounded-lg hover:text-red-400 hover:bg-red-100 transition-all ease-in-out duration-300"
                onClick={() => setEditInfo(!editInfo)}
              />
            </div>
          </div>

          <div className="flex flex-col divide-y w-1/2">
            <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
              <p className="font-bold">Email Address</p>
              {editInfo ? (
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                ></input>
              ) : (
                <p>{email}</p>
              )}
            </div>
            <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
              <p className="font-bold">Password</p>
              {editInfo ? (
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                ></input>
              ) : (
                <p>{password}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-x-12">
            <div className="flex flex-col divide-y w-1/2">
              <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                <p className="font-bold">First Name</p>
                {editInfo ? (
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                ) : (
                  <p>{firstName}</p>
                )}{" "}
              </div>
              <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                <p className="font-bold">Last Name</p>
                {editInfo ? (
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                ) : (
                  <p>{lastName}</p>
                )}{" "}
              </div>
              <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                <p className="font-bold">Sex</p>
                {editInfo ? (
                  <input
                    type="text"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                ) : (
                  <p>{sex}</p>
                )}{" "}
              </div>
              <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                <p className="font-bold">DOB</p>
                {editInfo ? (
                  <input
                    type="date"
                    value={DOB}
                    onChange={(e) => setDOB(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                ) : (
                  <p>{DOB}</p>
                )}{" "}
              </div>
            </div>

            <div className="flex flex-col divide-y w-1/2">
              <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                <p className="font-bold">Address</p>
                {editInfo ? (
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                ) : (
                  <p>{address}</p>
                )}{" "}
              </div>
              <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                <p className="font-bold">City</p>
                {editInfo ? (
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                ) : (
                  <p>{city}</p>
                )}{" "}
              </div>
              <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                <p className="font-bold">State</p>
                {editInfo ? (
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                ) : (
                  <p>{state}</p>
                )}{" "}
              </div>
              <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                <p className="font-bold">Zip Code</p>
                {editInfo ? (
                  <input
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                ) : (
                  <p>{zipcode}</p>
                )}{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-col divide-y w-1/2">
            <div className="flex flex-row gap-x-6 py-4 items-center">
              <p className="font-bold">Employee ID</p>
              <p>1234567890</p>
            </div>
            <div className="flex flex-row gap-x-6 py-4 items-center">
              <p className="font-bold">Role</p>
              <p>Curator</p>
            </div>
            <div className="flex flex-row gap-x-6 py-4 items-center">
              <p className="font-bold">Department</p>
              <p>(Optional)</p>
            </div>
            <div className="flex flex-row gap-x-6 py-4 items-center">
              <p className="font-bold">Salary</p>
              <p>$60,000</p>
            </div>
          </div>
        </form>
      </div>
      </div>

    </div>
  );
}
