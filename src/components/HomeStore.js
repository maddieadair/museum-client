import React from "react";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import Lamp from "../assets/images/PabloBolaLanternTanChrome06_1800x1800.jpg";
import { RiDoubleQuotesL } from "react-icons/ri";
import { BiSolidQuoteAltRight } from "react-icons/bi";

export default function HomeStore() {
  return (
    <div className="flex flex-col px-16 py-24 gap-y-16 font-inter">
      <div className="flex flex-row gap-x-20 items-center">
        <div className="w-1/2 h-[28rem]">
          <img
            className="rounded-xl object-cover object-right size-full outline outline-gray-400 outline-offset-8"
            src={Lamp}
            alt=""
          />{" "}
        </div>

        <div className="flex flex-col gap-y-12 w-1/2">
            <figure className="max-w-screen-md mx-auto text-center">
              <BiSolidQuoteAltRight className="size-10 mx-auto mb-4" />
              <blockquote>
                <p className="text-5xl italic font-medium font-fanwoodText">
                “One of the most <span className="text-cinnabar">cleverly</span> curated museum shops in America.”
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
                <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                  <cite className="ps-3 text-sm text-gray-600 font-inter">
                    New York Times
                  </cite>
                </div>
              </figcaption>
            </figure>

            <p className="self-center">The MFA Shop offers a unique selection of artful gifts, prints,
            jewelry, books, toys, and more. No need to pay Museum admission—it’s
            always free to visit the MFA Shop.</p>

            <Link to="/shop" className="self-center font-bold underline underline-offset-8 hover:text-cinnabar duration-500 transition-color ease-in-out">The MFAH Shop</Link>
        </div>

      </div>
    </div>
  );
}
