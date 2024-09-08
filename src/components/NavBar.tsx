"use client";
import React from "react";
import NavLink from "./NavLink";
import { useRouter } from "next/navigation";
import LoginButton from "./LoginButton";

const NavBar = () => {
  const user = false;
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <div className="flex fixed flex-row z-20 justify-between bg-white w-full items-center px-12 py-4">
      <div className="flex items-center space-x-8">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#27272a"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
            />
          </svg>
          <span className="self-center text-xl font-bold font-stone-900 whitespace-nowrap">
            FirstCheque
          </span>
        </a>
      </div>

      <div>
        <NavLink />
      </div>

      <div>
        {user ? (
          <div
            onClick={handleProfileClick}
            className="w-32 flex justify-end hover:cursor-pointer"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>{" "}
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
};

export default NavBar;
