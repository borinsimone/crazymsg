import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useContacts } from '../context/contactsProvider';
import { motion } from 'framer-motion';

function ShowContact() {
  const { selectedContact, setSelectedContact } = useContacts();

  const idRef = useRef();
  const [showAlert, setShowAlert] = useState(false);
  const copyToClipboard = (e) => {
    e.stopPropagation();
    setShowAlert(true);
    navigator.clipboard.writeText(idRef.current.innerText);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  return (
    <Modal
      as={motion.div}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      onClick={() => {
        setSelectedContact('');
      }}
    >
      <Container onClick={(e) => copyToClipboard(e)}>
        <Id
          showalert={showAlert}
          ref={idRef}
        >
          {selectedContact?.id}
        </Id>
        <Name>{selectedContact?.name}</Name>
      </Container>
    </Modal>
  );
}

export default ShowContact;
const width = '40%';
const height = '300px';

const Container = styled.div`
  /* flex: 1; */
  width: ${width};
  /* max-width: 400px; */
  height: ${height};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin: 0 auto; */
  background-color: #e0e0e0;
  /* position: absolute;
  left: calc(50% - ${width} / 2);
  top: calc(50% - ${height} / 2); */
`;
const Id = styled.div`
  cursor: pointer;
  position: relative;

  &::before {
    content: 'Id copied to clipboard';
    position: absolute;
    background-color: #fff;
    font-size: 0.7rem;
    text-align: center;
    top: calc(-100% - 20px);
    left: calc(50% - 100px);
    width: 200px;
    border-radius: 5px;
    z-index: 2;
    transition: 300ms;
    padding: 10px 0;
    opacity: 0;
    opacity: ${(props) => props.showalert && '1'};
    transform: scale(0);
    transform: scale(${(props) => props.showalert && '1'});
  }
  &::after {
    content: '';
    position: absolute;
    background-color: #fff;
    height: 10px;
    aspect-ratio: 1;
    transform: rotate(45deg) scale(0);
    top: -50%;
    left: calc(50% - 5px);
    z-index: 1;
    transition: 300ms;
    opacity: 0;
    opacity: ${(props) => props.showalert && '1'};

    transform: rotate(45deg) scale(${(props) => props.showalert && '1'});
  }
`;
const Name = styled.div``;
const Modal = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;
