import AdminNavbar from "../components/AdminNavbar";
import AdminBar from "../components/AdminBar";
import { LuPencil } from "react-icons/lu";
import { React, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function AdminDonations() {
  const [stateArr, setStateArr] = useState([
    {
        ID: "123445",
        DonorFname: "John",
        DonorLname: "Doe",
        Datetime: "2018-06-12T19:30",
        Amount: "25",
        UserID: "11111",
    },
  ]);

  const [currIndex, setCurrentIndex] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [name, setName] = useState("");
  const [mfname, setMfname] = useState("");
  const [mlname, setMlname] = useState("");
  const [mID, setMID] = useState("");
  const [mStartDate, setMStartDate] = useState("");
  const [desc, setDesc] = useState("");

  const removeDept = () => {
    setStateArr(stateArr.filter((p, i) => currIndex !== i));
    setCurrentIndex(null);
  };

  const addDept = () => {
    setStateArr([
      ...stateArr,
      {
        name: name,
        mfname: mfname,
        mlname: mlname,
        mID: mID,
        mStartDate: mStartDate,
        desc: desc,
      },
    ]);
    setName("");
    setMfname("");
    setMlname("");
    setMID("");
    setMStartDate("");
    setDesc("");
    setOpenNew(false);
  };

  const clearFields = () => {
    setName("");
    setMfname("");
    setMlname("");
    setMID("");
    setMStartDate("");
    setDesc("");
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    const newArr = [...stateArr];
    newArr[currIndex][name] = value;
    setStateArr(newArr);
  };

  return (
    <div className="bg-[#F7f2f3] min-h-screen text-slate-700 font-inter">
    <div className="flex flex-row gap-x-10 pb-8 p-6">
      <AdminNavbar />
      <div className="flex flex-col gap-y-8 w-full h-full p-2">
          <AdminBar
            title="Donations"
            desc="Information about donations"
          />
          <div className="flex flex-row justify-between">
            <button
              type="button"
              onClick={() => setOpenNew(true)}
              className="bg-emerald-50 w-fit p-2 px-4 border border-emerald-600 text-emerald-600 rounded-xl flex flex-row gap-x-2 justify-between items-between"
            >
              <IoIosAdd className="size-6" />
              <p>Add New Department</p>
            </button>

            <div
              className={`${
                currIndex !== null ? "flex flex-row gap-x-4" : "hidden"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenView(true)}
                className="bg-gray-50 w-fit p-2 px-4 border border-gray-500 text-gray-500 rounded-xl flex flex-row gap-x-2 justify-between items-between"
              >
                <p>View</p>
              </button>
              <button
                type="button"
                onClick={() => setOpenEdit(true)}
                className="bg-amber-50 w-fit p-2 px-4 border border-amber-500 text-amber-500 rounded-xl flex flex-row gap-x-2 justify-between items-between"
              >
                <LuPencil className="size-6" />
                <p>Edit</p>
              </button>
              <button
                type="button"
                onClick={() => removeDept()}
                className="bg-rose-100 w-fit p-2 px-4 border border-rose-400 text-rose-400 rounded-xl flex flex-row gap-x-2 justify-between items-between"
              >
                <MdOutlineDelete className="size-6" />
                <p>Delete</p>
              </button>
            </div>
          </div>
          <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100">
            <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center">
              <MdOutlineCheckBoxOutlineBlank className="size-6" />
              <p className="w-1/6 ">ID</p>
              <p className="w-1/6 ">Donor First Name</p>
              <p className="w-1/6 ">Donor Last Name</p>
              <p className="w-1/6 ">Datetime</p>
              <p className="w-1/6 ">Amount</p>
              <p className="w-1/6 ">User ID</p>
            </div>
            {stateArr.map((donor, id) => (
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
                <p className="w-1/6 ">{donor.ID}</p>
                <p className="w-1/6 ">{donor.DonorFname}</p>
                <p className="w-1/6 ">{donor.DonorLname}</p>
                <p className="w-1/6 ">{donor.Datetime}</p>
                <p className="w-1/6 ">{donor.Amount}</p>
                <p className="w-1/6 ">{donor.UserID}</p>
              </div>
            ))}
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
                }}
              />
              <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Name</p>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Manager First Name</p>
                  <input
                    type="text"
                    name="mfname"
                    value={mfname}
                    onChange={(e) => setMfname(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Manager Last Name</p>
                  <input
                    type="text"
                    name="mlname"
                    value={mlname}
                    onChange={(e) => setMlname(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold"> Manager ID</p>
                  <input
                    type="text"
                    name="mID"
                    value={mID}
                    onChange={(e) => setMID(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Manager Start Date</p>
                  <input
                    type="date"
                    name="mStartDate"
                    value={mStartDate}
                    onChange={(e) => setMStartDate(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Description</p>
                  <input
                    type="text"
                    name="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
              onClick={() => addDept()}
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
                    setOpenEdit(false);
                    clearFields();
                    setCurrentIndex(null);
                  }}
                />
                <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Name</p>
                    <input
                      type="text"
                      value={stateArr[currIndex].name}
                      name="name"
                      onChange={(e) => handleChange(e)}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Manager First Name</p>
                    <input
                      type="text"
                      name="mfname"
                      onChange={(e) => handleChange(e)}
                      value={stateArr[currIndex].mfname}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Manager Last Name</p>
                    <input
                      type="text"
                      name="mlname"
                      onChange={(e) => handleChange(e)}
                      value={stateArr[currIndex].mlname}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Manager ID</p>
                    <input
                      type="text"
                      name="mID"
                      onChange={(e) => handleChange(e)}
                      value={stateArr[currIndex].mID}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Manager Start Date</p>
                    <input
                      type="date"
                      name="mStartDate"
                      onChange={(e) => handleChange(e)}
                      value={stateArr[currIndex].mStartDate}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Description</p>
                    <input
                      type="text"
                      name="desc"
                      onChange={(e) => handleChange(e)}
                      value={stateArr[currIndex].desc}
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
                  <p className="font-bold">Name</p>
                  <p>{stateArr[currIndex].name}</p>
                </div>
                <div className="flex flex-row justify-between p-4">
                  <p className="font-bold">Manager First Name</p>
                  <p>{stateArr[currIndex].mfname}</p>
                </div>
                <div className="flex flex-row justify-between p-4">
                  <p className="font-bold">Manager Last Name</p>
                  <p>{stateArr[currIndex].mlname}</p>
                </div>
                <div className="flex flex-row justify-between p-4">
                  <p className="font-bold">Manager ID</p>
                  <p>{stateArr[currIndex].mID}</p>
                </div>
                <div className="flex flex-row justify-between p-4">
                  <p className="font-bold">Manager Start Date</p>
                  <p>{stateArr[currIndex].mStartDate}</p>
                </div>
                <div className="flex flex-row justify-between p-4">
                  <p className="font-bold">Description</p>
                  <p>{stateArr[currIndex].desc}</p>
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
