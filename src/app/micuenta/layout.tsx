import { Sidebar } from '@/components/sidebar/SideBar';

interface MiCuentaLayoutProps {
  children: React.ReactNode;
}

export default function MiCuentaLayout({ children }: MiCuentaLayoutProps) {
  return (
    <div className="flex bg-slate-800">
      {/* Menú lateral */}
      <Sidebar />
      {/* Contenido principal */}
      <main className="flex">{children}</main>
    </div>
  );
}
