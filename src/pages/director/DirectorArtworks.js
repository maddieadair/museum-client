import DirectorNavbar from "../../components/director/DirectorNavbar";
import DirectorBar from "../../components/director/DirectorBar";
import { React, useState, useEffect } from "react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

export default function DirectorArtworks() {
  const [status, setStatus] = useState("");
  const [donations, setDonations] = useState([]);
  const [currInput, setCurrentInput] = useState({});
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/artworks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDonations(data);
      });
  };

  console.log(donations);

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <DirectorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <DirectorBar title="Artworks" />

          <div className="flex flex-col px-14 gap-y-12">
            <div className="flex flex-row justify-between">
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
              <div
                className={`${
                  Object.keys(currInput).length !== 0
                    ? "flex flex-row gap-x-4"
                    : "hidden"
                }`}
              ></div>
            </div>

            {donations.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-24 ">Artwork ID</p>
                  <p className="w-1/6 ">Name</p>
                  <p className="w-1/6 ">Artist</p>
                  <p className="w-1/6 ">Collection</p>
                  <p className="w-1/6 ">Department</p>
                  <p className="w-1/6 ">Exhibition</p>
                </div>
                {donations.map((item, id) => (
                  <div
                    key={item.id}
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
                    <p className="w-24 ">{item.Art_ID}</p>
                    <p className="w-1/6 ">{item.Art_Name}</p>
                    <p className="w-1/6">
                      {item.Artist_Fname === null && item.Artist_Lname === null
                        ? `Unknown `
                        : null}
                      {item.Artist_Fname !== null && item.Artist_Lname === null
                        ? `${item.Artist_Fname} `
                        : null}
                      {item.Artist_Fname !== null && item.Artist_Lname !== null
                        ? `${item.Artist_Fname} ${item.Artist_Lname} `
                        : null}
                    </p>
                    {/* <p className="w-1/6 ">{item.On_View === 1 ? `On View` : `Not on View`}</p> */}
                    <p className="w-1/6 ">{item.collection_name}</p>
                    <p className="w-1/6 ">{item.department_name}</p>
                    <p className="w-1/6 ">{item.Exhibit_Name}</p>
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
                  <p className="font-bold w-1/2">Artwork ID</p>
                  <p className="w-1/2 text-end">{currInput.Art_ID}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Name</p>
                  <p className="w-1/2 text-end">{currInput.Art_Name}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Artist</p>
                  <p className="w-1/2 text-end">
                    {currInput.Artist_Fname === null &&
                    currInput.Artist_Lname === null
                      ? `Unknown `
                      : null}
                    {currInput.Artist_Fname !== null &&
                    currInput.Artist_Lname === null
                      ? `${currInput.Artist_Fname} `
                      : null}
                    {currInput.Artist_Fname !== null &&
                    currInput.Artist_Lname !== null
                      ? `${currInput.Artist_Fname} ${currInput.Artist_Lname} `
                      : null}
                  </p>{" "}
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Date Acquired</p>
                  <p className="w-1/2 text-end">{currInput.New_AcqDate}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Date Created</p>
                  <p className="w-1/2 text-end">{currInput.New_CreatDate}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Culture</p>
                  <p className="w-1/2 text-end">{currInput.Culture}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Length</p>
                  <p className="w-1/2 text-end">{currInput.Length} cm</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Width</p>
                  <p className="w-1/2 text-end">{currInput.Width} cm</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Height</p>
                  <p className="w-1/2 text-end">{currInput.Height} cm</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Medium</p>
                  <p className="w-1/2 text-end">{currInput.Medium}</p>
                </div>
                {currInput.Being_Refurbished === 1 ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold w-1/2">Refurbished</p>
                    <p className="w-1/2 text-end">Being Refurbished</p>
                  </div>
                ) : null}

                {currInput.collection_name !== null ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold w-1/2">Collection</p>
                    <p className="w-1/2 text-end">
                      {currInput.collection_name}
                    </p>
                  </div>
                ) : null}

                {currInput.department_name !== null ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold w-1/2">Department</p>
                    <p className="w-1/2 text-end">
                      {currInput.department_name}
                    </p>
                  </div>
                ) : null}

                {currInput.Exhibit_Name !== null ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold w-1/2">Exhibition</p>
                    <p className="w-1/2 text-end">{currInput.Exhibit_Name}</p>
                  </div>
                ) : null}

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">On View</p>
                  <p className="w-1/2 text-end">
                    {currInput.On_View === 1 ? `On View` : `Not on View`}
                  </p>
                </div>

                {currInput.Archived === 1 ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold w-1/2">Archived Status</p>
                    <p className="w-1/2 text-end">Archived</p>
                  </div>
                ) : null}

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Description</p>
                  <p className="w-1/2 text-end">{currInput.Descr}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
