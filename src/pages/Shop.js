import { React, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import ShopS from "../components/ShopStore";


export default function Shop() {
  return (
    <div className="min-h-screen">
      <UserNavbar />

      <div className="flex flex-col pt-36 pb-24 px-16 gap-y-20">
        <div className="flex flex-col gap-y-4">
          <h1 className="font-fanwoodText italic text-7xl">MFAH Gift Shop</h1>
          <p className="text-xl font-inter">
          The MFA Shop offers a unique selection of artful gifts, prints, jewelry, books, toys, and more.
          </p>
        </div>
        <div className="flex flex-col gap-y-24 font-inter">
          <div className="h-96">
            <img
              className="brightness-75 rounded-xl object-cover object-top h-full w-full outline outline-offset-8 outline-gray-50"
              src={Angelico}
              alt=""
            />
          </div>
          <div className="flex flex-row gap-x-20">
            <div className="flex flex-col gap-y-8 w-full">
              <div className="flex flex-col gap-y-4">
                <h1 className="font-fanwoodText text-3xl">About the Gift Shop</h1>
                <p>
                Discover a diverse array of culturally-inspired souvenirs and exhibition-specific merchandise at our museum gift shop, offering a memorable way to commemorate your visit and delve deeper into the stories behind our exhibitions. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShopS  />
      <Footer />
    </div>
  );
}
