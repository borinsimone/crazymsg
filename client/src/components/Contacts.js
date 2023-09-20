import {
  Reorder,
  animations,
  useDragControls,
  useIsPresent,
  useMotionValue,
} from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { useContacts } from '../context/contactsProvider';
// import { useRaisedShadow } from '../hooks/useRaisedShadow';

function Contacts() {
  const { contacts, setContacts, setSelectedContact } = useContacts();

  return (
    <Container
      // as={motion.div}
      as={Reorder.Group}
      values={contacts}
      onReorder={setContacts}
    >
      {contacts.map((contact) => (
        <Item
          value={contact}
          whileTap={{ scale: 0.9 }}
          key={contact.id}
        >
          <Name
            onClick={() => {
              console.log(contact);
              setSelectedContact(contact);
            }}
          >
            {contact.name}
          </Name>
        </Item>
      ))}
      <button
        style={{ marginTop: 'auto' }}
        onClick={() => {
          console.log(contacts);
        }}
      >
        test
      </button>
    </Container>
  );
}

export default Contacts;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  padding: 20px 5px;
  position: relative;
`;
const Contact = styled.div`
  list-style-type: none;
  background-color: #eeeeee;
  cursor: grab;
  transition: background-color 300ms;
  padding: 0.5rem 0.3rem;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  user-select: none;

  &:hover {
    background-color: #00b0ff;
    color: #fff;
  }
`;
const Name = styled.div`
  cursor: pointer;
`;
const Item = ({ children, value, whileTap, key }) => {
  const y = useMotionValue(0);
  // const boxShadow = useRaisedShadow(y);
  const isPresent = useIsPresent();
  const animations = {
    style: {
      position: isPresent ? 'static' : 'absolute',
    },
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    // exit: { opacity: 0 },
  };
  return (
    <Contact
      as={Reorder.Item}
      {...animations}
      value={value}
      whileTap={whileTap}
      // key={key}
    >
      {children}
    </Contact>
  );
};
