import React, { useState } from "react";
import axios from "axios";
import { AvatarCreator, AvatarExportedEvent } from "@readyplayerme/react-avatar-creator";
import "./ProfileImageChanger.css"; // Import the CSS for styling

const ProfileImageChanger = ({ user, onProfileImageChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarMode, setIsAvatarMode] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleUploadProfileImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);

    const apiKey = "d03c2e0e7d4babe62e433e574eddea22";

    axios
      .post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData)
      .then((res) => {
        const url = res.data.data.display_url;
        const userProfileImage = {
          email: user?.email,
          profileImage: url,
        };

        fetch(`http://localhost:5000/userupdate/${user?.email}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userProfileImage),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Profile updated successfully:", data);
            onProfileImageChange(url); // Pass new image URL to parent
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Error updating profile:", err);
            alert("Error updating profile!");
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
        alert("Error uploading image!");
        setIsLoading(false);
      });
  };

  const handleAvatarExported = (event) => {
    const url = event.data.url;
    setAvatarUrl(url);
    const userProfileImage = {
      email: user?.email,
      profileImage: url,
    };

    fetch(`http://localhost:5000/userupdate/${user?.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userProfileImage),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile updated with avatar successfully:", data);
        onProfileImageChange(url); // Pass new avatar URL to parent
      })
      .catch((err) => {
        console.error("Error updating profile with avatar:", err);
        alert("Error updating profile!");
      });
  };

  return (
    <div className="profile-image-changer">
      {!isAvatarMode && (
        <div className="options">
          <button onClick={() => setIsAvatarMode(false)}>Upload Image</button>
          <button onClick={() => setIsAvatarMode(true)}>Create Avatar</button>
        </div>
      )}

      {isAvatarMode ? (
        <div className="avatar-creator">
          <h3>Create Your Avatar</h3>
          <AvatarCreator
            subdomain="demo"
            config={{
              clearCache: true,
              bodyType: "fullbody",
              quickStart: false,
              language: "en",
            }}
            style={{ width: "100%", height: "600px", border: "none" }}
            onAvatarExported={handleAvatarExported}
          />
          {avatarUrl && <img src={avatarUrl} alt="Avatar Preview" className="avatar-preview" />}
        </div>
      ) : (
        <div className="upload-image">
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadProfileImage}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="change-button">
            Upload Image
          </label>
        </div>
      )}

      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default ProfileImageChanger;
