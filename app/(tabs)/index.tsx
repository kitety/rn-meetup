import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import { Image, Text, View } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <View className="gap-3 p-3">
        <View className="flex-row">
          <View className="flex-1 gap-2">
            <Text className="text-lg font-semibold uppercase text-amber-800">
              Wed 13, Sep · 19:30 CET
            </Text>
            <Text className="text-xl font-bold">This is a title</Text>
            <Text className="text-gray-700">City hall</Text>
          </View>
          {/* image */}
          <Image
            className="aspect-video w-2/5 rounded-lg"
            source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg' }}
          />
        </View>
        {/* footer */}
        <View className="flex-row gap-3">
          <Text className="mr-auto text-gray-700">16 going</Text>
          <Feather color="gray" name="share" size={20} />
          <Feather color="gray" name="bookmark" size={24} />
        </View>
      </View>
    </>
  );
}
