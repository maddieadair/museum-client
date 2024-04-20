import { React, useState, useEffect, useContext } from "react";
import UserNavbar from "../components/UserNavbar";
import Item from "../assets/images/FloraMorgaPeachEarrings1_1000x1000.jpg-ezgif.com-webp-to-jpg-converter-removebg-preview.png";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Footer from "../components/Footer";
// import ShopS from "../components/ShopStore";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthContext";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { TbDiscountCheckFilled } from "react-icons/tb";

export default function Shop() {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(1);
  const [subtotal, setSubtotal] = useState("");
  const [itemID, setItemID] = useState("");
  const [discount, setDiscount] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");

  const {
    currentAuthID,
    currentAuthRole,
    setCurrentCart,
    currentCart,
    currentPrice,
    setCurrentPrice,
    currentTotal, 
    setCurrentTotal,
    currentDiscount,
    setCurrentDiscount
  } = useContext(AuthContext);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const savedCart = localStorage.getItem("cart");
      const savedPrice = localStorage.getItem("price");
      const savedTotal = localStorage.getItem("total");
      const savedDiscount = localStorage.getItem("discount");

      console.log("Saved price", savedPrice)
      console.log("Saved total", savedTotal)
      console.log("Saved discount", savedDiscount)

      if (savedCart) {
        setCart(JSON.parse(JSON.parse(savedCart)));
        setItemPrice(JSON.parse(JSON.parse(savedPrice)));
        setTotalPrice(JSON.parse(JSON.parse(savedTotal)));
        setSubtotal(JSON.parse(JSON.parse(savedPrice)));
        setDiscount(JSON.parse(JSON.parse(savedDiscount)));

        if (savedDiscount !== null) {
            setDiscountedPrice(JSON.parse(JSON.parse(savedTotal * 0.85)))
        }
        // setTotalPrice(JSON.parse(JSON.parse(savedCart)).gift_price);
        // setSubtotal(JSON.parse(JSON.parse(savedCart)).gift_price);
        setItemID(JSON.parse(JSON.parse(savedCart)).gift_index);
      }
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let bill = parseInt(quantity) * cart.gift_price;
    setTotalPrice(bill);
    setSubtotal(bill);
    if (bill > 100) {
      setDiscount(bill * 0.15);
      setDiscountedPrice(bill * 0.85);
    }
  }, [quantity]);

  const deleteItem = () => {
    setCart({});
    setQuantity(0);
    setTotalPrice(0);
    setCurrentCart(null);
    setCurrentPrice(null);
    setCurrentTotal(null);
    setCurrentDiscount(null);
  };

  const submitPurchase = async (e) => {
    e.preventDefault();

    const purchaseData = {
      item_ID: itemID,
      customer_ID: currentAuthID,
      transaction_quantity: quantity,
      total_bill: totalPrice,
    };

    console.log("purchaseData", purchaseData);

    try {
      const response = await fetch("https://museum3380-89554eee8566.herokuapp.com/gift-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      });

      if (!response.ok) {
        throw new Error("There was an error processing request.");
      }

      const data = await response.json();
      console.log(data);
      alert("Order successfully placed!");
      setCart({});
      setCurrentCart(null);
      setCurrentPrice(null);
      setCurrentDiscount(null);
      setCurrentTotal(null);
      setQuantity(1);
      setTotalPrice(1);
      setSubtotal(1);
      setDiscount("");
      setItemPrice("");
      setDiscountedPrice("");
    } catch (error) {
      alert(error);

      console.log("There was an error fetching:", error);
    }
  };

  console.log("cart", cart);
  console.log("item id", itemID);
  console.log("quantity", quantity);

  return (
    <>
      {!loading ? (
        <div className="min-h-screen">
          <UserNavbar />

          <div className="flex flex-col pt-36 pb-24 gap-y-24 font-inter">
            <div className="flex flex-col gap-y-6 border-b px-16 pb-24">
              <h1 className="font-fanwoodText italic text-7xl">Checkout</h1>
              <p className="text-xl font-inter">
                Review and edit your order before proceeding to check out.
              </p>
            </div>

            {subtotal > 100 ? (
              <div className="font-bold text-cinnabar text-center border border-cinnabar bg-red-50 rounded-md p-4 w-1/2 items-center self-center gap-x-6 flex flex-row">
                <TbDiscountCheckFilled size={20} />
                <p>
                  Congrats! You got a 15% off discount off your order for
                  spending over $100!
                </p>
              </div>
            ) : null}

            <div className="flex flex-col gap-y-24 font-inter px-16">
              <form
                className="flex flex-row space-x-20"
                onSubmit={(e) => submitPurchase(e)}
              >
                <div className="flex flex-col space-y-20 w-2/3">
                  <div className="flex flex-row space-x-5 ">
                    <div className="h-56 w-1/3 ">
                      <img
                        className="object-contain object-center size-full hover:scale-110 transition-all duration-500"
                        src={Item} // Make sure to use item image source from item data
                        alt={cart.gift_name}
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center w-1/3 gap-y-8 ">
                      <div className="flex flex-col">
                        <p className="text-xl font-bold">{cart.gift_name}</p>
                        <p className="text-lg">${cart.gift_price}</p>
                      </div>
                      <div className="flex flex-row gap-x-4 items-center ">
                        <button
                          type="button"
                          disabled={quantity === 1}
                          onClick={() => setQuantity(quantity - 1)}
                          className="disabled:cursor-not-allowed disabled:bg-transparent border border-obsidian bg-stone-300 text-obsidian font-extrabold text-lg p-2 rounded-md"
                        >
                          <LuMinus />
                        </button>
                        <p className="p-2">{quantity}</p>
                        <button
                          type="button"
                          disabled={quantity === cart.gift_currStock}
                          onClick={() => setQuantity(quantity + 1)}
                          className="disabled:cursor-not-allowed disabled:bg-transparent border border-obsidian bg-stone-300 text-obsidian font-extrabold text-lg p-2 rounded-md"
                        >
                          <LuPlus />
                        </button>
                      </div>
                    </div>
                    <div className="font-bold w-1/3 items-center justify-center flex">
                      <p>${subtotal}</p>
                    </div>
                    <div className="flex items-center">
                      <MdDelete
                        size={24}
                        className="hover:text-cinnabar transition-all duration-500 ease-in-out hover:cursor-pointer"
                        onClick={() => deleteItem()}
                      />
                    </div>
                  </div>
                </div>
                <div className=" text-charcoal w-1/3 flex flex-col p-6 gap-y-5 h-fit">
                  <div className="flex flex-col p-6 gap-y-5 rounded-md bg-stone-100 ">
                    <div className="flex flex-row justify-between">
                      <p className="font-bold">Total Quantity</p>
                      <p>{quantity}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="font-bold">Subtotal</p>
                      <p>${parseFloat(subtotal).toFixed(2)}</p>
                    </div>
                    {subtotal > 100 ? (
                      <div className="flex flex-row justify-between">
                        <p className="font-bold">Discount</p>
                        <p>- ${parseFloat(discount).toFixed(2)}</p>
                      </div>
                    ) : null}

                    {subtotal > 100 ? (
                      <div className="flex flex-row justify-between border-t pt-6">
                        <p className="font-bold">Total</p>
                        <p>${parseFloat(discountedPrice).toFixed(2)}</p>
                      </div>
                    ) : (
                      <div className="flex flex-row justify-between border-t pt-6">
                        <p className="font-bold">Total</p>
                        <p>${parseFloat(totalPrice).toFixed(2)}</p>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-obsidian text-chalk rounded-md p-4 hover:bg-cinnabar duration-500 transition-all ease-in-out font-bold"
                  >
                    Checkout
                  </button>
                </div>
              </form>
            </div>
          </div>

          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
