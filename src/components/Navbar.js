import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div id="navbar">
      <h2>Private Yacht Charter</h2>
      <div className="navigation">
        <Link to="/">Home</Link>
        <Link to="/fleet">Fleet</Link>
        <Link to="/fleet/eldoris">Eldoris</Link>
      </div>
    </div>
  );
}
