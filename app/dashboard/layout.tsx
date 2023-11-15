// pages/_app.tsx
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import DashboardLayout from '../components/ui/Dashboard';

export default function dashboard ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-screen'>
      <DashboardLayout/>
      {children}
    </div>
  );
};