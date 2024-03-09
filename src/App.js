import "./App.css";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forgot from "./Pages/Forgot";
import NotFound from "./Pages/NotFound";
import ProtectedRoutes from "./Auth/ProtectedRoutes";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";
import UserList from "./Pages/UserList";
import TicketList from "./Pages/TicketList";
import Reset from "./Pages/Reset";
import UserData from "./Pages/UserData";
import SubscriptionsPlans from "./Pages/SubscriptionsPlans";
import "react-datepicker/dist/react-datepicker.css";
import EventPage from "./Pages/EventPage";
import PaymentSuccessfull from "./Pages/PaymentSuccessfull";
import PaymentFailed from "./Pages/PaymentFailed";
import ForgotOtp from "./Pages/ForgotOtp";
import MyProfile from "./Pages/MyProfile";
import MyEvents from "./Pages/MyEvents";
import MyEventPage from "./Pages/MyEventPage";
import JoinedUser from "./Pages/JoinedUser";
import SharingOutLet from "./Pages/SharingOutlet";
import ComingsoonPage from "./Pages/ComingsoonPage";
import AdminToolsPage from "./Pages/AdminToolsPage";
import PostList from "./Pages/PostList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={<ProtectedRoutes cmp={Dashboard} />}
          >
            <Route path="/dashboard/userlist" element={<UserList />} />
            <Route path="/dashboard/ticketlist" element={<TicketList />} />
            <Route
              path="/dashboard/subscriptionsplans"
              element={<SubscriptionsPlans />}
            />
          </Route>
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/forgot-otp" element={<ForgotOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/" element={<UserData />}></Route>
          <Route path="/postlist" element={<PostList />}></Route>
          <Route
            path="/orgs"
            element={
              <SharingOutLet>
                <ComingsoonPage pageName={"Orgs"} />
              </SharingOutLet>
            }
          />
          <Route
            path="/sharing"
            element={
              <SharingOutLet>
                <ComingsoonPage pageName={"Sharing"} />
              </SharingOutLet>
            }
          />
          <Route
            path="/services"
            element={
              <SharingOutLet>
                <ComingsoonPage pageName={"Services"} />
              </SharingOutLet>
            }
          />
          <Route
            path="/roles"
            element={
              <SharingOutLet>
                <ComingsoonPage pageName={"Roles"} />
              </SharingOutLet>
            }
          />
          <Route
            path="/products"
            element={
              <SharingOutLet>
                <ComingsoonPage pageName={"Products"} />
              </SharingOutLet>
            }
          />
          <Route
            path="/peoples"
            element={
              <SharingOutLet>
                <ComingsoonPage pageName={"Peoples"} />
              </SharingOutLet>
            }
          />
          <Route
            path="/resources"
            element={
              <SharingOutLet>
                <ComingsoonPage pageName={"Resources"} />
              </SharingOutLet>
            }
          />
          <Route
            path="/groups"
            element={
              <SharingOutLet>
                <ComingsoonPage pageName={"Groups"} />
              </SharingOutLet>
            }
          />
          <Route
            path="/projects"
            element={
              <SharingOutLet>
                <ComingsoonPage pageName={"Projects"} />
              </SharingOutLet>
            }
          />
          <Route path="/user/:recentUserId" element={<JoinedUser />} />
          <Route path="/payment-successfull" element={<PaymentSuccessfull />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/event/:eventId" element={<EventPage />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/my-event/:eventId" element={<MyEventPage />} />
          <Route
            path="/my-event/admintool/:adminId"
            element={<AdminToolsPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
