import Logo from "../assets/images/unnamed.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="sticky top-[100vh] flex flex-row font-inter items-center justify-between border-t">
      <div className="w-3/12 ">
          <div className="h-fit w-full p-16">
            <Link to="/">
                <img
                  className="object-cover object-center h-full w-full"
                  src={Logo}
                  alt=""
                />{" "}
            </Link>
          </div>
      </div>

      <div className="flex flex-row w-9/12 gap-x-10  bg-stone-100 h-full p-16 border-l">
        <div className="flex flex-col w-3/6">
          <p className="font-bold uppercase">
            The Museum of Fine Arts, Houston
          </p>
          <p>1001 Bissonet St</p>
          <p>Houston, TX 77005</p>
          <p>713-639-7300</p>
        </div>
        <div className="flex flex-col gap-y-1 w-1/6">
          <Link to="/about" className="hover:underline underline-offset-4">About</Link>
          <Link to="/exhibitions" className="hover:underline underline-offset-4">Exhibitions</Link>
          <Link to="/collections" className="hover:underline underline-offset-4">Collections</Link>
          <Link to="/donate" className="hover:underline underline-offset-4">Donate</Link>
          <Link to="/tickets" className="hover:underline underline-offset-4">Get Tickets</Link>
          <Link to="/shop" className="hover:underline underline-offset-4">Shop</Link>
        </div>
        <div className="flex flex-col w-2/6">
          <h4>Copyright © 2024, The Museum of Fine Arts, Houston. All rights reserved.</h4>
        </div>
      </div>
    </div>
  );
}
