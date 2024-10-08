import { z } from 'zod';
import { insertAccountSchema } from '@/db/schema';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { AccountForm } from '@/features/accounts/components/account-form';
import { useCreateAccount } from '@/features/accounts/api/use-create-account';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const formSchema = insertAccountSchema.pick({
  name: true,
});

type formValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();

  const onSubmit = (values: formValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Akun Baru</SheetTitle>
          <SheetDescription>Buat akun baru untuk mencari riwayat transaksi</SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: '',
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
