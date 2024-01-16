import React from "react";

export default function Empty({title, subtitle}) {
  return (
    <div className="h-[60vh] w-screen flex flex-col gap-1 justify-center items-center">
      <h1 className="text-2xl font-bold pl-5">{title}</h1>
        <h1 className="font-light text-neutral-500 pl-6">{subtitle}</h1>
    </div>
  );
}
