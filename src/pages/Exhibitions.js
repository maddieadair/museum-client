import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import Footer from "../components/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Exhibitions() {
  const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    axios
      .get("https://museum3380-89554eee8566.herokuapp.com/ordered-exhibitions")
      .then((response) => {
        console.log("Response from backend:", response.data);
        setExhibitions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exhibitions:", error);
      });
  };

  return (
    <div className="min-h-screen">
      <UserNavbar />

      {exhibitions.length > 0 ? (
        <div className="flex flex-col pt-36 pb-24 gap-y-24 font-inter">
          <div className="flex flex-col gap-y-4 border-b px-16 pb-24">
            <h1 className="font-fanwoodText italic text-7xl">Exhibitions</h1>
            <p className="text-xl">
              Explore the main campus of the Museum of Fine Arts, Houston,
              housing permanent collections of art from every era of history and
              all seven continents, plus special exhibitions.
            </p>
          </div>
          <div className="flex flex-col gap-y-24 px-16">
            <div className="grid grid-cols-3 gap-x-12 gap-y-12">
              {exhibitions.map((ex, idx) => (
                <div
                  key={ex.Exhibit_Name}
                  className="flex flex-col gap-y-4 shadow-lg transition-all ease-in-out duration-300"
                >
                  <div className="h-56">
                    <img
                      className="brightness-75 object-cover object-right size-full"
                      src={Angelico}
                      alt=""
                    />{" "}
                  </div>
                  <div className="h-1/2 p-6 flex flex-col gap-y-4">
                    <h1
                      className="font-bold text-xl hover:text-cinnabar hover:underline duration-500 ease-in-out transition-all decoration-1 underline-offset-4"
                      // onClick={() => navigate(`${idx}`, {state: {...ex} })}
                    //   to={`/exhibitions/${idx}`}
                    //   state={ex}
                      // {{`/exhibitions/${idx}`}}
                    >
                      {ex.Exhibit_Name}
                    </h1>
                    {ex.New_Open_Date} -{" "}
                    {ex.New_End_Date === null
                      ? `Ongoing`
                      : `${ex.New_End_Date}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
