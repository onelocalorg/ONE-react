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
import AndroidAppDownload from "./Components/AndroidApp";

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
          <Route path="/" element={<UserData />} />
          <Route path="/payment-successfull" element={<PaymentSuccessfull />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/event/:eventId" element={<EventPage />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/my-event/:eventId" element={<MyEventPage />} />
          <Route path="/androidDownload" element={<AndroidAppDownload />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
