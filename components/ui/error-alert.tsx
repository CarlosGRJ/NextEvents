import React from 'react';
import classes from './error-alert.module.css';

interface ErrorAlertProps {
  children?: React.ReactNode;
}

const ErrorAlert: React.FC<ErrorAlertProps> = (props) => {
  return <div className={classes.alert}>{props.children}</div>;
};

export default ErrorAlert;
