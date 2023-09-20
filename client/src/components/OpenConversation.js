import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useConversations } from '../context/ConversationProvider';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import {
  ChevronDownOutline,
  ChevronLeftOutline,
  ChevronRightOutline,
  ChevronUpOutline,
  SearchOutline,
} from '@styled-icons/evaicons-outline';

function OpenConversation({ isSidebarOpen, isDesktop, setIsSidebarOpen }) {
  const [text, setText] = useState('');
  const { sendMessage, selectedConversation } = useConversations();
  const scrollToBottom = useRef();
  useEffect(() => {
    scrollToBottom.current.scrollIntoView({ smooth: true });
  }, [selectedConversation]);

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText('');
  }
  //* SEARCH MESSAGES
  const [searchOpen, setSearchOpen] = useState(false);
  const [foundMsg, setFoundMsg] = useState([]);
  const searchInput = useRef();
  function openSearchModal() {
    setSearchOpen(true);
    setTimeout(() => {
      searchInput.current.focus();
    }, 500);
    // messageRef.current.style.background = 'lightblue';
    // console.log(messageRef);
  }
  const [searchBuffer, setSearchBuffer] = useState();
  function handleSearch(e) {
    if (e.target.value !== '') {
      setSearchBuffer(e.target.value);
    } else {
      setSearchBuffer();
    }
  }
  const itemRefs = useRef([]);

  function findMessage() {
    const foundIndexes = [];
    selectedConversation.messages.map((message, i) => {
      const msgRef = itemRefs.current[i];

      if (msgRef) {
        const msgBackgroundColor = getComputedStyle(msgRef).backgroundColor;
        if (msgBackgroundColor === 'rgb(0, 176, 255)') {
          foundIndexes.push(i);
        }
      }
    });
    console.log(foundIndexes.reverse());
    return foundIndexes.reverse();
  }
  useEffect(() => {
    setTimeout(() => {
      setFoundMsg(findMessage().reverse());
      {
      }
    }, 100);
  }, [searchBuffer]);
  useEffect(() => {
    if (foundMsg.length > 0) {
      itemRefs.current[foundMsg[0]].style.backgroundColor = '#F50057';
      itemRefs.current[foundMsg[0]].scrollIntoView({ smooth: true });
    }
  }, [foundMsg]);

  const [i, setI] = useState(0);
  function prevMsg() {
    if (i < foundMsg.length) {
      itemRefs.current[foundMsg[i]].style.backgroundColor = '#F50057';

      setI((prevI) => prevI + 1);
      if (i !== 0) {
        itemRefs.current[foundMsg[i - 1]].style.backgroundColor = '#00b0ff';
      }
    }
  }
  function nextMsg() {
    if (i > 0) {
      setI((prevI) => prevI - 1);
      itemRefs.current[foundMsg[i]].style.backgroundColor = '#F50057';
      if (i !== foundMsg.length) {
        itemRefs.current[foundMsg[i + 1]].style.backgroundColor = '#00b0ff';
      }
    }
  }

  const isPresent = useIsPresent();

  const animations = {
    style: {
      position: isPresent ? 'static' : 'absolute',
    },
    initial: { x: 100 },
    animate: { x: 0 },
    transition: { type: 'spring', stiffness: 900, damping: 40 },
  };
  return (
    <Container>
      <Nav>
        <AnimatePresence>
          {!isDesktop ? (
            isSidebarOpen ? (
              <SidebarIcon
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setIsSidebarOpen(false);
                }}
              >
                <CloseSidebar />
              </SidebarIcon>
            ) : (
              <SidebarIcon
                onClick={() => {
                  setIsSidebarOpen(true);
                }}
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <OpenSidebar />
              </SidebarIcon>
            )
          ) : (
            ''
          )}
        </AnimatePresence>

        <Search onClick={openSearchModal} />
        {searchOpen && (
          <SearchModal>
            <SearchInput
              ref={searchInput}
              value={searchBuffer}
              onChange={(e) => handleSearch(e)}
            />

            <BtnCntainer>
              <Up onClick={prevMsg} />
              <Down onClick={nextMsg} />
            </BtnCntainer>
          </SearchModal>
        )}
      </Nav>

      <Messages>
        <AnimatePresence>
          {selectedConversation.messages.map((message, index) => {
            return (
              <SingleMessage
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                // {...itemProps}
                as={motion.div}
                searctarget={message.text.includes(searchBuffer)}
                fromuser={message.fromMe}
                style={{
                  backgroundColor: message.text.includes(searchBuffer)
                    ? '#00B0FF'
                    : '',
                }}
                {...animations}
                layout
              >
                <TextMessage>{message.text}</TextMessage>

                <Data fromuser={message.fromMe.toString()}>
                  <Emittent>
                    {message.fromMe ? '' : message.senderName}
                  </Emittent>
                  -<Time>{message.time}</Time>
                </Data>
              </SingleMessage>
            );
          })}
        </AnimatePresence>

        <div ref={scrollToBottom} />
      </Messages>
      <Form onSubmit={handleSubmit}>
        <MessageArea
          required
          placeholder=''
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type='submit'>send</Button>
      </Form>
    </Container>
  );
}

