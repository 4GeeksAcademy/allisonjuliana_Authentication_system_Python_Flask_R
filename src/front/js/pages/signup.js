import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/home.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  console.log("this is your token", store.token);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      actions.setRegistrationEmpty(true);
      window.location.reload();
      window.location.href = "/signup";
      return;
    }

    actions.setRegistrationInProgress(true);
    try {
      const registrationSuccess = await actions.register(email, password);

      actions.setRegistrationInProgress(false);
      if (registrationSuccess) {
        actions.setRegistrationSuccess(true);
        navigate("/login");
      } else {
        actions.setRegistrationExists(true);
      }
    } catch (error) {
      actions.setRegistrationExists(true);
      actions.setRegistrationInProgress(false);
    }
  };

  return (
    <div className="text-center mt-6 home_max-width container">
      {!store.registrationSuccess && <h1>Create account</h1>}

      {store.registrationEmpty && (
        <div className="fs-3">
          Email and password are required.
          <br />
          Try again!
        </div>
      )}

      {store.registrationExists && (
        <div className="fs-3">
          Sorry!
          <br />
          That user already exists!
        </div>
      )}

      {store.registrationSuccess && (
        <div className="fs-3">
          You are successfully registered!
          <br />
          Now you'll be redirected so you can <b>log in</b>!
        </div>
      )}

      <div>
        <form onSubmit={handleClick}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mt-3"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mt-3"
          />
          <button
            type="submit"
            className="btn btn-primary mt-5"
            disabled={store.registrationInProgress}
          >
            Sign up
          </button>
        </form>
        <p className="mt-3 mb-5">
          You already have an account? <Link to="/login"> Log In then </Link>
        </p>
      </div>
    </div>
  );
};
