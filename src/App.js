import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React, useContext } from "react";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Donate from "./pages/Donate";
import Shop from "./pages/Shop";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CustomerAccount from "./pages/customer/CustomerAccount";
import CustomerDonations from "./pages/customer/CustomerDonations";
import CustomerPurchases from "./pages/customer/CustomerPurchases";
import CustomerTickets from "./pages/customer/CustomerTickets";
import Checkout from "./pages/Checkout";

import Ticket from "./pages/Tickets";
import Artworks from "./pages/Artworks";
import Exhibitions from "./pages/Exhibitions";
import ExhibitionsPast from "./pages/ExhibitionsPast";
import ExhibitionsFuture from "./pages/ExhibitionsFuture";

import ExhibitionDetails from "./pages/ExhibitionDetails";
import ArtworkDetails from "./pages/ArtworkDetails";

import Departments from "./pages/Departments";
import DepartmentDetails from "./pages/DepartmentDetails";

import CuratorHome from "./pages/curator/CuratorHome";
import CuratorCollections from "./pages/curator/CuratorCollections";
import CuratorExhibitions from "./pages/curator/CuratorExhibitions";
import CuratorArtworks from "./pages/curator/CuratorArtworks";
import CuratorAccount from "./pages/curator/CuratorAccount";
import CuratorReport from "./pages/curator/CuratorReport";

import ManagerHome from "./pages/manager/ManagerHome";
import ManagerCollections from "./pages/manager/ManagerCollections";
import ManagerExhibitions from "./pages/manager/ManagerExhibitions";
import ManagerArtworks from "./pages/manager/ManagerArtworks";
import ManagerAccount from "./pages/manager/ManagerAccount";
import ManagerEmployees from "./pages/manager/ManagerEmployees";
import ManagerArtReport from "./pages/manager/ManagerArtReport";
import ManagerExhibitReport from "./pages/manager/ManagerExhibitReport";

import ShopManagerHome from "./pages/shopManager/ShopManagerHome";
import ShopManagerAccount from "./pages/shopManager/ShopManagerAccount";
import ShopManagerCatalog from "./pages/shopManager/ShopManagerCatalog";
import ShopManagerShopLog from "./pages/shopManager/ShopManagerShopLog";
import ShopReport from "./pages/shopManager/ShopManagerReport";

import DirectorHome from "./pages/director/DirectorHome";
import DirectorCollections from "./pages/director/DirectorCollections";
import DirectorExhibitions from "./pages/director/DirectorExhibitions";
import DirectorArtworks from "./pages/director/DirectorArtworks";
import DirectorAccount from "./pages/director/DirectorAccount";
import DirectorEmployees from "./pages/director/DirectorEmployees";
import DirectorShopCatalog from "./pages/director/DirectorShopCatalog";
import DirectorDonations from "./pages/director/DirectorDonations";
import DirectorTickets from "./pages/director/DirectorTickets";
import DirectorDeptReport from "./pages/director/DirectorDeptReport";
import DirectorFinanceReport from "./pages/director/DirectorFinanceReport";
import DirectorArtReport from "./pages/director/DirectorArtReport";

import NotFound from "./pages/NotFound";
import DirectorDepartments from "./pages/director/DirectorDepartments";

import CuratorRoutes from "./routes/CuratorRoutes";
import DirectorRoutes from "./routes/DirectorRoutes";
import ManagerRoutes from "./routes/ManagerRoutes";
import ShopManagerRoutes from "./routes/ShopManagerRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ShopRoute from "./routes/ShopRoute";

