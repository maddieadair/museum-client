import { React, useState, useEffect, useContext } from "react";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { IoClose } from "react-icons/io5";
import Loading from "../../components/Loading";

export default function CustomerAccount() {
  const { currentAuthID, currentAuthRole } = useContext(AuthContext);
  const [openView, setOpenView] = useState(false);
  const [currInput, setCurrentInput] = useState({});
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchDonations();
    }, 500);
  }, []);

  const fetchDonations = async () => {
    const customerInfo = {
      Donor_ID: currentAuthID,
    };
    console.log("fetch customer tickets for customer", customerInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/customer-donations", {
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
        setDonations(data);
        setLoading(false);
      });
  };

  const handleClick = (donation) => {
    setCurrentInput(donation);
    setOpenView(true); // navigate(`${donation.Donation_ID}`);
  };

  return (
    <>
    {!loading ?
    <div className="min-h-screen">
      <UserNavbar />

      {openView ? (
        <div className="bg-black fixed min-h-screen w-screen z-50 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <div className="bg-white rounded-3xl h-fit max-h-[38rem] overflow-auto w-1/2 shadow-md flex flex-col">
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
                  <p className="font-bold w-1/2">Donation ID</p>
                  <p className="w-1/2 text-end">{currInput.Donation_ID}</p>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Amount</p>
                  <p className="w-1/2 text-end">${currInput.Amount_Donated}</p>
                </div>

                {currInput.Donation_Note !== null ? (
                  <div className="flex flex-row justify-between items-center p-4">
                    <p className="font-bold w-1/2">Note</p>
                    <p className="w-1/2 text-end">{currInput.Donation_Note}</p>
                  </div>
                ) : null}

                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold w-1/2">Date</p>
                  <p className="w-1/2 text-end">
                    {currInput.New_Donation_Date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
              end
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
              <h3 className="text-5xl font-fanwoodText">Past Donations</h3>

              {donations.length > 0 ? (
                <div className="text-obsidian bg-stone-50 border rounded-3xl h-fit flex flex-col divide-y divide">
                  <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-between">
                    <p className="w-1/4 ">Donation ID</p>
                    <p className="w-1/4 ">Date</p>
                    <p className="w-1/4 ">Amount</p>
                    <p className="w-1/4 ">Note</p>
                  </div>
                  {donations.map((donation, id) => (
                    <div
                      key={donation.Donation_ID}
                      onClick={() => handleClick(donation)}
                      className="flex flex-row gap-x-6 p-6 group items-center justify-between hover:bg-rose-50 hover:text-rose-500 hover:cursor-pointer"
                    >
                      <p className="w-1/4 ">#{donation.Donation_ID}</p>
                      <p className="w-1/4">{donation.New_Donation_Date}</p>
                      <p className="w-1/4 ">${donation.Amount_Donated}</p>
                      <p className="w-1/4 line-clamp-3">
                        {donation.Donation_Note}
                      </p>
                    </div>
                  ))}
                </div>
              ) : <p>Nothing to see here</p>}
            </div>
          </div>
        </div>
      </div>

      {/* <Outlet /> */}
      <Footer />
    </div>
    : <Loading />}
    </>
  );
}
