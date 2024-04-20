import ShopManagerNavbar from "../../components/shopManager/ShopManagerNavbar";
import ShopManagerBar from "../../components/shopManager/ShopManagerBar";
import { LuPencil } from "react-icons/lu";
import { React, useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function ShopManagerCatalog() {
  const [currIndex, setCurrentIndex] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [giftName, setGiftName] = useState("");
  const [giftPrice, setGiftPrice] = useState("");
  const [giftStock, setGiftStock] = useState("");

  const [status, setStatus] = useState("");
  const [currInput, setCurrentInput] = useState({});

  const addGift = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors) {
      alert("Please fill in all required fields.");
      return;
    }

    const giftData = {
      gift_name: giftName,
      gift_price: giftPrice,
      gift_currStock: giftStock,
    };

    console.log("giftData", giftData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/gifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(giftData),
      });

      if (!response.ok) {
        throw new Error("There was a network error");
      }

      const data = await response.json();
      console.log(data);
      if (data.message === "Error adding the gift item") {
        setStatus("Error adding the gift item");
        alert("Error adding the gift item");
      } else {
        setStatus("Gift item added successfully");
        alert("Gift item added successfully!");
        clearFields();
        setOpenNew(false);
      }
    } catch (error) {
      console.log("There was an error fetching:", error);
    }
  };

  const clearFields = () => {
    setGiftName("");
    setGiftPrice("");
    setGiftStock("");
    setCurrentInput({});
  };
  const handleEdit = () => {
    setGiftName(currInput.gift_name);
    setGiftPrice(currInput.gift_price);
    setGiftStock(currInput.gift_currStock);
    setOpenEdit(true);
  };

  const handleCancel = () => {
    setOpenEdit(false);
    clearFields();
  };

  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = () => {
    fetch("https://museum3380-89554eee8566.herokuapp.com/gifts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGifts(data);
      });
  };

  const deleteGift = async (e) => {
    e.preventDefault();

    const giftData = {
      gift_index: currInput.gift_index,
    };

    console.log("giftData", giftData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/gifts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(giftData),
      });

      if (!response.ok) {
        throw new Error("There was a network error");
      }

      const data = await response.json();
      console.log(data);
      if (data.message === "Error deleting the gift item") {
        setStatus("Error deleting the gift item");
        alert("Error deleting the gift item");
      } else {
        setStatus("Gift item deleted successfully'");
        alert("Gift item deleted successfully");
        clearFields();
      }
    } catch (error) {
      console.log("There was an error fetching:", error);
    }
  };

  const updateGift = async (e) => {
    e.preventDefault();

    const hasErrors = validate();

    if (hasErrors) {
      alert("Please fill in all required fields.");
      return;
    }

    const giftData = {
      gift_name: giftName,
      gift_price: giftPrice,
      gift_currStock: giftStock,
      gift_index: currInput.gift_index,
    };

    console.log("giftData", giftData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/gifts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(giftData),
      });

      if (!response.ok) {
        throw new Error("There was a network error");
      }

      const data = await response.json();
      console.log(data);
      if (data.message === "Error updating the gift item") {
        setStatus("Error updating the gift item");
        alert("Error updating the gift item");
        console.log(data);
      } else {
        setStatus("Gift item updated successfully'");
        alert("Gift item updated successfully");
        clearFields();
        setOpenEdit(false);
      }
    } catch (error) {
      console.log("There was an error fetching:", error);
    }
  };

  const validate = () => {
    let hasErrors = false;

    if (giftName === "" || giftName === null) {
      hasErrors = true;
    }
    if (giftPrice === "" || giftPrice === null) {
      hasErrors = true;
    }
    if (giftStock === "" || giftStock === null) {
      hasErrors = true;
    }

    return hasErrors;
  };

  console.log("currentInput", currInput);

  return (
    <div className="bg-white min-h-screen text-[#34383f] font-inter">
      <div className="flex flex-row">
        <ShopManagerNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full pb-14">
          <ShopManagerBar title="Shop Catalog" />

          {gifts.length > 0 ? (
            <div className="flex flex-col px-14 gap-y-12">
              <div className="flex flex-row justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setOpenNew(true);
                    setCurrentIndex(null);
                    setCurrentInput({});
                  }}
                  className="bg-[#3d7b51] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                >
                  <IoIosAdd className="size-6" />
                  <p>Add New Item</p>
                </button>
                <div
                  className={`${
                    Object.keys(currInput).length !== 0
                      ? "flex flex-row gap-x-4"
                      : "hidden"
                  }`}
                >
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="bg-[#cdb65e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                  >
                    <LuPencil className="size-4" />
                    <p>Edit</p>
                  </button>
                  <button
                    type="button"
                    onClick={deleteGift}
                    className="bg-[#bf6f5e] w-fit p-2 px-4 text-chalk rounded-md flex flex-row gap-x-2 justify-between items-center"
                  >
                    <MdOutlineDelete className="size-4" />
                    <p>Delete</p>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl h-fit flex flex-col divide-y-2 divide-slate-100 border">
                <div className="flex flex-row gap-x-6 font-bold p-6 items-center justify-center bg-[#f4f4f4] rounded-t-3xl">
                  <MdOutlineCheckBoxOutlineBlank className="size-6" />
                  <p className="w-1/6 ">Item ID</p>
                  <p className="w-1/6 ">Name</p>
                  <p className="w-1/6 ">Price</p>
                  <p className="w-1/6 ">Current Stock</p>
                  <p className="w-1/6 ">Number Sold</p>
                  <p className="w-1/6 ">Status</p>
                </div>
                {gifts.map((item, id) => (
                  <div
                    key={item.gift_index}
                    className="flex flex-row gap-x-6 p-6 group"
                  >
                    {currInput === item ? (
                      <MdOutlineCheckBox
                        className="size-6 text-rose-400"
                        onClick={() => setCurrentInput({})}
                      />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        className="size-6 group-hover:visible invisible"
                        onClick={() => setCurrentInput(item)}
                      />
                    )}{" "}
                    <p className="w-1/6 ">{item.gift_index}</p>
                    <p className="w-1/6 ">{item.gift_name}</p>
                    <p className="w-1/6 ">${item.gift_price}</p>
                    <p className="w-1/6 ">{item.gift_currStock}</p>
                    <p className="w-1/6 ">{item.gift_numSold}</p>
                    {item.soldout_status === 0 ? (
                      <p className="w-1/6 ">In Stock</p>
                    ) : (
                      <p className="w-1/6 text-cinnabar font-bold">
                        Out of Stock
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {openNew ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <form
            className="bg-white rounded-3xl h-fit w-1/2 shadow-md flex flex-col"
            onSubmit={addGift}
          >
            <div className="flex flex-col">
              <IoClose
                className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                onClick={() => {
                  setOpenNew(false);
                  clearFields();
                  setCurrentIndex(null);
                }}
              />
              <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">
                    Name <span className="text-cinnabar font-normal">*</span>
                  </p>
                  <input
                    type="text"
                    name="giftName"
                    value={giftName}
                    onChange={(e) => setGiftName(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">
                    Price <span className="text-cinnabar font-normal">*</span>
                  </p>
                  <input
                    type="text"
                    name="giftPrice"
                    value={giftPrice}
                    onChange={(e) => setGiftPrice(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">
                    Stock <span className="text-cinnabar font-normal">*</span>
                  </p>
                  <input
                    type="text"
                    name="giftStock"
                    value={giftStock}
                    onChange={(e) => setGiftStock(e.target.value)}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
            >
              Add
            </button>
          </form>
        </div>
      ) : null}

      {openEdit ? (
        <div className="bg-black fixed h-screen w-screen z-30 top-0 left-0 bg-opacity-45 justify-center items-center flex overflow-hidden">
          <form
            className="bg-white rounded-3xl h-fit w-1/2 shadow-md flex flex-col"
            onSubmit={updateGift}
          >
            <div className="flex flex-col">
              <IoClose
                className="self-end size-8 m-6 mb-2 hover:cursor-pointer"
                onClick={() => {
                  handleCancel();
                }}
              />
              <div className="flex flex-col divide-y-2 divide-slate-100 px-6 pb-6">
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">
                    Name <span className="text-cinnabar font-normal">*</span>
                  </p>
                  <input
                    type="text"
                    name="giftName"
                    onChange={(e) => setGiftName(e.target.value)}
                    value={giftName}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">
                    Price <span className="text-cinnabar font-normal">*</span>
                  </p>
                  <input
                    type="text"
                    name="giftPrice"
                    onChange={(e) => setGiftPrice(e.target.value)}
                    value={giftPrice}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <p className="font-bold">
                    Current Stock{" "}
                    <span className="text-cinnabar font-normal">*</span>
                  </p>
                  <input
                    type="text"
                    name="giftStock"
                    onChange={(e) => setGiftStock(e.target.value)}
                    value={giftStock}
                    className="shadow-inner border border-slate-200 rounded-md px-2 py-1"
                  ></input>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="p-4 bg-gray-200 rounded-b-3xl hover:bg-rose-100 hover:text-rose-500"
              onClick={() => {}}
            >
              Save
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
