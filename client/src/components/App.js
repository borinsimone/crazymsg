import React, { Fragment, useEffect, useState } from 'react';
import Login from './Login';
import GlobalStyles from '../styles/GlobalStyles';
import styled from 'styled-components';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import { ContactsProvider } from '../context/contactsProvider';
import { ConversationsProvider } from '../context/conversationProvider';
function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    function updateVh() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty(`${vh}`, `vhpx`);
    }
    function updateIsDesktop() {
      setIsDesktop(window.innerWidth > 768);
    }
    window.addEventListener('resize', updateVh, updateIsDesktop);
    console.log('resize');
  }, []);
  const [id, setId] = useLocalStorage('id');
  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard
          id={id}
          isDesktop={isDesktop}
        />
      </ConversationsProvider>
    </ContactsProvider>
  );
  return (
    <AppContainer>
      <GlobalStyles />
      {id ? (
        dashboard
      ) : (
        <Login
          onIdSubmit={setId}
          id={id}
        />
      )}
    </AppContainer>
  );
}

export default App;
const AppContainer = styled.div`
  height: 100%;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  position: relative;
  display: flex;
  /* justify-content: center;
  align-items: center; */
`;
