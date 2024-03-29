import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import axios from 'axios';

export default function HomeExhibitions() {
    const [exhibitions, setExhibitions] = useState([]);

    useEffect(() => {
        fetchExhibitions();
      }, []);

    const fetchExhibitions = async () => {

        axios.get("https://museum3380-89554eee8566.herokuapp.com/exhibitions-three")
        .then(response => {
            console.log("Response from backend:", response.data); 
            setExhibitions(response.data)
        })
        .catch(error => {
            console.error("Error fetching exhibitions:", error); 
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

      <div className="flex flex-row gap-x-6">
      {exhibitions.map((ex) => (
        <div key={ex.Exhibit_Name} className="flex flex-col p-4 gap-y-4 bg-gray-100  border border-gray-400 w-1/3 rounded-xl hover:bg-red-100 hover:border-red-400">
          <div className="h-2/3">
              <img
                className="brightness-75 rounded-xl object-cover object-right size-full"
                src={Angelico}
                alt=""
              />{" "}
          </div>
          <div className="h-1/2 p-2 flex flex-col gap-y-4">
            <h4 className="font-bold">{ex.Exhibit_Name}</h4>
            {ex.New_Open_Date} - {ex.New_End_Date === null ? "Ongoing" : `${ex.New_End_Date}`}
          </div>
        </div>
      ))}

      </div>
    </div>
  );
}
