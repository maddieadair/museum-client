import { React, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen">
      <UserNavbar />

      <div className="flex flex-col pt-36 pb-24 px-16 gap-y-20">
        <div className="flex flex-col gap-y-4">
          <h1 className="font-fanwoodText italic text-7xl">About Us</h1>
          <p className="text-xl font-inter">
            Learn more about us, our mission, and our community profile.
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
            <div className="flex flex-col gap-y-8 w-1/2">
              <div className="flex flex-col gap-y-4">
                <h1 className="font-fanwoodText text-3xl">Our History</h1>
                <p>
                  Founded in 1900, the Museum of Fine Arts, Houston, is one of
                  the 10 largest museums in the United States. 
                  <br></br><br></br>
                  Located in the
                  heart of Houston's Museum District, the MFAH consists of three
                  gallery buildings, a sculpture garden, two movie theaters, two
                  art schools, and two libraries, with two house museums within
                  walking distance, one dedicated to the North American
                  decorative arts and another to the European ones. 
                  <br></br><br></br>
                  The MFAH's
                  encyclopedic collection consists of 70,000 works and ranges
                  from ancient art to the present.
                </p>
              </div>
              <div className="flex flex-col gap-y-4">
                <h1 className="font-fanwoodText text-3xl">Mission Statement</h1>
                <p>
                  The Museum of Fine Arts, Houston, serves as a welcoming and
                  inclusive place for all people, connecting the communities of
                  Houston with diverse histories of art spanning 5,000 years and
                  six continents. 
                  <br></br><br></br>
                  Through our permanent collections, special
                  exhibitions, learning and interpretation programs, studio
                  instruction, publications, conservation, and scholarly
                  research, we strive to inspire appreciation and understanding
                  of the broadest spectrum of human achievement.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-8 w-1/2">
              <div className="flex flex-col gap-y-4">
                <h1 className="font-fanwoodText text-3xl">Community Profile</h1>
                <p>
                  Houston has been hailed as America’s most diverse city, a
                  reflection of how the nation will look in just a few decades.
                  <br></br><br></br>
                  By its nature, the Museum of Fine Arts, Houston, along with
                  the Glassell School of Art and the two house museums—Bayou
                  Bend Collection and Gardens, and Rienzi—embodies the character
                  of this city through the Museum’s staff, visitors, mission,
                  programs, and collections.
                </p>
              </div>
              <div className="flex flex-col gap-y-4">
                <h1 className="font-fanwoodText text-3xl">
                  Collections and Community Support
                </h1>
                <p>
                  The art collections of the MFAH reveal the breadth,
                  variations, and commonalities of human expression and history.
                  <br></br><br></br>
                  The Museum’s collections of Asian, Latin American, and Latino
                  art, and of art from the Islamic worlds, were built over the
                  past two decades, largely through the patronage of these
                  Houston communities. 
                  <br></br><br></br>
                  The MFAH is also home to the
                  International Center for the Arts of the Americas (ICAA), a
                  leading research institute for 20th-century Latin American and
                  Latino art.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
