import { React, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import { LuPencil } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function AccountDonations() {
    const navigate = useNavigate();

  const donations = [
    {
        id: "123456",
        amount: "250",
        dfname: "John",
        dlname: "Doe",
        datetime: "2024-03-01 02:30PM",
        dnote: "Thank you",
    },
    {
        id: "654321",
        amount: "250",
        dfname: "John",
        dlname: "Doe",
        datetime: "2024-03-01 02:30PM",
        dnote: "Thank you",
    },
  ];

  const handleClick = (donation) => {
    console.log(donation);
    navigate(`${donation.id}`);
  };

  return (
    <div className="pb-24 px-16">
      <div className="flex flex-col space-y-12">
        <div className="flex flex-col space-y-20">
          <div className="flex flex-col space-y-12">
            <h3 className="text-5xl font-fanwoodText">
              Past Donations
            </h3>

            <div className="text-obsidian bg-stone-50 border rounded-3xl h-fit flex flex-col divide-y divide">
              <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center">
                <p className="w-1/6 ">Donation ID</p>
                <p className="w-1/6 ">Amount</p>
                <p className="w-1/6 ">Datetime</p>
                <p className="w-1/6 ">Donor First Name</p>
                <p className="w-1/6 ">Donor Last Name</p>
                <p className="w-1/6 ">Note</p>
              </div>
              {donations.map((donation) => (
                <div
                key={donation.id}
                onClick={() => handleClick(donation)}
                className="flex flex-row gap-x-6 p-6 group hover:bg-rose-50 hover:text-rose-500 hover:cursor-pointer"
              >                  <p className="w-1/6 ">#{donation.id}</p>
                  <p className="w-1/6 ">${donation.amount}</p>
                  <p className="w-1/6 ">{donation.datetime}</p>
                  <p className="w-1/6 ">{donation.dfname}</p>
                  <p className="w-1/6 ">{donation.dlname}</p>
                  <p className="w-1/6 ">{donation.dnote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
