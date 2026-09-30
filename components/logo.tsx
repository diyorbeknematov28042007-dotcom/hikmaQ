export function Logo({ compact = false }: { compact?: boolean }) {
  return <span className="brand" aria-label="HIKMA">
    <svg className="brand-mark" viewBox="0 0 64 64" role="img" aria-hidden="true">
      <path d="M7 6 24 16v18L7 24V6Z" fill="#079b6b"/><path d="m7 28 17 10v20L7 48V28Z" fill="#0fc18a"/>
      <path d="m40 16 17-10v18L40 34V16Z" fill="#14ad7b"/><path d="m40 38 17-10v20L40 58V38Z" fill="#06734e"/>
      <path d="m25 17 14-8v18l-14 8V17Z" fill="#8befc4"/><path d="m25 39 14-8v22l-14-8V39Z" fill="#46dca2"/>
    </svg>
    {!compact && <span className="brand-word">HIKMA</span>}
  </span>;
}
