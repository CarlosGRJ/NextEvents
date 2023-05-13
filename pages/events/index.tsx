import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents } from '@/helpers/api-util';
import { IEvent } from '@/types/events';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

interface AllEventsPageProps {
  events: IEvent[];
}

const AllEventsPage: NextPage<AllEventsPageProps> = (props) => {
  const router = useRouter();
  const { events } = props;

  const findEventsHandler = (year?: string, month?: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
