import { React, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Footer from "../components/Footer";

export default function Donate() {
  const donationAmount = [5, 10, 25, 50, 100, 250, 500];
  const [amount, setAmount] = useState(5);

  const [donationNote, setDonationNote] = useState("");
  const [donorFname, setDonorFname] = useState("");
  const [donorMname, setDonorMname] = useState("");
  const [donorLname, setDonorLname] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [donorCity, setDonorCity] = useState("");
  const [donorState, setDonorState] = useState("");
  const [donorZip, setDonorZip] = useState("");
  const [donorPhone, setDonorPhone] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardFname, setCardFname] = useState("");
  const [cardLname, setCardLname] = useState("");
  const [cardExpDate, setCardExpDate] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  return (
    <div className="min-h-screen">
      <UserNavbar />

      <div className="flex flex-col pt-36 pb-24 px-16 gap-y-24 font-inter">
        <div className="flex flex-col gap-y-4">
          <h1 className="font-fanwoodText italic text-7xl">Support the MFAH</h1>
          <p className="text-xl font-inter">
            Thank you for choosing to give to
            <span className="text-cinnabar font-bold">
              The Museum of Fine Arts, Houston
            </span>
            . More than 30 percent of our visitors enter the Museum for free. We
            provide art education to more than 100,000 visitors and students
            each year, whether on-site or through our community programs and
            online learning. Our audience is 90 percent local, and our community
            depends on us.{" "}
          </p>
          <p className="text-xl font-inter">
            Through an encyclopedic permanent collection, landmark exhibitions,
            and an array of educational and interpretive programs, the Museum
            allows visitors to explore the visual world across cultures and time
            periods. Your contribution to the Museum Annual Fund powers these
            activities and connects visitors with our world-class institution.
          </p>
        </div>
        <div className="flex flex-col gap-y-24 font-inter">
          <div className="h-96">
            <img
              className="brightness-75 rounded-xl object-cover object-top h-full w-full outline outline-offset-8 outline-gray-50"
              src={Angelico}
              alt=""
            />
          </div>


          <form className="flex flex-col space-y-12">
        <div className="flex flex-col space-y-20">
          <div className="flex flex-col space-y-10 w-fit">
            <h2 className="font-fanwoodText text-5xl">Donation</h2>
            <div className="flex flex-row space-x-4">
              {donationAmount.map((number, index) => (
                <p
                  key={index}
                  className="rounded-full border border-obsidian text-obsidian w-fit py-2 px-6 hover:bg-obsidian hover:text-chalk"
                  onClick={() => setAmount(number)}
                >
                  ${number}
                </p>
              ))}
            </div>

            <div className="flex flex-col space-y-2 w-1/2">
              <label className="font-bold">Amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white border border-obsidian rounded-md p-2"
              ></input>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-bold">Donation Note</label>
              <textarea
                className="bg-white border border-obsidian rounded-md p-2"
                rows="4"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <h3 className="text-5xl font-fanwoodText">Contact Information</h3>
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <label className="font-bold">First Name</label>
                <input
                  type="text"
                  className="bg-white border border-obsidian rounded-md p-2"
                ></input>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-bold">Middle Name</label>
                <input
                  type="text"
                  className="bg-white border border-obsidian rounded-md p-2"
                ></input>
              </div>

              <div className="flex flex-col space-y-">
                <label className="font-bold">Last Name</label>
                <input
                  type="text"
                  className="bg-white border border-obsidian rounded-md p-2"
                ></input>
              </div>

              <div className="flex flex-col space-y-">
                <label className="font-bold">Email Address</label>
                <input
                  type="text"
                  className="bg-white border border-obsidian rounded-md p-2"
                ></input>
              </div>

              <div className="flex flex-col space-y-">
                <label className="font-bold">Phone Number</label>
                <input
                  type="text"
                  className="bg-white border border-obsidian rounded-md p-2"
                ></input>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <h3 className="text-5xl font-fanwoodText">Billing Information</h3>
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <label className="font-bold">Street Address</label>
                <input
                  type="text"
                  className="bg-white border border-obsidian rounded-md p-2"
                ></input>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-bold">City</label>
                <input
                  type="text"
                  className="bg-white border border-obsidian rounded-md p-2"
                ></input>
              </div>

              <div className="flex flex-col space-y-">
                <label className="font-bold">State</label>
                <input
                  type="text"
                  className="bg-white border border-obsidian rounded-md p-2"
                ></input>
              </div>

              <div className="flex flex-col space-y-">
                <label className="font-bold">Zip Code</label>
                <input
                  type="text"
                  className="bg-white border border-obsidian rounded-md p-2"
                ></input>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <h3 className="text-5xl font-fanwoodText">Payment Information</h3>
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="flex flex-col space-y-2 md:w-1/2">
                  <label className="font-bold">Cardholder First Name</label>
                  <input
                    type="text"
                    className="bg-white border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col space-y-2 md:w-1/2">
                  <label className="font-bold">Cardholder Last Name</label>
                  <input
                    type="text"
                    className="bg-white border border-obsidian rounded-md p-2"
                  ></input>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-bold">Card Number</label>
                <input
                  type="text"
                  className="bg-white border border-obsidian rounded-md p-2"
                ></input>
              </div>

              <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="flex flex-col">
                  <label className="font-bold">Month</label>
                  <input
                    type="text"
                    className="bg-white border border-obsidian rounded-md p-2"
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label className="font-bold">Year</label>
                  <input
                    type="text"
                    className="bg-white border border-obsidian rounded-md p-2"
                  ></input>
                </div>
              </div>

              <div className="flex flex-col space-y-">
                <label className="font-bold">CVC</label>
                <input
                  type="text"
                  className="bg-white border border-obsidian rounded-md p-2"
                ></input>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="bg-obsidian text-chalk rounded-md p-4 font-bold text-xl hover:bg-cinnabar transition-all duration-500 ease-in-out"
        >
          Donate ${amount} now
        </button>
      </form>

        </div>
      </div>

      <Footer />
    </div>
  );
}
