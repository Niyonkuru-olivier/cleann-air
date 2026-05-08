import { Shield, Pencil } from "lucide-react";
import { alertRules, AlertSeverity } from "../data";

const severityStyle: Record<AlertSeverity, string> = {
  critical: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400",
  warning:  "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  info:     "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

export default function AlertRules() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-500" /> Alert Rules
        </h3>
        <button type="button" className="text-xs text-blue-500 hover:underline">+ Add Rule</button>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {alertRules.map((rule) => (
          <div key={rule.id} className="px-6 py-4 flex items-center gap-4">
            {/* Toggle */}
            <div className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${rule.enabled ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-600"}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${rule.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white">{rule.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {rule.condition} <span className="font-semibold text-slate-600 dark:text-slate-300">{rule.threshold}{rule.condition.includes("Reduction") ? "%" : rule.condition.includes("No data") ? " min" : " ppm"}</span>
                {" · "}{rule.appliesTo}
              </p>
            </div>

            {/* Severity */}
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize shrink-0 ${severityStyle[rule.severity]}`}>
              {rule.severity}
            </span>

            {/* Edit */}
            <button type="button" title="Edit rule" aria-label="Edit rule" className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all shrink-0">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
