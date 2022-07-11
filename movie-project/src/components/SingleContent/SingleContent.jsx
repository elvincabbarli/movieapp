import React, { useState } from "react";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import { Badge } from "@material-ui/core";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({id,poster,title,date,media_type,vote_average,}) => {


  const favorite = (e) => {
    
      localStorage.getItem("favfilms") === "[]" ||
      !localStorage.getItem("favfilms") ? localStorage.setItem('favfilms', '[]') : localStorage.setItem("favfilms", e.target.parentElement.parentElement.childNodes[0].outerHTML);
   
    
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ContentModal media_type={media_type} id={id}>
        <Badge
          badgeContent={Math.round(vote_average)}
          color={vote_average > 6 ? "primary" : "secondary"}
        />
        <img
          className="poster"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        />
        <b className="title">{title}</b>
        <span className="subTitle">
          {media_type}
          <br /> <br />
          <span className="subTitle">Release Date: {date}</span>
        </span>
      </ContentModal>
      <div className="favbuttons">
      <button
        style={{ padding: "8px 15px", border: "none", fontSize: "16px" }}
        onClick={favorite}
        className="favorite-button"
      >
        Add Favorite
      </button>
      <button
        style={{ padding: "8px 15px", border: "none", fontSize: "16px" }}
        onClick={favorite}
        className="remove-button"
      >
        Rem Favorite
      </button>
      </div>
      
    </div>
  );
};

export default SingleContent;
