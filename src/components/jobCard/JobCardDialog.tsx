"use client";
import React, { useEffect, useRef, useCallback } from "react";

interface JobCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  skills: string;
  employer: string;
  description?: string;
}

const JobCardDialog: React.FC<JobCardDialogProps> = ({
  isOpen,
  onClose,
  title,
  skills,
  employer,
  description,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, handleClickOutside]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div
        ref={dialogRef}
        className="bg-white p-16 rounded-xl shadow-lg max-w-xl items-center justify-center text-center"
      >
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <p className="text-lg">{description}</p>
        <div className="flex flex-row justify-between mt-8">
          <p className="text-md">Skills: {skills}</p>
          <p className="text-md">Employer: {employer}</p>
        </div>
        <div className="relative w-[75%] mx-auto flex flex-row justify-between mt-8">
          <button
            onClick={() => {
              console.log("Apply button clicked");
            }}
            className="mt-4 bg-green-800 text-white py-2 px-4 rounded-lg font-bold"
          >
            Apply
          </button>
          <button
            onClick={() => {
              console.log("Close button clicked");
              onClose();
            }}
            className="mt-4 bg-red-800 text-white py-2 px-4 rounded-lg font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCardDialog;
