import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import events from '~/assets/events.json';

const EventPage = () => {
  const { id } = useLocalSearchParams();
  const event = events.find((event) => event.id === id);
  if (!event) {
    return <Text>event not found</Text>;
  }
  const dayjsObject = dayjs(event.datetime);
  const timeStr = dayjsObject.format('ddd D MMM · hh:mm A');
  return (
    <View className="flex-1 gap-3  bg-white p-3">
      <Stack.Screen
        options={{ title: 'Event', headerBackTitleVisible: false, headerTintColor: 'black' }}
      />
      {/* image */}
      <Image className="aspect-video w-full rounded-3xl" source={{ uri: event.image }} />
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
