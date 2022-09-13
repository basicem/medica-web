import React, { useState } from 'react'
import { Button, Form, Container, Segment, Modal,  } from 'semantic-ui-react';
import styled from "styled-components";

import {postPatients} from 'api/patients';

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
`;
const AddPatient = () => {
    const [image, setImage] = useState('');
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    
    const [open, setOpen] = useState(false)

    const handleSubmit = async () => {
        try {
            const patient = {image, firstName, lastName, address, city, phoneNumber, email};
            const response = await postPatients(patient);
            setOpen(true)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <StyledContainer>
            <Modal
                centered={false}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                >
                <Modal.Header>New Patient</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    New patient successfully added
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>OK</Button>
                </Modal.Actions>
            </Modal>

            <Form onSubmit={handleSubmit}>
                <Form.Field required onChange={e => setImage(e.target.value)}>
                    <label>Image</label>
                    <input placeholder='Image' value={image}/>
                </Form.Field>
                <Form.Field required onChange={e => setFirstName(e.target.value)}>
                    <label>First Name</label>
                    <input placeholder='First Name' />
                </Form.Field>
                <Form.Field required onChange={e => setLastName(e.target.value)}>
                    <label>Last Name</label>
                    <input placeholder='Last Name' />
                </Form.Field>
                <Form.Field required onChange={e => setAddress(e.target.value)}>
                    <label>Address</label>
                    <input placeholder='Address' />
                </Form.Field>
                <Form.Field required onChange={e => setCity(e.target.value)}>
                    <label>City</label>
                    <input placeholder='City' />
                </Form.Field>
                <Form.Field required onChange={e => setEmail(e.target.value)}>
                    <label>Email</label>
                    <input placeholder='joe@example.com' />
                </Form.Field>
                <Form.Field required onChange={e => setPhoneNumber(e.target.value)}>
                    <label>Phone</label>
                    <input placeholder='000/000-000' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </StyledContainer>
    );

};

export default AddPatient;
