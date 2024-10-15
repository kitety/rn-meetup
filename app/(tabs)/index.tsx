import { Stack } from 'expo-router';
import EventListItem from '~/components/eventListItem';

import events from '~/assets/events.json';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      {/* events list */}
      {events.map((event) => (
        <EventListItem event={event} key={event.id} />
      ))}
    </>
  );
}
