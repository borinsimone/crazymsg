import { CloseOutline } from '@styled-icons/evaicons-outline';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useContacts } from '../context/ContactsProvider';
function NewContactModal({ closeModal }) {
  const idRef = useRef();
  const nameRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  };
  useEffect(() => {
    idRef.current.focus();
  }, []);

  const { createContact } = useContacts();
  return (
    <Container>
      <Header>Create contact</Header>
      <CloseIcon onClick={closeModal} />
      <Form onSubmit={handleSubmit}>
        <ID>
          <FormName>Id</FormName>
          <FormInput ref={idRef}></FormInput>
        </ID>
        <NAME>
          <FormName>Name</FormName>
          <FormInput ref={nameRef}></FormInput>
        </NAME>
        <Submit type='submit'>Save</Submit>
      </Form>
    </Container>
  );
}

export default NewContactModal;
const Container = styled.div`
  height: fit-content;
  width: 90%;
  max-width: 700px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
  border-radius: 9px;
  position: relative;
  color: #000;
`;
const CloseIcon = styled(CloseOutline)`
  height: 30px;
  color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Header = styled.div``;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const FormName = styled.div``;
const ID = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const NAME = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const FormInput = styled.input``;
const Submit = styled.button`
  background-color: #00b0ff;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
`;
