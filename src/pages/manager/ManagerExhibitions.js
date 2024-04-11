import ManagerNavbar from "../../components/manager/ManagerNavbar";
import ManagerBar from "../../components/manager/ManagerBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { LuArchive } from "react-icons/lu";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { IoWarningOutline } from "react-icons/io5";

export default function ManagerExhibitions() {
  const { currentAuthID, currentAuthRole, logout, currentAuthDep } =
    useContext(AuthContext);

  const [status, setStatus] = useState("");
  const [exhibits, setExhibits] = useState([]);
  const [currInput, setCurrentInput] = useState({});
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [curatorID, setCuratorID] = useState("");

  const currDate = new Date().toJSON().slice(0, 10);
  const cur = new Date();
  const defaultEnd = new Date(cur.setDate(cur.getDate() + 1));
  const endFormatted = defaultEnd.toJSON().slice(0, 10);

  const [open, setOpen] = useState(currDate);
  const [close, setClose] = useState(endFormatted);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchExhibits();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const employeeInfo = {
      supervisor_id: currentAuthID,
    };
    console.log("fetch exhibit info", employeeInfo);
    fetch("http://localhost:3001/suboordinates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeInfo),
    })
      .then((response) => {
        // console.log("repsonse:", response);
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        console.log("employees", data);
      });
  };

  const addExhibit = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors){
        alert("Please fill in all required fields.")
        return;
    }

    if (curatorID === -1) {
      setCuratorID("");
    }

    const exhibitData = {
      Exhibit_Name: name,
      Description: description,
      Opening_Date: open,
      End_Date: close,
      Curator_ID: curatorID,
      Exhibition_Department: currentAuthDep,
    };

    console.log("employeeData", exhibitData);

    try {
      const response = await fetch("http://localhost:3001/exhibitions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exhibitData),
      });

      if (!response.ok) {
        throw new Error("There was an error completing the request.");
      }

      const data = await response.json();
      console.log(data);
      if (data.message === "Closing Date cannot be before Opening Date") {
        alert("Closing Date cannot be before Opening Date");
        return;
      } else if (
        data.message === "Opening/Closing Date cannot be before today"
      ) {
        alert("Opening/Closing Date cannot be before today");
        return;
      } else {
        setStatus("Exhibition added successfully");
        alert("Exhibition added successfully!");
        clearFields();
        setOpenNew(false);
      }
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  const clearFields = () => {
    setName("");
    setDescription("");
    setOpen("");
    setClose("");
    setCuratorID("");
    setCurrentInput({});
  };
  const handleEdit = () => {
    setName(currInput.Exhibit_Name);
    setDescription(currInput.Description);
    setCuratorID(currInput.Curator_ID);
    setOpen(new Date(currInput.Opening_Date).toJSON().slice(0, 10));
    setClose(new Date(currInput.End_Date).toJSON().slice(0, 10));
    setOpenEdit(true);
  };

  const handleCancel = () => {
    setOpenEdit(false);
    clearFields();
  };

  const validate = () => {
    let hasErrors = false;

    if (name === "" || name === null) {
        hasErrors = true;
    }
    if (description === "" || description === null) {
        hasErrors = true;
    }

    return hasErrors;
  }

  const fetchExhibits = async () => {
    const curatorInfo = {
      Exhibition_Department: currentAuthDep,
    };
    console.log("fetch exhibit info", curatorInfo);
    fetch("http://localhost:3001/dept-exhibits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(curatorInfo),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExhibits(data);
        console.log("data", data);
      });
  };

  const archiveExhibit = async (e) => {
    e.preventDefault();

    if (
      window.confirm("Are you sure you want to archive this exhibition?") ===
      false
    ) {
      setCurrentInput({});
      return;
    }

    const employeeData = {
      Exhibit_ID: currInput.Exhibit_ID,
    };

    console.log("employeeData", employeeData);

    try {
      const response = await fetch("http://localhost:3001/archive-exhibit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("There was an issue processing the request");
      }

      const data = await response.json();
      console.log(data);
      //   if (data.message === "Error archiving exhibition") {
      //     // setStatus("Error deleting employee");
      //     alert("Error archiving exhibition");
      //   } else {
      // setStatus("Employee successfully deleted!'");
      alert("Exhibition successfully archived!");
      clearFields();
      //   }
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  const deleteExhibit = async (e) => {
    e.preventDefault();

    if (
      window.confirm(
        "Are you sure you want to permanently delete this exhibition?"
      ) === false
    ) {
      setCurrentInput({});
      return;
    }

    const employeeData = {
      Exhibit_ID: currInput.Exhibit_ID,
    };

    console.log("employeeData", employeeData);

    try {
      const response = await fetch("http://localhost:3001/exhibition", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("There was an issue processing the request");
      }

      const data = await response.json();
      console.log(data);
      //   if (data.message === "Error archiving exhibition") {
      //     // setStatus("Error deleting employee");
      //     alert("Error archiving exhibition");
      //   } else {
      // setStatus("Employee successfully deleted!'");
      alert("Exhibition successfully deleted!");
      clearFields();
      //   }
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  const updateExhibit = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors){
        alert("Please fill in all required fields.")
        return;
    }

    if (curatorID === -1) {
      setCuratorID("");
    }

    const exhibitData = {
      Exhibit_Name: name,
      Description: description,
      Opening_Date: open,
      End_Date: close,
      Curator_ID: curatorID,
      Exhibition_Department: currInput.Exhibition_Department,
      Exhibit_ID: currInput.Exhibit_ID,
    };

    console.log("exhibitData", exhibitData);

    try {
      const response = await fetch("http://localhost:3001/exhibition", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exhibitData),
      });

      if (!response.ok) {
        throw new Error("Error processing request");
      }

      const data = await response.json();
      console.log("data:", data);
      if (data.message === "Closing Date cannot be before Opening Date") {
        alert("Closing Date cannot be before Opening Date");
        return;
      } else if (
        data.message === "Opening/Closing Date cannot be before today"
      ) {
        alert("Opening/Closing Date cannot be before today");
        return;
      } else {
        setStatus("Exhibition updated successfully");
        alert("Exhibition updated successfully!");
        clearFields();
        setOpenEdit(false);
      }
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  console.log(currInput);
  console.log("curatorID", curatorID);

  //   console.log("employees", employees)
  //   console.log(currInput);

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <ManagerNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <ManagerBar title="Exhibitions" />

          <div className="flex flex-col px-14 gap-y-12">
            <div className="flex flex-row justify-between">
              <button
                type="button"
                onClick={() => {
                  setOpen(currDate);
                  setClose(endFormatted);
                  setOpenNew(true);
                  setCurrentInput({});
                }}
                className="bg-[#3d7b51] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
              >
                <IoIosAdd className="size-6" />
                <p>Add New Exhibition</p>
              </button>

              <div
                className={`${
                  Object.keys(currInput).length !== 0
                    ? "flex flex-row justify-end gap-x-4"
                    : "hidden"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenView(true)}
                  className={`${
                    Object.keys(currInput).length !== 0
                      ? "bg-[#bcb6b4] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                      : "hidden"
                  }`}
                >
                  <p>View More Details</p>
                  <IoIosMore className="size-4" />
                </button>

                {currInput.isArchived === 0 ? (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="bg-[#cdb65e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                  >
                    <LuPencil className="size-4" />
                    <p>Edit</p>
                  </button>
                ) : null}

                {currInput.isArchived === 0 ? (
                  <button
                    type="button"
                    onClick={archiveExhibit}
                    className="bg-[#bf6f5e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                  >
                    <LuArchive className="size-4" />
                    <p>Archive</p>
                  </button>
                ) : null}

                {currInput.isArchived === 0 ? (
                  <button
                    type="button"
                    onClick={deleteExhibit}
                    className="bg-obsidian w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                  >
                    <IoWarningOutline className="size-4" />
                    <p>Delete</p>
                  </button>
                ) : null}
              </div>
            </div>

            {exhibits.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-32 ">Exhibition ID</p>
                  <p className="w-1/6 ">Name</p>
                  <p className="w-1/6 ">Opening Date</p>
                  <p className="w-1/6 ">Closing Date</p>
                  <p className="w-1/6 ">Description</p>
                  <p className="w-1/6 ">Curator</p>
                  <p className="w-1/6 ">Archived Status</p>
                </div>
                {exhibits.map((item, id) => (
                  <div
                    key={item.Exhibit_ID}
                    className="flex flex-row gap-x-6 p-6 group"
                  >
                    {currInput === item ? (
                      <MdOutlineCheckBox
                        className="size-6 text-rose-400"
                        onClick={() => setCurrentInput({})}
                      />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        className="size-6 group-hover:visible invisible"
                        onClick={() => setCurrentInput(item)}
                      />
                    )}{" "}
                    <p className="w-32 ">{item.Exhibit_ID}</p>
                    <p className="w-1/6 ">{item.Exhibit_Name}</p>
                    <p className="w-1/6 ">{item.New_Open_Date}</p>
                    <p className="w-1/6">{item.New_End_Date}</p>
                    <p className="w-1/6 line-clamp-3">{item.Description}</p>
                    {item.Curator_ID !== null ?
                    <p className="w-1/6">
                      {item.curator_fname} {item.curator_lname}
                    </p> : <p className="w-1/6">
                      N/A
                    </p> }
                    <p className="w-1/6">
                      {item.isArchived === 1 ? `Archived` : ``}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {openView ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <div className="bg-white rounded-3xl h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col">
            <div className="flex flex-col">
              <IoClose
                className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                onClick={() => {
                  setCurrentInput({});
                  setOpenView(false);
                }}
              />
              <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Exhibition ID</p>
                  <p className="">{currInput.Exhibit_ID}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Name</p>
                  <p className="w-1/2 text-end">{currInput.Exhibit_Name}</p>
                </div>
                {currInput.Curator_ID !== null ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Curator</p>
                    <p className="">
                      {currInput.curator_fname} {currInput.curator_lname}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Curator</p>
                    <p className="">N/A</p>
                  </div>
                )}
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Opening Date</p>
                  <p className="">{currInput.New_Open_Date}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Closing Date</p>
                  <p className="">{currInput.New_End_Date}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Description</p>
                  <p className="w-1/2 text-end">{currInput.Description}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold"># of Tickets Sold</p>
                  <p className="">{currInput.Tickets_Sold}</p>
                </div>
                {currInput.isArchived === 1 ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Archived Status</p>
                    <p className="">Archived</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {openNew ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <form
            className="bg-white rounded-3xl shadow-md flex flex-col h-fit max-h-[38rem] overflow-auto w-1/2 "
            onSubmit={addExhibit}
          >
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
                  <p className="font-bold">Name <span className="text-cinnabar font-normal">*</span></p>
                  <textarea
                    name="fname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  ></textarea>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Opening Date</p>
                  <input
                    type="date"
                    name="openingDate"
                    value={open}
                    min={currDate}
                    onChange={(e) => setOpen(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Closing Date</p>
                  <input
                    type="date"
                    name="closeDate"
                    value={close}
                    min={endFormatted}
                    onChange={(e) => setClose(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Curator</p>
                  <select
                    type="text"
                    name="curatorID"
                    onChange={(e) => setCuratorID(e.target.value)}
                    value={curatorID}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  >
                    <option value="-1">N/A</option>

                    {employees.map((ex) => (
                      <option value={ex.employee_id} key={ex.employee_id}>
                        {ex.employee_fname} {ex.employee_lname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Description <span className="text-cinnabar font-normal">*</span></p>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2 h-48"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
            >
              Add
            </button>
          </form>
        </div>
      ) : null}

      {openEdit ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <form
            className="bg-white rounded-3xl h-fit w-1/2 shadow-md flex flex-col"
            onSubmit={updateExhibit}
          >
            <div className="flex flex-col">
              <IoClose
                className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                onClick={() => {
                  handleCancel();
                }}
              />
              <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
              <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Exhibition ID</p>
                  <p className="">{currInput.Exhibit_ID}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Name <span className="text-cinnabar font-normal">*</span></p>
                  <textarea
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  ></textarea>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Opening Date</p>
                  <input
                    type="date"
                    name="open"
                    onChange={(e) => setOpen(e.target.value)}
                    value={open}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Closing Date</p>
                  <input
                    type="date"
                    name="close"
                    onChange={(e) => setClose(e.target.value)}
                    value={close}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Curator</p>
                  <select
                    type="text"
                    name="curatorID"
                    onChange={(e) => setCuratorID(e.target.value)}
                    value={curatorID}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  >
                    <option value="-1">N/A</option>

                    {employees.map((ex) => (
                      <option value={ex.employee_id} key={ex.employee_id}>
                        {ex.employee_fname} {ex.employee_lname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Description <span className="text-cinnabar font-normal">*</span></p>
                  <textarea
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2 h-56"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
            >
              Save
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
