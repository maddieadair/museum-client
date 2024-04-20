import React, { useState, useEffect } from "react";
import DirectorNavbar from "../../components/director/DirectorNavbar";
import DirectorBar from "../../components/director/DirectorBar";
import { IoFilter } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

export default function DirectorFinanceReport() {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");
  const [tickets, setTickets] = useState([]);
  const [donations, setDonations] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [aggregatedData, setAggregatedData] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);
  const [currInput, setCurrentInput] = useState({});
  const [openFilter, setOpenFilter] = useState(false);

  const [totalRevenue, setTotalRevenue] = useState({});

  useEffect(() => {
    fetchTickets();
    fetchDonations();
    fetchGifts();
  }, []);

  useEffect(() => {
    aggregateData();
  }, [tickets, donations, gifts, selectedPeriod]);

  const fetchTickets = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/tickets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTickets(data));
  };

  const fetchDonations = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/donations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setDonations(data));
  };

  const fetchGifts = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/gift-log", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setGifts(data));
  };

  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleDateString("en-US") : "";
  };

  const formatPeriod = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return selectedPeriod === "Daily"
      ? `${year}-${month < 10 ? `0${month}` : month}-${
          day < 10 ? `0${day}` : day
        }`
      : selectedPeriod === "Monthly"
      ? `${year}-${month < 10 ? `0${month}` : month}`
      : `${year}`;
  };

  const aggregateData = () => {
    const aggregated = {};

    const initializePeriod = (period) => {
      if (!aggregated[period]) {
        aggregated[period] = {
          period: period,
          ticketRevenue: 0,
          shopRevenue: 0,
          donationRevenue: 0,
          totalRevenue: 0,
        };
      }
    };

    // Aggregate tickets
    tickets.forEach((ticket) => {
      const period = formatPeriod(ticket.Transaction_Date);
      initializePeriod(period);
      aggregated[period].ticketRevenue += ticket.Total_Bill;
    });

    // Aggregate donations
    donations.forEach((donation) => {
      const period = formatPeriod(donation.Donation_Date);
      initializePeriod(period);
      aggregated[period].donationRevenue += donation.Amount_Donated;
    });

    // Aggregate gifts
    gifts.forEach((gift) => {
      const period = formatPeriod(gift.transaction_date);
      initializePeriod(period);
      aggregated[period].shopRevenue += gift.total_bill;
    });

    // Aggregate total
    Object.keys(aggregated).forEach((period) => {
      const data = aggregated[period];
      data.totalRevenue =
        data.ticketRevenue + data.shopRevenue + data.donationRevenue;
    });

    const sortedData = Object.values(aggregated).sort((a, b) =>
      b.period.localeCompare(a.period)
    );
    setAggregatedData(sortedData);
  };

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
    setTotalRevenue([]);
  };

  const handleCancel = () => {
    clearFields();
    setOpenFilter(false);
  }

  const filterRevenue = async (e) => {
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
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/rev-dates", {
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
      console.log("total rev", data);
      setTotalRevenue(data);
      setOpenFilter(false);
    } catch (error) {
      alert(error);
      console.log("There was an error fetching:", error);
    }
  };

  const buttonStyle =
    "w-fit p-2 px-4 rounded-md flex flex-row gap-x-2 mr-2 items-center";
  const activeStyle = "bg-[#3d7b51] text-chalk";
  const inactiveStyle = "bg-white text-[#3d7b51] border border-[#3d7b51]";

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <DirectorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <DirectorBar title="Financial Report" />

          <div className="flex flex-col px-14 gap-y-12">
            <div className="flex flex-row justify-start">
              <button
                type="button"
                onClick={() => {setSelectedPeriod("Daily"); clearFields()}}
                className={`${buttonStyle} ${
                  selectedPeriod === "Daily" ? activeStyle : inactiveStyle
                }`}
              >
                <p>Daily</p>
              </button>
              <button
                type="button"
                onClick={() => {setSelectedPeriod("Monthly"); clearFields()}}
                className={`${buttonStyle} ${
                  selectedPeriod === "Monthly" ? activeStyle : inactiveStyle
                }`}
              >
                <p>Monthly</p>
              </button>
              <button
                type="button"
                onClick={() => {setSelectedPeriod("Yearly"); clearFields()}}
                className={`${buttonStyle} ${
                  selectedPeriod === "Yearly" ? activeStyle : inactiveStyle
                }`}
              >
                <p>Yearly</p>
              </button>

              <div className="flex flex-row justify-between w-full">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPeriod("Filter");
                    clearFields()
                    setOpenFilter(true);
                    setCurrentInput({});
                  }}
                  className={`${buttonStyle} ${
                    selectedPeriod === "Filter" ? activeStyle : inactiveStyle
                  }`}
                >
                  <IoFilter className="size-6" />
                  <p>Filter</p>
                </button>
                {selectedPeriod === "Filter" && startDate !== "" && endDate !== null && (
                  <div className="text-[#34383f] flex items-center font-bold">
                    {`${formatDate(startDate)} - ${
                      endDate !== "" ? formatDate(endDate) : "Today"
                    }`}
                  </div>
                )}
              </div>
            </div>

            {aggregatedData.length > 0 && selectedPeriod !== "Filter" ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <p className="w-1/5">Period</p>
                  <p className="w-1/5">Ticket Revenue</p>
                  <p className="w-1/5">Shop Revenue</p>
                  <p className="w-1/5">Donation Revenue</p>
                  <p className="w-1/5">Total Revenue</p>
                </div>
                {aggregatedData.map((item, index) => (
                  <div key={index} className="flex flex-row gap-x-6 p-6">
                    <p className="w-1/5">{item.period}</p>
                    <p className="w-1/5">${item.ticketRevenue.toFixed(2)}</p>
                    <p className="w-1/5">${item.shopRevenue.toFixed(2)}</p>
                    <p className="w-1/5">${item.donationRevenue.toFixed(2)}</p>
                    <p className="w-1/5">${item.totalRevenue.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {selectedPeriod === "Filter" && totalRevenue.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <p className="w-1/4">Ticket Revenue</p>
                  <p className="w-1/4">Shop Revenue</p>
                  <p className="w-1/4">Donation Revenue</p>
                  <p className="w-1/4">Total Revenue</p>
                </div>
                <div className="flex flex-row gap-x-6 p-6">
                  <p className="w-1/4">
                    ${totalRevenue[0].donations.toFixed(2)}
                  </p>
                  <p className="w-1/4">${totalRevenue[0].tickets.toFixed(2)}</p>
                  <p className="w-1/4">${totalRevenue[0].gifts.toFixed(2)}</p>
                  <p className="w-1/4">${totalRevenue[0].total.toFixed(2)}</p>
                </div>
              </div>
            ) : null}

            {openFilter && (
              <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
                <form
                  className="bg-white rounded-3xl h-fit max-h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col"
                  onSubmit={filterRevenue}
                >
                  <div className="flex flex-col">
                    <IoClose
                      className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                      onClick={handleCancel}
                    />
                    <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold">
                          Get the revenue breakdown for a certain period.
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
