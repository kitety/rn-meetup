import { useMount, useReactive } from 'ahooks';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { IAttendance } from '~/types/event';
import { supabase } from '~/utils/supabase';

function Attendance() {
  const state = useReactive<{ attendance: IAttendance[] }>({
    attendance: [],
  });
  const { id } = useLocalSearchParams();
  const fetchAttendance = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select(`*,profiles(*)`)
      .eq('event_id', id);
    if (error) {
      console.error(error);
    }
    console.log('data', data);
    state.attendance = data || [];
  };
  useMount(fetchAttendance);
  return (
    <View>
      <Stack.Screen
        options={{ title: 'Attendance', headerBackTitleVisible: false, headerTintColor: 'black' }}
      />
      <Text>Attendance</Text>
      <FlatList
        data={state.attendance}
        renderItem={({ item }) => (
          <View className="p-3" key={item.created_at}>
            <Text className="font-bold">{item.profiles.full_name || 'User'}</Text>
          </View>
        )}
      />
    </View>
  );
}
export default Attendance;
