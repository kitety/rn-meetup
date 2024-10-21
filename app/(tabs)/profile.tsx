import { Input } from '@rneui/themed';
import { useReactive } from 'ahooks';
import { Stack } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { Alert, Button, View } from 'react-native';
import { useAuth } from '~/contexts/authProvider';

import { supabase } from '~/utils/supabase';

export default function Profile() {
  const { session } = useAuth();
  const state = useReactive({
    loading: true,
    username: '',
    website: '',
    avatarUrl: '',
    fullName: '',
  });
  console.log('state', state);

  const getProfile = useCallback(async () => {
    try {
      state.loading = true;
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url,full_name`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        state.username = data.username;
        state.website = data.website;
        state.avatarUrl = data.avatar_url;
        state.fullName = data.full_name;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      state.loading = false;
    }
  }, [session, state]);

  useEffect(() => {
    if (session) getProfile();
  }, [getProfile, session]);

  const updateProfile = useCallback(
    async ({
      username,
      website,
      avatar_url,
      full_name,
    }: {
      username: string;
      website: string;
      avatar_url: string;
      full_name: string;
    }) => {
      try {
        state.loading = true;
        if (!session?.user) throw new Error('No user on the session!');

        const updates = {
          id: session?.user.id,
          username,
          website,
          avatar_url,
          full_name,
          updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
          throw error;
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
        state.loading = false;
      }
    },
    [session, state]
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <View className="flex-1 bg-white p-3 pt-10">
        <View className="mt-5 self-stretch py-1">
          <Input disabled label="Email" value={session?.user?.email} />
        </View>
        <View className="self-stretch py-1">
          <Input
            label="Username"
            value={state.username || ''}
            onChangeText={(text) => (state.username = text)}
          />
        </View>
        <View className="self-stretch py-1">
          <Input
            label="Website"
            value={state.website || ''}
            onChangeText={(text) => (state.website = text)}
          />
        </View>
        <View className="self-stretch py-1">
          <Input
            label="Full Name"
            value={state.fullName || ''}
            onChangeText={(text) => (state.fullName = text)}
          />
        </View>

        <View className="mt-5 self-stretch py-1">
          <Button
            disabled={state.loading}
            title={state.loading ? 'Loading ...' : 'Update'}
            onPress={() =>
              updateProfile({
                username: state.username,
                website: state.website,
                avatar_url: state.avatarUrl,
                full_name: state.fullName,
              })
            }
          />
        </View>

        <View className="self-stretch py-1">
          <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        </View>
      </View>
    </>
  );
}
