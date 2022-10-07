import React, { useState } from "react";
import {
  Button, Header, Icon, Modal,
} from "semantic-ui-react";

function ModalDeletePatient({ show, handleClick, handleDelete }) {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onApply = async () => {
    setLoading(true);
    setDisabled(true);
    handleDelete();
  };

  return (
    <Modal
      open={show}
      onClose={handleClick}
    >
      <Header icon="remove user" content="Delete Patient" />
      <Modal.Content>
        <p>
          Are you sure you want to do delete this patient?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={handleClick}>
          <Icon name="remove" />
          {" "}
          No
        </Button>
        <Button loading={loading} disabled={disabled} color="green" onClick={onApply}>
          <Icon name="checkmark" />
          {" "}
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ModalDeletePatient;
