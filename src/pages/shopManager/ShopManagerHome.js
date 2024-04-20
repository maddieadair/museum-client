import ShopManagerNavbar from "../../components/shopManager/ShopManagerNavbar";
import ShopManagerBar from "../../components/shopManager/ShopManagerBar";
import { React, useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { HiBellAlert } from "react-icons/hi2";

export default function ShopManagerHome() {
  const [openView, setOpenView] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const urls = [
      "https://museum3380-89554eee8566.herokuapp.com/shop-revenue",
      "https://museum3380-89554eee8566.herokuapp.com/worstsellers",
      "https://museum3380-89554eee8566.herokuapp.com/bestsellers",
      "https://museum3380-89554eee8566.herokuapp.com/low-stock",
      "https://museum3380-89554eee8566.herokuapp.com/sold-out",
    ];

    Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    )
      .then((data) => {
        console.log("data", data);
        setData(data);

        if (data[3].length > 0) {
          setOpenView(true);
        }
      })
      .catch((error) => console.error("An error occurred:", error));
  };

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <ShopManagerNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <ShopManagerBar title="Dashboard" />

          {data.length > 0 ? (
            <div className="flex flex-row px-14 gap-x-6 text-md">
              <div className="flex flex-col gap-y-6 w-1/2">
                {data[0].length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-4 h-fit">
                    <h1 className="font-bold text-xl">Total Shop Revenue</h1>
                    <h4 className="text-xl">
                      ${parseFloat(data[0][0].total_revenue).toFixed(2)}
                    </h4>
                  </div>
                ) : null}

                {data[4].length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Sold Out Items</p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Item</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {data[4].map((item, id) => (
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
              </div>

              <div className="flex flex-col gap-y-6 w-1/2">
                {data[2].length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Bestsellers</p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Item</p>
                      <p className="font-bold underline"># sold</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {data[2].map((item, id) => (
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

                {data[1].length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Worstsellers</p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Item</p>
                      <p className="font-bold underline"># sold</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {data[1].map((item, id) => (
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

          {data.length > 0 && data[3].length > 0 && openView ? (
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
                      <HiBellAlert className="text-cinnabar" size={30} />
                      <h3 className="text-cinnabar text-xl font-bold">
                        Urgent
                      </h3>
                      <p className="text-cinnabar text-lg">
                        These items are currently low in stock
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-2 pt-6">
                      <div className="flex flex-row justify-between">
                        <p className="font-bold underline">Item</p>
                        <p className="font-bold underline"># of stock left</p>
                      </div>
                      {data[3].map((item, id) => (
                        <div
                          key={item.gift_index}
                          className="flex flex-row justify-between"
                        >
                          <p className="">
                            {item.gift_name} (#{item.gift_index})
                          </p>
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
