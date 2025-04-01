"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { createClient } from "@/utils/supabase/client";
import NavLink from "@/components/navigation/NavLink";
import { useAuthInfo } from "@/context/AuthInfo";
import { User } from "@supabase/supabase-js";


const NavBar = () => {
  const supabase = createClient();
  const { user, setUser, role, setRole } = useAuthInfo();
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleSignInClick = () => {
    supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const handleSignOutClick = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      return;
    }
    setUser(null);
    router.push("/");
  };

  const checkUserProfile = useCallback(
    async (userId: string, user: User | null) => {
      if (!user) return;
  
      try {
        const { data, error } = await supabase
          .from("user")
          .select("profileCompleted")
          .eq("userid", userId)
          .single();
  
        if (error && error.code === "PGRST116") {
          const { error: insertError } = await supabase.from("user").insert([
            {
              userid: user.id,
              name: user.user_metadata.full_name,
              email: user.email,
              role: "",
              profileCompleted: false,
            },
          ]);
  
          if (insertError) {
            console.error("Error inserting user:", insertError.message);
          }
        } else if (data && !data.profileCompleted) {
          router.push("/completeProfile");
        } else if (data && data.profileCompleted) {
          const { data: roleData, error: roleError } = await supabase
            .from("user")
            .select("role")
            .eq("userid", userId)
            .single();
  
          if (roleError) {
            console.error("Error fetching role:", roleError.message);
            return;
          }
  
          if (roleData && roleData.role) {
            setRole(roleData.role);
          }
        }
      } catch (err) {
        console.error("Unexpected error in checkUserProfile:", err);
      }
    },
    [router, supabase, setRole]
  );
  
  useEffect(() => {
    if (user) {
      checkUserProfile(user.id, user).catch((err) =>
        console.error("Error in useEffect:", err)
      );
    }
  }, [user, checkUserProfile]);
  

  return (
    <div className="flex flex-row z-20 justify-between w-full items-center px-12 py-4">
      <div className="flex items-center">
        <a href="/" className="flex items-center space-x-2">
          <span className="self-center text-xl font-black whitespace-nowrap">
            FirstCheque 
          </span>
          <span className="self-center text-sm font-medium">
            Kartik Bhargava (23BAI1320),Web Programming,2025,Cse(Ai and Ml)
          </span>
        </a>
      </div>

      <div>
        <NavLink user={user} role={role ?? ""} />
      </div>

      <div>
        {user ? (
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleProfileClick} text="Profile" />
            <Button
              onClick={handleSignOutClick}
              className="bg-red-900"
              text="Logout"
            />
          </div>
        ) : (
          <Button onClick={handleSignInClick} text="Login" />
        )}
      </div>
    </div>
  );
};

export default NavBar;
