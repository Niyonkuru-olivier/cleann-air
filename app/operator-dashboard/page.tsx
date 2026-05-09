"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Wind } from "lucide-react";
import DarkModeToggle from "../components/DarkModeToggle";

export default function OperatorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role?.toUpperCase() !== "OPERATOR") {
        // Redirection logic if not operator can be added here
    }
    setUser(parsedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Wind className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">CleanAir <span className="text-blue-600">Operator</span></span>
        </div>
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700" />
          <div className="flex flex-col text-right">
            <span className="text-sm font-bold">{user?.name || "Loading..."}</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Operator Portal</span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-black uppercase tracking-widest mb-2 animate-pulse">
            System Module
          </div>
          <h1 className="text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Implementation
          </h1>
          <p className="text-slate-400 dark:text-slate-500 font-medium max-w-md mx-auto">
            The operator control panel is currently under development. Please check back later for full device management capabilities.
          </p>
        </div>
      </main>
    </div>
  );
}
