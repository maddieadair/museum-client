import React, { useState, useEffect } from 'react';
import '../assets/artworksGrid.css';
import Placeholder from "../assets/images/istockphoto-1147544807-612x612.webp";


const ArtworksPage = ({ artworksData }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredArtworks, setFilteredArtworks] = useState(artworksData);


  useEffect(() => {
    setFilteredArtworks(artworksData); // Ensure filteredArtworks is initially set to artworksData
  }, [artworksData]);


  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);
    const filtered = artworksData.filter((artwork) =>
      artwork.name.toLowerCase().includes(searchTerm)
    );
    console.log('Filtered artworks:', filtered);
    setFilteredArtworks(filtered);
  };


  console.log('Artworks data:', artworksData);


  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        value={searchInput}
        onChange={handleSearch}
        style={{ paddingLeft: '1vw', marginBottom: '1vw', height: '4vw', fontSize: '3vw', font: 'inter' }}
      />


      <div className='artworks-container'>
        {filteredArtworks.map((artwork) => (
          <div key={artwork.id} className="artwork">
            <img src={Placeholder} alt={artwork.name} />
            <div>
              <h3>{artwork.name}</h3>
              <p>{artwork.artist}</p>
              <p>{artwork.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ArtworksPage;
