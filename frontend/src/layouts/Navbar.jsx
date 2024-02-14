import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../redux/authSlice";

const Navbar = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutFunc = () => {
    dispatch(logout());
    window.location = "/login";
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <header className=" py-8 border-b-2 border-orange-700 flex justify-between items-center w-full">
      <Link className=" font-bold text-4xl" to={"/"}>
        Aos Not Defteri
      </Link>
      <div className=" flex gap-5 justify-center items-center">
        {isAuth ? (
          <div>
            <p className=" font-bold flex gap-3 justify-center items-center font-serif">
              <span className=" font-serif font-light">Hoşgeldin</span>
              {user?.name.toUpperCase()}
            </p>
          </div>
        ) : (
          <div className=" flex gap-5">
            <Link
              className=" font-bold hover:text-orange-600 transition-all"
              to={"/login"}
            >
              Giriş Yap
            </Link>
            <Link
              className=" font-bold hover:text-orange-600 transition-all"
              to={"/register"}
            >
              Kayıt Ol
            </Link>
          </div>
        )}
        <div>
          {isAuth && (
            <MdLogout
              onClick={logoutFunc}
              className=" hover:text-orange-600 transition-all cursor-pointer"
              size={25}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
