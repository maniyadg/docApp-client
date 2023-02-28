import React from 'react'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useSelector } from 'react-redux'
import Spinner from "./components/Spinner";
import MainPage from "./Pages/MainPage";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import ApplyDoctor from "./Pages/ApplyDoctor";
import NotificationPage from './Pages/NotificationPage';
import Doctor from './Pages/admin/Doctor';
import User from './Pages/admin/User';
function App(props) {
  const { loading } = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
      {
        loading ? (<Spinner />) :
            <Routes>
              <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

              <Route path="/mainpage" element={<PrivateRoute><MainPage /></PrivateRoute>} />
              <Route path="/apply-doctor" element={<PrivateRoute><ApplyDoctor /></PrivateRoute>} />
              <Route path="/notification" element={<PrivateRoute><NotificationPage /></PrivateRoute>} />
              <Route path="/admin/doctors" element={<PrivateRoute><Doctor /></PrivateRoute>} />
              <Route path="/admin/users" element={<PrivateRoute><User /></PrivateRoute>} />

            </Routes>
      }

    </BrowserRouter>
  );
}

export default App;
