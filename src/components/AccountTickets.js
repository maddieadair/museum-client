import { React, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import { LuPencil } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function AccountTickets() {
    const navigate = useNavigate();

  const ticketArr = [
    {
      id: "1111111",
      price: "25",
      level: "adult",
      dateFor: "2024-02-01",
      timeFor: "09:00PM",
      datetimePurchased: "2024-03-01 02:30PM",
    },
    {
        id: "1111111",
        price: "25",
        level: "adult",
        dateFor: "2024-02-01",
        timeFor: "09:00PM",
        datetimePurchased: "2024-03-01 02:30PM",
      },
  ];

  const handleClick = (ticket) => {
    console.log(ticket);
    navigate(`${ticket.id}`);
  };

  return (
    <div className="pb-24 px-16">
      <div className="flex flex-col space-y-12">
        <div className="flex flex-col space-y-20">
          <div className="flex flex-col space-y-12">
            <h3 className="text-5xl font-fanwoodText">
              Past Ticket Transactions
            </h3>

            <div className="text-obsidian bg-stone-50 border rounded-3xl h-fit flex flex-col divide-y divide">
              <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center">
                <p className="w-1/6 ">Ticket ID</p>
                <p className="w-1/6 ">Level</p>
                <p className="w-1/6 ">Price</p>
                <p className="w-1/6 ">Date For</p>
                <p className="w-1/6 ">Time For</p>
                <p className="w-1/6 ">Purchased Datetime</p>
              </div>
              {ticketArr.map((ticket) => (
                <div
                key={ticket.id}
                onClick={() => handleClick(ticket)}
                className="flex flex-row gap-x-6 p-6 group hover:bg-rose-50 hover:text-rose-500 hover:cursor-pointer"
              >
                  <p className="w-1/6 ">#{ticket.id}</p>
                  <p className="w-1/6 ">{ticket.level}</p>
                  <p className="w-1/6 ">${ticket.price}</p>
                  <p className="w-1/6 ">{ticket.dateFor}</p>
                  <p className="w-1/6 ">{ticket.timeFor}</p>
                  <p className="w-1/6 ">{ticket.datetimePurchased}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
