import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.categories)['bulk-delete']['$post']>;
type RequestType = InferRequestType<(typeof client.api.categories)['bulk-delete']['$post']>['json'];

export const useBulkDeleteCategories = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories['bulk-delete']['$post']({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Kategori dihapus');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      //TODO: invalidate smmary
    },
    onError: () => {
      toast.error('Gagal untuk menghapus kategori');
    },
  });

  return mutation;
};