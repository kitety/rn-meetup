export interface IEvent {
  created_at: string;
  date: string;
  description: string;
  id: number;
  image_uri: string;
  location: string;
  title: string;
  user_id: string;
  attendees: [
    {
      count: number;
    },
  ];
}
