import DirectorNavbar from "../../components/director/DirectorNavbar";
import DirectorBar from "../../components/director/DirectorBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function DirectorShopCatalog() {
  const [giftName, setGiftName] = useState("");
  const [giftPrice, setGiftPrice] = useState("");
  const [giftStock, setGiftStock] = useState("");


  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = () => {
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
        setGifts(data);
      });
  };

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <DirectorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <DirectorBar title="Shop Catalog" />

          {gifts.length > 0 ? (
            <div className="flex flex-col px-14 gap-y-12">
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <p className="w-1/6 ">Item ID</p>
                  <p className="w-1/6 ">Name</p>
                  <p className="w-1/6 ">Price</p>
                  <p className="w-1/6 ">Current Stock</p>
                  <p className="w-1/6 ">Number Sold</p>
                  <p className="w-1/6 ">Status</p>
                </div>
                {gifts.map((item, id) => (
                  <div
                    key={item.gift_index}
                    className="flex flex-row gap-x-6 p-6 group"
                  >
                    <p className="w-1/6 ">{item.gift_index}</p>
                    <p className="w-1/6 ">{item.gift_name}</p>
                    <p className="w-1/6 ">${item.gift_price}</p>
                    <p className="w-1/6 ">{item.gift_currStock}</p>
                    <p className="w-1/6 ">{item.gift_numSold}</p>
                    {item.soldout_status === 0 ? (
                      <p className="w-1/6 ">In Stock</p>
                    ) : (
                      <p className="w-1/6 text-cinnabar font-bold">
                        Out of Stock
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
