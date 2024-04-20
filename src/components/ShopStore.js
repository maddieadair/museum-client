import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import Angelico from "../assets/images/PoketoGlassFrenchPressClear6_1000x1500.webp";

export default function ShopStore() {
  const [giftItems, setGiftItems] = useState([]);

  // Fetch gift items from backend when component mounts
  useEffect(() => {
    fetchGiftItems();
  }, []);

  console.log("Gift items:", giftItems); // Log fetched items to verify

  // Function to fetch gift items from backend
  const fetchGiftItems = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/gifts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGiftItems(data);
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
    <div className="flex flex-col px-16 pb-24 gap-y-16 font-inter border-b">
      {giftItems.length > 0 ? (
        <div className="grid grid-cols-4 gap-x-12 gap-y-12">
          {giftItems.map((item) => (
            <div
              key={item.gift_index}
              className="flex flex-col gap-y-4 border-[1px] border-stone-30"
            >
              <div className="h-64 overflow-hidden">
                <img
                  className="object-cover object-center size-full hover:scale-110 transition-all duration-500"
                  src={Angelico} // Make sure to use item image source from item data
                  alt={item.gift_name}
                />
              </div>
              <div className="h-1/2 p-10 flex flex-col gap-y-4 items-center justify-center">
                <h4 className="font-bold text-xl text-center hover:text-cinnabar hover:underline duration-500 ease-in-out transition-all decoration-1 underline-offset-4">
                  {item.gift_name}
                </h4>
                <p className="text-lg">${item.gift_price}</p>
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
