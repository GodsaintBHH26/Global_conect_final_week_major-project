import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";

const ProfileHeader = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);

  // local form state for editing
  const [name, setName] = useState(user?.name ?? "");
  const [headline, setHeadline] = useState(user?.headline ?? "");
  const [avatar, setAvatar] = useState(user?.avatar ?? "");
  const [banner, setBanner] = useState(user?.banner ?? "");

  const handleSave = () => {
    setUser({
      ...user,
      name: name.trim() || user.name,
      headline: headline.trim() || user.headline,
      avatar: avatar.trim() || user.avatar,
      banner: banner.trim() || user.banner,
    });
    setEditMode(false);
  };

  const handleCancel = () => {
    // reset local fields to current user values
    setName(user?.name ?? "");
    setHeadline(user?.headline ?? "");
    setAvatar(user?.avatar ?? "");
    setBanner(user?.banner ?? "");
    setEditMode(false);
  };

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
              backgroundImage: avatar ? `url(${avatar})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: avatar ? "transparent" : "var(--gc-color-secondary)",
              borderColor: "var(--gc-color-white)",
            }}
          >
            {!avatar && (user?.name ? user.name.charAt(0) : "U")}
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
              {user?.headline}
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
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full p-2 rounded border mt-1"
              style={{ borderColor: "var(--gc-color-border)" }}
            />

            <label className="block text-sm text-[var(--gc-color-heading)] mt-3">
              Avatar image URL
            </label>
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
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
