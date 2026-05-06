"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Eye, EyeOff, Wind } from "lucide-react";
import DarkModeToggle from "../components/DarkModeToggle";
import PageBackground from "../components/PageBackground";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <PageBackground />

      {/* Dark mode toggle */}
      <div className="absolute top-4 right-4 z-20">
        <DarkModeToggle />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="backdrop-blur-xl bg-white/80 dark:bg-white/10 border border-white dark:border-white/20 rounded-3xl p-8 shadow-2xl shadow-purple-200/60 dark:shadow-black/40">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-violet-500 to-purple-700 p-3 rounded-2xl shadow-lg shadow-purple-500/30 mb-3">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Login</h1>
            <p className="text-slate-400 dark:text-white/50 text-xs mt-1">CleanAir Monitoring System</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); router.push("/dashboard"); }}>
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-white/60 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-xl px-4 py-3 pr-10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 text-sm focus:outline-none focus:border-violet-400 transition-all"
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/40" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-white/60 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-xl px-4 py-3 pr-10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 text-sm focus:outline-none focus:border-violet-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-500 dark:text-white/60 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="w-3.5 h-3.5 accent-violet-500 rounded"
                />
                Remember Me
              </label>
              <Link href="#" className="text-slate-500 dark:text-white/60 hover:text-violet-600 dark:hover:text-white transition-colors">
                Forgot Password
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 dark:bg-white dark:hover:bg-white/90 text-white dark:text-purple-900 font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-violet-500/30 dark:shadow-black/20 mt-2"
            >
              Login
            </button>
          </form>

          <p className="text-center text-slate-400 dark:text-white/50 text-xs mt-6">
            Don&apos;t have an account?{" "}
            <Link href="#" className="text-violet-600 dark:text-white font-semibold hover:text-violet-500 dark:hover:text-violet-300 transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
