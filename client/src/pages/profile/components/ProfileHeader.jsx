import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { useAuth } from "../../../context/AuthContext";
import API from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  // local form state for editing
  const [name, setName] = useState(user?.name ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [image, setImage] = useState(user?.image ?? "");
  const [banner, setBanner] = useState(user?.banner ?? "");

  const handleSave = () => {
    setUser({
      ...user,
      name: name.trim() || user.name,
      bio: bio.trim() || user.bio,
      image: image.trim() || user.image,
      banner: banner.trim() || user.banner,
    });
    
    setEditMode(false);
  };

  const handleCancel = () => {
    // reset local fields to current user values
    setName(user?.name ?? "");
    setBio(user?.bio ?? "");
    setImage(user?.image ?? "");
    setBanner(user?.banner ?? "");
    setEditMode(false);
  };

  const handleLogout = ()=>{
    auth.logout();
  }

  const fetchUserData = async ()=>{
    const userData = await API.get(`/user/${auth.user?.uid}`)
    console.log(userData.data);
    setUser(userData.data);
  }

  useEffect(()=>{
    if(!auth.loading){
      if(!auth.user) navigate('/login')
    }
    fetchUserData();
  }, [auth.loading, auth.user])

  const bannerStyle = banner
    ? { backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: "linear-gradient(90deg, var(--gc-color-primary), rgba(130,36,227,0.7))" };

  return (
    <div>
      {/* Banner */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ height: 120, ...bannerStyle }}
      />

      {/* Profile row */}
      <div className="flex items-start justify-between mt-[-40px]">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4"
            style={{
              backgroundImage: image ? `url(${image})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: image ? "transparent" : "var(--gc-color-secondary)",
              borderColor: "var(--gc-color-white)",
            }}
          >
            {!image && (user?.name ? user.name.charAt(0) : "U")}
          </div>

          {/* Name & Headline */}
          <div>
            <h2
              className="text-2xl font-semibold"
              style={{ color: "var(--gc-color-heading)" }}
            >
              {user?.name}
            </h2>
            <p className="text-[var(--gc-color-text-muted)]">
              {user?.bio}
            </p>
          </div>
        </div>

        {/* Edit button */}
        <div className="flex items-center">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 rounded shadow text-sm"
              style={{
                backgroundColor: "var(--gc-color-white)",
                color: "var(--gc-color-primary)",
                border: "1px solid var(--gc-color-border)",
              }}
            >
              Edit profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded text-sm"
                style={{
                  backgroundColor: "var(--gc-color-primary)",
                  color: "var(--gc-color-white)",
                }}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded text-sm"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--gc-color-anchor)",
                  border: "1px solid var(--gc-color-border)",
                }}
              >
                Cancel
              </button>
            </div>
          )}
          
        </div>
        <div>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Stats & optional edit form */}
      <div className="mt-4 flex gap-6 items-start">
        {/* Stats */}
        <div className="flex gap-6 items-center">
          <div
            className="text-sm"
            style={{ color: "var(--gc-color-text-muted)" }}
          >
            <div>Profile viewers</div>
            <div
              className="font-semibold"
              style={{ color: "var(--gc-color-primary)" }}
            >
              {user?.profileViews}
            </div>
          </div>
          <div
            className="text-sm"
            style={{ color: "var(--gc-color-text-muted)" }}
          >
            <div>Post impressions</div>
            <div
              className="font-semibold"
              style={{ color: "var(--gc-color-primary)" }}
            >
              {user?.postImpressions}
            </div>
          </div>
        </div>

        {/* Inline Edit Form */}
        {editMode && (
          <div
            className="ml-6 w-full max-w-xl bg-[var(--gc-color-white)] p-4 rounded"
            style={{ border: "1px solid var(--gc-color-border)" }}
          >
            <label className="block text-sm text-[var(--gc-color-heading)]">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded border mt-1"
              style={{ borderColor: "var(--gc-color-border)" }}
            />

            <label className="block text-sm text-[var(--gc-color-heading)] mt-3">
              Headline
            </label>
            <input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 rounded border mt-1"
              style={{ borderColor: "var(--gc-color-border)" }}
            />

            <label className="block text-sm text-[var(--gc-color-heading)] mt-3">
              Avatar image URL
            </label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 rounded border mt-1"
              style={{ borderColor: "var(--gc-color-border)" }}
              placeholder="https://..."
            />

            <label className="block text-sm text-[var(--gc-color-heading)] mt-3">
              Banner image URL
            </label>
            <input
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
              className="w-full p-2 rounded border mt-1"
              style={{ borderColor: "var(--gc-color-border)" }}
              placeholder="https://..."
            />
            <div className="text-xs text-[var(--gc-color-text-muted)] mt-2">
              Tip: use an external image URL or hook up an uploader later.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
