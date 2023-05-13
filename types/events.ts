export interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

// QP = Query Params
export type EventDetailQP = {
  eventId: string;
};
