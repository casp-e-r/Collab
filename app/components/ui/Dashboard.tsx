'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const DashboardLayout = () => {
  const pathname = usePathname();

  return (
    <div className="bg-blue-500 p-5">
      {pathname != '/dashboard' &&
        <button>back</button>
      }
      <div className='p-4'>
        <Link href='/dashboard/settings'>
          ssettings
        </Link>
      </div>
      <div className='p-4'>
        <Link href='/dashboard/projects'>
          projects
        </Link>
      </div>
    </div>
  );
};

export default DashboardLayout;
