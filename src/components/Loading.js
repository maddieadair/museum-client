import { React, useState, useEffect } from "react";
import "./Loading.css";
 
export default function Loading() {
  return (
    <div className="min-h-screen w-screen bg-chalk text-chalk flex justify-center items-center z-50">
        <span className="loader"></span>
    </div>
  );
}
