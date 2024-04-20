import ManagerNavbar from "../../components/manager/ManagerNavbar";
import ManagerBar from "../../components/manager/ManagerBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { IoWarningOutline } from "react-icons/io5";

export default function ManagerCollections() {
  const { currentAuthID, currentAuthRole, logout, currentAuthDep } =
    useContext(AuthContext);

  const [status, setStatus] = useState("");
  const [collections, setCollections] = useState([]);
  const [currInput, setCurrentInput] = useState({});
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [curatorID, setCuratorID] = useState("");
  const [collectionID, setCollectionID] = useState("");

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchcollections();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const employeeInfo = {
      supervisor_id: currentAuthID,
    };
    console.log("fetch exhibit info", employeeInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/suboordinates", {
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

  const addCollection = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors){
        alert("Please fill in all required fields.")
        return;
    }

    if (curatorID === "-1") {
      setCuratorID("");
    }

    const collectionData = {
        collection_name: name,
        collection_description: description,
        collection_curator_ID: curatorID,
        collection_departmentID: currentAuthDep,
    };

    console.log("employeeData", collectionData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionData),
      });

      if (!response.ok) {
        throw new Error("There was an error completing the request.");
      }

      const data = await response.json();
      console.log(data);
    //   if (data.message === "Closing Date cannot be before Opening Date") {
    //     alert("Closing Date cannot be before Opening Date");
    //     return;
    //   } else if (
    //     data.message === "Opening/Closing Date cannot be before today"
    //   ) {
    //     alert("Opening/Closing Date cannot be before today");
    //     return;
    //   } else {
    //     setStatus("Exhibition added successfully");
        alert("Collection successfully added!");
        clearFields();
        setOpenNew(false);
    //   }
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  const clearFields = () => {
    setName("");
    setDescription("");
    setCuratorID("");
    setCollectionID("");
    setCurrentInput({});
  };
  const handleEdit = () => {
    setName(currInput.collection_name);
    setDescription(currInput.collection_description);
    setCuratorID(currInput.collection_curator_ID);
    setCollectionID(currInput.collection_id);
    setOpenEdit(true);
  };

  const handleCancel = () => {
    setOpenEdit(false);
    clearFields();
  };

  const fetchcollections = async () => {
    const curatorInfo = {
      collection_departmentID: currentAuthDep,
    };
    console.log("fetch exhibit info", curatorInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/department-collections", {
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
        setCollections(data);
        console.log("data", data);
      });
  };


  const deleteCollection = async (e) => {
    e.preventDefault();

    if (
      window.confirm(
        "Are you sure you want to permanently delete this collecion?"
      ) === false
    ) {
      setCurrentInput({});
      return;
    }

    const employeeData = {
        collection_id: currInput.collection_id,
    };

    console.log("employeeData", employeeData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/collection", {
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
      alert("Collection successfully deleted!");
      clearFields();
      //   }
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  const updateCollection = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors){
        alert("Please fill in all required fields.")
        return;
    }

    if (curatorID === "-1") {
      setCuratorID("");
    }

    const collectionData = {
      collection_name: name,
      collection_description: description,
      collection_curator_ID: curatorID,
      collection_departmentID: currInput.Exhibition_Department,
      collection_id: currInput.collection_id,
    };

    console.log("collectionData", collectionData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/collection", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionData),
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
        alert("Collection successfully updated!");
        clearFields();
        setOpenEdit(false);
    //   }
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
          <ManagerBar title="Collections" />

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
                <p>Add New Collection</p>
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
                  onClick={deleteCollection}
                  className="bg-[#bf6f5e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                >
                  <MdOutlineDelete className="size-4" />
                  <p>Delete</p>
                </button>
              </div>
            </div>

            {collections.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-48 ">Collection ID</p>
                  <p className="w-1/3 ">Name</p>
                  <p className="w-1/3 ">Curator</p>
                  <p className="w-1/3 ">Description</p>
                </div>
                {collections.map((item, id) => (
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
                    <p className="w-48 ">{item.collection_id}</p>
                    <p className="w-1/3 ">{item.collection_name}</p>
                    {item.collection_curator_ID !== null ? (
                      <p className="w-1/3">
                        {item.curator_fname} {item.curator_lname}
                      </p>
                    ) : (
                      <p className="w-1/3">N/A</p>
                    )}
                    <p className="w-1/3 line-clamp-3">
                      {item.collection_description}
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
          <div className="bg-white rounded-3xl h-fit max-h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col">
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
                  <p className="font-bold">Collection ID</p>
                  <p className="">{currInput.collection_id}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Name</p>
                  <p className="w-1/2 text-end">{currInput.collection_name}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Curator</p>
                  <p className="">
                    {currInput.curator_fname} {currInput.curator_lname}
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Description</p>
                  <p className="w-1/2 text-end">
                    {currInput.collection_description}
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
            className="bg-white rounded-3xl shadow-md flex flex-col h-fit max-h-[38rem] overflow-auto w-1/2 "
            onSubmit={addCollection}
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
            className="bg-white rounded-3xl h-fit max-h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col"
            onSubmit={updateCollection}
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
                  <p className="font-bold">Collection ID</p>
                  <p className="">{currInput.collection_id}</p>
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
