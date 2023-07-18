import React from "react";
import {
  Table, Icon, Button,
} from "semantic-ui-react";

const UserRow = ({ user, onSetUser }) => (
  <>
    <Table.Row>
      <Table.Cell>
        {`${user.firstName} ${user.lastName}`}
      </Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.role}</Table.Cell>
      <Table.Cell>
        <Icon color={user.isActive === true ? "green" : "red"} name={user.isActive === true ? "checkmark" : "close"} />
      </Table.Cell>
      <Table.Cell>
        <Icon color={user.isVerified === true ? "green" : "red"} name={user.isVerified === true ? "checkmark" : "close"} />
      </Table.Cell>
      <Table.Cell width={1} textAlign="center">
        <Button size="tiny" color="teal" onClick={() => onSetUser(user)}>
          <Icon name="edit outline" />
          Edit
        </Button>
      </Table.Cell>
    </Table.Row>
  </>
);

export default UserRow;
