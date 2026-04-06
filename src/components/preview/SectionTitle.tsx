export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-baseline border-b border-primary pb-1 mb-3">
      <h2 className="text-[18px] font-bold text-primary mr-2 tracking-wide leading-none">
        {title}
      </h2>
      <span className="text-[12px] text-gray-400 uppercase tracking-wider leading-none">
        {subtitle}
      </span>
    </div>
  );
}