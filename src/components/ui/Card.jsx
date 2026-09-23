export default function Card({
  title,
  description,
  actions,
  footer,
  children,
  className = '',
  bodyClassName = 'p-5',
}) {
  return (
    <section
      className={`rounded-xl border border-black/[0.07] bg-white dark:border-night-border dark:bg-night-surface ${className}`}
    >
      {(title || actions) && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] px-5 py-4 dark:border-night-border">
          <div className="min-w-0">
            {title && <h2 className="text-base font-semibold">{title}</h2>}
            {description && <p className="muted mt-0.5 text-sm">{description}</p>}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
      {footer && (
        <footer className="border-t border-black/[0.06] px-5 py-3 dark:border-night-border">{footer}</footer>
      )}
    </section>
  );
}
