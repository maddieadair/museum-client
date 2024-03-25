import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';


import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import ArtworkSearchBar from "../components/Artwork.Search.Bar";
import Placeholder from "../assets/images/istockphoto-1147544807-612x612.webp";


export default function Artworks() {
  const [artworksData, setArtworksData] = useState([]);


  useEffect(() => {
      fetchArtworksData();
  }, []);


  const fetchArtworksData = async () => {
      try {
          const response = await fetch('/artworks');
          if (!response.ok) {
              throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          const mappedData = data.map(artwork => ({
            id: artwork.Art_ID,
            name: artwork.Art_Name,
            artist: artwork.Artist_Fname,
            date: artwork.Date_Made,
            imageUrl: Placeholder,
          }));
          setArtworksData(mappedData);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };


  return (
      <div className="min-h-screen">
          <UserNavbar />
          <div className="h-screen flex flex-col pt-36 pb-12 gapy-8 border-b">
              <div className="px-16">
                  <div className="flex flex-col gap-y-4 p-6">
                      <h1 className="font-fanwoodText italic text-8xl">
                          Artworks
                      </h1>
                      <Link to='/collections' className="font-bold uppercase text-cinnabar hover:transition-all duration-700 ease-in-out">Return to Collections &gt;</Link>
           
                      <ArtworkSearchBar artworksData={artworksData} />
                  </div>
              </div>
              <Footer/>
          </div>
      </div>
  );
}