export default OpenConversation;
const Container = styled.div`
  display: flex;
  flex: 1;
  /* background-color: #e0e0e0; */
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const Nav = styled.div`
  flex: 1;
  height: 7vh;
  background-color: #00b0ff;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;
const SidebarIcon = styled.div`
  height: 100%;
  margin-right: auto;
`;
const CloseSidebar = styled(ChevronLeftOutline)`
  height: 90%;
  cursor: pointer;
  color: #fff;
`;
const OpenSidebar = styled(ChevronRightOutline)`
  height: 90%;
  cursor: pointer;
  color: #fff;
`;
const Search = styled(SearchOutline)`
  height: 70%;
  cursor: pointer;
  color: #fff;
  margin-right: 10px;
`;
const SearchInput = styled.input`
  /* width: 90%;
  height: 2em; */
  /* position: absolute;
  bottom: -100%;
  left: 10%; */
  flex: 1;
`;
const BtnCntainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Up = styled(ChevronUpOutline)`
  cursor: pointer;
  height: 50%;
`;
const Down = styled(ChevronDownOutline)`
  cursor: pointer;
  height: 50%;
`;
const SearchModal = styled.div`
  position: absolute;
  bottom: -100%;
  left: 10%;
  display: flex;
  /* background-color: yellow; */
  height: 2em;
  width: 80%;
`;
const Messages = styled.div`
  /* height: 1000px; */
  height: 82vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  margin-bottom: 20px;
  margin-top: auto;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  height: 9vh;
  width: 95%;
  margin: 0 auto 10px auto;
`;
const MessageArea = styled.textarea`
  flex: 1;
  resize: none;
  height: 100%;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 8px 0 0 8px;
  background-color: #e0f2f1;
`;
const Button = styled.button`
  height: 100%;
  padding: 0 15px;
  background-color: #00b0ff;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  border-radius: 0 8px 8px 0;
`;
const SingleMessage = styled.div`
  height: fit-content;
  width: fit-content;
  margin: 10px;
  background-color: #1de9b6;
  padding: 5px 8px;
  border-radius: 5px;
  display: flex;
  transition: background-color 300ms;
  &:first-child {
    margin-top: auto;
  }

  ${(props) =>
    props.fromuser &&
    css`
      margin-left: auto;
    `};
  ${(props) =>
    props.searctarget &&
    css`
      background-color: #00b0ff;
    `};
`;
const TextMessage = styled.div``;
const Data = styled.div`
  ${(props) =>
    props.fromuser &&
    css`
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      opacity: 0.6;
      font-size: 0.5em;
      color: #fff;
      margin-left: 20px;
    `};
`;
const Emittent = styled.div`
  font-size: inherit;
`;
const Time = styled.div`
  font-size: inherit;
`;
