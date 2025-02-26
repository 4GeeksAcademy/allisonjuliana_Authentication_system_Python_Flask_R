import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined)
      actions.getMessage();
  }, [store.token]);

  return (
    <div className="text-center mt-7 container home_max-width">
      <h1>Welcome to our site{store.message}!</h1>

      <div className=" my-5 fs-5 fw-bold">
        {store.message && (
          <Link to="/private">
            <button className="btn btn-primary">
              Access to your private area
            </button>
          </Link>
        )}
      </div>
      <div className="d-flex justify-content-center">
        <img src={Logo} className="logo-size" />
      </div>

      <div className=" my-5 fs-5 fw-bold">
        {!store.message && "Log in to get your private message"}
      </div>
    </div>
  );
};
