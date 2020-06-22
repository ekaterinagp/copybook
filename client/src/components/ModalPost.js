import React, { useState, useEffect } from "react";
import "./modal.css";
import ReactDOM from "react-dom";
import { FaImages } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";
import { BsPersonPlusFill } from "react-icons/bs";
import { RiEmotionHappyLine } from "react-icons/ri";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { RiEmotionSadLine } from "react-icons/ri";
import { RiEmotionLaughLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import Debouncer from "./Debouncer";
import UploadFirebase from "./UploadFirebase";
import { storage } from "./firebase-config";
import { firebase } from "./firebase-config";

export default function Modal(props) {
  const { show, closeModal, user } = props;
  const [feelingsSet, setFeelingsSet] = useState(false);
  const [friendsVisible, setFreindsVisible] = useState(false);

  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");

  const [disabled, setDisabled] = useState(true);

  const [post, setPost] = useState({
    name: "",
    feeling: "",
    user_img: "",
    img: null,
    text: "",
    tag: [],
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
    closeModal();
  };

  useEffect(() => {
    console.log(imageAsUrl);
  }, [imageAsUrl]);

  const [uploadImg, setUploadImg] = useState();

  const loadImg = (e) => {
    setUploadImg(URL.createObjectURL(e.target.files[0]));
  };

  const showFellings = () => {
    setFeelingsSet(true);
  };

  const showFriends = () => {
    setFeelingsSet(false);
    setFreindsVisible(true);
  };

  const getFriend = (friend) => {
    post.tag = [];
    console.log(friend);
    post.tag.push({
      id: friend.id,
      name: friend.name,
      user_img: friend.user_img,
    });
    console.log(post.tag);
    setPost({ ...post });
    // setFeelingsSet(false);
    console.log(post);
    setFreindsVisible(false);
  };

  const getFeeling = (e) => {
    setFreindsVisible(false);
    console.log(e.target.value);
    post.feeling = e.target.value;
    setPost({ ...post });
    setFeelingsSet(false);
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
          <h4>
            {props.user.name}{" "}
            {post.feeling ? <>is feeling {post.feeling}</> : null}
            {post.tag.length ? <> with {post.tag[0].name}</> : null}
          </h4>
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
          {feelingsSet ? (
            <div className="feeling-block">
              <h2>How are you feeling?</h2>
              <div className="one-feeling">
                <input defaultValue="good " onClick={getFeeling} />

                <IconContext.Provider
                  value={{ color: "rgb(250, 164, 26)", size: "2em" }}
                >
                  <RiEmotionHappyLine />
                </IconContext.Provider>
              </div>
              <div className="one-feeling">
                <input defaultValue="bad" onClick={getFeeling} />
                <IconContext.Provider
                  value={{ color: "rgb(250, 164, 26)", size: "2em" }}
                >
                  <RiEmotionUnhappyLine />
                </IconContext.Provider>
              </div>
              <div className="one-feeling">
                <input defaultValue="amazing" onClick={getFeeling} />
                <IconContext.Provider
                  value={{ color: "rgb(250, 164, 26)", size: "2em" }}
                >
                  <RiEmotionLaughLine />
                </IconContext.Provider>
              </div>
              <div className="one-feeling">
                <input defaultValue="sad" onClick={getFeeling} />
                <IconContext.Provider
                  value={{ color: "rgb(250, 164, 26)", size: "2em" }}
                >
                  <RiEmotionSadLine />
                </IconContext.Provider>
              </div>
            </div>
          ) : null}
          {friendsVisible ? (
            <>
              {props.user.friends.map((friend, i) => (
                <div
                  className="one-friend"
                  onClick={() => getFriend(friend)}
                  key={i}
                >
                  <div
                    className="div-friend"
                    style={{ backgroundImage: `url(${friend.user_img})` }}
                  />

                  <h4>{friend.name}</h4>
                </div>
              ))}
            </>
          ) : null}
        </div>

        <div className="modal-bottom">
          <div className="add-to-post">
            <h3>Add to your post</h3>
            <div className="icons-add-more">
              <IconContext.Provider
                value={{
                  color: "lightgreen",
                  size: "1.5em",
                }}
              >
                <div className="tooltip">
                  <label for="file">
                    <div className="svg-icon-div">
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
                </div>
              </IconContext.Provider>{" "}
              <IconContext.Provider value={{ color: "#FAA41A", size: "1.5em" }}>
                <div className="tooltip">
                  <GoSmiley onClick={showFellings} />{" "}
                  <span className="tooltiptext">Feeling</span>
                </div>
              </IconContext.Provider>
              <IconContext.Provider value={{ color: "blue", size: "1.5em" }}>
                <div className="tooltip">
                  <BsPersonPlusFill onClick={showFriends} />{" "}
                  <span className="tooltiptext">Tag a friend</span>
                </div>
              </IconContext.Provider>
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
