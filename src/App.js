import "./App.css";
import React, { useState } from "react";

function App() {
  const [popUp, setPopUp] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [addGroup, setAddGroup] = useState(null);
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];
  const popupScreen = (e) => {
    setPopUp(!popUp);
  };

  return (
    <div className="App">
      <div className="group-page">
        <p>Pocket Notes</p>
        <button onClick={popupScreen}>+ Create Notes group</button>
      </div>
      {popUp && (
        <div className="popup">
          <div className="popup-screen" onClick={popupScreen}></div>

          <div className="popup-content">
            <p>Create New Notes group</p>
            <form className="input-group">
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
      <div className="notes-section"></div>
    </div>
  );
}

export default App;
