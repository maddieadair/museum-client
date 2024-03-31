import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AccountPurchaseDetails() {
    const {id} = useParams();

  return (
    <div className="pb-24 px-16">
      <div className="flex flex-col space-y-12">
        <div className="flex flex-col space-y-20">
          <div className="flex flex-col space-y-12">
            <h3 className="text-5xl font-fanwoodText">Purchase # {id}</h3>
            <div className="flex flex-row space-x-12">
              <div className="flex flex-col space-y-6 w-1/2">
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">Item Name</label>
                  <p className="">Book</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">Purchase Datetime</label>
                  <p className="">2024-02-11 11:20AM</p>
                </div>
                <div className="flex flex-col space-y-">
                  <label className="font-bold">Item Price</label>
                  <p className="">$40</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
