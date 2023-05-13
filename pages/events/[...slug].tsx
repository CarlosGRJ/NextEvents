import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { NextPage } from 'next';
import { IEvent } from '@/types/events';
import useSWR from 'swr';

interface FilteredEventsPageProps {
  hasError: boolean;
  events: IEvent[];
  date: {
    year: number;
    month: number;
  };
}

const FilteredEventsPage: NextPage<FilteredEventsPageProps> = (props) => {
  const [loadedEvents, setLoadedEvents] = useState<IEvent[]>([]);
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR<IEvent[], Error>(
    'https://nextjs-course-476d5-default-rtdb.firebaseio.com/events.json',
    (url) => fetch(url).then((res) => res.json()),
  );

  useEffect(() => {
    if (data) {
      const events: IEvent[] = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents || !filterData) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

type Params = {
  slug: string[];
};

interface IProps {
  events?: IEvent[];
  hasError?: boolean;
  date?: {
    year: number;
    month: number;
  };
}

// export const getServerSideProps: GetServerSideProps<IProps, Params> = async (
//   context,
// ) => {
//   const { params } = context;

//   const filterData = params?.slug;

//   const filteredYear = filterData?.[0];
//   const filteredMonth = filterData?.[1];

//   const numYear = filteredYear ? parseInt(filteredYear, 10) : NaN;
//   const numMonth = filteredMonth ? parseInt(filteredMonth, 10) : NaN;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// };

export default FilteredEventsPage;
