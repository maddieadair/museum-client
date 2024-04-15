import React, { useState, useEffect } from "react";
import DirectorNavbar from "../../components/director/DirectorNavbar";
import DirectorBar from "../../components/director/DirectorBar";

export default function DirectorFinanceReport() {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");
  const [tickets, setTickets] = useState([]);
  const [donations, setDonations] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [aggregatedData, setAggregatedData] = useState([]);

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

  const formatPeriod = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return selectedPeriod === "Daily" ? `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
           : selectedPeriod === "Monthly" ? `${year}-${month < 10 ? `0${month}` : month}`
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
          totalRevenue: 0
        };
      }
    };
  
    // Aggregate tickets
    tickets.forEach(ticket => {
      const period = formatPeriod(ticket.Transaction_Date);
      initializePeriod(period);
      aggregated[period].ticketRevenue += ticket.Total_Bill;
    });
  
    // Aggregate donations
    donations.forEach(donation => {
      const period = formatPeriod(donation.Donation_Date);
      initializePeriod(period);
      aggregated[period].donationRevenue += donation.Amount_Donated;
    });
  
    // Aggregate gifts
    gifts.forEach(gift => {
      const period = formatPeriod(gift.transaction_date);
      initializePeriod(period);
      aggregated[period].shopRevenue += gift.total_bill;
    });
  
    // Aggregate total
    Object.keys(aggregated).forEach(period => {
      const data = aggregated[period];
      data.totalRevenue = data.ticketRevenue + data.shopRevenue + data.donationRevenue;
    });
  
    const sortedData = Object.values(aggregated).sort((a, b) => b.period.localeCompare(a.period));
    setAggregatedData(sortedData);
  };

  const buttonStyle = "w-fit p-2 px-4 rounded-md flex flex-row gap-x-2 mr-2 items-center";
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
                onClick={() => setSelectedPeriod("Daily")}
                className={`${buttonStyle} ${selectedPeriod === "Daily" ? activeStyle : inactiveStyle}`}
              >
                <p>Daily</p>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPeriod("Monthly")}
                className={`${buttonStyle} ${selectedPeriod === "Monthly" ? activeStyle : inactiveStyle}`}
              >
                <p>Monthly</p>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPeriod("Yearly")}
                className={`${buttonStyle} ${selectedPeriod === "Yearly" ? activeStyle : inactiveStyle}`}
              >
                <p>Yearly</p>
              </button>
            </div>

            {aggregatedData.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <p className="w-1/5">Period</p>
                  <p className="w-1/5">Ticket Revenue</p>
                  <p className="w-1/5">Shop Revenue</p>
                  <p className="w-1/5">Donation Revenue</p>
                  <p className="w-1/5">Combined Revenue</p>
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
            ) : <p>No data available for the selected period.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}