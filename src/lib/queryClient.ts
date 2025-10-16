import { QueryClient } from '@tanstack/react-query';

const fiveMinutes = 1000 * 60 * 5;
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: fiveMinutes,
      gcTime: fiveMinutes * 2,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

export const queryKeys = {
  planets: ['planets'] as const,
  planet: (name: string) => ['planet', name] as const,
  residents: (urls: string[]) => ['residents', ...urls.sort()] as const,
  resident: (url: string) => ['resident', url] as const,
} as const;