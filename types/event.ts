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
export interface IAttendance {
  created_at: string;
  event_id: number;
  user_id: string;
  profiles: IProfile;
}
export interface IProfile {
  avatar_url: string | null;
  full_name: string;
  id: string;
  updated_at: string;
  username: string;
  website: string;
}
