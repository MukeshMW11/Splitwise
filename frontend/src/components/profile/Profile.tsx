"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios/axios.utils";
import ProfielHeader from "./ProfielHeader";
import ProfileContent from "./ProfileContent";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/profile/", {
        });
        console.log(response.data)
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (

<div className="p-4 min-h-screen w-full  rounded-2xl shadow-gray-400 shadow-xl hover:shadow-gray-500  transform transition-shadow duration-75">
  <ProfielHeader profile={profile}/>
  <ProfileContent profile={profile}/>
</div>

    
  );
};

export default ProfilePage;
