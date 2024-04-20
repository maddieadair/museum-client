import ShopManagerNavbar from "./../../components/shopManager/ShopManagerNavbar";
import ShopManagerBar from "./../../components/shopManager/ShopManagerBar";
import Placeholder from "../../assets/images/Abstract-Avatar-31-Square--Streamline-Abstract.svg";
import { MdOutlineMail } from "react-icons/md";
import { React, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ShopManagerAccount() {
  const { currentAuthID, currentAuthRole, logout } = useContext(AuthContext);
  const [info, setInfo] = useState([]);
  const [password, setPassword] = useState("******");

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
        return response.json();
      })
      .then((data) => {
        setInfo(data);
      });
  };

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      {info.length > 0 ? (
        <div className="flex flex-row">
          <ShopManagerNavbar />
          <div className="flex flex-col gap-y-8 w-full h-full pb-14">
            <ShopManagerBar title="Account" />

            <div className="flex flex-col gap-y-16 px-14">
              <div className="bg-white h-fit rounded-3xl p-8 border">
                <div className="flex flex-row gap-x-6">
                  <img
                    src={Placeholder}
                    alt="Logo"
                    className="w-1/5 rounded-3xl"
                  />
                  <div className="w-full p-4 flex flex-col gap-y-10 justify-between">
                    <div>
                      <div className="flex flex-row justify-between">
                        <h2 className="text-3xl font-bold">
                          {info[0].employee_fname} {info[0].employee_lname}
                        </h2>
                        <p className="text-sm">
                          Employee ID: {info[0].employee_id}
                        </p>
                      </div>
                      <p className="text-lg">{info[0].role}</p>
                      {info[0].department_name !== null ? (
                        <p>Department: {info[0].department_name}</p>
                      ) : null}
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row items-center gap-x-4">
                        <MdOutlineMail />
                        <p>{info[0].employee_email}</p>
                      </div>

                      {info[0].Supervisor_Fname !== 0 &&
                      info[0].Supervisor_Lname !== null ? (
                        <p>
                          <span className="font-bold">Reports to: </span>
                          {info[0].Supervisor_Fname} {info[0].Supervisor_Lname}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white h-full rounded-3xl p-10 flex flex-col gap-y-6 border">
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-2xl font-bold">Details</h2>
                </div>
                <div className="flex flex-col divide-y w-1/2">
                  <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                    <p className="font-bold">Email Address</p>
                    <p>{info[0].employee_email}</p>
                  </div>
                  <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                    <p className="font-bold">Password</p>
                    <p
                      onMouseEnter={() =>
                        setPassword(info[0].employee_password)
                      }
                      onMouseLeave={() => setPassword("*******")}
                    >
                      {password}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-x-12">
                  <div className="flex flex-col divide-y w-1/2">
                    <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                      <p className="font-bold">First Name</p>
                      <p>{info[0].employee_fname}</p>
                    </div>
                    {info[0].employee_mname !== null ? (
                      <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                        <p className="font-bold">Middle Name</p>
                        <p>{info[0].employee_mname}</p>
                      </div>
                    ) : null}
                    <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                      <p className="font-bold">Last Name</p>
                      <p>{info[0].employee_lname}</p>
                    </div>
                    <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                      <p className="font-bold">Sex</p>
                      <p>{info[0].sex}</p>
                    </div>
                    <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                      <p className="font-bold">DOB</p>
                      <p>{info[0].New_DOB}</p>
                    </div>
                  </div>
                  <div className="flex flex-col divide-y w-1/2">
                    <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                      <p className="font-bold">Address</p>
                      <p>{info[0].employee_address}</p>
                    </div>
                    <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                      <p className="font-bold">City</p>
                      <p>{info[0].employee_city}</p>
                    </div>
                    <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                      <p className="font-bold">State</p>
                      <p>{info[0].employee_state}</p>
                    </div>
                    <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                      <p className="font-bold">Zip Code</p>
                      <p>{info[0].employee_zipcode}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col divide-y w-1/2">
                  <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                    <p className="font-bold">Employee ID</p>
                    <p>{info[0].employee_id}</p>
                  </div>
                  <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                    <p className="font-bold">Role</p>
                    <p>{info[0].role}</p>
                  </div>

                  {info[0].department_name !== null ? (
                    <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                      <p className="font-bold">Department</p>
                      <p>{info[0].department_name}</p>
                    </div>
                  ) : null}
                  <div className="flex flex-row gap-x-6 py-4 items-center justify-between">
                    <p className="font-bold">Salary</p>
                    <p>${info[0].salary}</p>
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
