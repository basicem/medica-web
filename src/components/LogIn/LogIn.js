import React from "react";
import {
  Button,
} from "semantic-ui-react";
import styled from "styled-components";
import * as Yup from "yup";
import { Form } from "formik-semantic-ui-react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { logIn, getSession } from "api/users";
import InputField from "components/InputField";
import { toast } from "react-toastify";
import { useStore } from "./StoreContext";

const StyledTopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 5rem;
  margin-top: 3rem;
  border: 1px solid lightgrey;
  border-radius: 8px;
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem;
`;

const TopInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const ButtonGroup = styled.div`
  padding-top: 2rem;
  padding-bottom: 1.5rem;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters or more")
    .required("Required"),
});

function LogIn() {
  const navigate = useNavigate();
  const { setUser } = useStore();

  const handleSubmit = async (values) => {
    try {
      const token = await logIn(values);
      localStorage.setItem("Bearer", token);
      if (token && token !== "" && token !== undefined) {
        const response = await getSession();
        setUser(response);
        navigate("/home");
      }
    } catch (err) {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <StyledTopContainer>
          <Form>
            <h1>Login to your account</h1>
            <TopInfo>

              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="janedoe@gmail.com"
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="***********"
              />

            </TopInfo>

            <ButtonGroup>
              <FullWidthButton
                type="submit"
                content="Login"
                color="teal"
              />
            </ButtonGroup>
          </Form>
        </StyledTopContainer>
      )}
    </Formik>
  );
}

export default LogIn;
