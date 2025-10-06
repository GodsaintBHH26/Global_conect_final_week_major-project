import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { useAuth } from "../../../context/AuthContext";
import API from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import importedBanner from '../../../assets/banner.jpeg';
import user1 from '../../../assets/user.png';
const ProfileHeader = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();



  // Placeholder URLs for robust loading
  const DEFAULT_AVATAR_URL = user1;
 const DEFAULT_BANNER_URL = importedBanner;


  // local form state for editing
  const [name, setName] = useState(user?.name ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [image, setImage] = useState(user?.image ?? DEFAULT_AVATAR_URL);
  const [banner, setBanner] = useState(user?.banner ?? DEFAULT_BANNER_URL);

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
    setImage(user?.image ?? DEFAULT_AVATAR_URL);
    setBanner(user?.banner ?? DEFAULT_BANNER_URL);
    setEditMode(false);
  };

  const handleLogout = ()=>{
    auth.logout();

     navigate('/login');
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
  }, [auth.loading, auth.user,  navigate, setUser])

  const bannerStyle = banner
    ? { backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: "linear-gradient(90deg, var(--gc-color-primary), rgba(130,36,227,0.7))" };

  return (
    <div className="gc-card" style={{ padding: "1.5rem" }}>
      {/* Banner */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ height: 180, borderRadius: '0.5rem', overflow: 'hidden', ...bannerStyle, margin: "-1.5rem -1.5rem 0 -1.5rem" }}
      />

      {/* Profile row (Avatar, Name, Buttons) */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: '-64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Avatar */}
          <div
            style={{
              width: '7rem', /* w-28 */
              height: '7rem', /* h-28 */
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              font : 'none',
              border: '4px solid',
              backgroundImage: `url(${image})`, 
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "var(--gc-color-secondary)", 
              borderColor: "var(--gc-color-white)", 
            }}
          >
            {image === DEFAULT_AVATAR_URL } 
          </div>

          {/* Name & Headline */}
          <div style={{ marginTop: "60px" }}>
            <h2
              style={{ fontSize: '1.5rem', fontWeight: 600, color: "var(--gc-color-heading)" }}
            >
              {user?.name}
            </h2>
            <p style={{ color: "var(--gc-color-text-muted)" }}>
              {user?.bio || user?.headline} 
            </p>
          </div>
        </div>
        
         {/* Edit & Logout buttons */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: "1rem", gap: '0.5rem' }}>
        {!editMode ? (
          <>
            <button
              onClick={() => setEditMode(true)}
              className="gc-btn-reset px-3 py-1 text-sm rounded"
              style={{ cursor: 'pointer', color: 'var(--gc-color-primary)', border: '1px solid var(--gc-color-primary)', fontWeight: 600 }}
            >
              Edit profile
            </button>
            <button
              onClick={handleLogout}
              className="gc-btn-reset px-3 py-1 text-sm rounded"
              style={{ cursor: 'pointer', color: 'var(--gc-color-error)', border: '1px solid var(--gc-color-error)', fontWeight: 600 }}
            >
              Logout
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleSave}
              className="gc-btn-primary px-3 py-1 text-sm rounded"
              style={{ cursor: 'pointer' }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="gc-btn-reset px-3 py-1 text-sm rounded"
              style={{ cursor: 'pointer', color: 'var(--gc-color-anchor)', border: '1px solid var(--gc-color-border)' }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>

      {/* Stats & optional edit form */}
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        {/* Stats */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', borderRight: '1px solid var(--gc-color-border)', paddingRight: '1.5rem' }}>
          <div
            style={{ fontSize: '0.875rem', color: "var(--gc-color-text-muted)", cursor: 'pointer', padding:'1rem' }}
          >
            <div>Profile viewers</div>
            <div
              style={{ fontWeight: 600, color: "var(--gc-color-primary)" }}
            >
              {user?.profileViews}
            </div>
          </div>
          <div
            style={{ fontSize: '0.875rem', color: "var(--gc-color-text-muted)", cursor: 'pointer', padding:'1rem' }}
          >
            <div>Post impressions</div>
            <div
              style={{ fontWeight: 600, color: "var(--gc-color-primary)" }}
            >
              {user?.postImpressions}
            </div>
          </div>
        </div>

        {/* Inline Edit Form - FIX 2: Using fluid width */}
        {editMode && (
          <div
            style={{ 
                width: '100%', /* Ensure it takes full available space in the column */
                maxWidth: '650px', /* Set a reasonable maximum width */
                backgroundColor: 'var(--gc-color-white)', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                border: "1px solid var(--gc-color-border)", 
                marginTop: '1rem' 
            }}
          >
            {/* All inputs need branded focus ring */}
            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gc-color-heading)' }}>
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ borderColor: "var(--gc-color-border)", outlineColor: "var(--gc-color-primary)", width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid', marginTop: '0.25rem' }}
            />
            
            {/* Headline Input */}
            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gc-color-heading)', marginTop: '0.75rem' }}>
              Headline
            </label>
            <input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ borderColor: "var(--gc-color-border)", outlineColor: "var(--gc-color-primary)", width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid', marginTop: '0.25rem' }}
            />

            {/* Avatar URL Input */}
            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gc-color-heading)', marginTop: '0.75rem' }}>
              Avatar image URL
            </label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{ borderColor: "var(--gc-color-border)", outlineColor: "var(--gc-color-primary)", width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid', marginTop: '0.25rem' }}
              placeholder="https://..."
            />

            {/* Banner URL Input */}
            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--gc-color-heading)', marginTop: '0.75rem' }}>
              Banner image URL
            </label>
            <input
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
              style={{ borderColor: "var(--gc-color-border)", outlineColor: "var(--gc-color-primary)", width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid', marginTop: '0.25rem' }}
              placeholder="https://..."
            />
            
            <div style={{ fontSize: '0.75rem', color: "var(--gc-color-text-muted)", marginTop: '0.5rem' }}>
              Tip: use an external image URL or hook up an uploader later.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;