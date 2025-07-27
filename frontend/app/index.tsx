import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to test screen for debugging, then to welcome
    router.replace('/welcome');
  }, [router]);

  return null;
} 