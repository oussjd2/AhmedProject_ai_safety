import Link from 'next/link';
import { ArrowRight, ClipboardList, Scale, FileCheck2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function Home() {
  return (
    <div className="mx-auto max-w-5xl py-12 md:py-20">
      <h1 className="max-w-3xl text-[40px] leading-[1.12] md:text-[58px]">
        Évaluer avec clarté.
        <br />
        <span className="text-primary">Décider avec méthode.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Du besoin initial au rapport, un parcours structuré pour examiner les risques, les garanties
        et les conditions d’acquisition d’un outil d’IA.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/cases/new">
            Nouvelle évaluation <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/dashboard">Ouvrir les dossiers</Link>
        </Button>
      </div>
      <div className="mt-20 grid gap-8 border-y border-border py-10 md:grid-cols-3">
        {[
          {
            icon: ClipboardList,
            title: 'Décrire le besoin',
            text: 'Préciser l’usage, les personnes concernées et les données utilisées.',
          },
          {
            icon: Scale,
            title: 'Examiner les exigences',
            text: 'Relier chaque réponse aux contrôles et aux preuves nécessaires.',
          },
          {
            icon: FileCheck2,
            title: 'Documenter la conclusion',
            text: 'Conserver les constats, les mesures et un rapport traçable.',
          },
        ].map((x) => (
          <div key={x.title}>
            <x.icon className="mb-5 text-primary" size={25} />
            <h3>{x.title}</h3>
            <p className="mt-3 text-muted-foreground">{x.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-7 text-xs text-muted-foreground">
        Projet académique AI Governance · Démonstration locale avec rôles simulés et données
        fictives. Aucun modèle d’IA ni service externe n’est utilisé pour l’évaluation.
      </p>
    </div>
  );
}
