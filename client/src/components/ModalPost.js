import React, { useState, useEffect } from "react";
import "./modal.css";
import axios from "axios";
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
import { MdSettingsInputComponent } from "react-icons/md";

export default function Modal(props) {
  const { show, closeModal } = props;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [feelingsSet, setFeelingsSet] = useState(false);
  const [friendsVisible, setFreindsVisible] = useState(false);
  console.log(props);
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState();
  const [feeling, setFeeling] = useState();
  const [tag, setTag] = useState();
  const [text, setText] = useState();

  const [disabled, setDisabled] = useState(true);

  const getUser = async () => {
    setLoading(true);
    let userId = localStorage.getItem("id");
    const res = await axios
      .get(`http://localhost:9090/users/${userId}`)
      .catch((error) => console.log(error.response.data));
    console.log(res);
    setUser(res.data);
    setLoading(false);
  };

  // const [post, setPost] = useState({
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   feeling: feeling,
  //   user_img: user.user_img,
  //   img: imageAsUrl.imgUrl,
  //   text: "",
  //   tag: [],
  //   comments: [],
  //   likes: [],
  // });

  useEffect(() => getUser(), []);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    console.log(image);
    console.log("name?", image.name);
    setImageAsFile((imageFile) => image);
    console.log({ imageAsFile });
    // console.log({ imageFile });
    console.log({ image });
    loadImg(e);
  };

  const handleFireBaseUpload = (e) => {
    return new Promise((resolve, reject) => {
      e.preventDefault();
      if (imageAsFile === "") {
        console.error(
          `not an image, the image file is a ${typeof imageAsFile}`
        );
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
            .then(async (fireBaseUrl) => {
              await setImageAsUrl((prevObject) => ({
                ...prevObject,
                imgUrl: fireBaseUrl,
              }));
              console.log("look herre", fireBaseUrl);
              resolve(fireBaseUrl);
            });
        }
      );
    });
  };

  const getPostText = (e) => {
    console.log(e.target.value.length);
    if (e.target.value.length > 1 || uploadImg) {
      setDisabled(false);
      setText(e.target.value);

      // let postTemp = {
      //   img: imageAsUrl ? imageAsUrl.imgUrl : "",
      //   feeling: "",
      //   tag: [],
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   user_img: user.user_img,
      //   text: e.target.value,
      // };
      // setPost({ ...postTemp });

      // console.log(post);
    }
  };

  const addPostToDb = async (post) => {
    console.log({ post });
    let userId = localStorage.getItem("id");
    const res = await axios.post(
      `http://localhost:9090/posts/add/${userId}`,
      post
    );
    console.log(res);
  };

  const addPost = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    // console.log(uploadImg);
    if (imageAsFile) {
      imageUrl = await handleFireBaseUpload(e);
      console.log(imageAsUrl);
      // let tempPost = {
      //   img: imageAsUrl,
      // };
      // post.img = imageAsUrl.imgUrl;
      // console.log(post.img);
    }
    const post = {
      img: imageUrl,
      feeling: feeling,
      tag: tag,
      firstName: user.firstName,
      lastName: user.lastName,
      user_img: user.user_img,
      text: text,
    };
    console.log(post);

    addPostToDb(post);

    // setPost("");
    closeModal();
  };

  // useEffect(() => {
  //   console.log(post);
  // }, [post]);
  useEffect(() => {
    console.log(imageAsUrl);
  }, [imageAsUrl]);

  const [uploadImg, setUploadImg] = useState();

  const loadImg = (e) => {
    setUploadImg(URL.createObjectURL(e.target.files[0]));
    // handleFireBaseUpload(e);
  };

  const showFellings = () => {
    setFeelingsSet(true);
  };

  const showFriends = () => {
    setFeelingsSet(false);
    setFreindsVisible(true);
  };

  const getFriend = (friend) => {
    let tag = [];

    console.log(friend);
    tag.push({
      user_id: friend.user_id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      user_img: friend.user_img,
    });

    // console.log(post);
    setTag(tag);
    setFreindsVisible(false);
  };

  const getFeeling = (e) => {
    setFreindsVisible(false);
    console.log(e.target.value);
    setFeeling(e.target.value);
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
        {!user ? (
          <p>Loading</p>
        ) : (
          <>
            <div className="modal-middle">
              <img className="mini" src={user.user_img} />
              <h4>
                {user.firstName} {feeling ? <>is feeling {feeling}</> : null}
                {tag && tag.length ? <> with {tag[0].firstName}</> : null}
              </h4>
            </div>
            <div className="text">
              <textarea
                placeholder={`What's on your mind,${user.firstName}?`}
                onInput={getPostText}
              ></textarea>
              {!uploadImg ? null : (
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
                  {user.friends.map((friend, i) => (
                    <div
                      className="one-friend"
                      onClick={() => getFriend(friend)}
                      key={i}
                    >
                      <div
                        className="div-friend"
                        style={{ backgroundImage: `url(${friend.user_img})` }}
                      />

                      <h4>{friend.firstName}</h4>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </>
        )}

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
                  <label htmlFor="file">
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
