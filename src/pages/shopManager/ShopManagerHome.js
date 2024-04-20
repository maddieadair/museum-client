import ShopManagerNavbar from "../../components/shopManager/ShopManagerNavbar";
import ShopManagerBar from "../../components/shopManager/ShopManagerBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { HiBellAlert } from "react-icons/hi2";

export default function ShopManagerHome() {
  const [revenue, setRevenue] = useState([]);
  const [itemsSold, setItemsSold] = useState([]);
  const [soldOut, setSoldOut] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [worstsellers, setWorstsellers] = useState([]);
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    fetchRevenue();
    fetchWorstsellers();
    fetchSoldOut();
    fetchLowStock();
    fetchBestsellers();
  }, []);

  const fetchRevenue = () => {
    fetch("http://localhost:3001/shop-revenue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRevenue(data[0].total_revenue);
      });
  };

  const fetchWorstsellers = () => {
    fetch("http://localhost:3001/worstsellers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWorstsellers(data);
      });
  };

  const fetchSoldOut = () => {
    fetch("http://localhost:3001/sold-out", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSoldOut(data);
      });
  };

  const fetchLowStock = () => {
    fetch("http://localhost:3001/low-stock", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLowStock(data);
        if (data.length > 0) {
          setOpenView(true);
        }
      });
  };

  const fetchBestsellers = () => {
    fetch("http://localhost:3001/bestsellers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBestsellers(data);
      });
  };

  console.log("revenue", revenue);
  console.log("items sold", itemsSold);
  console.log("soldout", soldOut);
  console.log("lowstock", lowStock);
  console.log("bestsellers", bestsellers);

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <ShopManagerNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <ShopManagerBar title="Dashboard" />

          {revenue !== null &&
          soldOut.length > 0 &&
          lowStock.length > 0 &&
          bestsellers.length > 0 &&
          worstsellers.length > 0 ? (
            <div className="flex flex-row px-14 gap-x-6 text-md">
              <div className="flex flex-col gap-y-6 w-1/2">
                {revenue !== null ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-4 h-fit">
                    <h1 className="font-bold text-xl">Total Shop Revenue</h1>
                    <h4 className="text-xl">${parseFloat(revenue).toFixed(2)}</h4>
                  </div>
                ) : null}

                {soldOut.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Sold Out Items</p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Item</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {soldOut.map((item, id) => (
                        <div
                          key={item.gift_index}
                          className="flex flex-row justify-between"
                        >
                          <p className="">{item.gift_name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {lowStock.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Items Low on Stock</p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Item</p>
                      <p className="font-bold underline"># of stock left</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {lowStock.map((item, id) => (
                        <div
                          key={item.gift_index}
                          className="flex flex-row justify-between"
                        >
                          <p className="">{item.gift_name}</p>
                          <p className="">{item.gift_currStock}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-y-6 w-1/2">
                {bestsellers.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Bestsellers</p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Item</p>
                      <p className="font-bold underline"># sold</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {bestsellers.map((item, id) => (
                        <div
                          key={item.gift_index}
                          className="flex flex-row justify-between"
                        >
                          <p className="">{item.gift_name}</p>
                          <p className="">{item.gift_numSold}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {worstsellers.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Worstsellers</p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Item</p>
                      <p className="font-bold underline"># sold</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {worstsellers.map((item, id) => (
                        <div
                          key={item.gift_index}
                          className="flex flex-row justify-between"
                        >
                          <p className="">{item.gift_name}</p>
                          <p className="">{item.gift_numSold}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {lowStock.length > 0 && openView ? (
            <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
              <div className="bg-white rounded-3xl h-fit w-1/2 shadow-md flex flex-col">
                <div className="flex flex-col">
                  <IoClose
                    className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                    onClick={() => {
                      setOpenView(false);
                    }}
                  />
                  <div className="flex flex-col px-6 pb-6 gap-y-6 divide-y-2">
                    <div className="flex flex-col gap-y-4 text-center items-center justify-center">
                        <HiBellAlert className="text-cinnabar" size={30}/>
                        <h3 className="text-cinnabar text-xl font-bold">Urgent</h3>
                        <p className="text-cinnabar text-lg">These items are currently low in stock</p>
                    </div>
                    <div className="flex flex-col gap-y-2 pt-6">
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Item</p>
                      <p className="font-bold underline"># of stock left</p>
                    </div>
                      {lowStock.map((item, id) => (
                        <div
                          key={item.gift_index}
                          className="flex flex-row justify-between"
                        >
                          <p className="">{item.gift_name} (#{item.gift_index})</p>
                          <p className="">{item.gift_currStock}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
