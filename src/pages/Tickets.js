import { React, useState, useEffect, useContext } from "react";
import UserNavbar from "../components/UserNavbar";
import Angelico from "../assets/images/1200px-Fra_Angelico_-_Saint_Anthony_Abbot_Shunning_the_Mass_of_Gold_-_Google_Art_Project.jpg";
import Footer from "../components/Footer";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { AuthContext } from "../context/AuthContext";

export default function Tickets() {
  const [frame, setFrame] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");
  const [exhibitStatus, setExhibitStatus] = useState("");

  const [showTimes, setShowTimes] = useState(false);

  let currDate = new Date();
  const offset = currDate.getTimezoneOffset();
  currDate = new Date(currDate.getTime() - offset * 60 * 1000);
  currDate = currDate.toISOString().split("T")[0];

  const cur = new Date();
  const future = new Date(cur.setMonth(cur.getMonth() + 3));
  const futureFormatted = future.toJSON().slice(0, 10);

  const [date, setDate] = useState(currDate);

  const { currentAuthID, currentAuthRole } = useContext(AuthContext);

  const [times, setTimes] = useState([
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]);

  function convertTo24HourFormat(time12h) {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}:00`;
  }

  const [time, setTime] = useState("10:00 AM");

  const [numChild, setNumChild] = useState(0);
  const [numYouth, setNumYouth] = useState(0);
  const [numAdult, setNumAdult] = useState(0);
  const [numSenior, setNumSenior] = useState(0);
  const [numTickets, setNumTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [exhibitObj, setExhibitObj] = useState({});

  const [showExhibitions, setShowExhibitions] = useState(false);
  const [chosenExhibit, setChosenExhibit] = useState("");

  const [option, setOption] = useState("Permanent Collections");

  const [exhibitions, setExhibitions] = useState([]);
  const [futureExhibitions, setFutureExhibitions] = useState([]);

  useEffect(() => {
    fetchExhibitions();
    fetchFutureExhibits();
  }, []);

  const fetchExhibitions = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/current-exhibits", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExhibitions(data);
      });
  };
  const fetchFutureExhibits = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/month-exhibits", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFutureExhibitions(data);
      });
  };

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

  const handleExhibitChange = (e) => {
    setChosenExhibit(e.target.value);

    if (frame === "Current") {
      let obj = exhibitions.find((o) => o.Exhibit_Name === e.target.value);

      let open = new Date(obj.Opening_Date)
        .toISOString()
        .slice(0, 10)
        .replace("T", " ");
      let end = new Date(obj.End_Date)
        .toISOString()
        .slice(0, 10)
        .replace("T", " ");

      setStartDate(open);
      setEndDate(end);
      setDate(currDate);
    } else if (frame === "Future") {
      let obj = futureExhibitions.find(
        (o) => o.Exhibit_Name === e.target.value
      );

      let open = new Date(obj.Opening_Date)
        .toISOString()
        .slice(0, 10)
        .replace("T", " ");
      let end = new Date(obj.End_Date)
        .toISOString()
        .slice(0, 10)
        .replace("T", " ");

      setStartDate(open);
      setEndDate(end);
      setDate(open);
    }
  };

  const validate = () => {
    setTicketStatus("");
    setExhibitStatus("");

    var hasErrors = false;

    if (numTickets === 0 && totalPrice === 0) {
      setTicketStatus("* Please select at least 1 ticket.");
      hasErrors = true;
    }

    if (option === "Special Exhibition" && chosenExhibit === "") {
      setExhibitStatus("* Please select an exhibition.");
      hasErrors = true;
    }
    return hasErrors;
  };

  const addTicket = async (e) => {
    e.preventDefault();

    if (currentAuthID === null && currentAuthRole === null) {
      alert("Please log in first to complete the transaction.");
    } else if (currentAuthID !== null && currentAuthRole !== "Customer") {
      alert(
        "You are currently logged in as an Employee. To complete this transaction, please log out and sign back in as a Customer."
      );
    } else {
      const hasErrors = validate();

      if (!hasErrors) {

        const ticketData = {
          Customer_ID: currentAuthID,
          Total_Bill: totalPrice,
          Ticket_Date: date,
          Ticket_Time: convertTo24HourFormat(time),
          Num_Child_Tickets: numChild,
          Num_Teen_Tickets: numYouth,
          Num_Adult_Tickets: numAdult,
          Num_Senior_Tickets: numSenior,
          Exhibition_Name: chosenExhibit,
        };

        try {
          const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/tickets", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ticketData),
          });

          if (!response.ok) {
            throw new Error("There was a network ");
          }

          const data = await response.json();
          console.log(data);
          if (data.message === "Tickets for this date and time are sold out.") {
            alert("Tickets for this date and time are sold out.");
          }
          if (data.message === "Requested quantity exceeds current stock") {
            alert("Requested quantity exceeds current stock");
          } else {
            alert("Ticket successfully purchased!");
            clearFields();
          }
        } catch (error) {
          alert(error);
          console.log("There was an error fetching:", error);
        }
      }
    }
  };

  const clearFields = () => {
    setChosenExhibit("");
    setDate(currDate);
    setEndDate("");
    setStartDate("");
    setNumAdult(0);
    setNumChild(0);
    setNumSenior(0);
    setNumYouth(0);
    setExhibitObj({});
    setFrame("");
    setTime("10:00 AM");
    setOption("Permanent Collections");
    setShowExhibitions(false);
    setExhibitStatus("");
    setTicketStatus("");
  };

  return (
    <div className="min-h-screen">
      <UserNavbar />

      <div className="flex flex-col pt-36 pb-24 gap-y-24 font-inter">
        <div className="flex flex-col gap-y-4 border-b px-16 pb-24">
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
        <div className="flex flex-col gap-y-24 px-16">
          <form className="flex flex-col space-y-12" onSubmit={addTicket}>
            <div className="flex flex-col space-y-20">
              <div className="flex flex-col space-y-10 w-fit">
                <h2 className="font-fanwoodText text-5xl">
                  1. Ticket(s) for...
                </h2>
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
                      setChosenExhibit("");
                      setFrame("");
                      setDate(currDate);
                      setExhibitStatus("");
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

                {exhibitions.length > 0 &&
                futureExhibitions.length === 0 &&
                showExhibitions ? (
                  <div className="flex flex-row gap-x-6 items-center">
                    <p className="font-bold">Current</p>
                    <select
                      name="chosenExhibit"
                      id="exbitions"
                      defaultValue="default"
                      onChange={(e) => handleExhibitChange(e)}
                      className={`${
                        showExhibitions
                          ? "border rounded-md border-obsidian p-2"
                          : "hidden"
                      }`}
                    >
                      <option value="default" disabled>
                        Select an option
                      </option>

                      {exhibitions.map((ex) => (
                        <option value={ex.Exhibit_Name} key={ex.Exhibit_Name}>
                          {ex.Exhibit_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                {showExhibitions && futureExhibitions.length > 0 ? (
                  <div className="flex flex-row gap-x-16">
                    <div className="flex flex-row gap-x-4">
                      <input
                        type="radio"
                        name="frame"
                        value="Current"
                        onClick={(e) => {
                          setFrame(e.target.value);
                          setDate(currDate);
                        }}
                      />
                      <p>Current</p>
                    </div>
                    <div className="flex flex-row gap-x-4">
                      <input
                        type="radio"
                        name="frame"
                        value="Future"
                        onClick={(e) => {
                          setFrame(e.target.value);
                          setChosenExhibit("");
                          setDate(currDate);
                        }}
                      />
                      <p>Future</p>
                    </div>
                  </div>
                ) : null}

                {exhibitions.length > 0 && frame === "Current" ? (
                  <div className="flex flex-row gap-x-6 items-center">
                    <p className="font-bold">Current</p>
                    <select
                      name="chosenExhibit"
                      id="exbitions"
                      defaultValue="default"
                      onChange={(e) => handleExhibitChange(e)}
                      className={`${
                        showExhibitions
                          ? "border rounded-md border-obsidian p-2"
                          : "hidden"
                      }`}
                    >
                      <option value="default" disabled>
                        Select an option
                      </option>

                      {exhibitions.map((ex) => (
                        <option value={ex.Exhibit_Name} key={ex.Exhibit_Name}>
                          {ex.Exhibit_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                {futureExhibitions.length > 0 && frame === "Future" ? (
                  <div className="flex flex-row gap-x-6 items-center">
                    <p className="font-bold">Future</p>
                    <select
                      name="chosenExhibit"
                      id="exbitions"
                      defaultValue="default"
                      onChange={(e) => handleExhibitChange(e)}
                      className={`${
                        showExhibitions
                          ? "border rounded-md border-obsidian p-2"
                          : "hidden"
                      }`}
                    >
                      <option value="default" disabled>
                        Select an option
                      </option>

                      {futureExhibitions.map((ex) => (
                        <option value={ex.Exhibit_Name} key={ex.Exhibit_Name}>
                          {ex.Exhibit_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
                <p
                  className={`${
                    exhibitStatus === "" ? "hidden" : "text-cinnabar"
                  }`}
                >
                  {exhibitStatus}
                </p>
              </div>

              {option === "Permanent Collections" ? (
                <div className="flex flex-col space-y-10 w-1/2">
                  <h2 className="font-fanwoodText text-5xl">2. Date</h2>
                  <input
                    type="date"
                    value={date}
                    defaultValue={currDate}
                    onChange={(e) => setDate(e.target.value)}
                    min={currDate}
                    max={futureFormatted}
                    className="border border-obsidian p-2 rounded-md w-1/2"
                  />
                </div>
              ) : null}

              {option === "Special Exhibition" &&
              frame === "Future" &&
              chosenExhibit !== "" ? (
                <div className="flex flex-col space-y-10 w-1/2">
                  <h2 className="font-fanwoodText text-5xl">2. Date</h2>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={startDate}
                    max={endDate}
                    className="border border-obsidian p-2 rounded-md w-1/2"
                  />
                </div>
              ) : null}

              {option === "Special Exhibition" &&
              frame === "Current" &&
              chosenExhibit !== "" ? (
                <div className="flex flex-col space-y-10 w-1/2">
                  <h2 className="font-fanwoodText text-5xl">2. Date</h2>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={currDate}
                    max={endDate}
                    className="border border-obsidian p-2 rounded-md w-1/2"
                  />
                </div>
              ) : null}

              {option === "Permanent Collections" ? (
                <div className="flex flex-col space-y-10 w-fit">
                  <h2 className="font-fanwoodText text-5xl">3. Time</h2>
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
              ) : null}

              {option === "Special Exhibition" && chosenExhibit !== "" ? (
                <div className="flex flex-col space-y-10 w-fit">
                  <h2 className="font-fanwoodText text-5xl">3. Time</h2>
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
              ) : null}

              <div className="flex flex-row gap-x-24">
                <div className="flex flex-col space-y-10 w-1/2 ">
                  <h2 className="font-fanwoodText text-5xl">
                    4. Select Tickets
                  </h2>
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
                  <p
                    className={`${
                      ticketStatus === "" ? "hidden" : "text-cinnabar"
                    }`}
                  >
                    {ticketStatus}
                  </p>
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
                          chosenExhibit !== ""
                            ? "flex flex-row justify-between"
                            : "hidden"
                        }`}
                      >
                        <p className="font-bold">Exhibition </p>
                        <p className="text-end w-1/2">{chosenExhibit}</p>
                      </div>
                    </div>

                    <div
                      className={`${
                        numTickets === 0
                          ? "hidden"
                          : "flex flex-col gap-y-2 p-6"
                      }`}
                    >
                      {numChild > 0 ? (
                        <div className="flex flex-row justify-between">
                          <p className="font-bold"># of Child Tickets</p>
                          <p>{numChild}</p>
                        </div>
                      ) : null}

                      {numYouth > 0 ? (
                        <div className="flex flex-row justify-between">
                          <p className="font-bold"># of Youth Tickets</p>
                          <p>{numYouth}</p>
                        </div>
                      ) : null}
                      {numAdult > 0 ? (
                        <div className="flex flex-row justify-between">
                          <p className="font-bold"># of Adult Tickets</p>
                          <p>{numAdult}</p>
                        </div>
                      ) : null}
                      {numSenior > 0 ? (
                        <div className="flex flex-row justify-between">
                          <p className="font-bold"># of Senior Tickets</p>
                          <p>{numSenior}</p>
                        </div>
                      ) : null}
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
              onClick={addTicket}
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
