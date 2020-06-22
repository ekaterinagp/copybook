import React, { useState, useEffect } from "react";
import "./modal.css";
import ReactDOM from "react-dom";
import { FaImages } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";
import { BsPersonPlusFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Debouncer from "./Debouncer";
import UploadFirebase from "./UploadFirebase";
import { storage } from "./firebase-config";
import { firebase } from "./firebase-config";

export default function Modal(props) {
  const { show, closeModal, user } = props;

  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");

  const [disabled, setDisabled] = useState(true);

  const [post, setPost] = useState({
    name: "",
    feeling: "",
    user_img: "",
    img: null,
    text: "",
    tag: [
      {
        id: null,
        name: "",
        user_img: "",
      },
    ],
    comments: [],
    likes: [],
  });

  useEffect(() => console.log(post), [post]);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    console.log(image);
    console.log("name?", image.name);
    setImageAsFile((imageFile) => image);
    console.log(imageAsFile);
    loadImg(e);
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();

    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }

    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);

    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
            console.log(imageAsUrl);
          });
      }
    );
  };

  const getPostText = (e) => {
    console.log(e.target.value.length);
    if (e.target.value.length > 1 || uploadImg) {
      setDisabled(false);

      // debouncer.call(1000, () => {

      // });

      let postTemp = {
        img: null,
        name: props.user.name,
        user_img: props.user.user_img,
        text: e.target.value,
      };
      setPost({ ...postTemp });

      console.log(post);
    }
  };

  const addPost = (e) => {
    e.preventDefault();
    handleFireBaseUpload(e);
    console.log(imageAsUrl);
    post.img = imageAsUrl;
    setPost({ ...post });
    console.log(post);
  };

  useEffect(() => {
    console.log(imageAsUrl);
  }, [imageAsUrl]);

  const [uploadImg, setUploadImg] = useState();

  const loadImg = (e) => {
    setUploadImg(URL.createObjectURL(e.target.files[0]));
  };

  const modal = (
    <>
      <div className={show ? "overlay" : "hide"} onClick={closeModal} />
      <div className={show ? "modal" : "hide"}>
        <button id="close-btn" onClick={closeModal}>
          X
        </button>
        <div className="modal-top">
          {" "}
          <h2>Create Post</h2>
        </div>
        <div className="modal-middle">
          <img className="mini" src={props.user.user_img} />
          <h3>{props.user.name}</h3>
        </div>
        <div className="text">
          <textarea
            placeholder={`What's on your mind,${props.user.name}?`}
            onInput={getPostText}
          ></textarea>
          {!uploadImg ? null : (
            // <img className="wish-img" src={imageAsUrl} alt="image tag" />
            <div
              className="post-div"
              style={{
                backgroundImage: `url(${uploadImg})`,
              }}
            ></div>
          )}
        </div>

        <div className="modal-bottom">
          <div className="add-to-post">
            <h3>Add to your post</h3>
            <div className="icons-add-more">
              <IconContext.Provider
                value={{ color: "lightgreen", size: "1.5em" }}
              >
                <div className="tooltip">
                  <label for="file">
                    <div>
                      <FaImages />{" "}
                      <span className="tooltiptext">Add an image</span>
                    </div>
                  </label>
                  <input
                    id="file"
                    type="file"
                    // ref="file"
                    accept="image/*"
                    style={{ visibility: "hidden" }}
                    className="input-firebase"
                    onChange={handleImageAsFile}
                  />
                  {/* <UploadFirebase /> */}
                </div>
              </IconContext.Provider>{" "}
              {/* <p className="icon-title">Photo/Video</p> */}
              <IconContext.Provider value={{ color: "#FAA41A", size: "1.5em" }}>
                <div className="tooltip">
                  <GoSmiley /> <span className="tooltiptext">Feeling</span>
                </div>
              </IconContext.Provider>
              {/* <p className="icon-title">Feelings/Activity</p> */}
              <IconContext.Provider value={{ color: "blue", size: "1.5em" }}>
                <div className="tooltip">
                  <BsPersonPlusFill />{" "}
                  <span className="tooltiptext">Tag a friend</span>
                </div>
              </IconContext.Provider>
              {/* <p className="icon-title">Feelings/Activity</p> */}
            </div>
          </div>
          <button
            disabled={disabled ? "disabled" : ""}
            className="add-post"
            onClick={addPost}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}
