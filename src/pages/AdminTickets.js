import AdminNavbar from "../components/AdminNavbar";
import AdminBar from "../components/AdminBar";
import { LuPencil } from "react-icons/lu";
import { React, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function AdminTickets() {
  const [stateArr, setStateArr] = useState([
    {
      employeeid: "1234567890",
      fname: "John",
      lname: "Doe",
      email: "johndoe@gmail.com",
      role: "Curator",
      salary: "96,000",
    },
    {
      employeeid: "0987654321",
      fname: "Kate",
      lname: "Johnson",
      email: "kjohnson@gmail.com",
      role: "Curator",
      salary: "54,000",
    },
  ]);

  const [currIndex, setCurrentIndex] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [employeeID, setEmployeeID] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");

  const [currInput, setCurrentInput] = useState({
    employeeid: "",
    fname: "",
    lname: "",
    email: "",
    role: "",
    salary: "",
  });

  const removePerson = () => {
    setStateArr(stateArr.filter((p, i) => currIndex !== i));
    setCurrentIndex(null);
  };

  const addPerson = () => {
    setStateArr([
      ...stateArr,
      {
        employeeid: employeeID,
        fname: fname,
        lname: lname,
        email: email,
        role: role,
        salary: salary,
      },
    ]);
    clearFields();
    setOpenNew(false);
  };

  const clearFields = () => {
    setEmployeeID("");
    setFname("");
    setLname("");
    setEmail("");
    setRole("");
    setSalary("");
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    const newArr = [...stateArr];
    newArr[currIndex][name] = value;
    setStateArr(newArr);
  };

  const handleEdit = () => {
    setCurrentInput({
      ...currInput,
      employeeid: stateArr[currIndex].employeeid,
      fname: stateArr[currIndex].fname,
      lname: stateArr[currIndex].lname,
      email: stateArr[currIndex].email,
      role: stateArr[currIndex].role,
      salary: stateArr[currIndex].salary,
    });
    setOpenEdit(true);
  };

  const handleCancel = () => {
    const newArr = [...stateArr];
    newArr[currIndex] = currInput;
    setStateArr(newArr);

    setOpenEdit(false);
    clearFields();
    setCurrentIndex(null);

    setCurrentInput({
      ...currInput,
      employeeid: "",
      fname: "",
      lname: "",
      email: "",
      role: "",
      salary: "",
    });
  };

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <AdminNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <AdminBar
            title="Tickets"
          />
          <div className="flex flex-col px-14 gap-y-12">
              <div className="flex flex-row justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setOpenNew(true);
                    setCurrentIndex(null);
                  }}                  className="bg-[#3d7b51] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-between"
                >
                  <IoIosAdd className="size-6" />
                  <p>Add New Employee</p>
                </button>
                <div
                  className={`${
                    currIndex !== null ? "flex flex-row gap-x-4" : "hidden"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenView(true)}
                    className="bg-[#bcb6b4] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-between"
                    >
                    <p>View</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit()}
                    className="bg-[#cdb65e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-between"
                    >
                    <LuPencil className="size-6" />
                    <p>Edit</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => removePerson()}
                    className="bg-[#bf6f5e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-between"
                    >
                    <MdOutlineDelete className="size-6" />
                    <p>Delete</p>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-1/6 ">Employee ID</p>
                  <p className="w-1/6 ">First Name</p>
                  <p className="w-1/6 ">Last Name</p>
                  <p className="w-1/6 ">Email</p>
                  <p className="w-1/6 ">Role</p>
                  <p className="w-1/6 ">Salary</p>
                </div>
                {stateArr.map((person, id) => (
                  <div key={id} className="flex flex-row gap-x-6 p-6 group">
                    {currIndex === id ? (
                      <MdOutlineCheckBox
                        className="size-6 text-rose-400"
                        onClick={() => setCurrentIndex(null)}
                      />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        className="size-6 group-hover:visible invisible"
                        onClick={() => setCurrentIndex(id)}
                      />
                    )}{" "}
                    <p className="w-1/6 ">{person.employeeid}</p>
                    <p className="w-1/6 ">{person.fname}</p>
                    <p className="w-1/6 ">{person.lname}</p>
                    <p className="w-1/6 ">{person.email}</p>
                    <p className="w-1/6 ">{person.role}</p>
                    <p className="w-1/6 ">${person.salary}</p>
                  </div>
                ))}
              </div>
                      </div>
                    </div>
          </div>

      {openNew ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <form className="bg-white rounded-3xl h-fit w-1/2 shadow-md flex flex-col">
            <div className="flex flex-col">
              <IoClose
                className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                onClick={() => {
                  setOpenNew(false);
                  clearFields();
                  setCurrentIndex(null);

                }}
              />
              <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Employee ID</p>
                  <input
                    type="text"
                    name="employeeid"
                    value={employeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">First Name</p>
                  <input
                    type="text"
                    name="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Last name</p>
                  <input
                    type="text"
                    name="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Email Address</p>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Role</p>
                  <input
                    type="text"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Salary</p>
                  <input
                    type="text"
                    name="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
              onClick={() => addPerson()}
            >
              Add
            </button>
          </form>
        </div>
      ) : null}

      {openEdit || openView ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          {openEdit ? (
            <form className="bg-white rounded-3xl h-fit w-1/2 shadow-md flex flex-col">
              <div className="flex flex-col">
                <IoClose
                  className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                  onClick={() => {
                    handleCancel();
                  }}
                />
                <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Employee ID</p>
                    <input
                      type="text"
                      value={stateArr[currIndex].employeeid}
                      name="employeeid"
                      onChange={(e) => handleChange(e)}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">First Name</p>
                    <input
                      type="text"
                      name="fname"
                      onChange={(e) => handleChange(e)}
                      value={stateArr[currIndex].fname}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Last name</p>
                    <input
                      type="text"
                      name="lname"
                      onChange={(e) => handleChange(e)}
                      value={stateArr[currIndex].lname}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Email Address</p>
                    <input
                      type="text"
                      name="email"
                      onChange={(e) => handleChange(e)}
                      value={stateArr[currIndex].email}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Role</p>
                    <input
                      type="text"
                      name="role"
                      onChange={(e) => handleChange(e)}
                      value={stateArr[currIndex].role}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Salary</p>
                    <input
                      type="text"
                      name="salary"
                      onChange={(e) => handleChange(e)}
                      value={stateArr[currIndex].salary}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
                onClick={() => {
                  setOpenEdit(false);
                  setCurrentIndex(null);
                }}
              >
                Save
              </button>
            </form>
          ) : null}

          {openView ? (
            <div className="bg-white rounded-3xl h-fit w-1/2 shadow-md flex flex-col">
              <div className="flex flex-col divide-y-2 divide-slate-100 p-6">
                <div className="flex flex-row justify-between p-4">
                  <p className="font-bold">Employee ID</p>
                  <p>{stateArr[currIndex].employeeid}</p>
                </div>
                <div className="flex flex-row justify-between p-4">
                  <p className="font-bold">First Name</p>
                  <p>{stateArr[currIndex].fname}</p>
                </div>
                <div className="flex flex-row justify-between p-4">
                  <p className="font-bold">Last name</p>
                  <p>{stateArr[currIndex].lname}</p>
                </div>
                <div className="flex flex-row justify-between p-4">
                  <p className="font-bold">Email Address</p>
                  <p>{stateArr[currIndex].email}</p>
                </div>
                <div className="flex flex-row justify-between p-4">
                  <p className="font-bold">Role</p>
                  <p>{stateArr[currIndex].role}</p>
                </div>
                <div className="flex flex-row justify-between p-4">
                  <p className="font-bold">Salary</p>
                  <p>${stateArr[currIndex].salary}</p>
                </div>
              </div>

              <button
                type="button"
                className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
                onClick={() => {
                  setOpenView(false);
                  setCurrentIndex(null);
                }}
              >
                Close
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
