import { CloseOutline } from '@styled-icons/evaicons-outline';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useContacts } from '../context/ContactsProvider';
import { useConversations } from '../context/ConversationProvider';
function NewConversationModal({ closeModal }) {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();
  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactsIds);
    closeModal();
  };
  const [selectedContactsIds, setSelectedContactsIds] = useState([]);
  function handleCheckboxChange(contactId) {
    setSelectedContactsIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }
  return (
    <Container>
      <Header>Create conversation</Header>
      <CloseIcon onClick={closeModal} />
      <Form onSubmit={handleSubmit}>
        {contacts.map((contact) => (
          <Label key={contact.id}>
            <Input
              type='checkbox'
              value={selectedContactsIds.includes(contact.id)}
              onChange={() => handleCheckboxChange(contact.id)}
            />
            {contact.name}
          </Label>
        ))}

        <Submit type='submit'>Save</Submit>
      </Form>
    </Container>
  );
}

export default NewConversationModal;
const Container = styled.div`
  height: 400px;
  width: 90%;
  max-width: 700px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  border-radius: 9px;
  position: relative;
  padding: 20px;
`;
const CloseIcon = styled(CloseOutline)`
  height: 30px;
  background-color: red;
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
  flex: 1;
  /* gap: 20px; */
`;
const Label = styled.label``;
const Input = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;
const Submit = styled.button`
  background-color: #00b0ff;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  margin-top: auto;
`;
