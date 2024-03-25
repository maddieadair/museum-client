import React from "react";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";

export default function HomeExhibitions() {
    const arr = [
        {
            name: "Vertigo of Color: Matisse, Derain, and the Origins of Fauvism",
            date: "June 23, 2023 - December 1, 2023",
        },
        {
            name: "Crowning the North: Silver Treasures from Bergen, Norway",
            date: "April 2, 2024 - Ongoing",
        },
        {
            name: "Meiji Modern: Fifty Years of New Japan",
            date: "September 5, 2024 - November 8, 2024",
        },
      ];

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
      {arr.map((ex) => (
        <div className="flex flex-col p-4 gap-y-4 bg-gray-100  border border-gray-400 w-1/3 rounded-xl hover:bg-red-100 hover:border-red-400">
          <div className="h-2/3">
              <img
                className="brightness-75 rounded-xl object-cover object-right size-full"
                src={Angelico}
                alt=""
              />{" "}
          </div>
          <div className="h-1/2 p-2 flex flex-col gap-y-4">
            <h4 className="font-bold">{ex.name}</h4>
            <p>{ex.date}</p>
          </div>
        </div>
      ))}

      </div>
    </div>
  );
}
