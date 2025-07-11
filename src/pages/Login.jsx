import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/actions/userAction";
import { loginUser } from "../redux/api";
import { fetchAuth, fetchError, fetchLoading } from "../redux/slices/authSlice";
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state?.authInfo ?? {});

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const handleForm = (e) => {
    setUserInfo((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchLoading());
    try {
      const { data } = await axios.post(loginUser, userInfo, {
        withCredentials: true,
      });
      if (data.statusCode === 201) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.data));
        dispatch(fetchAuth(data.data));
        navigate("/");
        setUserInfo({});
      }
    } catch (error) {
      fetchError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInfo.email}
              onChange={handleForm}
              name="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInfo.password}
              onChange={handleForm}
              name="password"
            />
          </div>
          <button className="w-full cursor-pointer" type="submit">
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
