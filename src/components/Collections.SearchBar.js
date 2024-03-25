import React, { useState, useEffect } from "react";
import Placeholder from "../assets/images/istockphoto-1147544807-612x612.webp";


const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [countries, setCountries] = useState([]);
 
  useEffect(() => {
    fetchCountriesData();
  }, []);


  const fetchCountriesData = async () => {
    try {
      const response = await fetch("/collections");
      if (!response.ok) {
        throw new Error("Failed to fetch countries data");
      }
      const data = await response.json();
      const mappedData = data.map(collection => ({
        name: collection.collection_name,
        imageUrl: Placeholder,
      }));
      setCountries(mappedData);
    } catch (error) {
      console.error("Error fetching countries data:", error);
    }
  };
 
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };


  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(searchInput.toLowerCase());
  });


  return (


    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
        style={{ paddingLeft: '1vw', marginBottom: '1vw', height: '4vw', fontSize: '3vw', font: 'inter' }}/>
     
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {filteredCountries.map((country, index) => (
            <tr key = {index} style={{ width: 'calc(33.33% - 20px)', marginBottom: '20px' }}>
              <td className="border border-gray-400 p-4 rounded-xl" style={{ borderRadius: '30px' }}>
                <img src={Placeholder} alt={country.name} className="max-w-full h-auto rounded-md" />
                <div>
                  <h3>{country.name}</h3>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
    </div>
  );
};


export default SearchBar;
