"use client";
import React, { useEffect, useState } from "react";
import { useAuthInfo } from "@/context/AuthInfo";
import { createClient } from "@/utils/supabase/client";
import WalletContent from "./WalletContent";

const supabase = createClient(); // Moved outside the component

interface FreelancerData {
  skills: string;
  age: number;
  gender: string;
}

interface EmployerData {
  companyName: string;
  website: string;
}

const ProfileContent = () => {
  const { user, role, setRole } = useAuthInfo();
  const [userData, setUserData] = useState<string | null>(null);
  const [freelancerData, setFreelancerData] = useState<FreelancerData | null>(null);
  const [employerData, setEmployerData] = useState<EmployerData | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!role && user) {
        const { data, error } = await supabase
          .from("user")
          .select("role")
          .eq("userid", user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error);
        } else if (data) {
          setRole(data.role);
        }
      }
    };

    fetchUserRole();
  }, [user, role, setRole]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        const { data, error } = await supabase.from("user").select("name").eq("userid", userData.user.id);

        if (!error && data?.length) {
          setUserData(data[0].name);
        }
      }

      if (userData?.user && role === "freelancer") {
        const { data, error } = await supabase
          .from("freelancer")
          .select("skills, age, gender")
          .eq("id", userData.user.id)
          .single();

        if (!error && data) {
          setFreelancerData(data);
        }
      } else if (userData?.user && role === "employer") {
        const { data, error } = await supabase
          .from("employer")
          .select("companyName, website")
          .eq("id", userData.user.id)
          .single();

        if (!error && data) {
          setEmployerData(data);
        }
      }
    };

    fetchProfileData();
  }, [user, role]);

  return (
    <div>
      {userData && <h1>Welcome {userData}</h1>}
      {user ? (
        role === "freelancer" ? (
          freelancerData ? (
            <div>
              <p>Skills: {freelancerData.skills}</p>
              <p>Age: {freelancerData.age}</p>
              <p>Gender: {freelancerData.gender}</p>
            </div>
          ) : (
            <p>Fetching freelancer data...</p>
          )
        ) : role === "employer" ? (
          employerData ? (
            <div>
              <p>Company Name: {employerData.companyName}</p>
              <p>Website: {employerData.website}</p>
            </div>
          ) : (
            <p>Fetching employer data...</p>
          )
        ) : (
          <p>Role not found</p>
        )
      ) : (
        <p>No user found</p>
      )}

      <WalletContent />
    </div>
  );
};

export default ProfileContent;
