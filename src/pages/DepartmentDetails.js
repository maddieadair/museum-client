import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Luks from "../assets/images/Luks.png";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";
import Loading from "../components/Loading";

export default function DepartmentDetails() {
  const { id } = useParams();
  console.log("id", id);

  const [department, setDepartment] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  //   const [Exhibit_ID, setExhibitID] = useState("");

  useEffect(() => {
    setTimeout(() => {
      fetchDepartment();
      fetchCollections();
    }, 500);
  }, []);

  const fetchDepartment = async () => {
    const departmentInfo = {
      department_id: id,
    };
    console.log("fetch exhibit info", departmentInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/department-ID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(departmentInfo),
    })
      .then((response) => {
        console.log("repsonse:", response);
        return response.json();
      })
      .then((data) => {
        setDepartment(data);
      });
  };

  const fetchCollections = async () => {
    const collDepInfo = {
      collection_departmentID: id,
    };
    fetch("https://museum3380-89554eee8566.herokuapp.com/department-collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collDepInfo),
    })
      .then((response) => {
        console.log("repsonse:", response);
        return response.json();
      })
      .then((data) => {
        setCollections(data);
        setLoading(false);
      });
  };

  console.log("Department:", department);
  console.log("Collections", collections);

  return (
    <>
      {!loading ? (
        <div className="min-h-screen">
          <UserNavbar />
          {department.length > 0 ? (
            <div className="flex flex-col pb-20 gap-y-24 font-inter">
              <div className="w-full h-80">
                <img
                  className="brightness-75 object-cover object-center size-full"
                  src={Luks}
                  alt=""
                />{" "}
              </div>
              <div className="flex flex-col gap-y-8 border-b px-16 pb-24">
                <h1 className="font-fanwoodText italic text-7xl">
                  {department[0].department_name}{" "}
                </h1>
                <p className="text-xl">
                  {department[0].Department_Description}
                </p>

                <Link
                  to={`/artworks/search?Department_ID=${department[0].department_id}`}
                  className="font-bold text-xl hover:text-cinnabar underline duration-500 ease-in-out transition-all decoration-1 underline-offset-4"
                >
                  Browse the {department[0].department_name} department
                </Link>
              </div>

              {collections.length > 0 ? (
                <div className="flex flex-col gap-y-16 px-16">
                  <h1 className="text-5xl font-fanwoodText">Collections</h1>
                  <div className="flex flex-col gap-y-12">
                    {collections.map((col, idx) => (
                      <div
                        key={col.Art_ID}
                        className="flex flex-row gap-x-16 transition-all ease-in-out duration-300"
                      >
                        <div className="w-1/3">
                          <img
                            className="brightness-75 object-cover object-center size-full"
                            src={Angelico}
                            alt=""
                          />{" "}
                        </div>
                        <div className="w-2/3 p-6 flex flex-col gap-y-4">
                          <h1 className="font-bold text-xl">
                            {col.collection_name}
                          </h1>
                          <p className="">{col.collection_description}</p>
                          <Link
                            to={`/artworks/search?Collection_ID=${col.collection_id}`}
                            className="font-bold hover:text-cinnabar underline duration-500 ease-in-out transition-all decoration-1 underline-offset-4"
                          >
                            Browse the {col.collection_name} collection
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-y-12 px-16">
                  <h1 className="text-5xl font-fanwoodText">Collections</h1>
                  <p className="font-xl">No collections available yet!</p>
                </div>
              )}
            </div>
          ) : null}

          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
