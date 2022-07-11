import React, { useEffect, useState } from "react";

const Favorites = () => {
  const [myfilm, setMyFilm] = useState([]);

  
    const favorites = JSON.parse(localStorage.getItem("favfilms"));
    setMyFilm(favorites);
  

  return (
    <span className="pageTitle">
      Favorites
      <div>`${myfilm}`</div>
    </span>
  );
};

export default Favorites;
