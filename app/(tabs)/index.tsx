import { Stack } from 'expo-router';
import EventListItem from '~/components/eventListItem';

import { useMount, useReactive } from 'ahooks';
import { FlatList, View } from 'react-native';
import { IEvent } from '~/types/event';
import { supabase } from '~/utils/supabase';

export default function Home() {
  const state = useReactive<{ events: IEvent[] }>({
    events: [],
  });
  const fetchEvents = async () => {
    const { data: events, error } = await supabase.from('events').select('*');
    if (error) {
      console.error(error);
    }
    console.log(events);
    state.events = (events || []) as IEvent[];
  };
  useMount(fetchEvents);
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      {/* events list */}
      <FlatList
        className="bg-white"
        data={state.events}
        ItemSeparatorComponent={() => <View className="mb-3 h-0.5 w-full bg-gray-100" />}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventListItem event={item} />}
      />
    </>
  );
}
