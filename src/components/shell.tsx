'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';
import { DraftContext } from './draft-guard';
import { BookOpen, FolderOpen, LayoutDashboard, ArrowUpRight, UserRound } from 'lucide-react';
import { api } from '@/lib/client';
import { roleLabels, type Role } from '@/lib/domain';
import { cn } from '@/lib/utils';
export function Shell({ role, children }: { role: Role; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const draftRef = useRef<(() => Promise<boolean>) | null>(null);
  const register = useCallback((fn: (() => Promise<boolean>) | null) => {
    draftRef.current = fn;
  }, []);
  const flushDraft = useCallback(async () => (draftRef.current ? draftRef.current() : true), []);
  const guard = useMemo(() => ({ register, flush: flushDraft }), [register, flushDraft]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const caseId = pathname.match(/^\/cases\/([^/]+)/)?.[1];
  async function switchRole(next: Role) {
    if (!(await flushDraft())) return;
    setBusy(true);
    setError('');
    try {
      await api('/api/role', {
        method: 'POST',
        body: JSON.stringify({
          role: next,
          caseId: caseId && caseId !== 'new' ? caseId : undefined,
        }),
      });
      window.location.assign(
        next === 'supplier' && caseId && caseId !== 'new'
          ? `/cases/${caseId}/vendor`
          : pathname.startsWith('/reports') && next === 'supplier'
            ? '/dashboard'
            : pathname,
      );
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }
  return (
    <DraftContext.Provider value={guard}>
      <div
        onClickCapture={async (e) => {
          if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
          const target = (e.target as Element).closest('a');
          if (!target || target.target === '_blank' || target.hasAttribute('download')) return;
          const url = new URL(target.href);
          if (url.origin !== window.location.origin || url.pathname.startsWith('/api/')) return;
          if (!draftRef.current) return;
          e.preventDefault();
          if (await flushDraft()) router.push(url.pathname + url.search + url.hash);
        }}
      >
        <aside className="no-print fixed inset-y-0 left-0 hidden w-[218px] flex-col border-r border-border bg-[#edf3f5] px-5 py-7 md:flex">
          <Link href="/" className="text-[34px] font-bold tracking-[-.065em]">
            Clair<span className="text-primary">.</span>
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">Due diligence des outils d’IA</p>
          <nav aria-label="Navigation principale" className="mt-11 flex flex-col gap-2">
            {[
              { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
              { href: '/cases', label: 'Dossiers', icon: FolderOpen },
              { href: '/sources', label: 'Sources et méthode', icon: BookOpen },
            ].map((x) => (
              <Link
                key={x.href}
                href={x.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-3 text-sm',
                  pathname.startsWith(x.href)
                    ? 'bg-[#d9e9e6] font-semibold text-primary'
                    : 'text-secondary-foreground hover:bg-white',
                )}
              >
                <x.icon size={18} />
                {x.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-border pt-5 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Prototype académique</p>
            <p className="mt-2">
              Données fictives uniquement.
              <br />
              Aucun service officiel UNIL.
            </p>
            <p className="mt-4">Version 0.1 · Démonstration locale</p>
          </div>
        </aside>
        <div className="app-main md:ml-[218px]">
          <header className="no-print flex min-h-18 items-center justify-between gap-4 border-b border-border px-5 md:px-9">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span className="font-semibold text-foreground">Espace d’évaluation</span>
              <ArrowUpRight size={14} />
            </Link>
            <div className="flex items-center gap-2">
              <UserRound size={16} className="text-muted-foreground" />
              <label htmlFor="demo-role" className="sr-only">
                Rôle simulé
              </label>
              <select
                id="demo-role"
                className="native-select"
                value={role}
                disabled={busy}
                onChange={(e) => switchRole(e.target.value as Role)}
              >
                {Object.entries(roleLabels).map(([id, label]) => (
                  <option value={id} key={id}>
                    {label} · simulé
                  </option>
                ))}
              </select>
            </div>
          </header>
          {error ? (
            <p role="alert" className="p-4 text-destructive">
              {error}
            </p>
          ) : null}
          <main className="app-main mx-auto max-w-[1560px] p-5 md:p-9">{children}</main>
        </div>
      </div>
    </DraftContext.Provider>
  );
}
