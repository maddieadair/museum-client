import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { React, useState, useContext } from "react";

export default function Donate() {
  const donationAmount = [5, 10, 25, 50, 100, 250, 500];
  const [amount, setAmount] = useState(5);
  const [donationNote, setDonationNote] = useState("");
  const [status, setStatus] = useState("");
  const { currentAuthID, currentAuthRole } = useContext(AuthContext);

  const clearFields = () => {
    setAmount(5);
    setDonationNote("");
  };

  const addDonation = async (e) => {
    e.preventDefault();

    if (currentAuthID === null && currentAuthRole === null) {
      alert("Please log in first to make a donation.");
    } else if (currentAuthID !== null && currentAuthRole !== "Customer") {
      alert(
        "You are currently logged in as an Employee. To make a donation, please log out and sign back in as a Customer."
      );
    } else {
        console.log("amount", amount)
      if (amount === 0 || !amount) {
        setStatus("* Please enter an amount of at least $1.");
        return;
       } else {

      const donationData = {
        Amount_Donated: amount,
        Donation_Note: donationNote,
        Donor_ID: currentAuthID,
      };

      console.log("donationData", donationData);

      try {
        const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/donations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donationData),
        });

        if (!response.ok) {
          alert("Error sending donation request");
          throw new Error("There was a network error");
        }

        const data = await response.json();
        console.log(data);

        // setStatus("Donation successfully added!");
        alert("Donation successfully added!");
        clearFields();
      } catch (error) {
        console.log("There was an error fetching:", error);
      }
    }
}
  };

  return (
    <div className="min-h-screen">
      <UserNavbar />

      <div className="flex flex-col pt-36 pb-24 gap-y-24 font-inter">
        <div className="flex flex-col gap-y-4 border-b px-16 pb-24">
          <h1 className="font-fanwoodText italic text-7xl">Support the MFAH</h1>
          <p className="text-xl font-inter">
            Thank you for choosing to give to
            <span className="text-cinnabar font-bold">
              {" "}The Museum of Fine Arts, Houston
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
        <div className="flex flex-col gap-y-24 font-inter px-16">
          <form className="flex flex-col space-y-12" onSubmit={addDonation}>
            <div className="flex flex-col space-y-20">
              <div className="flex flex-col space-y-10 w-fit">
                <h2 className="font-fanwoodText text-5xl">Donation</h2>
                <p className="font-bold">Suggested Amounts</p>
                <div className="flex flex-row space-x-4">
                  {donationAmount.map((number, index) => (
                    <p
                      key={number}
                      className={`rounded-full border border-obsidian w-fit py-2 px-6 hover:bg-obsidian hover:text-chalk ${
                        number === amount
                          ? "bg-obsidian text-chalk"
                          : "text-obsidian"
                      }`}
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

                  <p className={`${status === "" ? "hidden" : "text-cinnabar"}`}>
                    {status}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-bold">Donation Note</label>
                  <textarea
                    value={donationNote}
                    onChange={(e) => setDonationNote(e.target.value)}
                    className="bg-white border border-obsidian rounded-md p-2"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
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
