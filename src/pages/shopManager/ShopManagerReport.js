import React, { useState, useEffect } from "react";
import ShopManagerNavbar from "../../components/shopManager/ShopManagerNavbar";
import ShopManagerBar from "../../components/shopManager/ShopManagerBar";
import { IoFilter } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

export default function ShopManagerReport() {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);
  const [currInput, setCurrentInput] = useState({});
  const [openFilter, setOpenFilter] = useState(false);

  const [shopLog, setShopLog] = useState([]);
  const [shopCount, setShopCount] = useState([]);
  const [total, setTotal] = useState([]);

  const validate = () => {
    let hasErrors = false;

    if (startDate === "" || startDate.length === 0 || startDate === null) {
      hasErrors = true;
    }

    return hasErrors;
  };

  const clearFields = () => {
    setStartDate("");
    setEndDate("");
    setShopLog([]);
    setShopCount([]);
    setTotal([]);
    setCurrentInput({});
  };

  const handleCancel = () => {
    clearFields();
    setOpenFilter(false);
  };

  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleDateString("en-US") : "";
  };
  

  const filterShop = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors) {
      alert("Please fill in all required fields.");
      return;
    }

    const filterData = {
      Begin_Date: startDate,
      End_Date: endDate,
    };

    console.log("filterData", filterData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/shop-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterData),
      });

      if (!response.ok) {
        throw new Error("There was a network error");
      }

      const data = await response.json();
      console.log("shop log", data);
      setShopLog(data);

      try {
        const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/shop-count", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterData),
        });

        if (!response.ok) {
          throw new Error("There was a network error");
        }

        const data = await response.json();
        console.log("shop count", data);
        setShopCount(data);

        try {
          const response = await fetch(
            "https://museum3380-89554eee8566.herokuapp.com/shop-report-total",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(filterData),
            }
          );

          if (!response.ok) {
            throw new Error("There was a network error");
          }

          const data = await response.json();
          console.log("shop report total", data);
          setTotal(data);
          setOpenFilter(false);
        } catch (error) {
          alert(error);
          console.log("There was an error fetching2:", error);
        }
      } catch (error) {
        alert(error);
        console.log("There was an error fetching2:", error);
      }
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <ShopManagerNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <ShopManagerBar title="Shop Report" />

          <div className="flex flex-col px-14 gap-y-12">
            <div className="flex flex-row justify-start">
              <div className="flex flex-row justify-between w-full">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPeriod("Filter");
                    clearFields();
                    setOpenFilter(true);
                    setCurrentInput({});
                  }}
                  className="bg-[#3d7b51] text-chalk w-fit p-2 px-4 rounded-md flex flex-row items-center gap-x-2"
                >
                  <IoFilter className="size-6" />
                  <p>Filter</p>
                </button>
                {startDate !== "" && endDate !== null && (
                  <div className="text-[#34383f] flex items-center font-bold">
                    {`${formatDate(startDate)} - ${
                      endDate !== "" ? formatDate(endDate) : "Today"
                    }`}
                  </div>
                )}
              </div>
            </div>

            {(total.length > 0 && total[0].Revenue !== null) ||
            shopCount.length > 0 ? (
              <ul>
                <li className="list-disc">
                  {total.length > 0 && total[0].Revenue !== null ? (
                    <p className="text-xl">
                      <span className="font-bold">
                        ${parseFloat(total[0].Revenue).toFixed(2)}
                      </span>{" "}
                      generated in shop revenue{" "}
                    </p>
                  ) : null}
                </li>
                <li className="list-disc">
                  {shopCount.length > 0 ? (
                    <p className="text-xl">
                      <span className="font-bold">{shopCount.length}</span>{" "}
                      different types of items sold
                    </p>
                  ) : null}
                </li>
              </ul>
            ) : null}

            {shopCount.length > 0 ? (
              <div className="bg-white rounded-3xl flex flex-col divide-y-2 divide-slate-100 border h-fit max-h-96 overflow-y-auto">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <p className="w-1/3 ">Item ID</p>
                  <p className="w-1/2 ">Item Name</p>
                  <p className="w-1/3 "># Sold</p>
                </div>
                {shopCount.map((item, id) => (
                  <div
                    key={item.item_ID}
                    className="flex flex-row gap-x-6 p-6 group"
                  >
                    <p className="w-1/3 ">{item.item_ID}</p>
                    <p className="w-1/2 ">{item.gift_name}</p>
                    <p className="w-1/3 ">{item.Count}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {shopLog.length > 0 ? (
              <p className="text-xl">
                <span className="font-bold">{shopLog.length}</span> transactions
                added
              </p>
            ) : null}
            {shopLog.length > 0 ? (
              <div className="bg-white rounded-3xl flex flex-col divide-y-2 divide-slate-100 border h-fit max-h-96 overflow-y-auto">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <p className="w-24 ">Transaction ID</p>
                  <p className="w-1/6 ">Item ID</p>
                  <p className="w-1/6 ">Item Name</p>
                  <p className="w-1/6 ">Customer ID</p>
                  <p className="w-1/6 ">Quantity</p>
                  <p className="w-1/6 ">Total Bill</p>
                  <p className="w-1/6 ">Transaction Date</p>
                </div>
                {shopLog.map((item, id) => (
                  <div
                    key={item.gift_transactionID}
                    className="flex flex-row gap-x-6 p-6 group"
                  >
                    <p className="w-24 ">{item.gift_transactionID}</p>
                    <p className="w-1/6 ">{item.item_ID}</p>
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

            {openFilter && (
              <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
                <form
                  className="bg-white rounded-3xl h-fit max-h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col"
                  onSubmit={(e) => filterShop(e)}
                >
                  <div className="flex flex-col">
                    <IoClose
                      className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                      onClick={handleCancel}
                    />
                    <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold">
                          Get all shop transactions within a certain period.
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold">
                          Start Date{" "}
                          <span className="text-cinnabar font-normal">*</span>
                        </p>
                        <input
                          type="date"
                          name="startDate"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)} // Replace 'setDeptName' with the setter function for your start date state variable
                          className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                        />
                      </div>
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold">End Date</p>
                        <input
                          type="date"
                          name="endDate"
                          value={endDate} // Replace with the state variable for the end date
                          onChange={(e) => {
                            setEndDate(e.target.value);
                          }}
                          className="shadow-inner border border-slate-200 rounded-md px-2 py-1 w-1/2"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
                    >
                      Apply Filter
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
