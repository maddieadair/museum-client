import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Donate from "./pages/Donate";
import Shop from "./pages/Shop";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Account from "./pages/customer/Account";
import AccountPurchases from "./components/customer/AccountPurchases";
import AccountDonations from "./components/customer/AccountDonations";
import AccountTickets from "./components/customer/AccountTickets";
import AccountProfile from "./components/customer/AccountProfile";
import AccountPurchaseDetails from "./components/customer/AccountPurchaseDetails";
import AccountDonationDetails from "./components/customer/AccountDonationDetails";
import AccountTicketDetails from "./components/customer/AccountTicketDetails";

import Ticket from "./pages/Tickets";
import AdminHome from "./pages/AdminHome";
import AdminAccount from "./pages/AdminAccount";
import AdminEmployees from "./pages/AdminEmployees";
import AdminArtworks from "./pages/AdminArtworks";
import AdminCollections from "./pages/AdminCollections";
import AdminDepartments from "./pages/AdminDepartments";
import AdminExhibitions from "./pages/AdminExhibitions";
import AdminDonations from "./pages/AdminDonations";
import AdminShop from "./pages/AdminShop";
import AdminTickets from "./pages/AdminTickets";

import Collections from "./pages/Collections";
import Artworks from "./pages/Artworks";
import Exhibitions from "./pages/Exhibitions";
import ExhibitionDetails from "./pages/ExhibitionDetails";
import ArtworkDetails from "./pages/ArtworkDetails";

function App() {
  return (
    <div className="bg-chalk min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* Basic Routes */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/donate" element={<Donate />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/collections" element={<Collections />}></Route>
          <Route path="/artworks" element={<Artworks />}></Route>
          <Route path="/tickets" element={<Ticket />}></Route>
          <Route path="/exhibitions" element={<Exhibitions />}></Route>
          <Route
            path="/exhibitions/:id"
            element={<ExhibitionDetails />}
          ></Route>
          <Route path="/artworks/:id" element={<ArtworkDetails />}></Route>

          {/* User Routes */}
          <Route path="/user-login" element={<UserLogin />}></Route>
          <Route path="/user-signup" element={<UserSignup />}></Route>

          <Route path="/account" element={<Account />}>
            <Route path="profile" element={<AccountProfile />} />
            <Route path="purchases" element={<AccountPurchases />} />
            <Route path="purchases/:id" element={<AccountPurchaseDetails />} />
            <Route path="donations" element={<AccountDonations />} />
            <Route path="donations/:id" element={<AccountDonationDetails />} />
            <Route path="tickets" element={<AccountTickets />} />
            <Route path="tickets/:id" element={<AccountTicketDetails />} />{" "}
          </Route>

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />}></Route>
          <Route path="/admin-signup" element={<AdminSignup />}></Route>

          <Route path="/admin/dashboard" element={<AdminHome />}></Route>
          <Route path="/admin/account" element={<AdminAccount />}></Route>
          <Route path="/admin/artworks" element={<AdminArtworks />}></Route>
          <Route path="/admin/employees" element={<AdminEmployees />}></Route>
          <Route
            path="/admin/departments"
            element={<AdminDepartments />}
          ></Route>
          <Route
            path="/admin/collections"
            element={<AdminCollections />}
          ></Route>
          <Route
            path="/admin/exhibitions"
            element={<AdminExhibitions />}
          ></Route>
          <Route path="/admin/tickets" element={<AdminTickets />}></Route>
          <Route path="/admin/shop" element={<AdminShop />}></Route>
          <Route path="/admin/donations" element={<AdminDonations />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
