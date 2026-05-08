import { AlertTriangle, Info, CheckCircle, Clock, Cpu, User, XCircle } from "lucide-react";
import { Alert, AlertSeverity, AlertState } from "../data";

const severityConfig: Record<AlertSeverity, { icon: typeof AlertTriangle; color: string; bg: string; border: string; label: string }> = {
  critical: { icon: XCircle,       color: "text-red-500",    bg: "bg-red-50 dark:bg-red-500/10",     border: "border-red-200 dark:border-red-500/30",    label: "Critical" },
  warning:  { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-500/10", border: "border-yellow-200 dark:border-yellow-500/30", label: "Warning"  },
  info:     { icon: Info,          color: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-500/10",   border: "border-blue-200 dark:border-blue-500/30",   label: "Info"     },
};

const stateConfig: Record<AlertState, { label: string; color: string; bg: string }> = {
  active:       { label: "Active",       color: "text-red-600 dark:text-red-400",    bg: "bg-red-50 dark:bg-red-500/10"    },
  acknowledged: { label: "Acknowledged", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
  resolved:     { label: "Resolved",     color: "text-green-600 dark:text-green-400",  bg: "bg-green-50 dark:bg-green-500/10"  },
};

export default function AlertCard({ alert }: { alert: Alert }) {
  const sev   = severityConfig[alert.severity];
  const state = stateConfig[alert.state];
  const SevIcon = sev.icon;

  return (
    <div className={`bg-white dark:bg-slate-800 border ${sev.border} rounded-2xl p-5 shadow-sm`}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`p-2.5 rounded-xl shrink-0 ${sev.bg}`}>
          <SevIcon className={`w-5 h-5 ${sev.color}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{alert.title}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${sev.bg} ${sev.color}`}>{sev.label}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ml-auto ${state.bg} ${state.color}`}>{state.label}</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{alert.message}</p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Cpu className="w-3 h-3" />{alert.device} · {alert.type} · {alert.plateOrRef}</span>
            {alert.coLevel > 0 && (
              <span className={`font-semibold ${sev.color}`}>{alert.coLevel} ppm</span>
            )}
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{alert.triggeredAt}</span>
            {alert.acknowledgedBy && (
              <span className="flex items-center gap-1"><User className="w-3 h-3" />{alert.acknowledgedBy}</span>
            )}
            {alert.resolvedAt && (
              <span className="flex items-center gap-1 text-green-500"><CheckCircle className="w-3 h-3" />Resolved {alert.resolvedAt}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        {alert.state === "active" && (
          <div className="flex flex-col gap-2 shrink-0">
            <button type="button" className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-500/20 transition-all">
              Acknowledge
            </button>
            <button type="button" className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20 transition-all">
              Resolve
            </button>
          </div>
        )}
        {alert.state === "acknowledged" && (
          <button type="button" className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20 transition-all shrink-0">
            Resolve
          </button>
        )}
      </div>
    </div>
  );
}
