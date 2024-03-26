import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";

export default function ShopStore() {
  const [giftItems, setGiftItems] = useState([]);

  // Fetch gift items from backend when component mounts
  useEffect(() => {
    fetchGiftItems();
  }, []);
 
  console.log('Gift items:', giftItems); // Log fetched items to verify

  // Function to fetch gift items from backend
  const fetchGiftItems = async () => {
    // Make a GET request to fetch gift items from backend
        // Make sure you're using the correct endpoint URL to fetch gift items
      axios.get("https://museum3380-89554eee8566.herokuapp.com/gift-items")
          .then(response => {
              console.log("Response from backend:", response.data); // Log the data received from backend
              setGiftItems(response.data); // Set giftItems state with fetched data
          })
          .catch(error => {
              console.error("Error fetching gift items:", error); // Log any errors that occur
          });
    };

//   // Function to update gift items
//   const updateGiftItems = (itemId, newStock, newSold) => {
//     axios.post("/api/update-gift-items", { itemId, newStock, newSold })
//       .then(response => {
//         console.log(response.data.message); // Log success message
//         // You may want to update state or perform other actions after successful update
//       })
//       .catch(error => {
//         console.error("Error updating gift items:", error);
//         // Handle error
//       });
//   };

//   // Function to handle stock update button click
//   const handleStockUpdate = (itemId, newStock) => {
//     // Example: Assuming new sold quantity is increased by 1 for demonstration
//     const newSold = giftItems.find(item => item.gift_index === itemId).gift_numSold + 1;
//     updateGiftItems(itemId, newStock, newSold);
//   };

//   // Function to handle sale update button click
//   const handleSaleUpdate = (itemId, newSold) => {
//     // Example: Assuming new stock quantity is decreased by 1 for demonstration
//     const newStock = giftItems.find(item => item.gift_index === itemId).gift_currStock - 1;
//     updateGiftItems(itemId, newStock, newSold);
//   };

  return (
    <div className="flex flex-col px-16 py-24 gap-y-16 font-inter border-b">
      {giftItems.length > 0 ? (
        <div className="flex flex-row gap-x-6">
          {giftItems.map(item => (
            <div key={item.gift_index} className="flex flex-col p-4 gap-y-4 bg-gray-100 border border-gray-400 w-1/3 rounded-xl hover:bg-red-100 hover:border-red-400">
              <div className="h-2/3">
                <img
                  className="brightness-75 rounded-xl object-cover object-right size-full"
                  src={Angelico} // Make sure to use item image source from item data
                  alt={item.gift_name}
                />
              </div>
              <div className="h-1/2 p-2 flex flex-col gap-y-4">
                <h4 className="font-bold">{item.gift_name}</h4>
                <button >Current Stock: {item.gift_currStock}</button>
                <button >Number Sold: {item.gift_numSold}</button>
                <button >Price: ${item.gift_price}</button>
              </div>
            </div> 
          ))}
        </div>
      ) : (
        <p>No gift items available.</p>
      )}
    </div>
  );
}  
