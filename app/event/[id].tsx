import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import events from '~/assets/events.json';

const EventPage = () => {
  const { id } = useLocalSearchParams();
  const event = events.find((event) => event.id === id);
  return (
    <View>
      <Text>event detail page{event?.title}</Text>
    </View>
  );
};

export default EventPage;
