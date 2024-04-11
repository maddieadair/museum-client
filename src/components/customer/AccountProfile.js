import { React, useState, useEffect, useContext } from "react";
import UserNavbar from "../UserNavbar";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Footer from "../Footer";
import { LuPencil } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { AuthContext } from "../../context/AuthContext";

export default function AccountProfile() {
  const { currentAuthID, currentAuthRole } = useContext(AuthContext);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState("");
  const [customer, setCustomer] = useState([]);

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

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const customerInfo = {
      Customer_ID: currentAuthID,
    };
    console.log("fetch customer info", customerInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/customer-ID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerInfo),
    })
      .then((response) => {
        console.log("repsonse:", response);
        return response.json();
      })
      .then((data) => {
        setCustomer(data);
      });
  };

  const handleEdit = () => {
    setFname(customer[0].Customer_Fname);
    setLname(customer[0].Customer_Lname);
    setEmail(customer[0].Customer_Email);
    setPassword(customer[0].Customer_Password);
    setAddress(customer[0].Customer_Address);
    setCity(customer[0].Customer_City);
    setState(customer[0].Customer_State);
    setZip(customer[0].Customer_Zipcode);
    setOpenEdit(true);
  };

  const handleCancel = () => {
    setOpenEdit(false);
    clearFields();
  };

  const clearFields = () => {
    setFname("");
    setLname("");
    setEmail("");
    setEmail("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
  };

  const updateUser = async (e) => {
    e.preventDefault();

    const customerData = {
        Customer_Fname: fname,
        Customer_Lname: lname,
        Customer_Email: email,
        Customer_Password: password,
        Customer_Address: address,
        Customer_City: city,
        Customer_State: state,
        Customer_Zipcode: zip,
        Customer_ID: currentAuthID
    };

    console.log("customerData", customerData);

    try {
      const response = await fetch(
        "https://museum3380-89554eee8566.herokuapp.com/customer",
        {
          method: "PUT",
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
      if (data.message === "An account with this email already exists") {
        setStatus("An account with this email already exists");
        alert("ERROR: An account with this email already exists");
      } else {
        setStatus("Profile update successful'");
        alert("Profile update successful");
        clearFields();
        setOpenEdit(false);
      }
    } catch (error) {
      console.log("There was an error fetching:", error);
    }
  };

  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className="pb-24 px-16">
      {customer.length > 0 ? (
        <form className={`${openEdit ? "flex flex-col space-y-12" : "hidden"}`} onSubmit={updateUser}>
          <div className="flex flex-col space-y-20">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-5xl font-fanwoodText">
                  Personal Information
                </h3>
                <CgClose
                  className="size-6 hover:text-cinnabar"
                  onClick={handleCancel}
                />
              </div>
              <div className="flex flex-row space-x-12">
                <div className="flex flex-col space-y-6 w-1/2">
                  <div className="flex flex-col space-y-2">
                    <label className="font-bold">First Name</label>
                    <input
                      type="text"
                      name="fname"
                      onChange={(e) => setFname(e.target.value)}
                      value={fname}
                      className="bg-white border border-obsidian rounded-md p-2"
                    ></input>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-bold">Last Name</label>
                    <input
                      type="text"
                      name="lname"
                      onChange={(e) => setLname(e.target.value)}
                      value={lname}
                      className="bg-white border border-obsidian rounded-md p-2"
                    ></input>
                  </div>
                  <div className="flex flex-col space-y-">
                    <label className="font-bold">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="bg-white border border-obsidian rounded-md p-2"
                    ></input>
                  </div>
                  <div className="flex flex-col space-y-">
                    <label className="font-bold">Password</label>
                    <input
                      type="text"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
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
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      className="bg-white border border-obsidian rounded-md p-2"
                    ></input>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-bold">City</label>
                    <input
                      type="text"
                      name="city"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                      className="bg-white border border-obsidian rounded-md p-2"
                    ></input>
                  </div>
                  <div className="flex flex-col space-y-">
                    <label className="font-bold">State</label>

                    <select
                      name="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="bg-white border border-obsidian rounded-md p-2"
                    >
                      {usStates.map((x, y) => (
                        <option value={x} key={y}>
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col space-y-">
                    <label className="font-bold">Zip Code</label>
                    <input
                      type="text"
                      name="zip"
                      onChange={(e) => setZip(e.target.value)}
                      value={zip}
                      className="bg-white border border-obsidian rounded-md p-2"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-obsidian text-chalk rounded-md p-4 font-bold text-xl hover:bg-cinnabar transition-all duration-500 ease-in-out"
          >
            Save Changes
          </button>
        </form>
      ) : null}

      {customer.length > 0 ? (
        <div className={`${openEdit ? "hidden" : "flex flex-col space-y-12"}`}>
          <div className="flex flex-col space-y-20">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-5xl font-fanwoodText">
                  Personal Information
                </h3>
                <LuPencil
                  className="size-6 hover:text-cinnabar"
                  onClick={handleEdit}
                />
              </div>

              <div className="flex flex-row space-x-12">
                <div className="flex flex-col space-y-6 w-1/2">
                  <div className="flex flex-col space-y-2">
                    <label className="font-bold">First Name</label>
                    <p className="">{customer[0].Customer_Fname}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-bold">Last Name</label>
                    <p className="">{customer[0].Customer_Lname}</p>
                  </div>
                  <div className="flex flex-col space-y-">
                    <label className="font-bold">Email Address</label>
                    <p className="">{customer[0].Customer_Email}</p>
                  </div>
                  <div className="flex flex-col space-y-">
                    <label className="font-bold">Password</label>
                    <p className="">{customer[0].Customer_Password}</p>
                  </div>
                </div>

                <div className="flex flex-col space-y-6 w-1/2">
                  <div className="flex flex-col space-y-2">
                    <label className="font-bold">Address</label>
                    <p className="">{customer[0].Customer_Address}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-bold">City</label>
                    <p className="">{customer[0].Customer_City}</p>
                  </div>
                  <div className="flex flex-col space-y-">
                    <label className="font-bold">State</label>
                    <p className="">{customer[0].Customer_State}</p>
                  </div>
                  <div className="flex flex-col space-y-">
                    <label className="font-bold">Zip Code</label>
                    <p className="">{customer[0].Customer_Zipcode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
