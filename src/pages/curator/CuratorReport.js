import React, { useState, useEffect, useContext } from "react";
import CuratorNavbar from "../../components/curator/CuratorNavbar";
import CuratorBar from "../../components/curator/CuratorBar";
import { IoFilter } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoIosMore } from "react-icons/io";

export default function CuratorExhibitReport() {
  const { currentAuthID, currentAuthRole, logout, currentAuthDep } =
    useContext(AuthContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);
  const [currInput, setCurrentInput] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const [openView, setOpenView] = useState(false);

  const [total, setTotal] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [data, setData] = useState([]);

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
    setCurrentInput({});
  };

  const handleCancel = () => {
    clearFields();
    setOpenFilter(false);
  };

  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleDateString("en-US") : "";
  };

  const fetchData = (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors) {
      alert("Please fill in all required fields.");
      return;
    }

    const filterData = {
      Begin_Date: startDate,
      End_Date: endDate,
      Curator_ID: currentAuthID,
    };
    const urls = [
      "https://museum3380-89554eee8566.herokuapp.com/curator-ex-report",
      "https://museum3380-89554eee8566.herokuapp.com/curator-ex-tickets",
      "https://museum3380-89554eee8566.herokuapp.com/curator-ex-sum",
    ];

    Promise.all(
      urls.map((url) =>
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterData),
        }).then((response) => response.json())
      )
    )
      .then((data) => {
        console.log("data", data);
        setData(data);
        setOpenFilter(false);
      })
      .catch((error) => console.error("An error occurred:", error));
  };

  const filterTickets = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors) {
      alert("Please fill in all required fields.");
      return;
    }

    const filterData = {
      Begin_Date: startDate,
      End_Date: endDate,
      Curator_ID: currentAuthID,
    };

    console.log("filterData", filterData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/curator-ex-report", {
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
      console.log("total exhibits", data);
      setTotal(data);

      try {
        const response = await fetch(
          "https://museum3380-89554eee8566.herokuapp.com/curator-ex-tickets",
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
        console.log("exhibit ticket details", data);
        setTickets(data);
        setOpenFilter(false);
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
        <CuratorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <CuratorBar title="Exhibition Sales Report" />

          <div className="flex flex-col px-14 gap-y-12">
            <div className="flex flex-row justify-start">
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      clearFields();
                      setOpenFilter(true);
                      setCurrentInput({});
                      setTotal([]);
                      setTickets([]);
                    }}
                    className="bg-[#3d7b51] text-chalk w-fit p-2 px-4 rounded-md flex flex-row items-center gap-x-2"
                  >
                    <IoFilter className="size-6" />
                    <p>Filter</p>
                  </button>
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
                </div>
                {startDate !== "" && endDate !== null && (
                  <div className="text-[#34383f] flex items-center font-bold">
                    {`${formatDate(startDate)} - ${
                      endDate !== "" ? formatDate(endDate) : "Today"
                    }`}
                  </div>
                )}
              </div>
            </div>

            {data.length > 0 && data[2].length > 0 && data[2][0].Total_Tickets !== null ? (
              <h1 className="text-xl font-bold">Overall Exhibition Sales</h1>
            ) : null}

            {data.length > 0 && data[2].length > 0 && data[2][0].Total_Tickets !== null ? (
              <div className="bg-white rounded-3xl h-fit max-h-96 overflow-y-auto flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <p className="w-1/2"># Tickets Sold</p>
                  <p className="w-1/2"># Child Tickets Sold</p>
                  <p className="w-1/2"># Teen Tickets Sold</p>
                  <p className="w-1/2"># Adult Tickets Sold</p>
                  <p className="w-1/2"># Senior Tickets Sold</p>
                  <p className="w-1/2">Revenue</p>
                </div>
                {data[2].map((item, id) => (
                  <div
                    key={item.Exhibit_ID}
                    className="flex flex-row gap-x-6 p-6 group"
                  >
                    <p className="w-1/2">{item.Total_Tickets}</p>
                    <p className="w-1/2">{item.Child_Tix}</p>
                    <p className="w-1/2">{item.Teen_Tix}</p>
                    <p className="w-1/2">{item.Adult_Tix}</p>
                    <p className="w-1/2">{item.Senior_Tix}</p>
                    <p className="w-1/2">${item.Total_Revenue}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {data.length > 0 && data[0].length > 0 ? (
              <h1 className="text-xl font-bold">Sales per Exhibition</h1>
            ) : null}
            {data.length > 0 && data[0].length > 0 ? (
              <div className="bg-white rounded-3xl h-fit max-h-96 overflow-y-auto flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <p className="w-1/2">Exhibition Name</p>
                  <p className="w-1/2"># Tickets Sold</p>
                  <p className="w-1/2"># Child Tickets Sold</p>
                  <p className="w-1/2"># Teen Tickets Sold</p>
                  <p className="w-1/2"># Adult Tickets Sold</p>
                  <p className="w-1/2"># Senior Tickets Sold</p>
                  <p className="w-1/2">Revenue</p>
                </div>
                {data[0].map((item, id) => (
                  <div
                    key={item.Exhibit_ID}
                    className="flex flex-row gap-x-6 p-6 group"
                  >
                    <p className="w-1/2">{item.Exhibit_Name}</p>
                    <p className="w-1/2">{item.Total_Tickets}</p>
                    <p className="w-1/2">{item.Child_Tix}</p>
                    <p className="w-1/2">{item.Teen_Tix}</p>
                    <p className="w-1/2">{item.Adult_Tix}</p>
                    <p className="w-1/2">{item.Senior_Tix}</p>
                    <p className="w-1/2">${item.Total_Revenue}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {data.length > 0 && data[1].length > 0 ? (
              <div className="flex flex-col gap-y-2">
                <h1 className="text-xl font-bold">Ticket sales</h1>
                <p className="">
                  <span className="font-bold">- {data[1].length}</span> exhibition ticket
                  purchases added
                </p>
              </div>
            ) : null}
            {data.length > 0 && data[1].length > 0 ? (
              <div className="bg-white rounded-3xl h-fit max-h-96 overflow-y-auto flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-1/6 ">Transaction ID</p>
                  <p className="w-1/6 ">Customer ID</p>
                  <p className="w-1/6 ">Exhibition</p>
                  <p className="w-1/6 ">Total Bill</p>
                  <p className="w-1/6 ">Ticket Date</p>
                  <p className="w-1/6 ">Ticket Time</p>
                  <p className="w-1/6 ">Transaction Date</p>
                </div>
                {data[1].map((item, id) => (
                  <div
                    key={item.Donation_ID}
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
                    <p className="w-1/6 ">{item.TicketTransaction_ID}</p>
                    <p className="w-1/6 ">{item.Customer_ID}</p>
                    <p className="w-1/6 ">{item.Exhibition_Name}</p>
                    <p className="w-1/6 ">${item.Total_Bill}</p>
                    <p className="w-1/6 ">{item.New_Date}</p>
                    <p className="w-1/6 ">{item.Ticket_Time}</p>
                    <p className="w-1/6 ">{item.New_Transaction_Date}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {openFilter && (
              <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
                <form
                  className="bg-white rounded-3xl h-fit max-h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col"
                  onSubmit={(e) => fetchData(e)}
                >
                  <div className="flex flex-col">
                    <IoClose
                      className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                      onClick={handleCancel}
                    />
                    <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold">
                          Get all exhibition ticket sales within a certain
                          period.
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

            {openView ? (
              <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
                <div className="bg-white rounded-3xl h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col">
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
                        <p className="font-bold w-1/2">Transaction ID</p>
                        <p className="w-1/2 text-end">
                          {currInput.TicketTransaction_ID}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold w-1/2">Customer ID</p>
                        <p className="w-1/2 text-end">
                          {currInput.Customer_ID}
                        </p>
                      </div>
                      {currInput.Num_Child_Tickets !== 0 ? (
                        <div className="flex flex-row justify-between items-center p-4">
                          <p className="font-bold w-1/2"># of Child Tickets</p>
                          <p className="w-1/2 text-end">
                            {currInput.Num_Child_Tickets}
                          </p>
                        </div>
                      ) : null}

                      {currInput.Num_Teen_Tickets !== 0 ? (
                        <div className="flex flex-row justify-between items-center p-4">
                          <p className="font-bold w-1/2"># of Teen Tickets</p>
                          <p className="w-1/2 text-end">
                            {currInput.Num_Teen_Tickets}
                          </p>
                        </div>
                      ) : null}

                      {currInput.Num_Adult_Tickets !== 0 ? (
                        <div className="flex flex-row justify-between items-center p-4">
                          <p className="font-bold w-1/2"># of Adult Tickets</p>
                          <p className="w-1/2 text-end">
                            {currInput.Num_Adult_Tickets}
                          </p>
                        </div>
                      ) : null}

                      {currInput.Num_Senior_Tickets !== 0 ? (
                        <div className="flex flex-row justify-between items-center p-4">
                          <p className="font-bold w-1/2"># of Senior Tickets</p>
                          <p className="w-1/2 text-end">
                            {currInput.Num_Senior_Tickets}
                          </p>
                        </div>
                      ) : null}

                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold w-1/2">Quantity</p>
                        <p className="w-1/2 text-end">
                          {currInput.Ticket_Count}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold w-1/2">Total Bill</p>
                        <p className="w-1/2 text-end">
                          ${currInput.Total_Bill}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold w-1/2">Name</p>
                        <p className="w-1/2 text-end">
                          {currInput.Customer_Fname} {currInput.Customer_Lname}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold w-1/2">Ticket Date</p>
                        <p className="w-1/2 text-end">{currInput.New_Date}</p>
                      </div>
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold w-1/2">Ticket Time</p>
                        <p className="w-1/2 text-end">
                          {currInput.Ticket_Time}
                        </p>
                      </div>

                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold w-1/2">For</p>
                        {currInput.Exhibition_Name !== null ? (
                          <div className="w-1/2 text-end">
                            <p className="font-bold">Special Exhibition</p>
                            {currInput.Exhibition_Name}
                          </div>
                        ) : (
                          <p className="w-1/2 text-end">
                            Permanent Collections
                          </p>
                        )}
                      </div>
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold w-1/2">Transaction Date</p>
                        <p className="w-1/2 text-end">
                          {currInput.New_Transaction_Date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
