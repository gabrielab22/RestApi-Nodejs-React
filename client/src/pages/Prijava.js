import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Prijava({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const prijava = () => {
    const data = { email: email, password: password };
    axios.post("http://localhost:3001/korisnici/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      }
      else {
        sessionStorage.setItem("accessToken", response.data);
        sessionStorage.setItem("user", response.data.id_korisnika);
        console.log("accessToken", response.data)
        setUser(response.data);
        navigate(`/`);
      }
    });
  };
  return (
    <div className="prijava">
      <label>Email:</label>
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={prijava}> Prijava </button>
    </div>
  );
}

export default Prijava;