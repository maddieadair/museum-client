import { React, useState } from "react";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import Logo from "../assets/images/MFAH Logo Dark.svg";
import { Link } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";

export default function UserLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
      };

  return (
    <div className="min-h-screen">
      <div className="bg-chalk z-50 w-full flex flex-col h-fit border-b text-obsidian font-inter p-6">
        <div className="flex flex-row justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-6" />
        </Link>
          <div className="font-bold">User Login</div>
        </div>
      </div>
      

      <div className="h-screen w-full py-32 justify-center items-center flex bg-art bg-cover bg-center">
          <form
            className="flex flex-col space-y-8 bg-chalk text-obsidian p-10 rounded-md h-fit w-1/3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-2">
              <label className="">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-obsidian rounded-md p-2"
              ></input>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-obsidian rounded-md p-2"
              ></input>
            </div>
            <button
              className="flex flex-row space-x-4 justify-center items-center bg-obsidian p-2 rounded-md text-chalk font-bold hover:bg-cinnabar transition-colors ease-in-out duration-500"
              type="submit"
            >
                <MdOutlineLogin className=""/>
              <p>Login</p>
            </button>

              <p className="text-center">
                Don't have an account yet?{" "}
                <Link
                  to="/user-signup"
                  className="font-bold hover:text-cinnabar duration-700 ease-in-out transition-color"
                >
                  Sign Up
                </Link>
              </p>
          </form>
      </div>
    </div>
  );
}
