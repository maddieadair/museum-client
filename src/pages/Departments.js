import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import SearchBar from "../components/Collections.SearchBar";
import { Link } from "react-router-dom";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import { RiArrowRightSLine } from "react-icons/ri";
import Loading from "../components/Loading";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchDepartments();
    }, 500);
  }, []);

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
        setLoading(false);
      });
  };

  console.log("Departments", departments);

  return (
    <>
      {!loading ? (
        <div className="min-h-screen">
          <UserNavbar />

          {departments.length > 0 ? (
            <div className="flex flex-col pt-36 pb-24 gap-y-24 font-inter">
              <div className="flex flex-col gap-y-12 border-b px-16 pb-24">
                <div className="flex flex-col gap-y-6">
                  <h1 className="font-fanwoodText italic text-7xl">
                    Curatorial Areas
                  </h1>
                  <p className="text-xl">
                    The Museum of Fine Arts, Houston, houses an encyclopedic
                    collection of more than 70,000 works of art created
                    throughout the world, from antiquity to the present. Explore
                    the Museum’s art collections through this searchable
                    database, which is continually being updated. Browse to
                    discover art across time periods, cultures, classifications,
                    and more. Then visit the Museum to experience your favorites
                    in person.
                  </p>
                </div>

                <Link
                  to="/exhibitions"
                  className="text-md flex flex-row items-center gap-x-4 border-b w-fit border-obsidian hover:text-cinnabar hover:border-cinnabar transition-colors ease-in-out duration-500 hover:cursor-pointer"
                >
                  <Link to="/artworks/search?" className="font-bold">
                    Browse The Collection
                  </Link>
                  <RiArrowRightSLine />
                </Link>
              </div>
              <div className="flex flex-col gap-y-24 px-16">
                <div className="grid grid-cols-3 gap-x-12 gap-y-12">
                  {departments.map((dep, idx) => (
                    <div
                      key={dep.department_id}
                      className="flex flex-col gap-y-4 border-[1px] border-stone-300 transition-all ease-in-out duration-300"
                    >
                      <div className="h-56 overflow-hidden">
                        <img
                          className="brightness-75 object-cover object-center size-full hover:scale-110 transition-all duration-500"
                          src={Angelico}
                          alt=""
                        />{" "}
                      </div>
                      <div className="h-1/2 p-6 pb-10 flex flex-col gap-y-4">
                        <Link
                          className="font-bold text-xl hover:text-cinnabar hover:underline duration-500 ease-in-out transition-all decoration-1 underline-offset-4"
                          // onClick={() => navigate(`${idx}`, {state: {...ex} })}
                          to={`/departments/${dep.department_id}`}
                          //   state={ex}
                          //   {{`/exhibitions/${Exhibit_ID}`}}
                        >
                          {dep.department_name}
                        </Link>
                        <p className="line-clamp-4">
                          {dep.Department_Description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
