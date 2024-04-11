import { React, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function AccountPurchaseDetails() {
  const { id } = useParams();

  const [purchase, setPurchase] = useState([]);

  useEffect(() => {
    fetchPurchase();
  }, []);

  const fetchPurchase = async () => {
    const customerInfo = {
        gift_transactionID: id,
    };
    console.log("fetch customer tickets for customer", customerInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/gift-ID", {
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
        setPurchase(data);
      });
  };

  return (
    <div className="pb-24 px-16">
      {purchase.length > 0 ? (
        <div className="flex flex-col space-y-12">
          <div className="flex flex-col space-y-20">
            <div className="flex flex-col space-y-12">
              <h3 className="text-5xl font-fanwoodText">Purchase #{id}</h3>
              <div className="flex flex-row space-x-12">
                <div className="flex flex-col space-y-6 w-1/2">
                <div className="flex flex-col space-y-2">
                    <label className="font-bold">Purchase Date</label>
                    <p className="">{purchase[0].New_Date}</p>
                  </div>
                  <div className="flex flex-col space-y-">
                    <label className="font-bold">Item Name</label>
                    <p className="">{purchase[0].gift_name}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-bold">Quantity</label>
                    <p className="">{purchase[0].transaction_quantity}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-bold">Total Bill</label>
                    <p className="">${purchase[0].total_bill}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
