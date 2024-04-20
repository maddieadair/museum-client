import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";
import Luks from "../assets/images/Luks.png";
import Loading from "../components/Loading";

export default function ExhibitionDetails() {
  const { id } = useParams();
  console.log("id", id);

  const [artworks, setArtworks] = useState([]);
  const [exhibition, setExhibition] = useState([]);

  const [exhibitionName, setExhibitionName] = useState("");
  const [exhibitID, setExhibitID] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);

  //   const [Exhibit_ID, setExhibitID] = useState("");

  useEffect(() => {
    setTimeout(() => {
      fetchExhibition();
      fetchArtworks();
    }, 500);
  }, []);

  const fetchExhibition = async () => {
    const exhibitInfo = {
      Exhibit_ID: id,
    };
    console.log("fetch exhibit info", exhibitInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/exhibition-ID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exhibitInfo),
    })
      .then((response) => {
        console.log("repsonse:", response);
        return response.json();
      })
      .then((data) => {
        setExhibition(data);
      });
  };

  const fetchArtworks = async () => {
    const exhibitInfo = {
      Exhibit_ID: id,
    };
    fetch("https://museum3380-89554eee8566.herokuapp.com/exhibition-artworks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exhibitInfo),
    })
      .then((response) => {
        console.log("repsonse:", response);
        return response.json();
      })
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      });
  };

  return (
    <>
      {!loading ? (
        <div className="min-h-screen">
          <UserNavbar />
          {exhibition.length > 0 ? (
            <div className="flex flex-col pb-20 gap-y-24 font-inter">
              <div className="w-full h-80">
                <img
                  className="brightness-75 object-cover object-center size-full"
                  src={Luks}
                  alt=""
                />{" "}
              </div>
              <div className="flex flex-col gap-y-8 border-b px-16 pb-24">
                <h1 className="font-fanwoodText italic text-7xl">
                  {exhibition[0].Exhibit_Name}{" "}
                </h1>
                <p className="text-xl text-cinnabar font-bold">
                  {exhibition[0].New_Open_Date} -{" "}
                  {exhibition[0].New_End_Date === null
                    ? `Ongoing`
                    : `${exhibition[0].New_End_Date}`}
                </p>
                <p className="text-xl">{exhibition[0].Description}</p>
              </div>
              <div className="flex flex-col gap-y-20 px-16">
                <h1 className="text-5xl font-fanwoodText">
                  Exhibition Objects
                </h1>

                <div className="grid grid-cols-3 gap-x-12 gap-y-12">
                  {artworks.map((art, idx) => (
                    <div
                      key={art.Art_ID}
                      className="flex flex-col gap-y-4 border-[1px] border-stone-300 transition-all ease-in-out duration-300"
                    >
                      <div className="h-56 overflow-hidden">
                        <img
                          className="brightness-75 object-cover object-center size-full hover:scale-110 transition-all duration-500"
                          src={Angelico}
                          alt=""
                        />{" "}
                      </div>
                      <div className="h-1/2 p-6 flex flex-col gap-y-4">
                        <Link
                          to={`/artworks/${art.Art_ID}`}
                          className="font-bold text-xl hover:text-cinnabar hover:underline duration-500 ease-in-out transition-all decoration-1 underline-offset-4"
                        >
                          {art.Art_Name}
                        </Link>
                        <p>
                          {art.Artist_Fname === null &&
                          art.Artist_Lname === null
                            ? `Unknown, `
                            : null}
                          {art.Artist_Fname !== null &&
                          art.Artist_Lname === null
                            ? `${art.Artist_Fname}, `
                            : null}
                          {art.Artist_Fname !== null &&
                          art.Artist_Lname !== null
                            ? `${art.Artist_Fname} ${art.Artist_Lname}, `
                            : null}
                          {art.Year_Created !== null
                            ? `${art.Year_Created}`
                            : `date unknown`}
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
      ) : (
        <Loading />
      )}
    </>
  );
}
