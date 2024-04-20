import { React, useState, useEffect, useContext } from "react";
import UserNavbar from "../components/UserNavbar";
import Item from "../assets/images/FloraMorgaPeachEarrings1_1000x1000.jpg-ezgif.com-webp-to-jpg-converter-removebg-preview.png";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Footer from "../components/Footer";
// import ShopS from "../components/ShopStore";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthContext";

export default function Shop() {
  const [giftItems, setGiftItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    currentAuthID,
    currentAuthRole,
    setCurrentCart,
    currentCart,
    setCurrentPrice,
    setCurrentDiscount,
    setCurrentTotal,
  } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetchGiftItems();
    }, 500);
  }, []);

  console.log("Gift items:", giftItems);

  const fetchGiftItems = () => {
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
        setGiftItems(data);
        setLoading(false);
      });
  };

  const addToCart = (item) => {
    setCurrentCart(JSON.stringify(item));
    setCurrentPrice(JSON.stringify(item.gift_price));
    setCurrentTotal(item.gift_price);
    if (item.gift_price > 100) {
      setCurrentDiscount(item.gift_price * 0.15);
    }
  };

  //   console.log("cart", cart)

  return (
    <>
      {!loading ? (
        <div className="min-h-screen">
          <UserNavbar />

          <div className="flex flex-col pt-36 pb-24 px-16 gap-y-20">
            <div className="flex flex-col gap-y-12">
              <h1 className="font-fanwoodText italic text-7xl">
                MFAH Gift Shop
              </h1>
              <p className="text-xl font-inter">
                The MFA Shop offers a unique selection of artful gifts, prints,
                jewelry, books, toys, and more. Discover a diverse array of
                culturally-inspired souvenirs and exhibition-specific
                merchandise at our museum gift shop, offering a memorable way to
                commemorate your visit and delve deeper into the stories behind
                our exhibitions.
                <br></br>
                <br></br>
                Discover a diverse array of culturally-inspired souvenirs and
                exhibition-specific merchandise at our museum gift shop,
                offering a memorable way to commemorate your visit and delve
                deeper into the stories behind our exhibitions.
              </p>
            </div>
          </div>
          <div className="flex flex-col px-16 pb-24 gap-y-16 font-inter border-b">
            {giftItems.length > 0 ? (
              <div className="grid grid-cols-4 gap-x-12 gap-y-12">
                {giftItems.map((item) => (
                  <div
                    key={item.gift_index}
                    className="flex flex-col gap-y-4 group"
                  >
                    <div className="h-64 border-b border-gravel">
                      <img
                        className="object-cover object-center size-full hover:scale-110 transition-all duration-500"
                        src={Item} // Make sure to use item image source from item data
                        alt={item.gift_name}
                      />
                    </div>
                    <div className="h-1/2 p-10 flex flex-col gap-y-6 items-center justify-center">
                      <h4 className="font-bold text-xl text-center hover:text-cinnabar hover:underline duration-500 ease-in-out transition-all decoration-1 underline-offset-4">
                        {item.gift_name}
                      </h4>
                      <p className="text-lg">${item.gift_price}</p>
                      {item.soldout_status === 1 ? (
                        <p className="font-bold text-cinnabar">Sold Out</p>
                      ) : null}

                      {currentAuthID !== null &&
                      currentAuthRole === "Customer" &&
                      item.soldout_status !== 1 &&
                      currentCart === null ? (
                        <div className="invisible group-hover:visible flex flex-row items-center justify-center hover:cursor-pointer">
                          <p
                            className="bg-obsidian text-chalk rounded-md p-4 hover:bg-cinnabar transition-all duration-300 ease-in-out"
                            onClick={() => addToCart(item)}
                          >
                            Add to Cart{" "}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No gift items available.</p>
            )}
          </div>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
