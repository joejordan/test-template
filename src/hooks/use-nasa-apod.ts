import { useQuery } from '@tanstack/react-query';
import { useAxios } from './use-axios';

// NASA APOD API Response Types
type NasaApodResponse = {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
};

// Custom hook for NASA Astronomy Picture of the Day
export function useNasaApod(enabled = false) {
  const axios = useAxios({ baseURL: 'https://api.nasa.gov' });

  return useQuery<NasaApodResponse>({
    queryKey: ['nasa-apod'],
    queryFn: async (): Promise<NasaApodResponse> => {
      const response = await axios.get('/planetary/apod?api_key=DEMO_KEY');
      return response.data;
    },
    enabled, // Only run when explicitly enabled
    staleTime: 1000 * 60 * 30, // 30 minutes - NASA APOD updates daily
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * (2 ** attemptIndex), 30_000),
  });
}
