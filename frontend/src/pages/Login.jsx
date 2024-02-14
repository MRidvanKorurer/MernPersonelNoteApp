import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  const { rejected } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginFunc = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className=" w-full flex justify-center items-start py-12 min-h-screen ">
        <form className=" flex flex-col gap-8 w-1/3 bg-gray-100  p-8 rounded-lg bg-opacity-5  ">
          <div>
            <h2 className=" text-white font-bold text-xl border-b-2 border-orange-600">
              Giriş Yap
            </h2>
          </div>
          <div className=" flex flex-col gap-2">
            <label className=" font-bold">Email</label>
            <input
              value={formData.email}
              name="email"
              onChange={handleChange}
              type="text"
              className=" border p-2 rounded text-black"
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label className=" font-bold">Parola</label>
            <input
              value={formData.password}
              name="password"
              onChange={handleChange}
              type="password"
              className=" border p-2 rounded text-black"
            />
          </div>
          <div>
            {rejected && (
              <p className=" text-red-500 font-bold py-1 bg-gray-100 bg-opacity-5 rounded">
                {rejected}
              </p>
            )}
          </div>
          <div className=" flex flex-col gap-2">
            <button
              onClick={loginFunc}
              className=" bg-orange-600 hover:bg-orange-800 transition-all rounded py-2 font-bold"
            >
              Giriş Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
