import "./App.css";
import React, { useState } from "react";
import Notes from "./Advanced-Notes.png";
import Lock from "./Lock.png";
function App() {
  const [popUp, setPopUp] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [groupNames, setGroupNames] = useState([]);
  const [groupColors, setGroupColors] = useState([]);
  const [newPage, setNewPage] = useState(null);
  const [staticPage, setStaticPage] = useState(null);

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];
  const popupScreen = () => {
    setPopUp(!popUp);
  };
  const handleGroup = (e) => {
    e.preventDefault();
    if (groupName && selectedColor) {
      setGroupNames([...groupNames, groupName]);
      setGroupColors([...groupColors, selectedColor]);
      setGroupName("");
      setSelectedColor("");
      setPopUp(false);
    }
  };
  const checkColour = (color) => {
    setSelectedColor(color);
  };
  const notesPage = () => {};

  return (
    <div className="App">
      <div className="group-page">
        <p>Pocket Notes</p>
        <button onClick={popupScreen}>+ Create Notes group</button>
        <div className="selected-groups" onClick={notesPage}>
          {groupNames.map((name, index) => (
            <div key={index} className="group">
              <div
                className="group-icon"
                style={{ backgroundColor: groupColors[index] }}
              >
                <p>{name.slice(0, 2).toUpperCase()}</p>
              </div>
              <p id="group-name">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {popUp && (
        <div className="popup">
          <div className="popup-screen" onClick={popupScreen}></div>

          <div className="popup-content">
            <p>Create New Notes group</p>
            <form className="input-group" onSubmit={handleGroup}>
              <label>Group Name</label>
              <input
                placeholder="Enter your group name...."
                onChange={(e) => setGroupName(e.target.value)}
                value={groupName}
                required
              ></input>
              <div className="choose-colors">
                <p>Choose colour</p>
                {colors.map((color, idx) => (
                  <div
                    onClick={() => checkColour(color)}
                    className="display-colors"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
              <button className="create-folder">Create</button>
            </form>
          </div>
        </div>
      )}
      <div className="notes-section">
        <div className="notes-page"></div>
        {staticPage && (
          <div>
            <div className="main-page">
              <img src={Notes} />
              <p className="pocket-notes">Pocket Notes</p>
              <p>
                Send and receive messages without keeping your phone online.
              </p>
              <p>
                {" "}
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
            </div>
            <div className="encryption">
              <img src={Lock} height={21} width={17} />
              <p>end-to-end encrypted</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
