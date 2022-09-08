import React, { useState } from "react";
import axios from "axios";

function Prijava() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const prijava = () => {
    const data = { email: email, password: password };
    axios.post("http://localhost:3001/korisnici/login", data).then((response) => {
      console.log(response.data);
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