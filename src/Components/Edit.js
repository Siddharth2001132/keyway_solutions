import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";

function Edit(props) {
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };

  return (
    <Modal className="modal-view" size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary"onClick={handleClose} >Close</Button>
        <Button variant="primary" onClick={handleClose}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Edit;
