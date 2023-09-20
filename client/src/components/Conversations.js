import { motion } from 'framer-motion';
import React from 'react';
import styled, { css } from 'styled-components';
import { useConversations } from '../context/conversationProvider';

function Conversations() {
  const { conversations, selectConversationIndex, setSelectConversationIndex } =
    useConversations();
  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {conversations.map((conversation, index) => (
        <List
          as={motion.div}
          active={selectConversationIndex == index}
          key={index}
          onClick={() => {
            setSelectConversationIndex(index);
          }}
        >
          {conversation.recipients.map((r) => r.name).join(', ')}
          {selectConversationIndex === index}
        </List>
      ))}
    </Container>
  );
}

export default Conversations;
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  padding: 20px 5px;
`;
const List = styled.div`
  list-style-type: none;
  background-color: #eeeeee;
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
  ${(props) =>
    props.active &&
    css`
      background-color: #7c4dff;
      color: #fff;
    `};
  cursor: pointer;
  transition: background-color 300ms, color 300ms;
`;
