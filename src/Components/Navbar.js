import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="navbar flex gap-6 text-[3vw] md:text-[1vw] md:px-10   px-1 py-3 sticky top-0 font-semibold text-slate-300  bg-slate-800">
      <Link className="navItem" to="/">
        Home
      </Link>
      <Link className="navItem" to="/AllBooks">
        All Books
      </Link>
      <Link className="navItem" to="/AllAthors">
        All Authors
      </Link>
    </div>
  );
}
