const roleStyle: any = {
  ADMIN:    "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20",
  OPERATOR: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20",
  VIEWER:   "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600",
};

const statusStyle: any = {
  ACTIVE:    "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20",
  INACTIVE:  "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600",
  SUSPENDED: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20",
};

export function RoleBadge({ role }: { role: string }) {
  const r = role.toUpperCase();
  const style = roleStyle[r] || roleStyle.VIEWER;
  return (
    <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-tighter ${style}`}>
      {role.toLowerCase()}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const s = status.toUpperCase();
  const style = statusStyle[s] || statusStyle.INACTIVE;
  const dotColor: any = {
    ACTIVE: "bg-green-500", INACTIVE: "bg-slate-400", SUSPENDED: "bg-red-500",
  };
  const dot = dotColor[s] || dotColor.INACTIVE;
  
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-tighter ${style}`}>
      <span className={`w-1 h-1 rounded-full ${dot} animate-pulse`} />
      {status.toLowerCase()}
    </span>
  );
}
