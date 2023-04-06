import React from "react";

const ItemTop = ({ top, onClickDetail, scrollToView }) => {
  return (
    <div className="imageTop" onClick={scrollToView}>
      <img
        onClick={() => onClickDetail(top.id)}
        style={{ margin: "10px 10px 0px", width: " 200px" }}
        src={"https://image.tmdb.org/t/p/w200/" + top.backdrop_path}
      />
    </div>
  );
};

export default ItemTop;
