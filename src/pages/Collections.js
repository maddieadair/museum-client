import React from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import SearchBar from "../components/Collections.SearchBar";


import {Link} from 'react-router-dom';


export default function Collections() {
    return (
        <div className="min-h-screen">
            <UserNavbar />
            <div className ="h-screen flex flex-col pt-36 pb-12 gapy-8 border-b">
                <div className = "px-16">
                    <div className="flex flex-col gap-y-4 p-6">
                        <h1 className="font-fanwoodText italic text-8xl">
                            Collections
                        </h1>
                        <Link to='/artworks' className="font-bold uppercase text-cinnabar hover:transition-all duration-700 ease-in-out">View All Artworks &gt;</Link>
                        <p className = "text-xl font-inter">
                            The Museum of Fine Arts, Houston, houses an encyclopedic collection of more than 70,000 works of art created throughout the world, from antiquity to the present. Explore the Museum’s art collections through this searchable database, which is continually being updated. Browse to discover art across time periods, cultures, classifications, and more. Then visit the Museum to experience your favorites in person.
                        </p>
                        <SearchBar />
                    </div>
                </div>
                <Footer/>
            </div>


        </div>
       
    )
}
