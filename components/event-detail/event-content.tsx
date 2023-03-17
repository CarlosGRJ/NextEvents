import React from 'react';
import classes from './event-content.module.css';

interface EventContentProps {
  children?: React.ReactNode;
}

const EventContent: React.FC<EventContentProps> = (props) => {
  return <section className={classes.content}>{props.children}</section>;
};

export default EventContent;
