import CuratorNavbar from "../../components/curator/CuratorNavbar";
import CuratorBar from "../../components/curator/CuratorBar";
import { React, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ShopManagerHome() {
  const [data, setData] = useState([]);

  const { currentAuthID } =
    useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const curatorInfo = {
      Curator_ID: currentAuthID,
    };
    const urls = [
      "https://museum3380-89554eee8566.herokuapp.com/curator-exhibit-rev",
      "https://museum3380-89554eee8566.herokuapp.com/curator-exhibit-stats",
    ];

    Promise.all(
      urls.map((url) =>
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(curatorInfo),
        }).then((response) => response.json())
      )
    )
      .then((data) => {
        console.log("data", data);
        setData(data);
      })
      .catch((error) => console.error("An error occurred:", error));
  };

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <CuratorNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <CuratorBar title="Dashboard" />

          {data.length > 0 ? (
            <div className="flex flex-row px-14 gap-x-6 text-md">
              <div className="flex flex-col gap-y-6 w-1/2">
                {data[0].length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-4 h-fit">
                    <h1 className="font-bold text-xl">
                      Total Exhibition Revenue
                    </h1>
                    <h4 className="text-xl">${data[0][0].Total_Revenue}</h4>
                  </div>
                ) : null}

                {data[1].length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">
                      Age Distribution per Exhibition
                    </p>

                    <div className="flex flex-col gap-y-4">
                      {data[1].map((item, id) => (
                        <div
                          key={item.Exhibit_ID}
                          className="flex flex-col justify-between"
                        >
                          <p className="font-bold">{item.Exhibit_Name}</p>
                          <ul className="flex flex-col">
                            <li className="list-disc indent-6 list-inside">
                              {" "}
                              # of Child Tickets:{" "}
                              {item.Child_Tix === null ? `0` : item.Child_Tix}
                            </li>
                            <li className="list-disc indent-6 list-inside">
                              {" "}
                              # of Teen Tickets:{" "}
                              {item.Teen_Tix === null ? `0` : item.Teen_Tix}
                            </li>
                            <li className="list-disc indent-6 list-inside">
                              {" "}
                              # of Adult Tickets:{" "}
                              {item.Adult_Tix === null ? `0` : item.Adult_Tix}
                            </li>
                            <li className="list-disc indent-6 list-inside">
                              {" "}
                              # of Senior Tickets:{" "}
                              {item.Senior_Tix === null ? `0` : item.Senior_Tix}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-y-6 w-1/2">
                {data[1].length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">Revenue per Exhibition</p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Exhibition</p>
                      <p className="font-bold underline">Revenue</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {data[1].map((item, id) => (
                        <div
                          key={item.Exhibit_ID}
                          className="flex flex-row justify-between"
                        >
                          <p className="w-1/2">- {item.Exhibit_Name}</p>
                          <p className="">
                            $
                            {item.Total_Revenue === null
                              ? `0`
                              : item.Total_Revenue}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {data[1].length > 0 ? (
                  <div className="border rounded-md p-6 flex flex-col gap-y-6 h-fit">
                    <p className="font-bold text-xl">
                      Ticket Stats per Exhibition
                    </p>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold underline">Exhibition</p>
                      <p className="font-bold underline"># of tickets sold</p>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      {data[1].map((item, id) => (
                        <div
                          key={item.Exhibit_ID}
                          className="flex flex-row justify-between"
                        >
                          <p className="w-1/2">- {item.Exhibit_Name}</p>
                          <p className="">{item.Tickets_Sold}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
