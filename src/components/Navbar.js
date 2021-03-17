import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Portfolio } from "../context";

export default function Navbar() {
  const {
    dimensions: { width },
  } = useContext(Portfolio);
  return (
    <div id="navbar">
      <h2>{width < 620 ? "PYC" : "Private Yacht Charter"}</h2>
      <div className="navigation">
        <Link to="/">Home</Link>
        <Link to="/fleet">Fleet</Link>
        <Link to="/fleet/eldoris">Eldoris</Link>
      </div>
    </div>
  );
}
