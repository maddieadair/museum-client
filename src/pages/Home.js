import { React, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import HomeExhibitions from "../components/HomeExhibitions";
import HomeStore from "../components/HomeStore";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <UserNavbar />
      <div className="h-screen flex flex-row pt-36 pb-12 px-16 gap-x-8 border-b">
        <div className="flex flex-col w-1/2 gap-y-8 p-6">
          <h1 className="font-fanwoodText italic text-8xl">
            The Museum of Fine Arts, Houston
          </h1>
          <p className="font-bold uppercase text-cinnabar">Since 1990</p>
          <p>
            The Museum of Fine Arts, Houston, serves as a welcoming and
            inclusive place for all people, connecting the communities of
            Houston with diverse histories of art spanning 5,000 years and six
            continents.
          </p>
          <p>
            Through our permanent collections, special exhibitions, learning and
            interpretation programs, studio instruction, publications,
            conservation, and scholarly research, we strive to inspire
            appreciation and understanding of the broadest spectrum of human
            achievement.
          </p>
        </div>
        <div className="w-2/3 flex flex-row space-x-2 outline outline-offset-8 outline-gray-400 px-2 justify-center rounded-xl">
          <img
            className="brightness-75 rounded-xl object-cover object-left w-1/3 "
            src={Angelico}
            alt=""
          />
          <img
            className="brightness-75 rounded-xl object-cover object-center w-1/3"
            src={Angelico}
            alt=""
          />
          <img
            className="brightness-75 rounded-xl object-cover object-right w-1/3"
            src={Angelico}
            alt=""
          />
        </div>
      </div>

      <HomeExhibitions />
      <HomeStore />
      <Footer />
    </div>
  );
}
