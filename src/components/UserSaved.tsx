import { useState } from "react";
import "./UserSaved.css";

function UserSaved() {
    const [activeTab, setActiveTab] = useState("saved");

    const displaySaved = () => {
        setActiveTab("saved");
    };

    const displayLiked = () => {
        setActiveTab("liked");
    };

    return (
        <div className="saved-container">
            <div className="icons">
                <button
                    className={`saved-icon ${activeTab === "saved" ? "active" : ""}`}
                    onClick={displaySaved}>Saved</button>
                <button
                    className={`liked-icon ${activeTab === "liked" ? "active" : ""}`}
                    onClick={displayLiked}>Liked</button>
            </div>
            <div id="saved-items">
                <div className="saved" style={{ display: activeTab === "saved" ? "flex" : "none" }}>
                    <p>Saved movie #1</p>
                    <p>Saved movie #2</p>
                    <p>Saved movie #3</p>
                </div>
                <div className="liked" style={{ display: activeTab === "liked" ? "flex" : "none" }}>
                    <p>Liked movie #1</p>
                    <p>Liked movie #2</p>
                    <p>Liked movie #3</p>
                </div>
            </div>
        </div>
    );
}

export default UserSaved;
