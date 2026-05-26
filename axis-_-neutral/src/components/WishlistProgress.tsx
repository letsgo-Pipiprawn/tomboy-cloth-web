type WishlistProgressProps = {
  count: number;
  goal: number;
};

export default function WishlistProgress({ count, goal }: WishlistProgressProps) {
  const safeGoal = Math.max(goal, 1);
  const pct = Math.min(100, Math.round((count / safeGoal) * 100));
  const remaining = Math.max(safeGoal - count, 0);

  return (
    <div className="rounded border border-brand-slate/25 bg-brand-black/40 p-4">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <p className="type-label text-[#C8B090]">
          {count} / {safeGoal} signups
        </p>
        <p className="type-caption text-brand-slate">{pct}% to preorder</p>
      </div>
      <div
        className="h-1.5 w-full bg-brand-slate/20 overflow-hidden"
        role="progressbar"
        aria-valuenow={count}
        aria-valuemin={0}
        aria-valuemax={safeGoal}
        aria-label={`Waitlist progress ${count} of ${safeGoal}`}
      >
        <div
          className="h-full bg-[#C8B090] transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="type-caption text-brand-slate mt-3">
        {remaining === 0
          ? 'Threshold reached — preorder opens soon.'
          : `${remaining} more signup${remaining === 1 ? '' : 's'} to unlock preorder.`}
      </p>
    </div>
  );
}
