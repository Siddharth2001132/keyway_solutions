import React, { forwardRef, useState } from "react";
import {
  MoreVertRounded,
  PersonRounded,
  FavoriteOutlined,
  SendOutlined,
  TurnedInNot,
} from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "../App.css";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import Edit from "./Edit";

const Post = forwardRef(({ _id, username, title, description }, ref) => {
  const DELETE_URL = "https://post-up-server.herokuapp.com/feed/post";
  const UPDATE_URL = "https://post-up-server.herokuapp.com/feed/post/update"

  const refreshPage = () => {
    window.location.reload();
  };

  // const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleTrueFalse = () => {
    setShow(handleShow);
  };

  const onSubmit = (data) => {
    const body = {
      _id: _id,
      username: username,
      title: data.title,
      description: data.description,
    };
    console.log(body);
    fetch(UPDATE_URL, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
      })
      .then(() => {
        refreshPage();
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  const ModalContent = () => {
    return (
      <Modal className="modal-view" show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <input
                className="form-control"
                name="title"
                id="title"
                placeholder={title}
                type="text"
                required={true}
                ref={register}
              />
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              <input
                className="form-control"
                name="description"
                id="description"
                placeholder={description}
                type="text"
                required={true}
                ref={register}
              />
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  };

  function updateById() {
    toggleTrueFalse();
  }

  function deleteByID(_id) {
    fetch(`${DELETE_URL}/${_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
      })
      .then(() => {
        refreshPage();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="post">
      <div className="post-head">
        <div className="post-head-1">
          <PersonRounded className="avatar-icon" fontSize="large" />
          <div className="post-username">{username}</div>
        </div>
        <Menu
          menuButton={
            <MenuButton>
              <MoreVertRounded style={{ color: grey[50] }} />
            </MenuButton>
          }
        >
          <MenuItem onClick={updateById}>Edit</MenuItem>
          <MenuItem onClick={deleteByID}>Delete</MenuItem>
        </Menu>
      </div>
      <div>{show ? <ModalContent /> : null}</div>

      <div className="post-main">
        <div className="post-title">{title}</div>
        <div className="post-description">{description}</div>
      </div>
      <div className="post-foot">
        <FavoriteOutlined className="post-foot-icon Like" />
        <SendOutlined className="post-foot-icon" />
        <TurnedInNot />
      </div>
    </div>
  );
});

export default Post;
