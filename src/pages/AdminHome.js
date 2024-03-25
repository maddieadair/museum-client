import AdminNavbar from "../components/AdminNavbar";
import AdminBar from "../components/AdminBar";

export default function AdminHome() {
  return (
    <div className="bg-[#F7f2f3] min-h-screen text-slate-700 font-inter">
      <div className="flex flex-row gap-x-10 pb-8 p-6">
        <AdminNavbar />
        <div className="flex flex-col gap-y-8 w-full h-full p-2">
          <AdminBar title="Dashboard" desc="Quick Information" />
        </div>
      </div>
    </div>
  );
}
