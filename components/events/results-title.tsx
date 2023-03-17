import React from 'react';
import Button from '../ui/button';

import classes from './results-title.module.css';

interface ResultsTitleProps {
  date: Date;
}

const ResultsTitle: React.FC<ResultsTitleProps> = (props) => {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <div className={classes.button}>
        <Button link='/events'>Show all events</Button>
      </div>
    </section>
  );
};

export default ResultsTitle;
