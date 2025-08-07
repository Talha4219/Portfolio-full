import AdminSidebar from '@/components/admin/Sidebar';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 lg:p-10">{children}</main>
    </div>
  );
}
