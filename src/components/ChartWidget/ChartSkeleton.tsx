export function ChartSkeleton() {
  return (
    <div
      style={{
        height: 200,      
        borderRadius: '8px',
        background: 'var(--surface-1)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            90deg,
            transparent 0%,
            var(--surface-2) 50%,
            transparent 100%
          )`,
          animation: 'shimmer 1.4s infinite',
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}