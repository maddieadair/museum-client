import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AccountTicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    const customerInfo = {
      TicketTransaction_ID: id,
    };
    console.log("fetch customer tickets for customer", customerInfo);
    fetch("https://museum3380-89554eee8566.herokuapp.com/ticket-ID", {
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
        setTicket(data);
      });
  };
  return (
    <div className="pb-24 px-16">
      {ticket.length > 0 ? (
        <div className="flex flex-col space-y-12">
          <div className="flex flex-col space-y-20">
            <div className="flex flex-col space-y-12">
              <h3 className="text-5xl font-fanwoodText">
                Ticket Purchase #{id}
              </h3>
              <div className="flex flex-row space-x-12">
                <div className="flex flex-col space-y-4 w-1/2">
                  <div className="flex flex-row justify-between">
                    <p className="font-bold">Date For</p>
                    <p className="">{ticket[0].New_Transaction_Date}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="font-bold">Time For</p>
                    <p className="">{ticket[0].Ticket_Time}</p>
                  </div>
                  <div className="flex flex-row  justify-between">
                    <p className="font-bold">Total Bill</p>
                    <p className="">${ticket[0].Total_Bill}</p>
                  </div>

                  {ticket[0].Num_Child_Tickets !== 0 ? (
                  <div className="flex flex-row justify-between">
                  <p className="font-bold"># of Child Tickets</p>
                      <p className="">{ticket[0].Num_Child_Tickets}</p>
                    </div>
                  ) : null}

                  {ticket[0].Num_Teen_Tickets !== 0 ? (
                  <div className="flex flex-row justify-between">
                  <p className="font-bold"># of Teen Tickets</p>
                      <p className="">{ticket[0].Num_Teen_Tickets}</p>
                    </div>
                  ) : null}

                  {ticket[0].Num_Adult_Tickets !== 0 ? (
                  <div className="flex flex-row justify-between">
                  <p className="font-bold"># of Adult Tickets</p>
                      <p className="">{ticket[0].Num_Adult_Tickets}</p>
                    </div>
                  ) : null}

                  {ticket[0].Num_Senior_Tickets !== 0 ? (
                  <div className="flex flex-row justify-between">
                  <p className="font-bold">$ of Senior Tickets</p>
                      <p className="">{ticket[0].Num_Senior_Tickets}</p>
                    </div>
                  ) : null}
                  <div className="flex flex-row justify-between">
                    <p className="font-bold">Total Quantity</p>
                    <p className="">{ticket[0].Ticket_Count}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="font-bold">Transaction Date</p>
                    <p className="">{ticket[0].New_Transaction_Date}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                  <p className="font-bold w-1/2">For</p>
                  {ticket[0].Exhibition_Name !== null ? <div className="text-end"><p className="font-bold text-end">Special Exhibition</p>{ticket[0].Exhibition_Name}</div> : <p className="text-end">Permanent Collections</p>}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : <p>There are no past ticket transactions</p>}
    </div>
  );
}
