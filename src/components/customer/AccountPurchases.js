import { React, useState, useEffect, useContext } from "react";
import UserNavbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CgClose } from "react-icons/cg";
import { LuPencil } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

export default function CustomerPurchases() {
    const { currentAuthID, currentAuthRole } = useContext(AuthContext);
  const [openView, setOpenView] = useState(false);
  const [currInput, setCurrentInput] = useState({});

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    const customerInfo = {
      customer_ID: currentAuthID,
    };
    console.log("fetch customer tickets for customer", customerInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/customer-gifts", {
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
        setPurchases(data);
      });
  };

  const handleClick = (purchase) => {
    setCurrentInput(purchase);
    setOpenView(true);
    console.log(purchase);
    // navigate(`${purchase.gift_transactionID}`);
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
            <h3 className="text-5xl font-fanwoodText">Past Shop Purchases</h3>

            {purchases.length > 0 ? (
              <div className="text-obsidian bg-stone-50 border rounded-3xl h-fit flex flex-col divide-y divide">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-between">
                  <p className="w-1/5 ">Purchase ID</p>
                  <p className="w-1/5 ">Item Name</p>
                  <p className="w-1/5 ">Quantity</p>
                  <p className="w-1/5 ">Total Bill</p>
                  <p className="w-1/5 ">Purchase Date</p>
                </div>
                {purchases.map((purchase, id) => (
                  <div
                    key={purchase.gift_transactionID}
                    onClick={() => handleClick(purchase)}
                    className="flex flex-row gap-x-6 p-6 group items-center justify-between hover:bg-rose-50 hover:text-rose-500 hover:cursor-pointer"
                  >
                    <p className="w-1/5 ">#{purchase.gift_transactionID}</p>
                    <p className="w-1/5 ">{purchase.gift_name}</p>
                    <p className="w-1/5 ">{purchase.transaction_quantity}</p>
                    <p className="w-1/5 ">${purchase.total_bill}</p>
                    <p className="w-1/5 ">{purchase.New_Date}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {openView ? (
              <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
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
                        <p className="font-bold w-1/2">Transaction ID</p>
                        <p className="w-1/2 text-end">
                          {currInput.gift_transactionID}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold w-1/2">Item Name</p>
                        <p className="w-1/2 text-end">{currInput.gift_name}</p>
                      </div>

                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold w-1/2">Quantity</p>
                        <p className="w-1/2 text-end">
                          {currInput.transaction_quantity}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-center p-4">
                        <p className="font-bold w-1/2">Total Bill</p>
                        <p className="w-1/2 text-end">
                          ${currInput.total_bill}
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
