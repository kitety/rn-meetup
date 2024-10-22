import { useMount, useReactive, useUnmountedRef } from 'ahooks';
import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import { IEvent } from '~/types/event';
import { supabase } from '~/utils/supabase';

const EventPage = () => {
  const unmountedRef = useUnmountedRef();
  const state = useReactive<{ event: IEvent | null; loading: boolean }>({
    event: null,
    loading: true,
  });
  const { id } = useLocalSearchParams();
  const fetchEvent = async () => {
    state.loading = true;
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();

    if (unmountedRef.current || error) return;
    state.event = data;
    state.loading = false;
  };
  useMount(() => {
    fetchEvent();
  });
  const event = state.event;
  if (state.loading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Loading Event...',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
        />
        <ActivityIndicator className="flex-1" color="black" size="large" />
      </>
    );
  }
  if (!event) {
    return (
      <View className="flex-1 items-center justify-center">
        <Stack.Screen
          options={{
            title: 'Event not found',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
        />
        <Text className="text-3xl">Event not found</Text>
      </View>
    );
  }
  const dayjsObject = dayjs(event.date);
  const timeStr = dayjsObject.format('ddd D MMM · hh:mm A');
  return (
    <View className="flex-1 gap-3  bg-white p-3">
      <Stack.Screen
        options={{ title: event.title, headerBackTitleVisible: false, headerTintColor: 'black' }}
      />
      {/* image */}
      <Image className="aspect-video w-full rounded-3xl" source={{ uri: event.image_uri }} />
      <Text className="text-3xl font-bold">{event.title}</Text>
      <Text className="text-lg font-semibold uppercase text-amber-800">{timeStr}</Text>
      <Text className="text-lg">{event.description}</Text>
      {/* footer */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t-2 border-gray-400 p-5 pb-10">
        <Text className="text-2xl font-bold ">111</Text>
        <Pressable className="rounded-md bg-red-500 p-5 px-8">
          <Text className="text-lg font-bold text-white">Join and RSVP</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EventPage;
