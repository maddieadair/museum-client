import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import Luks from "../assets/images/Luks.png";
import { MdExpandMore } from "react-icons/md";
import { GrCheckbox } from "react-icons/gr";
import { MdCheckBox } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import Loading from "../components/Loading";

import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";

export default function Artworks() {
  //   const location = useLocation();
  //     const searchParams = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const Culture = searchParams.get("Culture");
  const Collection_ID = searchParams.get("Collection_ID");
  const Department_ID = searchParams.get("Department_ID");
  const Medium = searchParams.get("Medium");
  const On_View = searchParams.get("On_View");

  const [cultures, setCultures] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [collections, setCollections] = useState([]);

  const [openCultures, setOpenCultures] = useState(false);
  const [openMediums, setOpenMediums] = useState(false);
  const [openDepartments, setOpenDepartments] = useState(false);
  const [openCollections, setOpenCollections] = useState(false);

  const [loading, setLoading] = useState(true);

  console.log("Culture:", Culture);
  console.log("Collection_ID:", Collection_ID);
  console.log("Department_ID:", Department_ID);
  console.log("On_View:", On_View);
  console.log("Medium:", Medium);

  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
      fetchArtworks();
  }, [searchParams]);

  useEffect(() => {
    getUniqueValues();
  }, [artworks]);

  const getUniqueValues = () => {
    // console.log("artworks in function", artworks)
    let unique_cultures = artworks
      .map((item) => item.Culture)
      .filter(
        (value, index, current_value) => current_value.indexOf(value) === index
      );
    unique_cultures = unique_cultures.filter(function (e) {
      return e != null;
    });
    setCultures(unique_cultures);

    let unique_mediums = artworks
      .map((item) => item.Medium)
      .filter(
        (value, index, current_value) => current_value.indexOf(value) === index
      );
    unique_mediums = unique_mediums.filter(function (e) {
      return e != null;
    });
    setMediums(unique_mediums);

    // let unique_departments = artworks
    //   .map((item) => item.department_name)
    //   .filter(
    //     (value, index, current_value) => current_value.indexOf(value) === index
    //   );
    // unique_departments = unique_departments.filter(function (e) {
    //   return e != null;
    // });
    // setDepartments(unique_departments);

    let unique_departments = artworks.map(
      ({ Department_ID, department_name }) => ({
        Department_ID,
        department_name,
      })
    );
    unique_departments = unique_departments.filter(
      (item, index) =>
        artworks.findIndex(
          (obj) => obj.Department_ID === item.Department_ID
        ) === index
    );
    unique_departments = unique_departments.filter(
      (item) => item.Department_ID !== null && item.department_name !== null
    );

    setDepartments(unique_departments);
    console.log("unique_departments", unique_departments);

    // const map = new Map(artworks.map((obj) => [obj.Department_ID, obj.department_name]));

    // let unique_collections = artworks
    //   .map((item) => item.collection_name)
    //   .filter(
    //     (value, index, current_value) => current_value.indexOf(value) === index
    //   );
    // unique_collections = unique_collections.filter(function (e) {
    //   return e != null;
    // });
    // setCollections(unique_collections);

    // console.log("unique_col", unique_collections)

    let unique_collections = artworks.map(
      ({ Collection_ID, collection_name }) => ({
        Collection_ID,
        collection_name,
      })
    );
    unique_collections = unique_collections.filter(
      (item, index) =>
        artworks.findIndex(
          (obj) => obj.Collection_ID === item.Collection_ID
        ) === index
    );
    unique_collections = unique_collections.filter(
      (item) => item.Collection_ID !== null && item.collection_name !== null
    );

    setCollections(unique_collections);
    console.log("unique_collections", unique_collections);

    // let col = artworks.filter(obj => obj.collection_name === artworks.collection_name && obj.Collection_ID === artworks.Collection_ID)
    // console.log("col", col)

    // let c =  artworks.filter((obj, pos, arr) => {
    //     return arr.map(mapObj => mapObj["Department_ID"]).indexOf(obj["Department_ID"]) ;
    // });
    // console.log("C", c)
    // const unique = [...new Set(artworks.map(item => item.Department_ID))]; // [ 'A', 'B']
    // const unique = artworks.map(
    //   (element) => element.Collection_ID && element.collection_name
    // );
    // console.log("unique", unique);
  };

  const fetchArtworks = async () => {
    const filters = {};
    if (Culture !== null) {
      if (Culture.length !== 0) {
        filters["Culture"] = Culture;
      }
    }
    if (Collection_ID !== null) {
      if (Collection_ID.length !== 0) {
        filters["Collection_ID"] = Collection_ID;
      }
    }
    if (Department_ID !== null) {
      if (Department_ID.length !== 0) {
        filters["Department_ID"] = Department_ID;
      }
    }
    if (On_View !== null) {
      filters["On_View"] = On_View;
    }
    if (Medium !== null) {
      if (Medium.length !== 0) {
        filters["Medium"] = Medium;
      }
    }

    filters["Include_Exhibits"] = false;

    console.log("Filters:", filters);
    fetch("https://museum3380-89554eee8566.herokuapp.com/filtered-art", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    })
      .then((response) => {
        console.log("repsonse:", response);
        return response.json();
      })
      .then((data) => {
        setArtworks(data);
        getUniqueValues();
        setLoading(false);
      });
  };

  //   console.log("Artworks", artworks);

  const appendParam = (e) => {
    console.log("APPEND PARAM CALLED");
    console.log("append e.name", e.target.name);
    console.log("append e.value", e.target.value);
    const { name, value } = e.target;

    if (!searchParams.has(name, value)) {
      searchParams.append(name, value);
      setSearchParams(searchParams);
    } else {
      console.log("value", value, "already exists");
    }

    setOpenCultures(false);
    setOpenDepartments(false);
    setOpenMediums(false);
    setOpenCollections(false);
  };

  const deleteParam = (e) => {
    console.log("DELETE PARAM CALLED");
    console.log("delete e.name", e.target.name);
    console.log("delete e.value", e.target.value);

    const { name, value } = e.target;
    if (searchParams.has(name, value)) {
      searchParams.delete(name, value);
      setSearchParams(searchParams);
    } else {
      console.log("value", value, "already exists");
    }

    setOpenCultures(false);
    setOpenDepartments(false);
    setOpenMediums(false);
    setOpenCollections(false);
  };

  const toggleCultures = () => {
    setOpenCultures(!openCultures);
    setOpenCollections(false);
    setOpenDepartments(false);
    setOpenMediums(false);
  };

  const toggleMediums = () => {
    setOpenMediums(!openMediums);
    setOpenCollections(false);
    setOpenDepartments(false);
    setOpenCultures(false);
  };

  const toggleDepartments = () => {
    setOpenDepartments(!openDepartments);
    setOpenCollections(false);
    setOpenCultures(false);
    setOpenMediums(false);
  };

  const toggleCollections = () => {
    setOpenCollections(!openCollections);
    setOpenCultures(false);
    setOpenDepartments(false);
    setOpenMediums(false);
  };

  console.log("arr", searchParams);
  console.log("Cultures", cultures);
  console.log("Mediums", mediums);
  console.log("Departments", departments);
  console.log("Collections", collections);

  const handleOption = (e, id) => {
    const { name, value } = e.target;
    console.log("handleOption called");
    console.log("e.name", e.target.name);
    console.log("e.value", e.target.value);

    if (name === "Department_ID") {
      if (Department_ID === null) {
        appendParam(e);
      } else if (Department_ID === value) {
        deleteParam(e);
      }
    } else if (name === "Collection_ID") {
      if (Collection_ID === null) {
        appendParam(e);
      } else if (Collection_ID === value) {
        deleteParam(e);
      }
    }
  };

  return (
        <div className="min-h-screen">
          <UserNavbar />
          <div className="flex flex-col pb-20 gap-y-24 font-inter">
            <div className="w-full h-80">
              <img
                className="brightness-75 object-cover object-center size-full"
                src={Luks}
                alt=""
              />{" "}
            </div>
            <div className="flex flex-col gap-y-24 border-b px-16 pb-16">
              <div className="flex flex-col gap-y-8">
                <h1 className="font-fanwoodText italic text-7xl">
                  Search The Collection
                </h1>
                <p className="text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>

              <form className="flex flex-row gap-x-12 uppercase">
                <div className="relative w-1/4 flex">
                  <div
                    className={`w-full flex flex-row justify-between p-4 hover:bg-red-5 border rounded-md ${
                      openCultures ? "bg-red-50 border-red-300" : null
                    }`}
                    onClick={() => toggleCultures()}
                  >
                    <p className="">Culture</p>
                    <MdExpandMore size={25} className="" />
                  </div>

                  <div
                    className={`${
                      openCultures
                        ? "normal-case overflow-y-auto h-fit max-h-64 absolute left-0 top-20 w-full flex flex-col gap-y-4 border bg-chalk shadow-md p-4 rounded-md z-30"
                        : "hidden"
                    }`}
                  >
                    {cultures.map((culture, idx) => (
                      <div
                        key={culture}
                        className="text-start flex flex-row items-center gap-x-4"
                      >
                        <button
                          type="button"
                          name="Culture"
                          value={culture}
                          onClick={
                            Culture === null
                              ? (e) => appendParam(e)
                              : (e) => deleteParam(e)
                          }
                        >
                          {Culture === null ? (
                            <GrCheckbox className="pointer-events-none" />
                          ) : (
                            <MdCheckBox className="pointer-events-none" />
                          )}
                        </button>
                        <p>{culture}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative w-1/4 flex">
                  <div
                    className={`w-full flex flex-row justify-between p-4 hover:bg-red-5 border rounded-md ${
                      openMediums ? "bg-red-50 border-red-300" : null
                    }`}
                    onClick={() => toggleMediums()}
                  >
                    <p className="">Medium</p>
                    <MdExpandMore size={25} className="" />
                  </div>

                  <div
                    className={`${
                      openMediums
                        ? "normal-case overflow-y-auto h-fit max-h-64 absolute left-0 top-20 w-full flex flex-col gap-y-4 border bg-chalk shadow-md p-4 rounded-md z-30"
                        : "hidden"
                    }`}
                  >
                    {mediums.map((medium, idx) => (
                      <div
                        key={medium}
                        className="text-start flex flex-row items-center gap-x-4"
                      >
                        <button
                          type="button"
                          name="Medium"
                          value={medium}
                          onClick={
                            Medium === null
                              ? (e) => appendParam(e)
                              : (e) => deleteParam(e)
                          }
                        >
                          {Medium === null ? (
                            <GrCheckbox className="pointer-events-none" />
                          ) : (
                            <MdCheckBox className="pointer-events-none" />
                          )}
                        </button>
                        <p>{medium}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative w-1/4 flex">
                  <div
                    className={`w-full flex flex-row justify-between p-4 hover:bg-red-5 border rounded-md ${
                      openDepartments ? "bg-red-50 border-red-300" : null
                    }`}
                    onClick={() => toggleDepartments()}
                  >
                    <p className="">Department</p>
                    <MdExpandMore size={25} className="" />
                  </div>

                  <div
                    className={`${
                      openDepartments
                        ? "normal-case overflow-y-auto h-fit max-h-64 absolute left-0 top-20 w-full flex flex-col gap-y-4 border bg-chalk shadow-md p-4 rounded-md z-30"
                        : "hidden"
                    }`}
                  >
                    {departments.map((department, idx) => (
                      <div
                        key={department.Department_ID}
                        className="text-start flex flex-row items-center gap-x-4"
                      >
                        <button
                          type="button"
                          name="Department_ID"
                          value={department.Department_ID}
                          onClick={
                            Department_ID === null
                              ? (e) => appendParam(e)
                              : (e) => deleteParam(e)
                          }
                        >
                          {Department_ID === null ? (
                            <GrCheckbox className="pointer-events-none" />
                          ) : (
                            <MdCheckBox className="pointer-events-none" />
                          )}
                        </button>
                        <p>{department.department_name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative w-1/4 flex">
                  <div
                    className={`w-full flex flex-row justify-between p-4 hover:bg-red-5 border rounded-md ${
                      openCollections ? "bg-red-50 border-red-300" : null
                    }`}
                    onClick={() => toggleCollections()}
                  >
                    <p className="">Collection</p>
                    <MdExpandMore size={25} className="" />
                  </div>

                  <div
                    className={`${
                      openCollections
                        ? "normal-case overflow-y-auto h-fit max-h-64 absolute left-0 top-20 w-full flex flex-col gap-y-4 border bg-chalk shadow-md p-4 rounded-md z-30"
                        : "hidden"
                    }`}
                  >
                    {collections.map((collection, idx) => (
                      <div
                        key={collection.Collection_ID}
                        className="text-start flex flex-row items-center gap-x-4"
                      >
                        <button
                          type="button"
                          name="Collection_ID"
                          value={collection.Collection_ID}
                          onClick={
                            Collection_ID === null
                              ? (e) => appendParam(e)
                              : (e) => deleteParam(e)
                          }
                        >
                          {Collection_ID === null ? (
                            <GrCheckbox className="pointer-events-none" />
                          ) : (
                            <MdCheckBox className="pointer-events-none" />
                          )}
                        </button>
                        <p>{collection.collection_name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            <div className="flex flex-col gap-y-20 px-16">
              {artworks.length > 0 ? (
                <div className="grid grid-cols-4 gap-x-12 gap-y-12">
                  {artworks.map((art, idx) => (
                    <div
                      key={art.Art_ID}
                      className="flex flex-col gap-y-4 border-[1px] border-stone-300 transition-all ease-in-out duration-300 "
                    >
                      <div className="h-56">
                        <img
                          className="brightness-75 object-cover object-right size-full"
                          src={Angelico}
                          alt=""
                        />{" "}
                      </div>
                      <div className="h-1/2 p-6 flex flex-col gap-y-4">
                        <Link
                          to={`/artworks/${art.Art_ID}`}
                          className="font-bold text-xl hover:text-cinnabar hover:underline duration-500 ease-in-out transition-all decoration-1 underline-offset-4"
                        >
                          {art.Art_Name}
                        </Link>
                        <p>
                          {art.Artist_Fname === null &&
                          art.Artist_Lname === null
                            ? `Unknown, `
                            : null}
                          {art.Artist_Fname !== null &&
                          art.Artist_Lname === null
                            ? `${art.Artist_Fname}, `
                            : null}
                          {art.Artist_Fname !== null &&
                          art.Artist_Lname !== null
                            ? `${art.Artist_Fname} ${art.Artist_Lname}, `
                            : null}
                          {art.Year_Created !== null
                            ? `${art.Year_Created}`
                            : `date unknown`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Nothing to see here </p>
              )}
            </div>
          </div>

          <Footer />
        </div>
  );
}
