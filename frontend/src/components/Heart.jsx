import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext.jsx";

export default function Heart({ id }) {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (user) {
      if (user.favourites.includes(id)) {
        setImageSrc("/heart-solid.svg");
      } else {
        setImageSrc("/heart-regular.svg");
      }
    }
  }, [user, id]);

  const [imageSrc, setImageSrc] = useState("/heart-regular.svg");

  const handleClick = async () => {
    const response = await fetch(
      `http://localhost:8080/favourites/${user._id}/${id}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();

    setUser(data.user);
  };

  if (!user) {
    return null;
  }

  return (
    <img
      src={imageSrc}
      className="h-6 ml-auto cursor-pointer"
      onClick={handleClick}
    />
  );
}
