import React, { useState, useEffect } from "react";
import Post from "../Posts/posts";
import { useNavigate } from "react-router-dom";
import "./Mainprofile.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import LockResetIcon from "@mui/icons-material/LockReset";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Editprofile from "../Editprofile/Editprofile";
import axios from "axios";
import useLoggedinuser from "../../../hooks/useLoggedinuser";

const Mainprofile = ({ user }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedinuser] = useLoggedinuser();
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const username = user?.email?.split("@")[0];
  const [post, setPost] = useState([]);

  // Fetch user posts
  useEffect(() => {
    fetch(`http://localhost:5000/userpost?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
      });
  }, [user.email]);

  // Upload cover image
  const handleUploadCoverImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=d03c2e0e7d4babe62e433e574eddea22",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        const userCoverImage = { email: user?.email, coverimage: url };
        setIsLoading(false);
        if (url) {
          fetch(`http://localhost:5000/userupdate/${user?.email}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userCoverImage),
          });
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  // Upload profile image
  const handleUploadProfileImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=d03c2e0e7d4babe62e433e574eddea22",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        const userProfileImage = { email: user?.email, profileImage: url };
        setIsLoading(false);
        if (url) {
          fetch(`http://localhost:5000/userupdate/${user?.email}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userProfileImage),
          });
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  // Fetch avatars from API (RoboHash for demonstration)
  const fetchAvatars = () => {
    const avatarBaseUrl = "https://robohash.org/";
    const avatarSets = ["set1", "set2", "set3", "set4", "set5"];
    const generatedAvatars = avatarSets.map(
      (set) => `${avatarBaseUrl}${user?.email}?set=${set}&size=100x100`
    );
    setAvatars(generatedAvatars);
    setShowAvatarPicker(true);
  };

  // Select avatar as profile picture
  const handleAvatarSelection = (avatarUrl) => {
    const userAvatar = { email: user?.email, profileImage: avatarUrl };
    fetch(`http://localhost:5000/userupdate/${user?.email}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userAvatar),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Avatar updated successfully!");
        setShowAvatarPicker(false);
      });
  };

  return (
    <div>
      <ArrowBackIcon className="arrow-icon" onClick={() => navigate("/")} />
      <h4 className="heading-4">{username}</h4>
      <div className="mainprofile">
        <div className="profile-bio">
          <div>
            <div className="coverImageContainer">
              <img
                src={
                  loggedinuser[0]?.coverimage
                    ? loggedinuser[0].coverimage
                    : user?.photoURL
                }
                alt="Cover"
                className="coverImage"
              />
              <div className="hoverCoverImage">
                <label htmlFor="coverImageInput" className="imageIcon">
                  <CenterFocusWeakIcon className="photoIcon" />
                </label>
                <input
                  type="file"
                  id="coverImageInput"
                  className="imageInput"
                  onChange={handleUploadCoverImage}
                />
              </div>
            </div>

            <div className="avatar-img">
              <div className="avatarContainer">
                <img
                  src={
                    loggedinuser[0]?.profileImage
                      ? loggedinuser[0].profileImage
                      : user?.photoURL
                  }
                  alt="Profile"
                  className="avatar"
                />
                <div className="hoverAvatarImage">
                  <label htmlFor="profileImageInput" className="imageIcon">
                    <CenterFocusWeakIcon className="photoIcon" />
                  </label>
                  <input
                    type="file"
                    id="profileImageInput"
                    className="imageInput"
                    onChange={handleUploadProfileImage}
                  />
                </div>
              </div>
              <button className="selectAvatarButton" onClick={fetchAvatars}>
                Select Avatar
              </button>
              {showAvatarPicker && (
                <div className="avatarPicker">
                  {avatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt="Avatar Option"
                      className="avatarOption"
                      onClick={() => handleAvatarSelection(avatar)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="userInfo">
              <h3 className="heading-3">
                {loggedinuser[0]?.name || user?.displayName}
              </h3>
              <p className="usernameSection">@{username}</p>
              <Editprofile user={user} loggedinuser={loggedinuser} />
            </div>

            <h4 className="tweetsText">Tweets</h4>
            <hr />
            {post.map((p) => (
              <Post key={p._id} p={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainprofile;
