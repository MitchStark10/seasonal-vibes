import { useQuery } from 'react-query';

export const useMessage = () => {
  return useQuery('message', () =>
    fetch('/api').then(async (res) => {
      const response = await res.json();
      return response.message;
    })
  )
}