function App() {
  return (
    <div className="bg-chalk min-h-screen">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Basic Routes */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/donate" element={<Donate />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
            {/* <Route path="/collections" element={<Collections />}></Route> */}
            <Route path="/artworks/search" element={<Artworks />}></Route>
            <Route path="/tickets" element={<Ticket />}></Route>
            <Route path="/departments" element={<Departments />}></Route>
            <Route
              path="/departments/:id"
              element={<DepartmentDetails />}
            ></Route>
            <Route path="/exhibitions" element={<Exhibitions />}></Route>
            <Route
              path="/exhibitions/upcoming"
              element={<ExhibitionsFuture />}
            ></Route>
            <Route
              path="/exhibitions/past"
              element={<ExhibitionsPast />}
            ></Route>
            <Route
              path="/exhibitions/:id"
              element={<ExhibitionDetails />}
            ></Route>
            <Route path="/artworks/:id" element={<ArtworkDetails />}></Route>

            {/* Shop Route */}
            <Route
              path="/shop/checkout"
              element={
                <ShopRoute>
                  <Checkout />
                </ShopRoute>
              }
            ></Route>

            {/* User Routes */}
            <Route
              path="/user-login"
              element={
                <ProtectedRoutes>
                  <UserLogin />
                </ProtectedRoutes>
              }
            ></Route>
            <Route
              path="/user-signup"
              element={
                <ProtectedRoutes>
                  <UserSignup />
                </ProtectedRoutes>
              }
            ></Route>

            <Route
              path="/account"
              element={
                <CustomerRoutes>
                  <CustomerAccount />
                </CustomerRoutes>
              }
            ></Route>

            <Route
              path="account/purchases"
              element={
                <CustomerRoutes>
                  <CustomerPurchases />
                </CustomerRoutes>
              }
            ></Route>

            <Route
              path="account/donations"
              element={
                <CustomerRoutes>
                  <CustomerDonations />
                </CustomerRoutes>
              }
            ></Route>

            <Route
              path="account/tickets"
              element={
                <CustomerRoutes>
                  <CustomerTickets />
                </CustomerRoutes>
              }
            ></Route>

            {/* Admin Routes */}
            <Route
              path="/employee-login"
              element={
                <ProtectedRoutes>
                  <AdminLogin />
                </ProtectedRoutes>
              }
            ></Route>

            <Route
              path="/curator"
              element={
                <CuratorRoutes>
                  <CuratorHome />
                </CuratorRoutes>
              }
            />
            <Route
              path="/curator/exhibitions"
              element={
                <CuratorRoutes>
                  <CuratorExhibitions />{" "}
                </CuratorRoutes>
              }
            ></Route>
            <Route
              path="/curator/collections"
              element={
                <CuratorRoutes>
                  <CuratorCollections />{" "}
                </CuratorRoutes>
              }
            ></Route>
            <Route
              path="/curator/artworks"
              element={
                <CuratorRoutes>
                  <CuratorArtworks />{" "}
                </CuratorRoutes>
              }
            ></Route>
            <Route
              path="/curator/account"
              element={
                <CuratorRoutes>
                  <CuratorAccount />{" "}
                </CuratorRoutes>
              }
            ></Route>

            <Route
              path="/curator/exhibit-report"
              element={
                <CuratorRoutes>
                  <CuratorReport />{" "}
                </CuratorRoutes>
              }
            ></Route>

            {/* Manager Routes */}
            <Route
              path="/manager"
              element={
                <ManagerRoutes>
                  <ManagerHome />
                </ManagerRoutes>
              }
            />

            <Route
              path="/manager/exhibitions"
              element={
                <ManagerRoutes>
                  <ManagerExhibitions />{" "}
                </ManagerRoutes>
              }
            ></Route>
            <Route
              path="/manager/collections"
              element={
                <ManagerRoutes>
                  <ManagerCollections />{" "}
                </ManagerRoutes>
              }
            ></Route>
            <Route
              path="/manager/art-report"
              element={
                <ManagerRoutes>
                  <ManagerArtReport />{" "}
                </ManagerRoutes>
              }
            ></Route>
            <Route
              path="/manager/artworks"
              element={
                <ManagerRoutes>
                  <ManagerArtworks />{" "}
                </ManagerRoutes>
              }
            ></Route>
            <Route
              path="/manager/employees"
              element={
                <ManagerRoutes>
                  <ManagerEmployees />{" "}
                </ManagerRoutes>
              }
            ></Route>
            <Route
              path="/manager/exhibit-report"
              element={
                <ManagerRoutes>
                  <ManagerExhibitReport />{" "}
                </ManagerRoutes>
              }
            ></Route>
            <Route
              path="/manager/account"
              element={
                <ManagerRoutes>
                  <ManagerAccount />{" "}
                </ManagerRoutes>
              }
            ></Route>

            {/* Shop Manager Routes */}
            <Route
              path="/shop-manager"
              element={
                <ShopManagerRoutes>
                  <ShopManagerHome />
                </ShopManagerRoutes>
              }
            />
            <Route
              path="/shop-manager/shop-log"
              element={
                <ShopManagerRoutes>
                  <ShopManagerShopLog />{" "}
                </ShopManagerRoutes>
              }
            ></Route>
            <Route
              path="/shop-manager/shop-catalog"
              element={
                <ShopManagerRoutes>
                  <ShopManagerCatalog />{" "}
                </ShopManagerRoutes>
              }
            ></Route>
            <Route
              path="/shop-manager/account"
              element={
                <ShopManagerRoutes>
                  <ShopManagerAccount />{" "}
                </ShopManagerRoutes>
              }
            ></Route>

            <Route
              path="/shop-manager/report"
              element={
                <ShopManagerRoutes>
                  <ShopReport />{" "}
                </ShopManagerRoutes>
              }
            ></Route>

            {/* Director Routes */}
            <Route
              path="/director"
              element={
                <DirectorRoutes>
                  <DirectorHome />
                </DirectorRoutes>
              }
            />
            <Route
              path="/director/exhibitions"
              element={
                <DirectorRoutes>
                  <DirectorExhibitions />{" "}
                </DirectorRoutes>
              }
            ></Route>
            <Route
              path="/director/collections"
              element={
                <DirectorRoutes>
                  <DirectorCollections />{" "}
                </DirectorRoutes>
              }
            ></Route>
            <Route
              path="/director/artworks"
              element={
                <DirectorRoutes>
                  <DirectorArtworks />{" "}
                </DirectorRoutes>
              }
            ></Route>
            <Route
              path="/director/employees"
              element={
                <DirectorRoutes>
                  <DirectorEmployees />{" "}
                </DirectorRoutes>
              }
            ></Route>
            <Route
              path="/director/tickets"
              element={
                <DirectorRoutes>
                  <DirectorTickets />{" "}
                </DirectorRoutes>
              }
            ></Route>
            <Route
              path="/director/shop-catalog"
              element={
                <DirectorRoutes>
                  <DirectorShopCatalog />{" "}
                </DirectorRoutes>
              }
            ></Route>
            <Route
              path="/director/donations"
              element={
                <DirectorRoutes>
                  <DirectorDonations />{" "}
                </DirectorRoutes>
              }
            ></Route>
            <Route
              path="/director/departments"
              element={
                <DirectorRoutes>
                  <DirectorDepartments />{" "}
                </DirectorRoutes>
              }
            ></Route>
            <Route
              path="/director/dept-report"
              element={
                <DirectorRoutes>
                  <DirectorDeptReport />{" "}
                </DirectorRoutes>
              }
            ></Route>
            <Route
              path="/director/finance-report"
              element={
                <DirectorRoutes>
                  <DirectorFinanceReport />{" "}
                </DirectorRoutes>
              }
            ></Route>
            <Route
              path="/director/art-report"
              element={
                <DirectorRoutes>
                  <DirectorArtReport />{" "}
                </DirectorRoutes>
              }
            ></Route>
            <Route
              path="/director/account"
              element={
                <DirectorRoutes>
                  <DirectorAccount />{" "}
                </DirectorRoutes>
              }
            ></Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
