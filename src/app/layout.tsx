import type { Metadata } from 'next';
import './globals.css';
import { Shell } from '@/components/shell';
import { session } from '@/lib/server';
export const metadata: Metadata = {
  title: { default: 'Clair — Évaluation responsable des outils d’IA', template: '%s · Clair' },
  description: 'Prototype académique local de due diligence des fournisseurs d’IA.',
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { role } = await session();
  return (
    <html lang="fr">
      <body>
        <Shell role={role}>{children}</Shell>
      </body>
    </html>
  );
}
