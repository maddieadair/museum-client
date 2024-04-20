import CuratorNavbar from "../../components/curator/CuratorNavbar";
import CuratorBar from "../../components/curator/CuratorBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";

export default function CuratorCollections() {
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

  useEffect(() => {
    fetchCollections();
  }, []);

  //   const addCollection = async (e) => {
  //     e.preventDefault();

  //     const collectionData = {
  //         collection_name: name,
  //         collection_description: description,
  //         collection_curator_ID: currentAuthID,
  //         collection_departmentID: currentAuthDep,
  //     };

  //     console.log("collectionData", collectionData);

  //     try {
  //       const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/collection", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(collectionData),
  //       });

  //       if (!response.ok) {
  //         alert("Error adding new exhibition!");
  //         throw new Error("There was a network error");
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //       if (data.message === "Error adding collection") {
  //         alert("Error adding collection");
  //         return;
  //       }else {
  //         // setStatus("Exhibition added successfully");
  //         alert("Collection successfully added!");
  //         clearFields();
  //         setOpenNew(false);
  //       }
  //     } catch (error) {
  //       console.log("There was an error fetching:", error);
  //     }
  //   };

  const clearFields = () => {
    setName("");
    setDescription("");
    setCurrentInput({});
  };
  const handleEdit = () => {
    setName(currInput.collection_name);
    setDescription(currInput.collection_description);
    setOpenEdit(true);
  };

  const handleCancel = () => {
    setOpenEdit(false);
    clearFields();
  };

  const fetchCollections = async () => {
    const curatorInfo = {
      collection_curator_ID: currentAuthID,
    };
    console.log("fetch exhibit info", curatorInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/employee-cols", {
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

  //   const deleteCollection = async (e) => {
  //     e.preventDefault();

  //     const collectionData = {
  //         collection_id: currInput.collection_id,
  //     };

  //     console.log("collectionData", collectionData);

  //     try {
  //       const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/collection", {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(collectionData),
  //       });

  //       if (!response.ok) {
  //         throw new Error("There was a network error");
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //       if (data.message === "Error deleting collection") {
  //         // setStatus("Error deleting employee");
  //         alert("Error deleting collection");
  //         return;
  //       } else {
  //         // setStatus("Employee successfully deleted!'");
  //         alert("Collection successfully deleted!");
  //         clearFields();
  //       }
  //     } catch (error) {
  //       console.log("There was an error fetching:", error);
  //     }
  //   };

  const updateCollection = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors){
        alert("Please fill in all required fields.")
        return;
    }

    const collectionData = {
      collection_name: name,
      collection_description: description,
      collection_curator_ID: currentAuthID,
      collection_departmentID: currentAuthDep,
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
        throw new Error("There was a network error");
      }

      const data = await response.json();
      console.log("data:", data);
      if (data.message === "Error updating collection") {
        alert("Closing Date cannot be before Opening Date");
        return;
      } else {
        setStatus("Collection successfully updated!");
        alert("Collection successfully updated!");
        clearFields();
        setOpenEdit(false);
      }
    } catch (error) {
      console.log("There was an error fetching:", error);
    }
  };

  console.log(currInput);

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

  //   console.log("employees", employees)
  //   console.log(currInput);

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <CuratorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <CuratorBar title="Collections" />

          <div className="flex flex-col px-14 gap-y-12">
            {/* <div className="flex flex-row justify-between"> */}
            {/* <button
                type="button"
                onClick={() => {
                  setOpenNew(true);
                  setCurrentInput({});
                }}
                className="bg-[#3d7b51] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
              >
                <IoIosAdd className="size-6" />
                <p>Add New Collection</p>
              </button> */}

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

              {/* <button
                    type="button"
                    onClick={deleteCollection}
                    className="bg-[#bf6f5e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                  >
                    <MdOutlineDelete className="size-4" />
                    <p>Delete</p>
                  </button> */}
            </div>
            {/* </div> */}

            {exhibits.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-1/3 ">Collection ID</p>
                  <p className="w-1/2 ">Name</p>
                  <p className="w-1/2 ">Description</p>
                </div>
                {exhibits.map((item, id) => (
                  <div
                    key={item.collection_id}
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
                    <p className="w-1/3 ">{item.collection_id}</p>
                    <p className="w-1/2 ">{item.collection_name}</p>
                    <p className="w-1/2 line-clamp-3">
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
                  <p className="font-bold">Opening Date</p>
                  <p className="w-1/2 text-end">
                    {currInput.collection_description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* {openNew ? (
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
                  <p className="font-bold">Name</p>
                  <input
                    type="text"
                    name="fname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Description</p>
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
      ) : null} */}

      {openEdit ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <form
            className="bg-white rounded-3xl h-fit w-1/2 shadow-md flex flex-col"
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
                  <p className="font-bold">Name <span className="text-cinnabar font-normal">*</span></p>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Description <span className="text-cinnabar font-normal">*</span></p>
                  <textarea
                    type="text"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2 h-48"
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
