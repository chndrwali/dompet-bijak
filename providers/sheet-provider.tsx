'use client';

import { useEffect, useState } from 'react';
import { useMountedState } from 'react-use';
import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet';

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
    </>
  );
};
