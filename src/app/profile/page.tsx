"use client";
import ProfileContent from "@/components/profileComponents/ProfileContent"
import ProjectContent from "@/components/profileComponents/ProjectContent";
import React from "react";
import { useState } from "react";



const Profile = () => {
  const [option, setOption] = useState<string>('Profile');

  const renderContent = () => {
    switch (option) {
      case 'Profile':
        return  <ProfileContent/>;
      case 'Projects':
        return <ProjectContent/>;
      
      default:
        return <div>Here is an overview of your profile</div>;
    }
  };

  return (
  <div className="flex justify-center items-center  min-h-screen">
     <div className="w-[85vw] h-[88vh] flex bg-stone-950 rounded-md">
      <div className="w-1/4 p-8  ">
      <p className="text-lg text-gray-200">FirstCheque</p>
      
      <div className="mt-10">
        <p className="text-md text-gray-600 pb-6">Menu</p>
        <ul className="text-xs text-gray-400 ">
          <li className={`pb-4 cursor-pointer hover:text-white ${option === 'Profile'? 'text-white':null }`} 
            onClick={()=> setOption('Profile')}> 
              Profile
          </li>
          <li className={`pb-4 cursor-pointer hover:text-white ${option === 'Projects'? 'text-white':null}`} 
            onClick={()=> setOption('Projects')}>
              Projects
          </li>
          
        </ul>
        <p className="text-md text-gray-500 mt-10 pb-6">Account settings</p>
        <ul className="text-xs text-gray-400 ">
        
        <li className="pb-4 cursor-pointer hover:text-white" 
            onClick={()=> console.log("handle logout")}> 
              Logout
        </li>
        </ul>
      </div>
      </div>
      <div className="w-3/4 text-gray-300 text-sm p-12">{renderContent()}</div>
      </div> 
    </div>
    );
};

export default Profile;
