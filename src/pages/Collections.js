import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import SearchBar from "../components/Collections.SearchBar";
import { Link } from "react-router-dom";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";

export default function Collections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/collections", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCollections(data);
      });
  };

  //   <div className="min-h-screen">
  //   <UserNavbar />
  //   <div className ="h-screen flex flex-col pt-36 pb-12 gapy-8 border-b">
  //       <div className = "px-16">
  //           <div className="flex flex-col gap-y-4 p-6">
  //               <h1 className="font-fanwoodText italic text-8xl">
  //                   Collections
  //               </h1>
  //               <Link to='/artworks' className="font-bold uppercase text-cinnabar hover:transition-all duration-700 ease-in-out">View All Artworks &gt;</Link>
  //               <p className = "text-xl font-inter">
  //                   The Museum of Fine Arts, Houston, houses an encyclopedic collection of more than 70,000 works of art created throughout the world, from antiquity to the present. Explore the Museum’s art collections through this searchable database, which is continually being updated. Browse to discover art across time periods, cultures, classifications, and more. Then visit the Museum to experience your favorites in person.
  //               </p>
  //               <SearchBar />
  //           </div>
  //       </div>
  //       <Footer/>
  //   </div>

  return (
    <div className="min-h-screen">
      <UserNavbar />

      {collections.length > 0 ? (
        <div className="flex flex-col py-24 gap-y-24 font-inter">
          <div className="flex flex-col gap-y-4 border-b px-16 pb-24">
            <h1 className="font-fanwoodText italic text-7xl">Collections</h1>
            <p className="text-xl">
              The Museum of Fine Arts, Houston, houses an encyclopedic
              collection of more than 70,000 works of art created throughout the
              world, from antiquity to the present. Explore the Museum’s art
              collections through this searchable database, which is continually
              being updated. Browse to discover art across time periods,
              cultures, classifications, and more. Then visit the Museum to
              experience your favorites in person.
            </p>
          </div>
          <div className="flex flex-col gap-y-24 px-16">
            <div className="grid grid-cols-3 gap-x-12 gap-y-12">
              {collections.map((col, idx) => (
                <div
                  key={col.collection_id}
                  className="flex flex-col gap-y-4 border-[1px] border-stone-300 transition-all ease-in-out duration-300"
                >
                  <div className="h-56">
                    <img
                      className="brightness-75 object-cover object-right size-full"
                      src={Angelico}
                      alt=""
                    />{" "}
                  </div>
                  <div className="h-1/2 p-6 pb-10 flex flex-col gap-y-4">
                    <h1 className="font-bold text-xl hover:text-cinnabar hover:underline duration-500 ease-in-out transition-all decoration-1 underline-offset-4">
                      {col.collection_name}
                    </h1>
                    <p className=" line-clamp-4 ">
                      {col.collection_description}
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
  );
}
