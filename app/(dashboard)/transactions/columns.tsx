'use client';

import { InferResponseType, InferRequestType } from 'hono';
import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { client } from '@/lib/hono';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Actions } from './actions';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AccountColumn } from '@/features/transactions/components/account-column';
import { CategoryColumn } from '@/features/transactions/components/category-column';

export type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>['data'][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: 'select',
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tanggal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('date') as Date;

      return <span>{format(date, 'dd MMMM, yyyy')}</span>;
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Kategori
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <CategoryColumn id={row.original.id} category={row.original.category} categoryId={row.original.categoryId} />;
    },
  },
  {
    accessorKey: 'payee',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Pembayaran
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Jumlah uang
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      return (
        <Badge variant={amount < 0 ? 'expense' : 'primary'} className="text-xs font-medium px-3.5 py-2.5">
          {formatCurrency(amount)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'account',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Akun
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <AccountColumn account={row.original.account} accountId={row.original.accountId} />;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];