import React, { useState } from 'react'
import { Button, Form, Container } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styled from "styled-components";

import { postPatient } from 'api/patients';

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
`;

const StyledHeader = styled.h1`
  margin:0
`;

const StyledErrorMessage = styled.div`
    font-size: 12px;
    color: #e53935;
    width: 400px;
    margin-top: 0.25rem;
`;


const AddPatient = () => {
    
    const formik = useFormik({
        initialValues: {
            image: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            address: '',
            city: '',
            phoneNumber: '',
            email: '',
        },
        validationSchema: Yup.object({
            image: Yup.string().
                required('Required'),
            firstName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            lastName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            dateOfBirth: Yup.date()
            .nullable()
            .required("Required"),
            address: Yup.string()
            .max(15, 'Must be 20 characters or less')
            .required('Required'),
            city: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
          }),
        onSubmit: async (values) => {
            try {
                await postPatient({
                    image: values.image,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    dateOfBirth: values.dateOfBirth,
                    address: values.address,
                    city: values.city,
                    phoneNumber: values.phoneNumber,
                    email: values.email,
                });
                toast.success('New patient added!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch(error) {
                toast.error("Unable to create patient!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    })

    return (
        <StyledContainer>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
            <StyledHeader>Create patient</StyledHeader>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Field required >
                    <label>Image</label>
                    <input 
                        id='image'
                        name="image"
                        placeholder='Image'
                        onChange={formik.handleChange}
                        value={formik.values.image} 
                    />
                    {formik.touched.image && formik.errors.image ? (
                        <StyledErrorMessage>{formik.errors.image}</StyledErrorMessage>
                    ) : null}
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Field required>
                        <label>First Name</label>
                        <input 
                            id='firstName'
                            name="firstName"
                            placeholder='First name'
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                         />
                         {formik.touched.firstName && formik.errors.firstName ? (
                        <StyledErrorMessage>{formik.errors.firstName}</StyledErrorMessage>
                    ) : null}
                    </Form.Field>
                    <Form.Field required>
                        <label>Last Name</label>
                        <input 
                            id='lastName'
                            name="lastName"
                            placeholder='Last name'
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                        <StyledErrorMessage>{formik.errors.lastName}</StyledErrorMessage>
                    ) : null}
                    </Form.Field>
                    <Form.Field required>
                        <label>Date Of Birth</label>
                        <input type="date" 
                            id='dateOfBirth'
                            name="dateOfBirth"
                            onChange={formik.handleChange}
                            value={formik.values.dateOfBirth}
                        />
                        {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                        <StyledErrorMessage>{formik.errors.dateOfBirth}</StyledErrorMessage>
                    ) : null}
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field required>
                        <label>Phone</label>
                        <input 
                            id='phoneNumber'
                            name="phoneNumber"
                            placeholder='000/000-000'
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <StyledErrorMessage>{formik.errors.phoneNumber}</StyledErrorMessage>
                    ) : null}
                    </Form.Field>
                    <Form.Field required>
                        <label>Email</label>
                        <input 
                            id='email'
                            name="email"
                            placeholder='joe@example.com'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                        <StyledErrorMessage>{formik.errors.email}</StyledErrorMessage>
                    ) : null}
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field required>
                        <label>Address</label>
                        <input 
                            id='address'
                            name="address"
                            placeholder='Address'
                            onChange={formik.handleChange}
                            value={formik.values.address}
                        />
                        {formik.touched.address && formik.errors.address ? (
                        <StyledErrorMessage>{formik.errors.address}</StyledErrorMessage>
                    ) : null}
                    </Form.Field>
                    <Form.Field required>
                        <label>City</label>
                        <input 
                            id='city'
                            name="city"
                            placeholder='City'
                            onChange={formik.handleChange}
                            value={formik.values.city}
                        />
                        {formik.touched.city && formik.errors.city ? (
                        <StyledErrorMessage>{formik.errors.city}</StyledErrorMessage>
                    ) : null}
                    </Form.Field>
                </Form.Group>
                <Button type='submit'>Create</Button>
            </Form>
        </StyledContainer>
    );

};

export default AddPatient;
