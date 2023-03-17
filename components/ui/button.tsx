import React from 'react';
import Link from 'next/link';

import classes from './button.module.css';

interface ButtonProps {
  children?: React.ReactNode;
  link?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;