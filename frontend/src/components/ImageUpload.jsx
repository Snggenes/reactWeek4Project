import React, { useState } from "react";
import UploadWidget from "./UploadWidget";

export default function ImageUpload({ setImgUrl }) {
  return (
    <form onSubmit={() => {}}>
      <UploadWidget setImgUrl={setImgUrl} />
    </form>
  );
}
