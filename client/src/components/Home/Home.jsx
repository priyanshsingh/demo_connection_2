import React from 'react';
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <>
        <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ marginTop: "20px", fontSize:'1rem' }}
            >
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li>
              <br />
              <br />

              <li className="nav-item">
                <Link className="nav-link" to="signup">
                  Register
                </Link>
                <br />
              </li>
              
            </ul>
    </>
  )
}
