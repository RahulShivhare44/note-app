import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Goodnoteslogo.png";
import { toast } from "react-hot-toast";

export default function Navbar(props) {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;

  return (
    <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <Link to="/">
        <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
      </Link>

      {/* Login - Signup - Logout - Dashboard */}
      <div className="flex items-center gap-x-4">
        {!isLoggedIn && (
          <Link to="/login">
            <button className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
              Login
            </button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup">
            <button className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
              Sign Up
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link
            to="/dashboard"
            className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700"
          >
            Dashboard
          </Link>
        )}
        {isLoggedIn && (
          <button
            onClick={() => {
              setIsLoggedIn(false);
              toast.success("Logged Out");
              localStorage.removeItem("Token");
            }}
            className="bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}
