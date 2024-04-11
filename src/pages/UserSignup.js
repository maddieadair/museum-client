import { React, useState } from "react";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import Logo from "../assets/images/MFAH Logo Dark.svg";
import { Link } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function UserSignup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [signupStatus, setSignupStatus] = useState("");
  const [signupErrors, setSignupErrors] = useState({});

  const validate = () => {
    setSignupErrors({});
    let errors = {};

    var hasErrors = false;

    if (firstName.length === 0) {
      errors.firstName = "* Please enter your First Name";
      hasErrors = true;
    }
    if (lastName.length === 0) {
      errors.lastName = "* Please enter your Last Name";
      hasErrors = true;
    }
    if (username.length === 0) {
      errors.username = "* Please enter your email address";
      hasErrors = true;
    } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(username)) {
      errors.username = "* Please enter a valid email address";
      hasErrors = true;
    }

    if (password.length === 0) {
      errors.password = "* Please enter a password";
      hasErrors = true;
    }

    if (zipCode !== "") {
      if (!isNaN(zipCode)) {
        if (zipCode.length !== 5) {
          errors.zipcode =
            "* Please enter a valid zipcode of at least 5 characters.";
          hasErrors = true;
        }
      } else {
        errors.zipcode = "* Please enter a valid zipcode.";
        hasErrors = true;
      }
    }

    setSignupErrors(errors);
    return hasErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("fname", firstName);
    console.log("lname", lastName);
    console.log("email", username);
    console.log("password", password);
    console.log("address", address);
    console.log("city", city);
    console.log("state", state);
    console.log("zip", zipCode);

    const hasErrors = validate();

    if (!hasErrors) {
      const customerData = {
        Customer_Fname: firstName,
        Customer_Lname: lastName,
        Customer_Email: username,
        Customer_Password: password,
        Customer_Address: address,
        Customer_City: city,
        Customer_State: state,
        Customer_Zipcode: zipCode,
      };

      console.log("emailData", customerData);

      try {
        const response = await fetch(
          "https://museum3380-89554eee8566.herokuapp.com/customer-signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(customerData),
          }
        );

        if (!response.ok) {
          throw new Error("There was an error fetching the data");
        }

        const data = await response.json();
        console.log(data);

        if (data.error === "An account with this email already exists") {
          setSignupStatus("An account with this email already exists");
        } else {
          setSignupStatus("Signup was successful!");
          alert("Successfully signed up!");
          navigate("/user-login");
        }
      } catch (error) {
        // console.log("There was an error fetching:", error);
        // console.log(error.message)
        setSignupStatus(error.message);
      }
    } else {
      console.log("hasErrors", hasErrors);
      console.log("signup errors", signupErrors);
      console.log("Input is not valid");
    }
  };

  const usStates = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FM",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MH",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PW",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  return (
    <div className="h-lvh">
      <div className="bg-chalk z-50 w-full flex flex-col h-fit border-b text-obsidian font-inter p-6">
        <div className="flex flex-row justify-between items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-6" />
          </Link>
          <div className="font-bold">User Signup</div>
        </div>
      </div>

      <div className="h-screen w-full py-32 justify-center items-center flex bg-art bg-cover bg-center">
        <form
          className="flex flex-col space-y-8 bg-chalk text-obsidian p-10 rounded-md h-fit w-1/2"
          onSubmit={handleSignup}
        >
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
            <div className="flex flex-col space-y-4 w-full lg:w-1/2">
              <div className="flex flex-col space-y-2">
                <label className="">
                  <span className="text-cinnabar font-bold">*</span> First Name{" "}
                  <span className="italic text-cinnabar">(required)</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border border-obsidian rounded-md p-2 "
                ></input>
                {signupErrors.firstName ? (
                  <p className="text-red-400">{signupErrors.firstName}</p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="">
                  <span className="text-cinnabar font-bold">*</span> Last Name{" "}
                  <span className="italic text-cinnabar">(required)</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border border-obsidian rounded-md p-2 "
                ></input>
                {signupErrors.lastName ? (
                  <p className="text-red-400">{signupErrors.lastName}</p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="">
                  <span className="text-cinnabar font-bold">*</span> Email
                  Address{" "}
                  <span className="italic text-cinnabar">(required)</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-obsidian rounded-md p-2 "
                ></input>
                {signupErrors.username ? (
                  <p className="text-red-400">{signupErrors.username}</p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="">
                  {" "}
                  <span className="text-cinnabar font-bold">
                    *
                  </span> Password{" "}
                  <span className="italic text-cinnabar">(required)</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-obsidian rounded-md p-2"
                ></input>
                {signupErrors.password ? (
                  <p className="text-red-400">{signupErrors.password}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col space-y-4 w-full lg:w-1/2">
              <div className="flex flex-col space-y-2">
                <label className="">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-obsidian rounded-md p-2"
                ></input>
                {signupErrors.address ? (
                  <p className="text-red-400">{signupErrors.address}</p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border border-obsidian rounded-md p-2"
                ></input>
                {signupErrors.city ? (
                  <p className="text-red-400">{signupErrors.city}</p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="">State</label>
                <select
                  value={state}
                  name="state"
                  onChange={(e) => setState(e.target.value)}
                  className="border border-obsidian rounded-md p-2"
                >

                  {usStates.map((x, y) => (
                    <option value={x} key={y}>
                      {x}
                    </option>
                  ))}
                </select>

                {signupErrors.state ? (
                  <p className="text-red-400">{signupErrors.state}</p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="">Zip Code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="border border-obsidian rounded-md p-2"
                ></input>
                {signupErrors.zipcode ? (
                  <p className="text-red-400">{signupErrors.zipcode}</p>
                ) : null}
              </div>
            </div>
          </div>
          <button
            className="flex flex-row space-x-4 justify-center items-center bg-obsidian p-2 rounded-md text-chalk font-bold hover:bg-cinnabar transition-colors ease-in-out duration-500"
            //   onClick={customerSignup}
          >
            <MdPersonAddAlt1 className="" />
            <p>Create Account</p>
          </button>
          <p className={`${signupStatus === "" ? "hidden" : "self-center"}`}>
            {signupStatus}
          </p>
        </form>
      </div>
    </div>
  );
}
