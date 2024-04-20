import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import Footer from "../components/Footer";
import axios from "axios";
import { Link, useNavigate, NavLink, Outlet } from "react-router-dom";
import Loading from "../components/Loading";

export default function Exhibitions() {
  const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchExhibitions();
    }, 500);
  }, []);

  const fetchExhibitions = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/current-exhibits", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExhibitions(data);
        setLoading(false);
      });
  };

  return (
    <>
      {!loading ? (
        <div className="min-h-screen">
          <UserNavbar />

          {exhibitions.length > 0 ? (
            <div className="flex flex-col pt-36 pb-24 gap-y-24 font-inter">
              <div className="flex flex-col gap-y-16 border-b px-16 pb-12">
                <div className="flex flex-col gap-y-4">
                  <h1 className="font-fanwoodText italic text-7xl">
                    Exhibitions
                  </h1>
                  <p className="text-xl">
                    Explore the main campus of the Museum of Fine Arts, Houston,
                    housing permanent collections of art from every era of
                    history and all seven continents, plus special exhibitions.
                  </p>
                </div>

                <div className="flex flex-row space-x-8 w-full py-2 uppercase">
                  <NavLink
                    to="/exhibitions"
                    end
                    className={({ isActive }) =>
                      [
                        "hover:underline hover:underline-offset-8",
                        isActive ? "text-cinnabar font-bold" : "",
                      ].join(" ")
                    }
                  >
                    <p>Current</p>
                  </NavLink>

                  <NavLink
                    to="/exhibitions/upcoming"
                    className={({ isActive }) =>
                      [
                        "hover:underline hover:underline-offset-8",
                        isActive ? "text-cinnabar font-bold" : "",
                      ].join(" ")
                    }
                  >
                    <p>Upcoming</p>
                  </NavLink>

                  <NavLink
                    to="/exhibitions/past"
                    className={({ isActive }) =>
                      [
                        "hover:underline hover:underline-offset-8",
                        isActive ? "text-cinnabar font-bold" : "",
                      ].join(" ")
                    }
                  >
                    <p>Past</p>
                  </NavLink>
                </div>
              </div>

              <div className="flex flex-col gap-y-24 px-16">
                <div className="grid grid-cols-3 gap-x-12 gap-y-12">
                  {exhibitions.map((ex, idx) => (
                    <div
                      key={ex.Exhibit_ID}
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
                          to={`/exhibitions/${ex.Exhibit_ID}`}
                          //   state={ex}
                          //   {{`/exhibitions/${Exhibit_ID}`}}
                        >
                          {ex.Exhibit_Name}
                        </Link>
                        <p className="font-semibold">
                          {ex.New_Open_Date} -{" "}
                          {ex.New_End_Date === null
                            ? `Ongoing`
                            : `${ex.New_End_Date}`}
                        </p>
                        <p className=" line-clamp-3 ">{ex.Description}</p>
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
