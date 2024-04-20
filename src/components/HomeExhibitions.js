import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";

export default function HomeExhibitions() {
  const [exhibitions, setExhibitions] = useState([]);
  
  useEffect(() => {
    fetchExhibitions();
  }, []);

const fetchExhibitions = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/exhibitions-preview", {
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
    });
};

  return (
    <div className="flex flex-col px-16 py-24 gap-y-16 font-inter border-b">
      <div className="flex flex-col gap-y-2">
        <h2 className="font-fanwoodText text-5xl">Now on View</h2>
        <Link
          to="/exhibitions"
          className="text-md flex flex-row items-center gap-x-4 hover:text-cinnabar transition-colors ease-in-out duration-500 hover:cursor-pointer"
        >
          <p>See all exhibitions</p>
          <RiArrowRightSLine />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-x-6">
        {exhibitions.map((ex) => (
          <div
            key={ex.Exhibit_Name}
            className="flex flex-col border-[1px] border-stone-300 text-lg"
          >
            <div className="h-56">
              <img
                className="brightness-75 object-cover object-right size-full "
                src={Angelico}
                alt=""
              />{" "}
            </div>
            <div className="h-1/2 flex flex-col gap-y-4 p-8 border justify-center">
              <Link 
              to={`/exhibitions/${ex.Exhibit_ID}`}
              className="font-bold hover:text-cinnabar hover:underline duration-500 ease-in-out transition-all decoration-1 underline-offset-4">{ex.Exhibit_Name}</Link>
              {ex.New_Open_Date} -{" "}
              {ex.New_End_Date === null ? "Ongoing" : `${ex.New_End_Date}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
