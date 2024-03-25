import { React, useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import Footer from "../components/Footer";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import axios from 'axios';

export default function Tickets() {
  const currDate = new Date().toJSON().slice(0, 10);
  const [date, setDate] = useState(currDate);

  const times = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  function convertTo24HourFormat(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}:00`;
}

const testSubmit = async () => {
  const ticketTime24h = convertTo24HourFormat(time);

  const ticketInfo = {
      totalPrice: totalPrice,
      ticketDate: date,
      ticketTime: ticketTime24h, 
      userId: 1, // Example user ID, replace with actual logic to determine user ID
      numChild: numChild,
      numYouth: numYouth,
      numAdult: numAdult,
      numSenior: numSenior,
      selectedMuseum: chosenExhibit || 'Main Campus' // Selected exhibition or default
  };

  try {
      const response = await axios.post('http://localhost:3000/api/tickets', ticketInfo);
      console.log(response.data);
      // Handle success (e.g., show a success message)
  } catch (error) {
      console.error('Error submitting ticket:', error);
      // Handle error (e.g., show an error message)
  }
};

  const [time, setTime] = useState("10:00 AM");

  const [numChild, setNumChild] = useState(0);
  const [numYouth, setNumYouth] = useState(0);
  const [numAdult, setNumAdult] = useState(0);
  const [numSenior, setNumSenior] = useState(0);
  const [numTickets, setNumTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const exhibitions = ["Exhibit 1", "Exhibit 2", "Exhibit 3"];

  const [showExhibitions, setShowExhibitions] = useState(false);
  const [chosenExhibit, setChosenExhibit] = useState(null);

  const [option, setOption] = useState("Permanent Collections");

  useEffect(() => {
    let sum =
      parseInt(numChild) +
      parseInt(numYouth) +
      parseInt(numAdult) +
      parseInt(numSenior);
    let bill = numChild * 15 + numYouth * 20 + numAdult * 25 + numSenior * 20;
    setNumTickets(sum);
    setTotalPrice(bill);
  }, [numChild, numYouth, numAdult, numSenior]);

  console.log("chosenExhibition", chosenExhibit);

  return (
    <div className="min-h-screen">
      <UserNavbar />

      <div className="flex flex-col pt-36 pb-24 px-16 gap-y-24 font-inter">
        <div className="flex flex-col gap-y-4">
          <h1 className="font-fanwoodText italic text-7xl">Buy Tickets</h1>
          <p className="text-xl">
            Explore the main campus of the Museum of Fine Arts, Houston, housing
            permanent collections of art from every era of history and all seven
            continents, plus special exhibitions.
          </p>
          <p className="text-xl">
            The Museum offers tours and packages to{" "}
            <span className="font-bold text-cinnabar">
              groups of 10 or more
            </span>{" "}
            for Special Exhibitions and the MFAH Permanent Collections. With
            advance notice, reservations are available for group tours and
            school groups.
          </p>
        </div>
        <div className="flex flex-col gap-y-24">
          <div className="h-96">
            <img
              className="brightness-75 rounded-xl object-cover object-top h-full w-full outline outline-offset-8 outline-gray-50"
              src={Angelico}
              alt=""
            />
          </div>

          <form className="flex flex-col space-y-12">
            <div className="flex flex-col space-y-20">
              <div className="flex flex-col space-y-10 w-1/2">
                <h2 className="font-fanwoodText text-5xl">1. Date</h2>
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  value={date}
                  defaultValue={currDate}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toJSON().slice(0, 10)}
                  max="2024-06-30"
                  className="border border-obsidian p-2 rounded-md w-1/2"
                />
              </div>

              <div className="flex flex-col space-y-10 w-fit">
                <h2 className="font-fanwoodText text-5xl">2. Time</h2>
                <div className="flex flex-row space-x-4">
                  {times.map((number, index) => (
                    <p
                      key={index}
                      className={`rounded-md border border-obsidian w-fit py-2 px-6 ${
                        time === number
                          ? "bg-obsidian text-chalk"
                          : "hover:bg-rose-100 hover:text-obsidian"
                      }`}
                      onClick={() => {
                        setTime(number);
                      }}
                    >
                      {number}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-10 w-fit">
                <h2 className="font-fanwoodText text-5xl">3. Ticket(s) for...</h2>
                <div className="flex flex-row space-x-4">
                  <p
                    className={`rounded-md border border-obsidian w-fit py-2 px-6 ${
                      option === "Permanent Collections"
                        ? "bg-obsidian text-chalk"
                        : "hover:bg-rose-100 hover:text-obsidian"
                    }`}
                    onClick={() => {
                      setOption("Permanent Collections");
                      setShowExhibitions(false);
                      setChosenExhibit(null);
                    }}
                  >
                    Permanent Collections
                  </p>
                  <p
                    className={`rounded-md border border-obsidian w-fit py-2 px-6 ${
                      option === "Special Exhibition"
                        ? "bg-obsidian text-chalk"
                        : "hover:bg-rose-100 hover:text-obsidian"
                    }`}
                    onClick={() => {
                      setOption("Special Exhibition");
                      setShowExhibitions(true);
                    }}
                  >
                    Special Exhibition
                  </p>
                </div>

                <select
                  name="exhbitions"
                  id="exbitions"
                  onChange={(e) => setChosenExhibit(e.target.value)}
                  className={`${
                    showExhibitions
                      ? "border rounded-md border-obsidian p-2"
                      : "hidden"
                  }`}
                >
                  {exhibitions.map((ex) => (
                    <option value={ex} key={ex}>
                      {ex}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-row gap-x-24">
                <div className="flex flex-col space-y-10 w-1/2 ">
                  <h2 className="font-fanwoodText text-5xl">4. Select Tickets</h2>
                  <div className="flex flex-col divide-y divide-obsidian">
                    <div className="flex flex-row py-6 justify-between items-center">
                      <div className="flex flex-col gap-y-2 w-1/3">
                        <p className="font-bold">Child</p>
                        <p className="text-sm text-gravel">12 & Under</p>
                      </div>
                      <p className="w-1/3">$15</p>
                      <div className="flex flex-row gap-x-4 items-center w-1/3 place-content-end">
                        <button
                          type="button"
                          disabled={numChild === 0}
                          className="disabled:cursor-not-allowed disabled:bg-transparent border border-obsidian bg-stone-300 text-obsidian font-extrabold text-lg p-2 rounded-md"
                          onClick={() => setNumChild(numChild - 1)}
                        >
                          <LuMinus />
                        </button>
                        <p className="p-2">{numChild}</p>
                        <button
                          type="button"
                          disabled={numChild === 9 || numTickets === 9}
                          className="disabled:cursor-not-allowed disabled:bg-transparent border border-obsidian bg-stone-300 text-obsidian font-extrabold text-lg p-2 rounded-md"
                          onClick={() => setNumChild(numChild + 1)}
                        >
                          <LuPlus />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row py-6 justify-between items-center">
                      <div className="flex flex-col gap-y-2 w-1/3">
                        <p className="font-bold">Youth</p>
                        <p className="text-sm text-gravel">13-18</p>
                      </div>
                      <p className="w-1/3">$20</p>
                      <div className="flex flex-row gap-x-4 items-center w-1/3 place-content-end">
                        <button
                          type="button"
                          disabled={numYouth === 0}
                          className="disabled:cursor-not-allowed disabled:bg-transparent border border-obsidian bg-stone-300 text-obsidian font-extrabold text-lg p-2 rounded-md"
                          onClick={() => setNumYouth(numYouth - 1)}
                        >
                          <LuMinus />
                        </button>
                        <p className="p-2">{numYouth}</p>
                        <button
                          type="button"
                          disabled={numYouth === 9 || numTickets === 9}
                          className="disabled:cursor-not-allowed disabled:bg-transparent border border-obsidian bg-stone-300 text-obsidian font-extrabold text-lg p-2 rounded-md"
                          onClick={() => setNumYouth(numYouth + 1)}
                        >
                          <LuPlus />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row py-6 justify-between items-center">
                      <div className="flex flex-col gap-y-2 w-1/3">
                        <p className="font-bold">Adult</p>
                        <p className="text-sm text-gravel">19+</p>
                      </div>
                      <p className="w-1/3">$25</p>
                      <div className="flex flex-row gap-x-4 items-center w-1/3 place-content-end">
                        <button
                          type="button"
                          disabled={numAdult === 0}
                          className="disabled:cursor-not-allowed disabled:bg-transparent border border-obsidian bg-stone-300 text-obsidian font-extrabold text-lg p-2 rounded-md"
                          onClick={() => setNumAdult(numAdult - 1)}
                        >
                          <LuMinus />
                        </button>
                        <p className="p-2">{numAdult}</p>
                        <button
                          type="button"
                          disabled={numAdult === 9 || numTickets === 9}
                          className="disabled:cursor-not-allowed disabled:bg-transparent border border-obsidian bg-stone-300 text-obsidian font-extrabold text-lg p-2 rounded-md"
                          onClick={() => setNumAdult(numAdult + 1)}
                        >
                          <LuPlus />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row py-6 justify-between items-center">
                      <div className="flex flex-col gap-y-2 w-1/3">
                        <p className="font-bold">Senior</p>
                        <p className="text-sm text-gravel">65+</p>
                      </div>
                      <p className="w-1/3">$20</p>
                      <div className="flex flex-row gap-x-4 items-center w-1/3 place-content-end">
                        <button
                          type="button"
                          disabled={numSenior === 0}
                          className="disabled:cursor-not-allowed disabled:bg-transparent border border-obsidian bg-stone-300 text-obsidian font-extrabold text-lg p-2 rounded-md"
                          onClick={() => setNumSenior(numSenior - 1)}
                        >
                          <LuMinus />
                        </button>
                        <p className="p-2">{numSenior}</p>
                        <button
                          type="button"
                          disabled={numSenior === 9 || numTickets === 9}
                          className="disabled:cursor-not-allowed disabled:bg-transparent border border-obsidian bg-stone-300 text-obsidian font-extrabold text-lg p-2 rounded-md"
                          onClick={() => setNumSenior(numSenior + 1)}
                        >
                          <LuPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-10 w-1/2 ">
                  <h2 className="font-fanwoodText text-5xl">
                    Admission Details
                  </h2>

                  <div className="flex flex-col divide-y divide-gray-400 border border-obsidian rounded-md bg-stone-100">
                    <div className="flex flex-col gap-y-2 p-6">
                      <div className="flex flex-row justify-between">
                        <p className="font-bold">Date</p>
                        <p>{date}</p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p className="font-bold">Time</p>
                        <p>{time}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-2 p-6">
                      <div className="flex flex-row justify-between">
                        <p className="font-bold">Ticket(s) For... </p>
                        <p>{option}</p>
                      </div>
                      <div
                        className={`${
                          chosenExhibit !== null
                            ? "flex flex-row justify-between"
                            : "hidden"
                        }`}
                      >
                        <p className="font-bold">Exhibition </p>
                        <p>{chosenExhibit}</p>
                      </div>
                    </div>

                    <div
                      className={`${
                        numTickets === 0
                          ? "hidden"
                          : "flex flex-col gap-y-2 p-6"
                      }`}
                    >
                      <div className="flex flex-row justify-between">
                        <p className="font-bold"># of Child Tickets</p>
                        <p>{numChild}</p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p className="font-bold"># of Youth Tickets</p>
                        <p>{numYouth}</p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p className="font-bold"># of Adult Tickets</p>
                        <p>{numAdult}</p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p className="font-bold"># of Senior Tickets</p>
                        <p>{numSenior}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-2 p-6">
                      <div className="flex flex-row justify-between">
                        <p className="font-bold">Total # of Tickets</p>
                        <p>{numTickets}</p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p className="font-bold">Subtotal</p>
                        <p>${totalPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={testSubmit}
              className="bg-obsidian text-chalk rounded-md p-4 font-bold text-xl hover:bg-cinnabar transition-all duration-500 ease-in-out"
            >
              Buy Tickets 
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}