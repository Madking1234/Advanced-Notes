import React from "react";
import Image from "./Advanced-Notes.png";
import Lock from "./Lock.png";
import "./Notes.css";
function Notes({ staticPage }) {
  return (
    <div>
      {staticPage && (
        <div>
          <div className="main-page">
            <img src={Image} alt="" />
            <p className="pocket-notes">Pocket Notes</p>
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          </div>
          <div className="encryption">
            <img src={Lock} height={21} width={17} alt="" />
            <p>end-to-end encrypted</p>
          </div>
        </div>
      )}
    </div>
  );
}
// added alt
export default Notes;
