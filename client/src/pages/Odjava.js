import React from "react";

function Odjava({ user, setUser }) {

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");

    setUser();

  return (
    <div>
      
    </div>
  );
}

export default Odjava;