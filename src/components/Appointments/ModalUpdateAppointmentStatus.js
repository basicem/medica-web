import React, { useState } from "react";
import {
  Button, Header, Icon, Modal,
} from "semantic-ui-react";

function ModalUpdateAppointmentStatus({
  show, handleClick, handleUpdate, selected,
}) {
  const [loading, setLoading] = useState(false);

  const onApply = async () => {
    setLoading(true);
    handleUpdate();
  };

  return (
    <Modal
      open={show}
      onClose={handleClick}
    >
      <Header icon="calendar alternate outline" content="Update Appointment" />
      <Modal.Content>
        <p>
          Are you sure you want to change status to
          {" "}
          {selected}
          ?
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

export default ModalUpdateAppointmentStatus;
