import dayjs from 'dayjs';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, Text, View } from 'react-native';
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
    <>
      <Stack.Screen
        options={{ title: 'Event', headerBackTitleVisible: false, headerTintColor: 'black' }}
      />
      <View className="flex-1 gap-3  bg-white p-3">
        {/* image */}
        <Image className="aspect-video w-full rounded-3xl" source={{ uri: event.image }} />
        <Text className="text-3xl font-bold">{event.title}</Text>
        <Text className="text-lg font-semibold uppercase text-amber-800">{timeStr}</Text>
        <Text className="text-lg">{event.description}</Text>
      </View>
    </>
  );
};

export default EventPage;
