import { Link, Redirect, Tabs } from 'expo-router';

import { useAuth } from '~/contexts/authProvider';
import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  // 未登录则重定向到登录页
  if (!isAuthenticated) return <Redirect href={'/login'} />;
  // 已登录则显示Tab
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name="code" />,
          headerRight: () => (
            <Link asChild href="/modal">
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name="code" />,
        }}
      />
    </Tabs>
  );
}
