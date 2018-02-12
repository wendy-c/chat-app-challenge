import React from "react";
import styled from "styled-components";
import moment from "moment";

const SpeechBubbleWrapper = styled.div`
  display: flex;
  justify-content: ${props => {
    return props.align === "right" ? "flex-end" : "flex-start";
  }};
  margin: 0.5em;
  text-align: ${props => props.align};
`;

const SpeechBubble = styled.span`
  background-color: ${props => props.color};
  border-radius: 25px;
  padding: 0 0.8em;
  width: 60%;
  flex-grow: 0;
  flex-shink: 0;
  font-size: 0.9em;
`;

const Timestamp = styled.div`
  font-size: 0.8em;
  color: #8f8f8f;
  font-weight: 700;
  text-align: center;
`;

const Message = ({ message, activeUsername }) => {
  const color = message.sentFrom === activeUsername ? "#a7a4fb" : "#efefef";
  const align = message.sentFrom === activeUsername ? "right" : "left";
  const date = message.time
    .split(",")
    .join("")
    .slice(0, 15);
  const timeago = moment(message.time, "llll").fromNow();
  const APMTime = moment(message.time).format("hh:mm a");
  const isToday = moment(message.time).isSame(moment().format("llll"), "llll");
  const display = isToday ? `Today ${timeago}` : `${date} ${APMTime}`;
  return (
    <div key={message.time}>
      <Timestamp>{display}</Timestamp>
      <SpeechBubbleWrapper key={message.text} align={align}>
        <SpeechBubble color={color}>{message.text}</SpeechBubble>
      </SpeechBubbleWrapper>
    </div>
  );
};

export default Message;