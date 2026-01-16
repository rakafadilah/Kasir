import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header (STICKY) */}
        <div className="sticky top-0 z-20">
          <Header />
        </div>

        {/* Main content (SCROLL HERE) */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
