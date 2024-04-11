import DirectorNavbar from "../../components/director/DirectorNavbar";
import DirectorBar from "../../components/director/DirectorBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

export default function DirectorCollections() {
  const [status, setStatus] = useState("");
  const [departments, setDepartments] = useState([]);
  const [currInput, setCurrentInput] = useState({});
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [deptName, setDeptName] = useState("");
  const [managerStart, setMgrStart] = useState("");
  const [deptMgrID, setDeptMgrID] = useState("");
  const [deptDescr, setDeptDescr] = useState("");

  const [managers, setManagers] = useState("");
  const [newManagers, setNewManagers] = useState("");

  useEffect(() => {
    fetchDepartments();
    fetchNewManagers();
    fetchManagers();
  }, []);

  const validate = () => {
    let hasErrors = false;

    if (deptName === "" || deptName === null) {
        hasErrors = true;
    }
    if (deptDescr === "" || deptDescr === null) {
        hasErrors = true;
    }

    return hasErrors;
  }

  const addDepartment = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors){
        alert("Please fill in all required fields.")
        return;
    }

    if (deptMgrID === 0) {
      setDeptMgrID("");
    }


    const departmentData = {
      department_name: deptName,
      manager_start_date: managerStart,
      department_manager_id: deptMgrID,
      Department_Description: deptDescr,
    };

    console.log("departmentData", departmentData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departmentData),
      });

      if (!response.ok) {
        throw new Error("There was an error completing your request.");
      }

      const data = await response.json();
      console.log(data);
      setStatus("Department added successfully");
      alert("Department added successfully");
      clearFields();
      setOpenNew(false);
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  const clearFields = () => {
    setDeptDescr("");
    setDeptName("");
    setDeptMgrID("");
    setMgrStart("");
    setCurrentInput({});
  };

  const handleEdit = () => {
    setDeptDescr(currInput.Department_Description);
    setDeptName(currInput.department_name);
    setDeptMgrID(
      currInput.department_manager_id !== null
        ? currInput.department_manager_id
        : ""
    );
    setMgrStart(currInput.New_MgrStart !== null ? currInput.New_MgrStart : "");
    setOpenEdit(true);
  };

  const handleCancel = () => {
    setOpenEdit(false);
    clearFields();
  };

  const fetchDepartments = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/departments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDepartments(data);
        console.log("departments", data);
      });
  };

  const fetchManagers = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/managers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setManagers(data);
        console.log("managers", managers)
      });
  };

  const fetchNewManagers = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/new-managers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNewManagers(data);
      });
  };

  const updateDepartment = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors){
        alert("Please fill in all required fields.")
        return;
    }


    if (deptMgrID === 0 || deptMgrID === "" || deptMgrID === null) {
      setDeptMgrID("");
    }

    if (managerStart === "" || managerStart === null) {
      setMgrStart("");
    }

    const departmentData = {
      department_name: deptName,
      manager_start_date: managerStart,
      department_manager_id: deptMgrID,
      Department_Description: deptDescr,
      department_id: currInput.department_id,
    };

    console.log("departmentData", departmentData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/department", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departmentData),
      });

      if (!response.ok) {
        throw new Error("Error processing request");
      }

      const data = await response.json();
      console.log("data:", data);
      //   if (data.message === "Closing Date cannot be before Opening Date") {
      //     alert("Closing Date cannot be before Opening Date");
      //     return;
      //   } else if (
      //     data.message === "Opening/Closing Date cannot be before today"
      //   ) {
      //     alert("Opening/Closing Date cannot be before today");
      //     return;
      //   } else {
      // setStatus("Exhibition updated successfully");
      alert("Department successfully updated!");
      clearFields();
      setOpenEdit(false);
      //   }
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  const deleteDepartment = async (e) => {
    e.preventDefault();

    if (
      window.confirm(
        "Are you sure you want to permanently delete this department?"
      ) === false
    ) {
      setCurrentInput({});
      return;
    }

    const deptInfo = {
      department_id: currInput.department_id,
    };

    console.log("employeeData", deptInfo);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/department", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deptInfo),
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
      alert("Department successfully deleted!");
      clearFields();
      //   }
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  console.log("mgr id", deptMgrID);
  console.log("curr input", currInput)
  console.log("start", typeof(managerStart))

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <DirectorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <DirectorBar title="Departments" />

          <div className="flex flex-col px-14 gap-y-12">
            <div className="flex flex-row justify-between">
              <button
                type="button"
                onClick={() => {
                  setOpenNew(true);
                  setCurrentInput({});
                }}
                className="bg-[#3d7b51] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
              >
                <IoIosAdd className="size-6" />
                <p>Add New Department</p>
              </button>

              <div
                className={`${
                  Object.keys(currInput).length !== 0
                    ? "flex flex-row gap-x-4"
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

                <button
                  type="button"
                  onClick={handleEdit}
                  className="bg-[#cdb65e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                >
                  <LuPencil className="size-4" />
                  <p>Edit</p>
                </button>

                <button
                  type="button"
                  onClick={deleteDepartment}
                  className="bg-[#bf6f5e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                >
                  <MdOutlineDelete className="size-4" />
                  <p>Delete</p>
                </button>
              </div>
            </div>

            {departments.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-1/4 ">Department ID</p>
                  <p className="w-1/4 ">Name</p>
                  <p className="w-1/4 ">Manager</p>
                  <p className="w-1/4 ">Manager Start Date</p>
                </div>
                {departments.map((item, id) => (
                  <div
                    key={item.department_id}
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
                    <p className="w-1/4 ">{item.department_id}</p>
                    <p className="w-1/4 ">{item.department_name}</p>
                    {item.department_manager_id !== null ? (
                      <p className="w-1/4 ">
                        {item.manager_fname} {item.manager_lname}
                      </p>
                    ) : (
                      <p className="w-1/4 ">N/A</p>
                    )}
                    {item.New_MgrStart !== null ? (
                      <p className="w-1/4 ">{item.New_MgrStart}</p>
                    ) : (
                      <p className="w-1/4 ">N/A</p>
                    )}
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
                  <p className="font-bold">Department ID</p>
                  <p className="">{currInput.department_id}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Name</p>
                  <p className="">{currInput.department_name}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Manager ID</p>
                  <p className="">{currInput.department_manager_id}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Manager</p>
                  <p className="">
                    {currInput.manager_fname} {currInput.manager_lname}
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Manager Start Date</p>
                  <p className="">{currInput.New_MgrStart}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Description</p>
                  <p className="w-1/2 text-end">
                    {currInput.Department_Description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {openNew ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <form
            className="bg-white rounded-3xl shadow-md flex flex-col h-fit w-1/2 "
            onSubmit={addDepartment}
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
                  <p className="font-bold">
                    Department Name{" "}
                    <span className="text-cinnabar font-normal">*</span>
                  </p>
                  <input
                    type="text"
                    name="deptName"
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Manager</p>
                  <select
                    name="deptMgrID"
                    value={deptMgrID}
                    onChange={(e) => setDeptMgrID(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  >
                    <option value="0">N/A</option>
                    {newManagers.map((x, y) => (
                      <option value={x.employee_id} key={x.employee_id}>
                        {x.employee_fname} {x.employee_lname}
                      </option>
                    ))}
                  </select>
                </div>
                {deptMgrID.length !== 0 ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Manager Start Date</p>
                    <input
                      type="date"
                      name="managerStart"
                      value={managerStart}
                      onChange={(e) => setMgrStart(e.target.value)}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                    ></input>
                  </div>
                ) : null}
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">
                    Description{" "}
                    <span className="text-cinnabar font-normal">*</span>
                  </p>
                  <textarea
                    name="deptDescr"
                    value={deptDescr}
                    rows="4"
                    onChange={(e) => setDeptDescr(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
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
            className="bg-white rounded-3xl h-fit max-h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col"
            onSubmit={updateDepartment}
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
                  <p className="font-bold">Department ID</p>
                  <p className="">{currInput.department_id}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">
                    Department Name{" "}
                    <span className="text-cinnabar font-normal">*</span>
                  </p>
                  <textarea
                    name="deptName"
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2 h-20"
                  ></textarea>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Manager ID</p>
                  <p className="">
                    {currInput.department_manager_id !== null
                      ? currInput.department_manager_id
                      : `N/A`}
                  </p>
                </div>
                {currInput.department_manager_id === null ?
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Manager</p>
                  <select
                    name="deptMgrID"
                    value={deptMgrID}
                    onChange={(e) => setDeptMgrID(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  >
                    <option value="0">N/A</option>
                    {newManagers.map((x, y) => (
                      <option value={x.employee_id} key={x.employee_id}>
                        {x.employee_fname} {x.employee_lname}
                      </option>
                    ))}
                  </select>
                </div> : <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Manager</p>
                  <p className="">{currInput.manager_fname} {currInput.manager_lname}</p>
                </div> }
                {currInput.New_MgrStart !== null ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Manager Start Date</p>
                    <p className="">{currInput.New_MgrStart}</p>
                  </div>
                ) : (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Manager Start Date</p>
                    <input
                      type="date"
                      name="managerStart"
                      value={managerStart}
                      onChange={(e) => setMgrStart(e.target.value)}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                    ></input>
                  </div>
                )}
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">
                    Description{" "}
                    <span className="text-cinnabar font-normal">*</span>
                  </p>
                  <textarea
                    name="deptDescr"
                    value={deptDescr}
                    rows="4"
                    onChange={(e) => setDeptDescr(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2 h-48"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
              onClick={() => {}}
            >
              Save
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
