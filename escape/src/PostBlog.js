import React, { useState, useEffect } from "react";
import axios from "axios";
import "./postBlog.css";
import Swal from "sweetalert2";

function PostBlog(props) {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  // const [submit, setSubmit] = useState({
  //   place: '',
  //   image: '',
  //   description: '',
  // });
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
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
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      postRequest(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };
  const postRequest = (base64EncodedImage) => {
    axios
      .post("http://localhost:3001/api/postblog", {
        data: base64EncodedImage,
        place: place,
        image: image,
        description: description,
        id: props.id,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="create">
      <span>Write The Place Name</span>
      <input
        id="title"
        className="create-input"
        type="text"
        placeholder="Place"
        onChange={(event) => {
          setPlace(event.target.value);
        }}
      />
      <span>Put This Area Image Here</span>
      <input
        id="imageUrl"
        className="create-input"
        type="text"
        placeholder="Photo"
        onChange={(event) => {
          setImage(event.target.value);
        }}
      />
      <span>Share With Us Your Experience In this Area</span>
      <input
        id="body"
        className="create-body-textarea"
        type="text"
        placeholder="Description"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <br></br>
      <br></br>
      <form onSubmit={handleSubmitFile} className="form">
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        <button
          className="create-submit-button"
          onClick={() => {
            // postRequest();
            Swal.fire(
              "Done!",
              "Your post status is pending! it will be accepted once it is checked",
              "success"
            );
          }}
          variant="success"
          type="submit"
        >
          Post
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
}

export default PostBlog;
