import React, { useRef } from 'react';
import styled from 'styled-components';
import { v4 as v4uuid } from 'uuid';

function Login({ onIdSubmit, id }) {
  const idRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };
  const createNewId = (e) => {
    e.preventDefault();
    console.log(v4uuid());
    onIdSubmit(v4uuid());
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>Inserisci Id</Label>
        <Control
          type='text'
          ref={idRef}
        />
        <BtnContainer>
          <Submit type='submit'>Login</Submit>
          <CreateId
            // type='submit'
            onClick={createNewId}
          >
            Create new Id
          </CreateId>
        </BtnContainer>
      </Form>
    </Container>
  );
}

export default Login;
//* style variables
var height = '20%';
var width = '50%';

const Container = styled.div`
  height: ${height};
  width: ${width};
  background-color: #eeeeee;

  position: absolute;
  top: calc(50% - ${height} / 2);
  left: calc(50% - ${width} / 2);
`;
const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5%;
  /* font-size: 4rem; */
`;

const Label = styled.label``;
const Control = styled.input`
  width: 90%;
`;
const BtnContainer = styled.div`
  display: flex;
  gap: 20px;
`;
const button = styled.button`
  padding: 0.2rem 0.7rem;
  border-radius: 7px;
  background-color: #03a9f4;
  color: #fff;
  box-shadow: none;
  outline: none;
  border: none;
  cursor: pointer;
`;
const Submit = styled(button)``;
const CreateId = styled(button)`
  background-color: #757575;
`;
