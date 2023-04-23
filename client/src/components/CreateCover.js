import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function CreateCover() {
  const [fileInputState, setFileInputChange] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  let authState = Cookies.get("_auth_state");
  let email = JSON.parse(authState).email;

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewFile) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const response = await fetch(
        `http://localhost:4838/addCover/Title/${title}/${email}`,
        {
          method: "POST",
          body: JSON.stringify({ data: base64EncodedImage }),
          headers: { "Content-type": "application/json" },
        }
      );
      console.log(response);
      navigate("/finalCover");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmitFile}>
        <input
          type="text"
          name="albumName"
          id=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        <button className="cover-submit">add cover Art</button>
      </form>
      {previewSource && (
        <img
          src={previewSource}
          alt=""
          style={{ height: "300px", width: "300px" }}
        />
      )}
    </div>
  );
}

export default CreateCover;
