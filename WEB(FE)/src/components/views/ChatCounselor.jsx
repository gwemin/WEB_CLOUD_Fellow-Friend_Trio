import React, { useState } from 'react'

import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Search from '@mui/icons-material/Search'
import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';

const FlexBox = styled.div`
  display: flex;
`

const FlexColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled(FlexBox)`
  background-color: aliceblue;
  padding: 8;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`


const LeftList = styled(FlexColumnBox)`
  background-color: green;
  padding: 8;
  width: 30%;
  border-right: 1px solid #ddd;
  height: 100vh;
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
  }

`

const Divider = styled.div`
  margin: 0 10px;
  border-top: solid 1px #ddd;
`

const ChatItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 15px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f0f2f5;
  }
  svg {
    width: 30px;
    height: 30px;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 10px;
    min-width: fit-content;
  }
  &.active {
    background-color: #f0f2f5;
  }
`

const Name = styled.div`
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
`


const RightChat = styled(FlexColumnBox)`
  backgroundColor: yellow;
  padding: 8;
  width: 70%;
`

const ChatInput = styled(TextField)`
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
  box-shadow: inset 0 0 1px 1px #0003;
`

const ChatBody = styled.div`
  flex: 1;
  background-color: #efeae2;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`

const MessageDate = styled.span`
  font-size: 11px;
  color: #999;
  text-align: right;
  height: 15px;
  margin: -5px 5px 0;
`;

const Content = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 1px #ccc;
  display: flex;
  flex-direction: column;
  padding: 3px;
  max-width: 80%;
`;

const Message = styled.span`
  font-size: 14px;
  margin: 5px 40px 5px 5px;
`;

// 메시지 보내는 사람이 me 일경우 왼쪽에 rigth
const Line = styled.div`
  margin: 10px;
  display: flex;
  &.me {
    > div {
      background-color: #dcf8c6;
    }
    justify-content: right;
  }
`;
const ChatFooter = styled.div`
  height: 62px;
  bottom: 0;
  width: 100%;
  background-color: #f0f2f5;
  display: flex;
  box-shadow: 2px 1px 3px 1px #0003;
  svg {
    width: 25px;
    height: 25px;
    color: #54656f;
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
`;

// 병사리스트 와 채팅을 볼 수 있게 지원하는게 까다로울것같다.
export function ChatCounselor() {
  const [message, setMessage] = useState()

  // socket 연결하여 상대방에게 전달
  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message)

    setMessage("");
  };

  const keyPress = (e) => {
    console.log(`Pressed keyCode ${message}`);
    if (e.key === 'Enter') {
      // Do code here
      e.preventDefault();
    }
  }

  const [userLoggedIn,userLoggedInSet] = useState(false); // 임시 방편

  // 채팅을 하였던 유저 목록을 가져와야 하는데 어떻게 가져와야할까??
  // const [getUserItem] = useCollection(
  //   db.collection("users").where("email", "==", getUser(users, user))
  // );

  // const Avatar = getUserItem?.docs?.[0]?.data();

  return (
    <Container>
      <LeftList>
        <Typography variant="h3" gutterBottom align="center">
          Title
        </Typography>
        <TextField
          id="input-with-icon-textfield"
          label="입력 해주세요...."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <ChatItemContainer>
          <PersonIcon />
          <Name>ds</Name>
        </ChatItemContainer>
        <Divider />
      </LeftList>
      <RightChat>
        <ChatBody>
          <Line className={userLoggedIn === true ? "me" : ""}>
            <Content>
              <Message>{message}</Message>
              <MessageDate>1999.2.32</MessageDate>
            </Content>
          </Line>
        </ChatBody>
          <ChatFooter>
            <Form>
            <ChatInput 
              onChange={(e) => {
                setMessage(e.target.value)
              }}
              onKeyPress={keyPress}
            />
            <Button variant="outlined" endIcon={<SendIcon />} onClick={(value) => {
              handleSendMessage(value)
            }} />
          </Form>
        </ChatFooter>
      </RightChat>
      
    </Container>
  )
}

export default ChatCounselor
