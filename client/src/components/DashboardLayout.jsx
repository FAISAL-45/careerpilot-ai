import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {

  return (

    <div className="flex bg-[#050816] text-white min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">

        {children}

      </div>

    </div>

  );
}

export default DashboardLayout;