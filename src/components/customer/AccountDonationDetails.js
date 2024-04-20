import { React, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function AccountDonationDetails() {
  const { id } = useParams();

  const [donation, setDonation] = useState([]);

  useEffect(() => {
    fetchDonation();
  }, []);

  const fetchDonation = async () => {
    const customerInfo = {
      Donation_ID: id,
    };
    console.log("fetch customer tickets for customer", customerInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/donation-ID", {
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
        setDonation(data);
      });
  };

  return (
    <div className="pb-24 px-16">
      {donation.length > 0 ? (
        <div className="flex flex-col space-y-12">
          <div className="flex flex-col space-y-20">
            <div className="flex flex-col space-y-12">
              <h3 className="text-5xl font-fanwoodText">Donation #{id}</h3>
              <div className="flex flex-row space-x-12">
                <div className="flex flex-col space-y-6 w-1/2">
                  <div className="flex flex-col space-y-2">
                    <label className="font-bold">Amount</label>
                    <p className="">${donation[0].Amount_Donated}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-bold">Date</label>
                    <p className="">{donation[0].New_Donation_Date}</p>
                  </div>
                  {donation[0].Donation_Note !== null ?
                  <div className="flex flex-col space-y-">
                    <label className="font-bold">Note</label>
                    <p className="">{donation[0].Donation_Note}</p>
                  </div>
                  : null }
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
