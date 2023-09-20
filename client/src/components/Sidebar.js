import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Conversations from './Conversations';
import Contacts from './Contacts';
import NewConversationModal from './NewConversationModal';
import NewContactModal from './NewContactModal';
const CONVERSATIONS__KEY = 'conversations';
const CONTACTS__KEY = 'contacts';
function Sidebar({ id, isSidebarOpen }) {
  const [tab, setTab] = useState(CONVERSATIONS__KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const idRef = useRef();
  const copyToClipboard = () => {
    setShowAlert(true);
    navigator.clipboard.writeText(idRef.current.innerText);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Container isopen={isSidebarOpen.toString()}>
      <Nav>
        <NavItem
          active={(tab == 'conversation').toString()}
          as={motion.div}
          //   initial={{ backgroundColor: '#FFF' }}
          whileHover={{ backgroundColor: '#9E9E9E', color: '#FFF' }}
          onClick={() => setTab(CONVERSATIONS__KEY)}
        >
          <NavLink>Conversation</NavLink>
        </NavItem>

        <NavItem
          active={(tab === 'contacts').toString()}
          as={motion.div}
          //   initial={{ backgroundColor: '#FFF' }}
          whileHover={{ backgroundColor: '#9E9E9E', color: '#FFF' }}
          onClick={() => setTab(CONTACTS__KEY)}
        >
          <NavLink>Contacts</NavLink>
        </NavItem>
      </Nav>
      <Content>
        <AnimatePresence mode='wait'>
          {tab === CONVERSATIONS__KEY && (
            <Conversations key={CONVERSATIONS__KEY} />
          )}
          {tab === CONTACTS__KEY && <Contacts key={CONTACTS__KEY} />}
        </AnimatePresence>
      </Content>

      <IDSection
        showalert={showAlert.toString()}
        onClick={copyToClipboard}
      >
        Your id: <ID ref={idRef}>{id}</ID>
      </IDSection>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        New {tab === CONVERSATIONS__KEY ? 'conversation' : 'contact'}
      </Button>
      <AnimatePresence>
        {modalOpen && (
          <Modal
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {tab === CONVERSATIONS__KEY ? (
              <NewConversationModal closeModal={closeModal} />
            ) : (
              <NewContactModal closeModal={closeModal} />
            )}
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default Sidebar;
var border = '1px solid #BDBDBD';
const Container = styled.div`
  height: 100%;
  width: 250px;

  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 300ms ease-in-out;
  ${(props) =>
    props.isopen === 'false' &&
    css`
      transform: translate(-250px);
      width: 0;
    `};
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NavItem = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.3rem 0.3rem;
  cursor: pointer;
  border-right: ${border};
  transition: box-shadow 400ms;

  &:first-child {
    ${(props) =>
      props.$active === false &&
      css`
        border-bottom: ${border};

        color: black;
      `};
    ${(props) =>
      props.$active &&
      css`
        border-bottom: none;
      `};
  }
  &:last-child {
    ${(props) =>
      props.$active === false &&
      css`
        border-bottom: ${border};

        color: black;
      `};
    ${(props) =>
      props.$active &&
      css`
        border-bottom: none;
      `};

    flex: 1;
  }
`;
const NavLink = styled.div``;
const Content = styled.div`
  width: 100%;
  flex: 1;
  border-right: ${border};
`;
const IDSection = styled.div`
  font-size: 0.8rem;
  border-top: ${border};
  border-right: ${border};
  cursor: pointer;
  position: relative;
  &::before {
    content: 'Copied to clipboard';
    position: absolute;
    background-color: #e0e0e0;
    font-size: 0.7rem;
    text-align: center;
    top: -50%;
    left: calc(50% - 75px);
    width: 150px;
    border-radius: 5px;
    z-index: 2;
    transition: 300ms;
    opacity: 0;
    opacity: ${(props) => props.$showalert && '1'};
    transform: scale(0);
    transform: scale(${(props) => props.$showalert && '1'});
  }
  &::after {
    content: '';
    position: absolute;
    background-color: #e0e0e0;
    height: 10px;
    aspect-ratio: 1;
    transform: rotate(45deg) scale(0);
    top: -25%;
    left: calc(50% - 5px);
    z-index: 1;
    transition: 300ms;
    opacity: 0;
    opacity: ${(props) => props.$showalert && '1'};

    transform: rotate(45deg) scale(${(props) => props.$showalert && '1'});
  }
`;
const ID = styled.div`
  font-size: 0.7rem;
  opacity: 0.6;
  margin-top: auto;
`;
const Button = styled.div`
  width: 100%;
  height: 60px;
  background-color: #00b0ff;
  display: grid;
  place-content: center;
  color: #fff;
  cursor: pointer;
`;
const Modal = styled.div`
  position: absolute;

  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.4);
`;
