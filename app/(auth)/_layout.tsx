import { Redirect, Stack } from 'expo-router';
import { useAuth } from '~/contexts/authProvider';

function AuthLayout() {
  const { isAuthenticated } = useAuth();
  // 已登录则重定向到主页
  if (isAuthenticated) return <Redirect href={'/'} />;
  return <Stack />;
}

export default AuthLayout;
