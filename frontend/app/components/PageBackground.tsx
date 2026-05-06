const rand = (seed: number) => { const x = Math.sin(seed + 1) * 10000; return x - Math.floor(x); };
const STARS = Array.from({ length: 120 }, (_, i) => ({
  big:     rand(i * 4)     < 0.3,
  bigH:    rand(i * 4 + 1) < 0.3,
  top:     rand(i * 4 + 2) * 60,
  left:    rand(i * 4 + 3) * 100,
  opacity: rand(i * 4 + 4) * 0.7 + 0.3,
}));

export default function PageBackground() {
  return (
    <>
      {/* Gradient — light: soft lavender, dark: deep purple */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-violet-100 via-purple-50 to-indigo-100 dark:from-[#0d0022] dark:via-[#2d0a6e] dark:to-[#6b21a8] transition-colors duration-300" />

      {/* Stars — dark mode only */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none hidden dark:block">
        {STARS.map((s, i) => (
          <span
            key={i}
            className={[
              "absolute rounded-full bg-white",
              s.big  ? "w-px-2" : "w-px",
              s.bigH ? "h-px-2" : "h-px",
            ].join(" ")}
            data-top={s.top}
            data-left={s.left}
            data-opacity={s.opacity}
            style={
              {
                "--star-top":     `${s.top}%`,
                "--star-left":    `${s.left}%`,
                "--star-opacity": s.opacity,
                "--star-w":       s.big  ? "2px" : "1px",
                "--star-h":       s.bigH ? "2px" : "1px",
                top:     "var(--star-top)",
                left:    "var(--star-left)",
                opacity: "var(--star-opacity)" as unknown as number,
                width:   "var(--star-w)",
                height:  "var(--star-h)",
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Mountain silhouette */}
      <svg
        className="fixed bottom-0 left-0 right-0 -z-10 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,320 L0,200 L120,100 L240,160 L380,60 L520,140 L660,40 L800,130 L940,50 L1080,140 L1200,80 L1320,150 L1440,90 L1440,320 Z"
          className="fill-violet-200 dark:fill-[#1e0050]"
          opacity="0.9"
        />
        <path
          d="M0,320 L0,240 L80,180 L180,220 L300,150 L440,200 L560,130 L700,190 L820,120 L960,180 L1080,140 L1200,190 L1320,160 L1440,200 L1440,320 Z"
          className="fill-purple-200 dark:fill-[#2d006b]"
          opacity="0.85"
        />
      </svg>

      {/* Tree silhouettes */}
      <svg
        className="fixed bottom-0 left-0 right-0 -z-10 w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[0,60,120,180,240,300,360,420,480,540,600,660,720,780,840,900,960,1020,1080,1140,1200,1260,1320,1380].map((x, i) => {
          const h = 80 + (i % 5) * 20;
          const w = 30 + (i % 3) * 10;
          return (
            <g key={x} transform={`translate(${x}, ${200 - h})`}>
              <polygon points={`${w/2},0 ${w},${h*0.45} 0,${h*0.45}`}                        className="fill-violet-400 dark:fill-[#0f0033]" opacity="0.95" />
              <polygon points={`${w/2},${h*0.2} ${w*1.1},${h*0.65} ${-w*0.1},${h*0.65}`}    className="fill-violet-400 dark:fill-[#0f0033]" opacity="0.95" />
              <polygon points={`${w/2},${h*0.4} ${w*1.2},${h*0.9} ${-w*0.2},${h*0.9}`}      className="fill-violet-400 dark:fill-[#0f0033]" opacity="0.95" />
              <rect x={w/2 - 3} y={h*0.85} width="6" height={h*0.15}                         className="fill-violet-400 dark:fill-[#0f0033]" opacity="0.95" />
            </g>
          );
        })}
      </svg>
    </>
  );
}
