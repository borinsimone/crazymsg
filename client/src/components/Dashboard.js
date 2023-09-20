import React, { useState } from 'react';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import OpenConversation from './OpenConversation';
import { useConversations } from '../context/conversationProvider';
import ShowContact from './ShowContact';
import { useContacts } from '../context/contactsProvider';
import { AnimatePresence } from 'framer-motion';

function Dashboard({ id, isDesktop }) {
  const { selectedConversation } = useConversations();
  const { selectedContact, setSelectedContact } = useContacts();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Container>
      <AnimatePresence>
        <Sidebar
          id={id}
          isSidebarOpen={isSidebarOpen}
          key='sidebar'
        />
        {selectedConversation && (
          <OpenConversation
            key='conversation'
            isDesktop={isDesktop}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}
        {selectedContact && <ShowContact key='showcontact' />}
      </AnimatePresence>
    </Container>
  );
}

export default Dashboard;
const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
`;
