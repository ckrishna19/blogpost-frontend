import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/api";
import { fetchUser } from "../redux/actions/userAction";
import {
  clearError,
  fetchAuth,
  fetchError,
  fetchLoading,
} from "../redux/slices/authSlice";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state?.authInfo ?? {});

  console.log({ loading, error });
  useEffect(() => {
    let timeOut;
    if (error) {
      timeOut = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
    return () => {
      if (timeOut) clearTimeout(timeOut);
    };
  }, [error, dispatch]);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      alert("password and confirm password not match");
      return;
    }
    dispatch(fetchLoading());
    try {
      const { data } = await axios.post(registerUser, userInfo, {
        withCredentials: true,
      });
      if (data.statusCode === 201) {
        localStorage.setItem("loggedInUser", data.data);
        dispatch(fetchAuth(data.data));
        setUserInfo({});
        navigate("/");
      }
    } catch (error) {
      dispatch(fetchError(error.response.data.message));
    }
  };

  const handleForm = (e) => {
    setUserInfo((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>
        {error && <p>{error} </p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-x-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userInfo.firstName}
                onChange={handleForm}
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userInfo.lastName}
                onChange={handleForm}
                name="lastName"
                placeholder="Last Name"
              />
            </div>
          </div>
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
              placeholder="Email"
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
              placeholder="Password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInfo.confirmPassword}
              onChange={handleForm}
              name="confirmPassword"
              placeholder="Confirm password"
            />
          </div>
          <button className="w-full cursor-pointer" type="submit">
            {loading ? "Loading.." : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
