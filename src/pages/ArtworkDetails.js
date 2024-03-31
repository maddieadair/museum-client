import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

export default function ArtworkDetails() {
  const { id } = useParams();
  console.log("id", id);

  //   const [Exhibit_ID, setExhibitID] = useState("");

  const [artwork, setArtwork] = useState([]);

  useEffect(() => {
    fetchArtwork();
  }, []);

  const fetchArtwork = async () => {
    const artInfo = {
      Art_ID: id,
    };
    fetch("https://museum3380-89554eee8566.herokuapp.com/artwork-ID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artInfo),
    })
      .then((response) => {
        console.log("repsonse:", response);
        return response.json();
      })
      .then((data) => {
        setArtwork(data);
      });
  };

  console.log("Artworks", artwork);

  return (
    <div className="min-h-screen">
      <UserNavbar />
      {artwork.length > 0 ? (
        <div className="flex flex-row pt-48 py-32 gap-x-24 px-16 font-inter ">
          <div className="flex flex-col gap-y-4 border-2 w-1/2">
            <img
              className="brightness-75 object-cover object-center size-full "
              src={Angelico}
              alt=""
            />{" "}
          </div>
          <div className="flex flex-col gap-y-16 w-1/2">
            <div>
              <div className="flex flex-col gap-y-14 border-b pb-10">
                <h1 className="font-fanwoodText italic text-7xl">
                  {artwork[0].Art_Name}
                </h1>
                <div className="flex flex-col gap-y-4">
                    <p className="text-cinnabar font-bold text-lg uppercase">{artwork[0].Artist_Fname} {artwork[0].Artist_Lname}, <span className="font-normal">{artwork[0].Year_Created}</span></p>
                    <p>{artwork[0].Descr}</p>
                </div>
              </div>
              <div className="pt-10 flex flex-col gap-y-6">
                <div>
                  <p className="font-bold">ARTIST</p>
                  <p>
                    {artwork[0].Artist_Fname} {artwork[0].Artist_Lname}
                  </p>
                </div>
                <div>
                  <p className="font-bold">YEAR</p>
                  <p>{artwork[0].Year_Created}</p>
                </div>
                <div>
                  <p className="font-bold">MEDIUM</p>
                  <p>{artwork[0].Medium}</p>
                </div>
                <div>
                  <p className="font-bold">DIMENSIONS</p>
                  <p>
                    {artwork[0].Length} x {artwork[0].Width} x{" "}
                    {artwork[0].Height} cm
                  </p>
                </div>
                <div>
                  <p className="font-bold">DEPARTMENT</p>
                  <p>{artwork[0].department_name}</p>
                </div>
                <div>
                {artwork[0].On_View === 1 ?
                  <p className="font-bold text-emerald-600">On View ✔</p> : <p className="font-bold text-cinnabar">Not on View ✘</p> }
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Footer />
    </div>
  );
}
