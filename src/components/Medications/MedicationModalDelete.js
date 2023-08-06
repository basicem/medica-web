import React, { useState } from "react";
import {
  Button, Header, Icon, Modal,
} from "semantic-ui-react";

function MedicationModalDelete({ show, handleClick, handleDelete }) {
  const [loading, setLoading] = useState(false);

  const onApply = async () => {
    setLoading(true);
    handleDelete();
    setLoading(false);
  };

  return (
    <Modal
      open={show}
      onClose={handleClick}
    >
      <Header icon="pills" content="Delete Medication" />
      <Modal.Content>
        <p>
          Are you sure you want to do delete this medication?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={handleClick}>
          <Icon name="remove" />
          {" "}
          No
        </Button>
        <Button loading={loading} color="green" onClick={onApply}>
          <Icon name="checkmark" />
          {" "}
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default MedicationModalDelete;
