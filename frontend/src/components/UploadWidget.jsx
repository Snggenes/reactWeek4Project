import React, { useEffect, useRef } from "react";

export default function UploadWidget({setImgUrl}) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dnzvsbnp7",
        uploadPreset: "u1xw73km",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Upload successful. URL:", result.info.secure_url);
          setImgUrl(result.info.secure_url)
        } else if (error) {
          console.error("Error during upload:", error);
        }
      }
    );
  }, []);

  return (
    <button
      className="border w-full p-2"
      onClick={(e) => {
        e.preventDefault();
        widgetRef.current.open();
      }}
    >
      Upload
    </button>
  );
}
