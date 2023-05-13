import { GetStaticProps, NextPage } from 'next';
import EventList from '@/components/events/event-list';

import { IEvent } from '@/types/events';
import { getFeaturedEvents } from '@/helpers/api-util';

interface HomePageProps {
  events: IEvent[];
}

const HomePage: NextPage<HomePageProps> = (props) => {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800
  };
};

export default HomePage;
