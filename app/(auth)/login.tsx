import { Button, Input } from '@rneui/themed';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, AppState, StyleSheet, View } from 'react-native';
import { supabase } from '~/utils/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Login' }} />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          autoCapitalize={'none'}
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          placeholder="email@address.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          autoCapitalize={'none'}
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button disabled={loading} title="Sign in" onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button disabled={loading} title="Sign up" onPress={() => signUpWithEmail()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
