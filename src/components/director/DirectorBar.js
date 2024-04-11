import { Link } from "react-router-dom";
// import Placeholder from "../assets/Abstract-Avatar-17-Circle--Streamline-Abstract-2.svg";
import { React, useState, useContext, useEffect } from "react";
import Placeholder from "../../assets/images/Abstract-Avatar-8-Square--Streamline-Abstract.svg";
import { AuthContext } from "../../context/AuthContext";

export default function DirectorBar({ title }) {
  const [showMenu, setShowMenu] = useState(false);
  const { currentAuthID, currentAuthRole, logout } = useContext(AuthContext);

  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    const employeeInfo = {
      employee_id: currentAuthID,
    };
    console.log("fetch exhibit info", employeeInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/employee-ID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeInfo),
    })
      .then((response) => {
        console.log("repsonse:", response);
        return response.json();
      })
      .then((data) => {
        setInfo(data);
      });
  };

  return (
    <div>
        {info.length > 0 ?
        <div className="h-16 w-full text-slate-700 flex flex-row justify-between items-center gap-x-4 font-inter p-14 border-b ">
          <div className="flex flex-col font-hk-grotesk">
            <h1 className="text-4xl font-fanwoodText italic">{title}</h1>
          </div>
          <div className="flex flex-row gap-x-4 items-center">
            <p className="font-bold">{info[0].employee_fname} {info[0].employee_lname}</p>
            <img
              src={Placeholder}
              alt="Placeholder"
              className="h-10 hover:cursor-pointer rounded-xl"
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
          {/* <div className="h-full">
            <img src={Placeholder} alt="Placeholder" className="h-full border-2" />
          </div> */}
          <div
            className={`${
              showMenu
                ? "shadow-md text-gray-500 w-64 bg-white rounded-2xl flex flex-col pt-4 top-24 right-8 absolute border"
                : "hidden"
            }`}
          >
            <div className="px-6 pb-4 break-words">
              <p className="font-bold text-gray-700">{info[0].employee_fname} {info[0].employee_lname}</p>
              <p className="">{info[0].employee_email}</p>
            </div>
            <hr></hr>
            <Link
              to="/director/account"
              className="px-6 py-3 hover:bg-gray-100"
            >
              Profile
            </Link>
            <hr></hr>
            <button
              type="button"
              className="rounded-b-2xl px-6 py-3 hover:bg-gray-100 text-left"
              onClick={logout}
            >
              Sign Out
            </button>
          </div>
        </div>
        : null }
    </div>
  );
}
