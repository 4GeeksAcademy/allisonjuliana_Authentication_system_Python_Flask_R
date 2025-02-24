import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = (props) => {

  return (
    <div className="centered">
      <h1 className="display-4">
        This is your private area
      </h1>
    </div>
  );
};

Private.propTypes = {
  match: PropTypes.object,
};
