import "./App.css";
import React, { useState, useEffect } from "react";
import addtext from "./addtext.png";
import Notes from "./components/Notes";
function App() {
  const [popUp, setPopUp] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [groupNames, setGroupNames] = useState([]);
  const [groupColors, setGroupColors] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [staticPage, setStaticPage] = useState(true);
  const [groupTexts, setGroupTexts] = useState({});

  const [newText, setNewText] = useState("");
  useEffect(() => {
    const savedGroups = localStorage.getItem("groups");

    if (savedGroups) {
      const parsedGroups = JSON.parse(savedGroups);
      setGroupNames(parsedGroups.groupNames || []);
      setGroupColors(parsedGroups.groupColors || []);
      setGroupTexts(parsedGroups.groupTexts || {});
    }
  }, []);

  const saveGroupsToLocalStorage = () => {
    const groupsToSave = {
      groupNames,
      groupColors,
      groupTexts,
    };

    localStorage.setItem("groups", JSON.stringify(groupsToSave));
  };
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
      const updatedGroupTexts = { ...groupTexts };
      updatedGroupTexts[groupName] = [];
      setGroupNames([...groupNames, groupName]);
      setGroupColors([...groupColors, selectedColor]);
      setGroupTexts(updatedGroupTexts);
      setGroupName("");
      setSelectedColor("");
      setPopUp(false);

      saveGroupsToLocalStorage();
    }
  };
  const checkColour = (color) => {
    setSelectedColor(color);
  };
  const notesPage = (index) => {
    setSelectedGroup(index);
    setStaticPage(false);
  };
  const handleTextChange = (text, groupName) => {
    setNewText(text);
  };
  const handleAddNotes = (e) => {
    e.preventDefault();
    if (selectedGroup !== null && newText.trim() !== "") {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const day = now.getDate();
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      const date = `${day} ${month} ${year}`;

      const newNote = {
        text: newText,
        time: time,
        date: date,
      };

      setGroupTexts({
        ...groupTexts,
        [groupNames[selectedGroup]]: [
          ...groupTexts[groupNames[selectedGroup]],
          newNote,
        ],
      });
      setNewText("");
      saveGroupsToLocalStorage();
    }
  };
  return (
    <div className="App">
      <div className="group-page">
        <p>Pocket Notes</p>
        <button onClick={popupScreen}>+ Create Notes group</button>
        <div className="selected-groups">
          {groupNames.map((name, index) => (
            <div key={index} className="group" onClick={() => notesPage(index)}>
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
        <Notes notesPage={notesPage} staticPage={staticPage} />

        {selectedGroup !== null && (
          <div className="notes-page">
            <div className="main-group">
              <div
                className="main-icon"
                style={{ backgroundColor: groupColors[selectedGroup] }}
              >
                <p>{groupNames[selectedGroup].slice(0, 2).toUpperCase()}</p>
              </div>
              <p id="main-name">{groupNames[selectedGroup]}</p>
            </div>
            <div className="saved-notes">
              {groupTexts[groupNames[selectedGroup]].map((note, index) => (
                <div className="added-notes" key={index}>
                  <div className="Date-time">
                    <p>{note.time}</p>
                    <p>{note.date}</p>
                  </div>
                  <div className="text">
                    <p>{note.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="write-text">
              <form onSubmit={handleAddNotes}>
                <textarea
                  value={newText}
                  onChange={(e) =>
                    handleTextChange(e.target.value, groupNames[selectedGroup])
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddNotes(e);
                    }
                  }}
                  className="add-text"
                  placeholder="Enter your text here....."
                ></textarea>
                <button className="add-notes">
                  <img id="add-button" src={addtext} alt="" />
                </button>
              </form>
            </div>
            <div className="nothing"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
