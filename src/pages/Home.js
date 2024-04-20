import { React, useState, useEffect } from "react";
import HomeNavbar from "../components/HomeNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
// import HomeExhibitions from "../components/HomeExhibitions";
import HomeStore from "../components/HomeStore";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Home() {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      fetchExhibitions();
      setLoading(false);
    }, 500);
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
    <>
      {!loading ? (
        <div className="min-h-screen">
          <HomeNavbar />
          <h1 className="absolute z-30 bottom-80 left-24 w-1/2  text-chalk font-fanwoodText italic text-8xl">
            The Museum of Fine Arts Houston
          </h1>
          <h1 className="absolute z-30 bottom-64 left-24 w-1/2 uppercase font-bold text-chalk font-inter">
            Since 1990
          </h1>
          <h1 className="absolute z-30 bottom-44 left-24 w-1/2  text-chalk font-inter">
            The Museum of Fine Arts, Houston, serves as a welcoming and
            inclusive place for all people, connecting the communities of
            Houston with diverse histories of art spanning 5,000 years and six
            continents.
          </h1>
          <h1 className="absolute z-30 bottom-20 left-24 w-1/2  text-chalk font-inter">
            {" "}
            Through our permanent collections, special exhibitions, learning and
            interpretation programs, studio instruction, publications,
            conservation, and scholarly research, we strive to inspire
            appreciation and understanding of the broadest spectrum of human
            achievement.
          </h1>
          <div className="overflow-hidden">
            <img
              className="w-screen h-screen brightness-[.30] object-cover object-left hover:scale-110 transition-all duration-500"
              src={Angelico}
              alt=""
            />
          </div>
          {/* <div className="h-screen flex flex-row pt-36 pb-12 px-16 gap-x-16 border-b">
            <div className="flex flex-col w-1/2 gap-y-8 p-6">
              <h1 className="font-fanwoodText italic text-7xl">
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
          </div> */}

          <div className="flex flex-col px-16 py-24 gap-y-16 font-inter border-b">
            <div className="flex flex-col gap-y-2">
              <h2 className="font-fanwoodText text-5xl">Now on View</h2>
              <Link
                to="/exhibitions"
                className="text-lg flex flex-row items-center gap-x-4 hover:text-cinnabar transition-colors ease-in-out duration-500 hover:cursor-pointer"
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
                      className="font-bold hover:text-cinnabar hover:underline duration-500 ease-in-out transition-all decoration-1 underline-offset-4"
                    >
                      {ex.Exhibit_Name}
                    </Link>
                    {ex.New_Open_Date} -{" "}
                    {ex.New_End_Date === null
                      ? "Ongoing"
                      : `${ex.New_End_Date}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <HomeExhibitions /> */}
          <HomeStore />
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
