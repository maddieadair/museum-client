import DirectorNavbar from "../../components/director/DirectorNavbar";
import DirectorBar from "../../components/director/DirectorBar";
import { React, useState, useEffect } from "react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

export default function DirectorTickets() {
  const [status, setStatus] = useState("");
  const [tickets, setTickets] = useState([]);
  const [currInput, setCurrentInput] = useState({});
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/tickets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTickets(data);
      });
  };

  console.log(tickets);

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <DirectorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <DirectorBar title="Tickets" />

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

            {tickets.length > 0 ? (
              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-1/6 ">Transaction ID</p>
                  <p className="w-1/6 ">Customer ID</p>
                  <p className="w-1/6 ">Total Bill</p>
                  <p className="w-1/6 ">Ticket Date</p>
                  <p className="w-1/6 ">Ticket Time</p>
                  <p className="w-1/6 ">Transaction Date</p>
                </div>
                {tickets.map((item, id) => (
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
                    <p className="w-1/6 ">${item.Total_Bill}</p>
                    <p className="w-1/6 ">{item.New_Ticket_Date}</p>
                    <p className="w-1/6 ">{item.Ticket_Time}</p>
                    <p className="w-1/6 ">{item.New_Transaction_Date}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

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
                  <p className="w-1/2 text-end">{currInput.Customer_ID}</p>
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
                  <p className="font-bold w-1/2">Name</p>
                  <p className="w-1/2 text-end">
                    {currInput.Customer_Fname} {currInput.Customer_Lname}
                  </p>
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
  );
}
