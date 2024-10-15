import { Feather } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';
import { IEvent } from '~/types/event';

interface IEventListItemProps {
  event: IEvent;
}
const EventListItem: FC<IEventListItemProps> = ({ event }) => {
  return (
    <View className="gap-3 p-3">
      <View className="flex-row">
        <View className="flex-1 gap-2">
          <Text className="text-lg font-semibold uppercase text-amber-800">
            Wed 13, Sep · 19:30 CET
          </Text>
          <Text className="text-xl font-bold">{event.title}</Text>
          <Text className="text-gray-700">{event.location}</Text>
        </View>
        {/* image */}
        <Image className="aspect-video w-2/5 rounded-lg" source={{ uri: event.image }} />
      </View>
      {/* footer */}
      <View className="flex-row gap-3">
        <Text className="mr-auto text-gray-700">16 going</Text>
        <Feather color="gray" name="share" size={20} />
        <Feather color="gray" name="bookmark" size={24} />
      </View>
    </View>
  );
};

export default EventListItem;
