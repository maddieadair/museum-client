import { React, useState } from "react";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import Logo from "../assets/images/MFAH Logo Dark.svg";
import { Link } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";

export default function AdminSignup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [SSN, setSSN] = useState("");
    const [role, setRole] = useState("");
    const [secretKey, setSecretKey] = useState("");
  
    const [phoneNumber, setPhoneNumber] = useState("");
  
    //   async function authenticate()
    //   const handleSubmit = async (e) => {};
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(username);
      console.log(password);
      console.log(firstName);
      console.log(lastName);
      console.log(role);
      console.log(SSN);
      console.log(secretKey);
  
      console.log(address);
      console.log(city);
      console.log(state);
      console.log(address);
      console.log(zipCode);
  
    };

  return (
    <div className="h-lvh">
      <div className="bg-chalk z-50 w-full flex flex-col h-fit border-b text-obsidian font-inter p-6">
        <div className="flex flex-row justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-6" />
        </Link>
          <div className="font-bold">Admin Signup</div>
        </div>
      </div>
      
      <div className="h-fit w-full py-32 justify-center items-center flex bg-art bg-cover bg-center">
        
          <form
            className="flex flex-col space-y-8 bg-chalk text-obsidian p-10 rounded-md h-fit w-1/2"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
                <div className="flex flex-col space-y-4 w-full lg:w-1/2">
                <div className="flex flex-col space-y-2">
                  <label className=""><span className="text-cinnabar font-bold">*</span> First Name <span className="italic text-cinnabar">(required)</span></label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-obsidian rounded-md p-2 "
                  ></input>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className=""><span className="text-cinnabar font-bold">*</span> Last Name <span className="italic text-cinnabar">(required)</span></label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-obsidian rounded-md p-2 "
                  ></input>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className=""><span className="text-cinnabar font-bold">*</span> Email Address <span className="italic text-cinnabar">(required)</span></label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-obsidian rounded-md p-2 "
                  ></input>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className=""><span className="text-cinnabar font-bold">*</span> Password <span className="italic text-cinnabar">(required)</span></label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className=""><span className="text-cinnabar font-bold">*</span> SSN <span className="italic text-cinnabar">(required)</span></label>
                  <input
                    type="text"
                    value={SSN}
                    onChange={(e) => setSSN(e.target.value)}
                    className="border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className=""><span className="text-cinnabar font-bold">*</span> Role <span className="italic text-cinnabar">(required)</span></label>
                  <select
                    name="roles"
                    id="roles"
                    onChange={(e) => setRole(e.target.value)}
                    className="border border-obsidian rounded-md p-2"
                  >
                    <option value="Curator">Curator</option>
                    <option value="Manager">Manager</option>
                    <option value="ShopManager">Shop Manager</option>
                    <option value="Director">Director</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col space-y-4 w-full lg:w-1/2">
                <div className="flex flex-col space-y-2">
                  <label className="">Phone Number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="">Zip Code</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="border border-obsidian rounded-md p-2"
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className=""><span className="text-cinnabar font-bold">*</span> Secret Key <span className="italic text-cinnabar">(required)</span></label>
              <input
                type="text"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="border border-obsidian rounded-md p-2"
              ></input>
            </div>
            <button
              className="flex flex-row space-x-4 justify-center items-center bg-obsidian p-2 rounded-md text-chalk font-bold hover:bg-cinnabar transition-colors ease-in-out duration-500"
              type="submit"
            >
                <MdPersonAddAlt1 className=""/>
              <p>Create Account</p>
            </button>
          </form>
      </div>
    </div>
  );
}
