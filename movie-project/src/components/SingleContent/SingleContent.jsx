import React , {useContext} from "react";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart , faHeartCircleXmark} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../store/auth-context";

const SingleContent = ({id,poster,title,date,media_type,vote_average,setLocalStorage,removeLocalrstorage}) => {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  return (
    <div
      style={{
        display: "inline-block",
        flexDirection: "column",
        position: "relative",
        marginBottom: "20px",
      }}
      className="singlecontent-container"
    >
      <div className="badge">⭐{Math.round(vote_average)}</div>
      {isLoggedIn &&       <button className="fav-button" onClick={() => setLocalStorage(id)}>
        <FontAwesomeIcon icon={faHeart} />
      </button> }

      {isLoggedIn &&        <button className="remove-fav" onClick={() => removeLocalrstorage(id)}>
        <FontAwesomeIcon icon={faHeartCircleXmark} />
      </button>}



      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <ContentModal media_type={media_type} id={id}>
        <b className="title">{title}</b>
        <span className="subTitle">
          {media_type}
          <br /> <br />
          <span className="subTitle">Release Date: {date}</span>
        </span>
      </ContentModal>
    </div>
  );
};

export default SingleContent;
