import CuratorNavbar from "../../components/curator/CuratorNavbar";
import CuratorBar from "../../components/curator/CuratorBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { LuArchive } from "react-icons/lu";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { MdOutlineDelete } from "react-icons/md";

export default function CuratorArtworks() {
  const { currentAuthID, currentAuthRole, logout, currentAuthDep } =
    useContext(AuthContext);

  const [status, setStatus] = useState("");
  const [art, setArt] = useState([]);
  const [currInput, setCurrentInput] = useState({});
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [name, setName] = useState("");
  const [artistFname, setArtistFname] = useState("");
  const [artistLname, setArtistLname] = useState("");
  const [refurbish, setRefurbish] = useState(false);
  const [collectionID, setCollectionID] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [exhibitID, setExhibitID] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [medium, setMedium] = useState("");
  const [acquireDate, setAcquireDate] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [onView, setOnView] = useState(false);
  const [culture, setCulture] = useState("");
  const [description, setDescription] = useState("");

  const [exhibits, setExhibits] = useState([]);
  const [collections, setCollections] = useState([]);

  const [showExhibits, setShowExhibits] = useState(false);
  const [showCollections, setShowCollections] = useState(false);

  useEffect(() => {
    fetchArt();
    fetchExhibits();
    fetchCollections();
  }, []);

  //   useEffect(() => {
  //     fetchExhibits();
  //   }, []);

  //   useEffect(() => {
  //     fetchCollections();
  //   }, []);

  const addArt = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors){
        alert("Please fill in all required fields.")
        return;
    }

    const artData = {
      Art_Name: name,
      Descr: description,
      Date_Acquired: acquireDate,
      Date_Created: createDate,
      Culture: culture,
      Length: length,
      Width: width,
      Height: height,
      Medium: medium,
      Collection_ID: collectionID,
      Exhibit_ID: exhibitID,
      Department_ID: currentAuthDep,
      Artist_Fname: artistFname,
      Artist_Lname: artistLname,
      Being_Refurbished: refurbish,
      On_View: onView,
    };

    console.log("artData", artData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/artwork", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(artData),
      });

      if (!response.ok) {
        throw new Error("There was a problem completing the request.");
      }

      const data = await response.json();
      console.log(data);
      if (data.message === "Item cannot be created after today.") {
        alert("Item cannot be created after today.");
        return;
      } else if (
        data.message === "Item cannot be newer than the exhibition it is in."
      ) {
        alert("Item cannot be newer than the exhibition it is in.");
        return;
      } else if (
        data.message === "Item cannot be added to an ongoing exhibition."
      ) {
        alert("Item cannot be added to an ongoing exhibition.");
        return;
      } else if (data.message === "Artwork added successfully") {
        //   setStatus("Exhibition added successfully");
        alert("Artwork added successfully!");
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
    setArtistFname("");
    setArtistLname("");

    if (currInput.Being_Refurbished === 1) {
      setRefurbish(false);
    } else {
      setRefurbish(false);
    }

    setCollectionID("");
    setExhibitID("");
    setCulture("");
    setHeight("");
    setLength("");
    setWidth("");
    setMedium("");
    setAcquireDate("");
    setCreateDate("");

    if (currInput.On_View === 1) {
      setOnView(true);
    } else {
      setOnView(false);
    }

    setCurrentInput({});
  };

  const handleCancel = () => {
    setOpenEdit(false);
    clearFields();
  };

  const handleEdit = () => {
    setName(currInput.Art_Name);
    setDescription(currInput.Descr !== null ? currInput.Descr : "");
    setArtistFname(
      currInput.Artist_Fname !== null ? currInput.Artist_Fname : ""
    );
    setArtistLname(
      currInput.Artist_Lname !== null ? currInput.Artist_Lname : ""
    );

    if (currInput.Being_Refurbished === 1) {
      setRefurbish(true);
    } else {
      setRefurbish(false);
    }

    // setCollectionID(currInput.Collection_ID);
    // setExhibitID(currInput.Exhibit_ID);
    // setCulture(currInput.Culture);
    // setHeight(currInput.Height);
    // setLength(currInput.Length);
    // setWidth(currInput.Width);
    // setMedium(currInput.Medium);
    // setAcquireDate(currInput.New_AcqDate);
    // setCreateDate(currInput.New_CreatDate);

    setCollectionID(
      currInput.Collection_ID !== null ? currInput.Collection_ID : ""
    );
    setExhibitID(currInput.Exhibit_ID !== null ? currInput.Exhibit_ID : "");
    setCulture(currInput.Culture !== null ? currInput.Culture : "");
    setHeight(currInput.Height !== null ? currInput.Height : "");
    setLength(currInput.Length !== null ? currInput.Length : "");
    setWidth(currInput.Width !== null ? currInput.Width : "");
    setMedium(currInput.Medium !== null ? currInput.Medium : "");
    setAcquireDate(currInput.New_AcqDate !== null ? currInput.New_AcqDate : "");
    setCreateDate(
      currInput.New_CreatDate !== null ? currInput.New_CreatDate : ""
    );

    if (currInput.On_View === 1) {
      setOnView(true);
    } else {
      setOnView(false);
    }

    setOpenEdit(true);
  };

  const fetchArt = async () => {
    const curatorInfo = {
      Curator_ID: currentAuthID,
    };
    console.log("fetch exhibit info", curatorInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/employee-art", {
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
        setArt(data);
        console.log("data", data);
      });
  };

  const fetchExhibits = async () => {
    const employeeData = {
      Curator_ID: currentAuthID,
    };

    console.log("employeeData", employeeData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/employee-exhibits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("There was a network error");
      }

      const data = await response.json();
      console.log(data);
      setExhibits(data);

      // if (data.message === "Error archiving exhibition") {
      //   // setStatus("Error deleting employee");
      //   alert("Error archiving exhibition");
      // } else {
      // setStatus("Employee successfully deleted!'");
      //   alert("Exhibition successfully archived!");
      //   clearFields();
      // }
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  const fetchCollections = async () => {
    const employeeData = {
      collection_curator_ID: currentAuthID,
    };

    console.log("employeeData", employeeData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/employee-cols", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("There was a network error");
      }

      const data = await response.json();
      console.log(data);
      setCollections(data);
      // if (data.message === "Error archiving exhibition") {
      //   // setStatus("Error deleting employee");
      //   alert("Error archiving exhibition");
      // } else {
      // setStatus("Employee successfully deleted!'");
      //   alert("Exhibition successfully archived!");
      //   clearFields();
      // }
    } catch (error) {
      console.log("There was an error fetching:", error);
    }
  };

  //   const archiveExhibit = async (e) => {
  //     e.preventDefault();

  //     if (window.confirm("Are you sure you want to archive this exhibition?") === false) {
  //         setCurrentInput({});
  //         return;
  //     }

  //     const employeeData = {
  //         Exhibit_ID: currInput.Exhibit_ID,
  //     };

  //     console.log("employeeData", employeeData);

  //     try {
  //       const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/archive-exhibit", {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(employeeData),
  //       });

  //       if (!response.ok) {
  //         throw new Error("There was a network error");
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //       if (data.message === "Error archiving exhibition") {
  //         // setStatus("Error deleting employee");
  //         alert("Error archiving exhibition");
  //       } else {
  //         // setStatus("Employee successfully deleted!'");
  //         alert("Exhibition successfully archived!");
  //         clearFields();
  //       }
  //     } catch (error) {
  //       console.log("There was an error fetching:", error);
  //     }
  //   };

  const validate = () => {
    let hasErrors = false;

    if (name === "" || name === null) {
        hasErrors = true;
    }
    if (acquireDate === "" || acquireDate === null) {
        hasErrors = true;
    }
    if (onView === "" || onView === null) {
        hasErrors = true;
    }

    return hasErrors;
  }

  const updateArt = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors){
        alert("Please fill in all required fields.")
        return;
    }

    const artData = {
      Art_Name: name,
      Descr: description,
      Date_Created: createDate,
      Culture: culture,
      Length: length,
      Width: width,
      Height: height,
      Medium: medium,
      Artist_Fname: artistFname,
      Artist_Lname: artistLname,
      Being_Refurbished: refurbish,
      On_View: onView,
      Art_ID: currInput.Art_ID,
    };

    console.log("artData", artData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/artwork", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(artData),
      });

      if (!response.ok) {
        throw new Error("There was a problem completing the request.");
      }

      const data = await response.json();
      console.log(data);
      if (data.message === "Item cannot be created after today.") {
        alert("Item cannot be created after today.");
        return;
      } else if (
        data.message === "Item cannot be newer than the exhibition it is in."
      ) {
        alert("Item cannot be newer than the exhibition it is in.");
        return;
      } else if (
        data.message === "Item cannot be added to an ongoing exhibition."
      ) {
        alert("Item cannot be added to an ongoing exhibition.");
        return;
      } else if (data.message === "Artwork updated successfully!") {
        //   setStatus("Exhibition added successfully");
        alert("Artwork successfully updated!");
        clearFields();
        setOpenEdit(false);
      }
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  console.log(currInput);
  console.log("exhibitID", exhibitID);
  console.log("departmentID", currentAuthDep);
  console.log("collID", collectionID);

  const deleteArt = async (e) => {
    e.preventDefault();

    if (
      window.confirm("Are you sure you want to delete this artwork?") === false
    ) {
      setCurrentInput({});
      return;
    }

    const giftData = {
      Art_ID: currInput.Art_ID,
    };

    console.log("giftData", giftData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/artwork", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(giftData),
      });

      if (!response.ok) {
        throw new Error("There was an error completing the request");
      }

      const data = await response.json();
      console.log(data);
      // setStatus("Gift item deleted successfully'");
      alert("Artwork successfully deleted!");
      clearFields();
    } catch (error) {
      alert("There was an error completing the request");
      console.log("There was an error fetching:", error);
    }
  };

  

  //   console.log("employees", employees)
  //   console.log(currInput);

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <CuratorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <CuratorBar title="Artworks" />

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
                <p>Add New Artwork</p>
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
                {currInput.Archived === 0 ? (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="bg-[#cdb65e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                  >
                    <LuPencil className="size-4" />
                    <p>Edit</p>
                  </button>
                ) : null}
                {currInput.Archived === 0 ? (
                  <button
                    type="button"
                    onClick={deleteArt}
                    className="bg-[#bf6f5e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                  >
                    <MdOutlineDelete className="size-4" />
                    <p>Delete</p>
                  </button>
                ) : null}
              </div>
            </div>

            {art.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-24 ">Artwork ID</p>
                  <p className="w-1/5 ">Name</p>
                  <p className="w-1/5 ">Artist</p>
                  <p className="w-1/5 ">Collection</p>
                  <p className="w-1/5 ">Exhibition</p>
                  <p className="w-1/5 ">View Status</p>
                  <p className="w-32 ">Archived Status</p>
                </div>
                {art.map((item, id) => (
                  <div
                    key={item.Art_ID}
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
                    <p className="w-1/5 ">{item.Art_Name}</p>
                    <p className="w-1/5">
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
                    <p className="w-1/5 ">{item.collection_name}</p>
                    <p className="w-1/5 line-clamp-3">{item.Exhibit_Name}</p>
                    <p className="w-1/5">
                      {item.On_View === 1 ? `On View` : `Not on View`}
                    </p>
                    <p className="w-32">
                      {item.Archived === 1 ? `Archived` : ``}
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

      {openNew ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <form
            className="bg-white rounded-3xl shadow-md flex flex-col h-fit max-h-[38rem] overflow-auto w-1/2 "
            onSubmit={addArt}
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
                    name="description"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  ></textarea>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Description</p>
                  <textarea
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2 h-56"
                  ></textarea>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Artist's First Name</p>
                  <input
                    type="text"
                    name="artistFname"
                    onChange={(e) => setArtistFname(e.target.value)}
                    value={artistFname}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Artist's Last Name</p>
                  <input
                    type="text"
                    name="artistLname"
                    onChange={(e) => setArtistLname(e.target.value)}
                    value={artistLname}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Date Acquired <span className="text-cinnabar font-normal">*</span></p>
                  <input
                    type="date"
                    name="acquireDate"
                    onChange={(e) => setAcquireDate(e.target.value)}
                    value={acquireDate}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Date Created</p>
                  <input
                    type="date"
                    name="createDate"
                    onChange={(e) => setCreateDate(e.target.value)}
                    value={createDate}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Culture</p>
                  <input
                    type="text"
                    name="culture"
                    onChange={(e) => setCulture(e.target.value)}
                    value={culture}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Length (in cm)</p>
                  <input
                    type="text"
                    name="length"
                    onChange={(e) => setLength(e.target.value)}
                    value={length}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Width (in cm)</p>
                  <input
                    type="text"
                    name="width"
                    onChange={(e) => setWidth(e.target.value)}
                    value={width}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Height (in cm)</p>
                  <input
                    type="text"
                    name="height"
                    onChange={(e) => setHeight(e.target.value)}
                    value={height}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Medium</p>
                  <input
                    type="text"
                    name="medium"
                    onChange={(e) => setMedium(e.target.value)}
                    value={medium}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Refurbish Status</p>
                  <div className="flex flex-row gap-x-4">
                    <input
                      type="checkbox"
                      name="refurbish"
                      onChange={() => {
                        setRefurbish(!refurbish);
                        setOnView(false);
                      }}
                      value={refurbish}
                      checked={refurbish}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                    <p>Being Refurbished</p>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">View Status <span className="text-cinnabar font-normal">*</span></p>
                  <div className="flex flex-row gap-x-4">
                    <input
                      type="checkbox"
                      name="onView"
                      onChange={() => {
                        setOnView(!onView);
                        setRefurbish(false);
                      }}
                      value={onView}
                      checked={onView}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                    <p>On View</p>
                  </div>
                </div>

                {currInput.Archived === 1 ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold w-1/2">Archived Status</p>
                    <p className="w-1/2 text-end">Archived</p>
                  </div>
                ) : null}

                {/* <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Department</p>
                  <input
                    type="text"
                    name="departmentID"
                    onChange={(e) => setMedium(e.target.value)}
                    value={departmentID}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div> */}
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">In <span className="text-cinnabar font-normal">*</span></p>
                  <div className="flex flex-row gap-x-6">
                    <div className="flex flex-row gap-x-4">
                      <div className="flex flex-row gap-x-4">
                        <input
                          type="radio"
                          name="option"
                          value="department"
                          onClick={() => {
                            setShowExhibits(false);
                            setShowCollections(false);
                            setCollectionID("");
                            setExhibitID("");
                          }}
                        />
                        <p>General Department</p>
                      </div>
                      <input
                        type="radio"
                        name="option"
                        value="collection"
                        onClick={() => {
                          setShowCollections(true);
                          setShowExhibits(false);
                          setExhibitID("");
                        }}
                      />
                      <p>Collection</p>
                    </div>
                    <div className="flex flex-row gap-x-4">
                      <input
                        type="radio"
                        name="option"
                        value="exhibits"
                        onClick={() => {
                          setShowExhibits(true);
                          setShowCollections(false);
                          setCollectionID("");
                        }}
                      />
                      <p>Exhibition</p>
                    </div>
                  </div>
                </div>

                {showCollections ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Collection</p>
                    <select
                      type="text"
                      name="collectionID"
                      defaultValue="default"
                      onChange={(e) => setCollectionID(e.target.value)}
                      value={collectionID}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    >
                      <option value="default" disabled>
                        Select an option
                      </option>

                      {collections.map((ex) => (
                        <option value={ex.collection_id} key={ex.collection_id}>
                          {ex.collection_name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                {showExhibits ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold">Exhibition</p>
                    <select
                      type="text"
                      name="exhibitID"
                      defaultValue="default"
                      onChange={(e) => setExhibitID(e.target.value)}
                      value={exhibitID}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                    >
                      <option value="default" disabled>
                        Select an option
                      </option>

                      {exhibits.map((ex) => (
                        <option value={ex.Exhibit_ID} key={ex.Exhibit_ID}>
                          {ex.Exhibit_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
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
            className="bg-white rounded-3xl h-fit max-h-[38rem] w-1/2 overflow-auto shadow-md flex flex-col"
            onSubmit={updateArt}
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
                  <p className="font-bold">Art ID</p>
                  <p className="">{currInput.Art_ID}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Name <span className="text-cinnabar font-normal">*</span></p>
                  <textarea
                    name="description"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  ></textarea>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Description</p>
                  <textarea
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2 h-56"
                  ></textarea>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Artist's First Name</p>
                  <input
                    type="text"
                    name="artistFname"
                    onChange={(e) => setArtistFname(e.target.value)}
                    value={artistFname}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Artist's Last Name</p>
                  <input
                    type="text"
                    name="artistLname"
                    onChange={(e) => setArtistLname(e.target.value)}
                    value={artistLname}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Date Acquired</p>
                  <p className="w-1/2 text-end">{currInput.New_AcqDate}</p>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Date Created</p>
                  <input
                    type="date"
                    name="createDate"
                    onChange={(e) => setCreateDate(e.target.value)}
                    value={createDate}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Culture</p>
                  <input
                    type="text"
                    name="culture"
                    onChange={(e) => setCulture(e.target.value)}
                    value={culture}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Length (in cm)</p>
                  <input
                    type="text"
                    name="length"
                    onChange={(e) => setLength(e.target.value)}
                    value={length}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Width (in cm)</p>
                  <input
                    type="text"
                    name="width"
                    onChange={(e) => setWidth(e.target.value)}
                    value={width}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Height (in cm)</p>
                  <input
                    type="text"
                    name="height"
                    onChange={(e) => setHeight(e.target.value)}
                    value={height}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Medium</p>
                  <input
                    type="text"
                    name="medium"
                    onChange={(e) => setMedium(e.target.value)}
                    value={medium}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Refurbish Status</p>
                  <div className="flex flex-row gap-x-4">
                    <input
                      type="checkbox"
                      name="refurbish"
                      onChange={() => {
                        setRefurbish(!refurbish);
                        setOnView(false);
                      }}
                      value={refurbish}
                      checked={refurbish}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                    <p>Being Refurbished</p>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">View Status <span className="text-cinnabar font-normal">*</span></p>
                  <div className="flex flex-row gap-x-4">
                    <input
                      type="checkbox"
                      name="onView"
                      onChange={() => {
                        setOnView(!onView);
                        setRefurbish(false);
                      }}
                      value={onView}
                      checked={onView}
                      className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                    ></input>
                    <p>On View</p>
                  </div>
                </div>

                {currInput.Archived === 1 ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold w-1/2">Archived Status</p>
                    <p className="w-1/2 text-end">Archived</p>
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

                {/* <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Department</p>
                  <input
                    type="text"
                    name="departmentID"
                    onChange={(e) => setMedium(e.target.value)}
                    value={departmentID}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div> */}
                {/* 
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Collection</p>
                  <input
                    type="text"
                    name="collectionID"
                    onChange={(e) => setMedium(e.target.value)}
                    value={collectionID}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div> */}

                {/* <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Exhibition</p>
                  <input
                    type="text"
                    name="exhibitID"
                    onChange={(e) => setMedium(e.target.value)}
                    value={exhibitID}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div> */}
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
