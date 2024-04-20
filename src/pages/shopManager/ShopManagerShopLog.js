import ShopManagerNavbar from "../../components/shopManager/ShopManagerNavbar";
import ShopManagerBar from "../../components/shopManager/ShopManagerBar";
import { React, useState, useEffect } from "react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

export default function ShopManagerShopLog() {
  const [status, setStatus] = useState("");
  const [gifts, setGifts] = useState([]);
  const [currInput, setCurrentInput] = useState({});
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/gift-log", {
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

  console.log(currInput);

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <ShopManagerNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <ShopManagerBar title="Transaction Log" />

          <div className="flex flex-col px-14 gap-y-12">
            <div className="flex flex-row justify-between">
              <button
                type="button"
                onClick={() => setOpenView(true)}
                className={`${
                  Object.keys(currInput).length !== 0
                    ? "bg-[#bcb6b4] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                    : "hidden"
                }`}
              >
                <p>View More Details</p>
                <IoIosMore className="size-4" />
              </button>
              <div
                className={`${
                  Object.keys(currInput).length !== 0
                    ? "flex flex-row gap-x-4"
                    : "hidden"
                }`}
              ></div>
            </div>

            {gifts.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-1/6 ">Transaction ID</p>
                  <p className="w-1/6 ">Item Name</p>
                  <p className="w-1/6 ">Customer ID</p>
                  <p className="w-1/6 ">Quantity</p>
                  <p className="w-1/6 ">Total Bill</p>
                  <p className="w-1/6 ">Transaction Date</p>
                </div>
                {gifts.map((item, id) => (
                  <div
                    key={item.gift_transactionID}
                    className="flex flex-row gap-x-6 p-6 group"
                  >
                    {currInput === item ? (
                      <MdOutlineCheckBox
                        className="size-6 text-rose-400"
                        onClick={() => setCurrentInput({})}
                      />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        className="size-6 group-hover:visible invisible"
                        onClick={() => setCurrentInput(item)}
                      />
                    )}{" "}
                    <p className="w-1/6 ">{item.gift_transactionID}</p>
                    <p className="w-1/6 ">{item.gift_name}</p>
                    <p className="w-1/6 ">{item.customer_ID}</p>
                    <p className="w-1/6 ">{item.transaction_quantity}</p>
                    <p className="w-1/6 ">
                      ${parseFloat(item.total_bill).toFixed(2)}
                    </p>
                    <p className="w-1/6 ">{item.New_Date}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {openView ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <div className="bg-white rounded-3xl h-fit w-1/2 shadow-md flex flex-col">
            <div className="flex flex-col">
              <IoClose
                className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                onClick={() => {
                  setCurrentInput({});
                  setOpenView(false);
                }}
              />
              <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Transaction ID</p>
                  <p className="">{currInput.gift_transactionID}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Item ID</p>
                  <p className="">{currInput.item_ID}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Item Name</p>
                  <p className="">{currInput.gift_name}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Customer ID</p>
                  <p className="">{currInput.customer_ID}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Quantity</p>
                  <p className="">{currInput.transaction_quantity}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Total Bill</p>
                  <p className="">
                    ${parseFloat(currInput.total_bill).toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">Transaction Date</p>
                  <p className="">{currInput.New_Date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
