'use client';

import { Plus } from 'lucide-react';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/Data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns, Payment } from './columns';

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed52f',
    amount: 10,
    status: 'success',
    email: 'a@example.com',
  },
];

const AccountsPage = () => {
  const newAccount = useNewAccount();
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Akun</CardTitle>
          <Button onClick={newAccount.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Buat baru
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable filterKey="email" columns={columns} data={data} onDelete={() => {}} disabled={false} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;