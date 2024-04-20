import { React, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IoClose } from "react-icons/io5";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";

export default function CustomerTickets() {
  const { currentAuthID, currentAuthRole } = useContext(AuthContext);

  const [tickets, setTickets] = useState([]);

  function convertTo12hr() {
    var ticket = tickets.map(function (e) {
      // console.log("ticket time", e.Ticket_Time)
      // const hours = ((e.Ticket_Time + 11) % 12 + 1);
      // var suffix = hours <= 12 ? "PM":"AM";
      // const time = ((hours + 11) % 12 + 1) + suffix;
      let [hourString, minute] = e.Ticket_Time.split(":");
      let hour = +hourString % 24;
      let time = (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");

      e.Ticket_Time = time;
      return e;
    });

    console.log("ticket func", ticket);

    //   setTickets(previous =>
    //     previous.map((elem, index)=> {
    //       return({...elem, cost: newCosts[index]})
    //     })
    //    )
    // const hours = ((time24hr + 11) % 12 + 1);
    // var suffix = hours <= 12 ? "PM":"AM";
    // const time = ((hours + 11) % 12 + 1) + suffix;

    // return time;
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const customerInfo = {
      Customer_ID: currentAuthID,
    };
    console.log("fetch customer tickets for customer", customerInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/customer-tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerInfo),
    })
      .then((response) => {
        console.log("repsonse:", response);
        return response.json();
      })
      .then((data) => {
        setTickets(data);
      });
  };

  const [openView, setOpenView] = useState(false);
  const [currInput, setCurrentInput] = useState({});


  const handleClick = (ticket) => {
    setCurrentInput(ticket);
    setOpenView(true);
    console.log(ticket);
    // navigate(`${ticket.TicketTransaction_ID}`);
  };

  return (
    <div className="min-h-screen">
      <UserNavbar />

      <div className="flex flex-col pt-36 pb-24 gap-y-20 font-inter">
        <div className="flex flex-col px-16 gap-y-20">
          <div className="flex flex-col gap-y-4">
            <h1 className="font-fanwoodText italic text-7xl">Account</h1>
            <p className="text-xl font-inter">
              Here you can customize your profile and view previous ticket
              transactions, store transactions, and donations.
            </p>
          </div>
          <div className="flex flex-row space-x-8 w-full border-b py-2">
            <NavLink
              to="/account"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Profile</p>
            </NavLink>

            <NavLink
              to="/account/tickets"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Tickets</p>
            </NavLink>

            <NavLink
              to="/account/purchases"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Purchases</p>
            </NavLink>

            <NavLink
              to="/account/donations"
              className={({ isActive }) =>
                [
                  "hover:underline hover:underline-offset-8",
                  isActive ? "text-cinnabar font-bold" : "",
                ].join(" ")
              }
            >
              <p>Donations</p>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="pb-24 px-16">
      <div className="flex flex-col space-y-12">
        <div className="flex flex-col space-y-20">
          <div className="flex flex-col space-y-12">
            <h3 className="text-5xl font-fanwoodText">
              Past Ticket Transactions
            </h3>

            {tickets.length > 0 ? (
              <div className="text-obsidian bg-stone-50 border rounded-3xl h-fit flex flex-col divide-y divide">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-between">
                  <p className="w-1/6 ">Ticket ID</p>
                  <p className="w-1/6 ">Date </p>
                  <p className="w-1/6 ">Time</p>
                  <p className="w-1/6 ">Total Bill</p>
                  <p className="w-1/6 ">Quantity</p>
                  <p className="w-1/6 ">Transaction Date</p>
                </div>
                {tickets.map((ticket, id) => (
                  <div
                    key={ticket.TicketTransaction_ID}
                    onClick={() => handleClick(ticket)}
                    className="flex flex-row gap-x-6 p-6 group items-center justify-between hover:bg-rose-50 hover:text-rose-500 hover:cursor-pointer"
                  >
                    <p className="w-1/6 ">#{ticket.TicketTransaction_ID}</p>
                    <p className="w-1/6 ">{ticket.New_Ticket_Date}</p>
                    <p className="w-1/6 ">{ticket.Ticket_Time}</p>
                    <p className="w-1/6 ">${ticket.Total_Bill}</p>
                    <p className="w-1/6 ">{ticket.Ticket_Count}</p>
                    <p className="w-1/6 ">{ticket.New_Transaction_Date}</p>
                  </div>
                ))}
              </div>
            ) : null}


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
                  <p className="w-1/2 text-end">{currInput.Ticket_Count}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Total Bill</p>
                  <p className="w-1/2 text-end">${currInput.Total_Bill}</p>
                </div>
                
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Ticket Date</p>
                  <p className="w-1/2 text-end">{currInput.New_Ticket_Date}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Ticket Time</p>
                  <p className="w-1/2 text-end">{currInput.Ticket_Time}</p>
                </div>

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">For</p>
                  {currInput.Exhibition_Name !== null ? <div className="w-1/2 text-end"><p className="font-bold">Special Exhibition</p>{currInput.Exhibition_Name}</div> : <p className="w-1/2 text-end">Permanent Collections</p>}
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

      {/* <Outlet /> */}
      <Footer />
    </div>
  );
}
