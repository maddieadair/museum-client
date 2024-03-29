import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams, useLocation } from 'react-router-dom';

export default function ExhibitionDetails() {
    // const location = useLocation();
    // const  data = location.state;
    // const {Exhibit_Name, Description, New_Open_Date, New_Close_Data} = data;
//   const[exhibition, setExhibition] = useState({});
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // fetchExhibitions();
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    axios
      .post("https://museum3380-89554eee8566.herokuapp.com/exhibition-art", {
        Exhibit_Name: "Crowning the North: Silver Treasures from Bergen, Norway",
      })
      .then((response) => {
        console.log("Response from backend:", response.data);
        setArtworks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching artworks:", error);
      });
  };
console.log("test")

//   const fetchArtworks = async () => {
//     axios
//       .post("https://museum3380-89554eee8566.herokuapp.com/exhibition-art", {
//             Exhibit_Name: "Crowning the North: Silver Treasures from Bergen, Norway",
//       })
//       .then((response) => {
//         console.log("Response from backend:", response.data);
//         setArtworks(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching artworks:", error);
//       });
//   };


  return (
    <div className="min-h-screen">
      <UserNavbar />

      <div className="flex flex-col pt-36 pb-24 gap-y-24 font-inter">
        <div className="flex flex-col gap-y-4 border-b px-16 pb-24">
          <h1 className="font-fanwoodText italic text-7xl">Exhibition </h1>
          <p className="text-xl">
            {/* {data.Description} */}
          </p>
        </div>
        <div className="flex flex-col gap-y-24 px-16">
          <div className="grid grid-cols-3 gap-x-12 gap-y-12">
            {/* {Exhibit_Name}
            {New_Open_Date}
            {New_Close_Data}
            {Description} */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
