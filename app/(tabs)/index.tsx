import { Stack } from 'expo-router';
import EventListItem from '~/components/eventListItem';

import { FlatList, View } from 'react-native';
import events from '~/assets/events.json';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      {/* events list */}
      <FlatList
        className="bg-white"
        data={events}
        ItemSeparatorComponent={() => <View className="mb-3 h-0.5 w-full bg-gray-100" />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventListItem event={item} />}
      />
    </>
  );
}
