import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AccountTicketDetails() {
    const {id} = useParams();

    // id: "1111111",
    // price: "25",
    // level: "adult",
    // dateFor: "2024-02-01",
    // timeFor: "09:00PM",
    // datetimePurchased: "2024-03-01 02:30PM",

  return (
    <div className="pb-24 px-16">
      <div className="flex flex-col space-y-12">
        <div className="flex flex-col space-y-20">
          <div className="flex flex-col space-y-12">
            <h3 className="text-5xl font-fanwoodText">Ticket Purchase #{id}</h3>
            <div className="flex flex-row space-x-12">
              <div className="flex flex-col space-y-6 w-1/2">
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">Price</label>
                  <p className="">$25</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">Level</label>
                  <p className="">Adult</p>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Date purchased for</label>
                  <p className="">2024-04-09</p>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Time purchased for</label>
                  <p className="">09:30AM</p>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Datetime purchased</label>
                  <p className="">2023-09-12 01:23AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
