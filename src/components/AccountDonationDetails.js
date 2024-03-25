import { React, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function AccountDonationDetails() {
    const {id} = useParams();
    // id: "123456",
    // amount: "250",
    // dfname: "John",
    // dlname: "Doe",
    // datetime: "2024-03-01 02:30PM",
    // dnote: "Thank you",
  return (
    <div className="pb-24 px-16">
      <div className="flex flex-col space-y-12">
        <div className="flex flex-col space-y-20">
          <div className="flex flex-col space-y-12">
            <h3 className="text-5xl font-fanwoodText">Donation #{id}</h3>
            <div className="flex flex-row space-x-12">
              <div className="flex flex-col space-y-6 w-1/2">
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">Amount</label>
                  <p className="">$200</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">Donor First Name</label>
                  <p className="">John</p>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Donor Last Name</label>
                  <p className="">Doe</p>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Datetime</label>
                  <p className="">2024-03-01 02:30PM</p>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Donation Note</label>
                  <p className="">"Thank You"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
