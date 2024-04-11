import DirectorNavbar from "../../components/director/DirectorNavbar";
import DirectorBar from "../../components/director/DirectorBar";
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

export default function DirectorCollections() {
  const { currentAuthID, currentAuthRole, logout, currentAuthDep } =
    useContext(AuthContext);

  const [status, setStatus] = useState("");
  const [collections, setCollections] = useState([]);
  const [currInput, setCurrentInput] = useState({});
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/collections", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCollections(data);
        console.log("collections", collections)
      });
  };



  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <DirectorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <DirectorBar title="Collections" />

          <div className="flex flex-col px-14 gap-y-12">
            <div className="flex flex-row justify-between">
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
              </div>
            </div>

            {collections.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-48 ">Collection ID</p>
                  <p className="w-1/4 ">Name</p>
                  <p className="w-1/4 ">Department</p>
                  <p className="w-1/4 ">Curator</p>
                  <p className="w-1/4 ">Description</p>
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
                    <p className="w-1/4 ">{item.collection_name}</p>
                    <p className="w-1/4 ">{item.department_name}</p>
                    {item.collection_curator_ID !== null ? (
                      <p className="w-1/4">
                        {item.curator_fname} {item.curator_lname}
                      </p>
                    ) : (
                      <p className="w-1/4">N/A</p>
                    )}
                    <p className="w-1/4 line-clamp-3">
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
                  <p className="font-bold">Department</p>
                  <p className="">
                    {currInput.department_name}
                  </p>
                </div>
                {currInput.collection_curator_ID !== null ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Curator ID</p>
                    <p className="">
                      {currInput.collection_curator_ID}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Curator</p>
                    <p className="">N/A</p>
                  </div>
                )}
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

    </div>
  );
}
