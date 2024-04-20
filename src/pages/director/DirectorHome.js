import DirectorNavbar from "../../components/director/DirectorNavbar";
import DirectorBar from "../../components/director/DirectorBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect, useContext } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

export default function DirectorHome() {
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [exhibitRevenue, setExhibitRevenue] = useState([]);
  const [exhibitStats, setExhibitStats] = useState([]);
  const [collectionStats, setCollectionStats] = useState([]);
  const [collectionRev, setCollectionRev] = useState([]);
  const [donationRev, setDonationRev] = useState([]);
  const [giftRev, setGiftRev] = useState([]);
  const [ticketSum, setTicketSum] = useState([]);
  const [noManagers, setNoManagers] = useState([]);

  const { currentAuthID, currentAuthRole, logout, currentAuthDep } =
    useContext(AuthContext);

  useEffect(() => {
    fetchExhibitRev();
    fetchExhibitStats();
    fetchCollectionStats();
    fetchCollectionRevenue();
    fetchGiftRevenue();
    fetchDonationRev();
    fetchTicketSum();
    fetchEmptyDepts();
    fetchTotalRevenue();
  }, []);

  const fetchTicketSum = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/exhibit-ticket-sum", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTicketSum(data);
        console.log("ticket sum", data);
      });
  };

  const fetchDonationRev = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/donation-rev", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDonationRev(data);
        console.log("donation revenue", data);
      });
  };

  const fetchExhibitRev = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/exhibit-revenue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExhibitRevenue(data);
        console.log("exhibit revenue", data);
      });
  };

  const fetchExhibitStats = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/exhibit-stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExhibitStats(data);
        console.log("exhibit stats", exhibitStats);
      });
  };

  const fetchCollectionStats = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/collection-stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCollectionStats(data);
        console.log("collection stats", data);
      });
  };

  const fetchCollectionRevenue = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/collection-revenue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCollectionRev(data);
        console.log("col rev", data);
      });
  };

  const fetchGiftRevenue = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/shop-revenue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGiftRev(data);
        console.log("gift rev", data);
      });
  };

  const fetchEmptyDepts = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/dept-no-mgr", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNoManagers(data);
        console.log("no managers", data);
      });
  };

  const fetchTotalRevenue = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/total-rev", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTotalRevenue(data);
        console.log("total rev", data);
      });
  };

  //   console.log("revenue", revenue);
  //   console.log("items sold", itemsSold);
  //   console.log("soldout", soldOut);
  //   console.log("lowstock", lowStock);
  //   console.log("bestsellers", bestsellers);

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <DirectorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <DirectorBar title="Dashboard" />

          {exhibitRevenue.length > 0 &&
          exhibitStats.length > 0 &&
          collectionRev.length > 0 &&
          giftRev.length > 0 &&
          donationRev.length > 0 &&
          ticketSum.length > 0 &&
          noManagers.length > 0 ? (
            <div className="flex flex-row px-14 gap-x-6 text-md">
              <div className="flex flex-col gap-y-6 w-1/2">
                {noManagers.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-4 h-fit">
                    <h1 className="font-bold text-xl text-cinnabar">Urgent!</h1>
                    <p>
                      These departments currently do not have any assigned
                      managers.
                    </p>
                    <div className="flex flex-col gap-y-2">
                      {noManagers.map((item, id) => (
                        <div
                          key={item.department_name}
                          className="flex flex-row justify-between"
                        >
                          <p className="">- {item.department_name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {exhibitRevenue.length > 0 &&
                collectionRev.length > 0 &&
                donationRev.length > 0 &&
                giftRev.length > 0 &&
                totalRevenue.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-4 h-fit">
                    <h1 className="font-bold text-xl">Revenue Breakdown</h1>
                    <div className="flex flex-col gap-y-4 divide-y-2">
                      <div className="flex flex-col gap-y-4">
                      <div className="flex flex-roww justify-between">
                            <p>Exhibitions</p>
                            <p>${exhibitRevenue[0].Total_Revenue}</p>
                        </div>
                        <div className="flex flex-roww justify-between">
                            <p>Permanent Collections</p>
                            <p>${collectionRev[0].Total_Rev}</p>
                        </div>
                        <div className="flex flex-roww justify-between">
                            <p>Donations</p>
                            <p>${donationRev[0].Donation_Sum}</p>
                        </div>
                        <div className="flex flex-roww justify-between">
                            <p>Gift Shop</p>
                            <p>${parseFloat(giftRev[0].total_revenue).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="pt-4 flex flex-roww justify-between">
                        <p>Total Revenue</p>
                        <p>${parseFloat(totalRevenue[0].Total_Revenue).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ) : null}

                {collectionStats.length > 0 && ticketSum.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Total Ticket Stats</p>

                    <div className="flex flex-col gap-y-2">
                      <p>
                        {collectionStats[0].Total_Sum} Permanent Collection
                        tickets sold
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <p>{ticketSum[0].Total_Sum} Exhibition tickets sold</p>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-y-6 w-1/2">
                {exhibitStats.length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Revenue per Exhibition</p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Exhibition</p>
                      <p className="font-bold underline">Revenue</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {exhibitStats.map((item, id) => (
                        <div
                          key={item.Exhibit_ID}
                          className="flex flex-row justify-between"
                        >
                          <p className="w-1/2">- {item.Exhibit_Name}</p>
                          <p className="">
                            $
                            {item.Total_Revenue === null
                              ? `0`
                              : item.Total_Revenue}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
