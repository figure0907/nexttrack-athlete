export default function GlassCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/20 bg-white/20 backdrop-blur-lg shadow-lg p-6 text-white">
      {title && (
        <h3 className="mb-4 text-sm font-semibold tracking-wide text-white/90">
          {title}
        </h3>
      )}
      {children}
    </section>
  );
}
