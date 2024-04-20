import React, { useState, useEffect, useContext } from "react";
import ManagerNavbar from "./../../components/manager/ManagerNavbar";
import ManagerBar from "./../../components/manager/ManagerBar";
import { IoFilter } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

export default function ManagerArtReport() {
    const { currentAuthID, currentAuthRole, logout, currentAuthDep } =
    useContext(AuthContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);
  const [currInput, setCurrentInput] = useState({});
  const [openFilter, setOpenFilter] = useState(false);

  const [artists, setArtists] = useState([]);
  const [artworks, setArtworks] = useState([]);

  const validate = () => {
    let hasErrors = false;

    if (startDate === "" || startDate.length === 0 || startDate === null) {
      hasErrors = true;
    }

    return hasErrors;
  };

  const clearFields = () => {
    setStartDate("");
    setEndDate("");
    setCurrentInput({});
  };

  const handleCancel = () => {
    clearFields();
    setOpenFilter(false);
  };

  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleDateString("en-US") : "";
  };

  const filterArt = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors) {
      alert("Please fill in all required fields.");
      return;
    }

    const filterData = {
      Begin_Date: startDate,
      End_Date: endDate,
      Department_ID: currentAuthDep
    };

    console.log("filterData", filterData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/dept-new-artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterData),
      });

      if (!response.ok) {
        throw new Error("There was a network error");
      }

      const data = await response.json();
      console.log("new artists", data);
      setArtists(data);

      try {
        const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/dept-new-art", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterData),
        });

        if (!response.ok) {
          throw new Error("There was a network error");
        }

        const data = await response.json();
        console.log("new artworks", data);
        setArtworks(data);
        setOpenFilter(false);
      } catch (error) {
        alert(error);
        console.log("There was an error fetching2:", error);
      }
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <ManagerNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <ManagerBar title="Art Report" />

          <div className="flex flex-col px-14 gap-y-12">
            <div className="flex flex-row justify-start">
              <div className="flex flex-row justify-between w-full">
                <button
                  type="button"
                  onClick={() => {
                    clearFields();
                    setOpenFilter(true);
                    setCurrentInput({});
                    setArtists([]);
                    setArtworks([]);
                  }}
                  className="bg-[#3d7b51] text-chalk w-fit p-2 px-4 rounded-md flex flex-row items-center gap-x-2"
                >
                  <IoFilter className="size-6" />
                  <p>Filter</p>
                </button>
                {startDate !== "" && endDate !== null && (
                  <div className="text-[#34383f] flex items-center font-bold">
                    {`${formatDate(startDate)} - ${
                      endDate !== "" ? formatDate(endDate) : "Today"
                    }`}
                  </div>
                )}
              </div>
            </div>

            {artists.length > 0 ? (
              <p><span className="font-bold">{artists.length}</span> new artists added</p>
            ) : null}

            {artists.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit max-h-96 overflow-y-auto flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <p className="w-1/2">Artist Name</p>
                  <p className="w-1/2">Date Added</p>
                </div>
                {artists.map((item, id) => (
                  <div key={id} className="flex flex-row gap-x-6 p-6 group">
                    <p className="w-1/2">
                      {item.Artist_Fname} {item.Artist_Lname}
                    </p>
                    <p className="w-1/2">{item.Date_Acquired}</p>
                  </div>
                ))}
              </div>
            ) : (
              null
            )}

            {artworks.length > 0 ? (
              <p><span className="font-bold">{artworks.length}</span> new artworks added</p>
            ) : null}
            {artworks.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit max-h-96 overflow-y-auto flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <p className="w-24">Art ID</p>
                  <p className="w-1/3">Name</p>
                  <p className="w-1/3">Artist Name</p>
                  <p className="w-1/3">Date Acquired</p>
                </div>
                {artworks.map((item, id) => (
                  <div
                    key={item.Art_ID}
                    className="flex flex-row gap-x-6 p-6 group"
                  >
                    <p className="w-24">{item.Art_ID}</p>
                    <p className="w-1/3">{item.Art_Name}</p>
                    <p className="w-1/3">
                      {item.Artist_Fname} {item.Artist_Lname}
                    </p>
                    <p className="w-1/3">{item.New_AcqDate}</p>
                  </div>
                ))}
              </div>
            ) : (
             null
            )}

            {openFilter && (
              <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
                <form
                  className="bg-white rounded-3xl h-fit max-h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col"
                  onSubmit={(e) => filterArt(e)}
                >
                  <div className="flex flex-col">
                    <IoClose
                      className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                      onClick={handleCancel}
                    />
                    <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold">
                          Get all new artists and artworks that were added to the department
                          within a certain period.
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold">
                          Start Date{" "}
                          <span className="text-cinnabar font-normal">*</span>
                        </p>
                        <input
                          type="date"
                          name="startDate"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)} // Replace 'setDeptName' with the setter function for your start date state variable
                          className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                        />
                      </div>
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold">End Date</p>
                        <input
                          type="date"
                          name="endDate"
                          value={endDate} // Replace with the state variable for the end date
                          onChange={(e) => {
                            setEndDate(e.target.value);
                          }}
                          className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
                    >
                      Apply Filter
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
