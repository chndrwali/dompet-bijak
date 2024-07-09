import { z } from 'zod';
import { insertAccountSchema } from '@/db/schema';
import { AccountForm } from '@/features/accounts/components/account-form';
import { useGetAccount } from '@/features/accounts/api/use-get-account';
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Loader2 } from 'lucide-react';
import { useEditAccount } from '../api/use-edit-account';

const formSchema = insertAccountSchema.pick({
  name: true,
});

type formValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);

  const isPending = editMutation.isPending;
  const isLoading = accountQuery.isLoading;

  const onSubmit = (values: formValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: '',
      };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Akun </SheetTitle>
          <SheetDescription>Edit akun yang ada</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <AccountForm id={id} onSubmit={onSubmit} disabled={isPending} defaultValues={defaultValues} />
        )}
      </SheetContent>
    </Sheet>
  );
};
