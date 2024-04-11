import { React, useState, useContext } from "react";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import Logo from "../assets/images/MFAH Logo Dark.svg";
import { Link } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";


export default function UserLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setCurrentAuthID, setCurrentAuthRole, setCurrentToken } = useContext(AuthContext);

  const validate = () => {
    setPasswordError("");
    setUsernameError("");

    var hasErrors = false;

    if (username.length === 0) {
      setUsernameError("* Please enter your email address.");
      hasErrors = true;
    } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(username)) {
      setUsernameError("* Please enter a valid email address.");
      hasErrors = true;
    }

    if (password.length === 0) {
      setPasswordError("* Please enter a password");
      hasErrors = true;
    }

    console.log("hasErrors:", hasErrors);
    return hasErrors;
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (!hasErrors) {
      const customerData = {
        Customer_Email: username,
        Customer_Password: password,
      };

      console.log("customerData", customerData);

      try {
        const response = await fetch(
          "https://museum3380-89554eee8566.herokuapp.com/customer-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(customerData),
          }
        );

        if (!response.ok) {
          throw new Error("There was a network error");
        }

        const data = await response.json();
        console.log(data);
        if (data.message === "Invalid username or password") {
          setLoginStatus("Invalid username or password!");
          alert("Invalid username or password!")
        } else {
            const decoded = jwtDecode(data.token);
            console.log("decoded", decoded)

            setCurrentToken(data.token)
            setCurrentAuthID(decoded.ID);
            setCurrentAuthRole(decoded.role);
            console.log(data);
            alert("Successfully logged in!")

            navigate('/')
          //   setLoginStatus("Login was successful!");
        }
      } catch (error) {
        console.log("There was an error fetching:", error);
      }
    } else {
      console.log("hasErrors", hasErrors);
      console.log("usernameErrors", usernameError);
      console.log("passwordError", passwordError);
      console.log("Input is not valid");
    }
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
          onSubmit={handleLogin}
        >
          <div className="flex flex-col space-y-2">
            <label className="">Email address</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-obsidian rounded-md p-2"
            ></input>
            {usernameError ? (
              <p className="text-red-400">{usernameError}</p>
            ) : null}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-obsidian rounded-md p-2"
            ></input>
            {passwordError ? (
              <p className="text-red-400">{passwordError}</p>
            ) : null}
          </div>
          <button
            className="flex flex-row space-x-4 justify-center items-center bg-obsidian p-2 rounded-md text-chalk font-bold hover:bg-cinnabar transition-colors ease-in-out duration-500"
            type="submit"
          >
            <MdOutlineLogin className="" />
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
          {/* <p className={`${loginStatus === "" ? "hidden" : "self-center"}`}>
            {loginStatus}
          </p> */}
        </form>
      </div>
    </div>
  );
}
