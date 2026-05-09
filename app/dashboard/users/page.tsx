"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Users, Pencil, Trash2, RefreshCw } from "lucide-react";
import { RoleBadge, StatusBadge } from "./components/RoleBadge";
import DarkModeToggle from "../../components/DarkModeToggle";
import { API_BASE } from "../../../lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    suspended: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [usersRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/users`),
        fetch(`${API_BASE}/admin/users/stats`)
      ]);

      if (!usersRes.ok || !statsRes.ok) {
        throw new Error("Failed to fetch data from database");
      }

      const usersData = await usersRes.json();
      const statsData = await statsRes.json();

      setUsers(usersData);
      setStats(statsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete user "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/admin/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      // Refresh data
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const avatarColors = [
    "bg-blue-500", "bg-purple-500", "bg-green-500",
    "bg-yellow-500", "bg-red-500", "bg-cyan-500",
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-gradient-clean">User Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isLoading ? "Loading counts..." : `${stats.total} users · ${stats.active} active · ${stats.suspended} suspended`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchData}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-white transition-all shadow-sm disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <DarkModeToggle />
          <Link
            href="/dashboard/users/add"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            Add User
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-3 rounded-2xl flex items-center gap-3">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users",  value: stats.total,     color: "text-slate-900 dark:text-white", bg: "bg-white dark:bg-slate-800" },
          { label: "Active",       value: stats.active,    color: "text-green-500", bg: "bg-green-50 dark:bg-green-500/5" },
          { label: "Inactive",     value: stats.inactive,  color: "text-slate-400", bg: "bg-slate-50 dark:bg-slate-800/50" },
          { label: "Suspended",    value: stats.suspended, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/5" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm text-center transition-all hover:shadow-md hover:-translate-y-1`}>
            <p className={`text-4xl font-black ${color}`}>{isLoading ? "..." : value}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-2">{label}</p>
          </div>
        ))}
      </div>

      {/* Users table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden transition-all">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500/10 p-2 rounded-lg">
               <Users className="w-4 h-4 text-blue-500" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">System Users</h3>
          </div>
          <span className="text-xs font-medium text-slate-400">Database Source</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/40">
                {["User Info", "Role", "Status", "Devices", "Joined Date", "Actions"].map((h) => (
                  <th key={h} className="text-left px-6 py-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {isLoading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400">Loading user data...</td>
                  </tr>
                ))
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Users className="w-12 h-12 text-slate-200 dark:text-slate-700 mb-3" />
                      <p className="text-slate-500 dark:text-slate-400 font-medium">No users found in database</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user, i) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-black shadow-lg shadow-black/5`}>
                          {getInitials(user.name)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-1">{user.name}</span>
                          <span className="text-[11px] text-slate-400 font-medium">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><RoleBadge role={user.role} /></td>
                    <td className="px-6 py-4"><StatusBadge status={user.status} /></td>
                    <td className="px-6 py-4 text-center sm:text-left">
                      <div className="inline-flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300">
                        {user.assignedDevices?.length || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/users/${user.id}/edit`} className="p-2 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button 
                          type="button" 
                          onClick={() => handleDelete(user.id, user.name)}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
