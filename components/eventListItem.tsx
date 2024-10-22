import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import React, { FC } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { IEvent } from '~/types/event';

interface IEventListItemProps {
  event: IEvent;
}
const EventListItem: FC<IEventListItemProps> = ({ event }) => {
  const dayjsObject = dayjs(event.date);
  const timeStr = dayjsObject.format('ddd D MMM · hh:mm A');
  return (
    <Link asChild href={`/event/${event.id}`}>
      <Pressable className="gap-3 p-3">
        <View className="flex-row">
          <View className="flex-1 gap-2">
            <Text className="text-lg font-semibold uppercase text-amber-800">{timeStr}</Text>
            <Text className="text-xl font-bold">{event.title}</Text>
            <Text className="text-gray-700">{event.location}</Text>
          </View>
          {/* image */}
          <Image className="aspect-video w-2/5 rounded-lg" source={{ uri: event.image_uri }} />
        </View>
        {/* footer */}
        <View className="flex-row gap-3">
          <Text className="mr-auto text-gray-700">16 going</Text>
          <Feather color="gray" name="share" size={20} />
          <Feather color="gray" name="bookmark" size={22} />
        </View>
      </Pressable>
    </Link>
  );
};

export default EventListItem;
