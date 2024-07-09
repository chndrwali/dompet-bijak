import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.accounts)['bulk-delete']['$post']>;
type RequestType = InferRequestType<(typeof client.api.accounts)['bulk-delete']['$post']>['json'];

export const useBulkDeleteAccounts = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts['bulk-delete']['$post']({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success('Akun dihapus');
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      //TODO: invalidate smmary
    },
    onError: () => {
      toast.error('Gagal untuk menghapus akun');
    },
  });

  return mutation;
};
