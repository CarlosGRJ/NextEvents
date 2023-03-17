import EventList from '@/components/events/event-list';
import { getFeaturedEvents } from '@/dummy-data';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
