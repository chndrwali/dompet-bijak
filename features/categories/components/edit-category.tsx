import { z } from 'zod';
import { CategoryForm } from '@/features/categories/components/category-form';
import { useGetCategory } from '@/features/categories/api/use-get-category';
import { useOpenCategory } from '@/features/categories/hooks/use-open-category';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Loader2 } from 'lucide-react';
import { useEditCategory } from '@/features/categories/api/use-edit-category';
import { useDeleteCategory } from '@/features/categories/api/use-delete-category';
import { useConfirm } from '@/hooks/use-confirm';
import { insertCategorySchema } from '@/db/schema';

const formSchema = insertCategorySchema.pick({
  name: true,
});

type formValues = z.input<typeof formSchema>;

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmDialog, confirm] = useConfirm('Apakah kamu yakin?', 'Anda akan melakukan penghapusan kategori ini.');

  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = categoryQuery.isLoading;

  const onSubmit = (values: formValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : {
        name: '',
      };
  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit kategori </SheetTitle>
            <SheetDescription>Edit kategori yang ada</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm id={id} onSubmit={onSubmit} disabled={isPending} defaultValues={defaultValues} onDelete={onDelete} />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
