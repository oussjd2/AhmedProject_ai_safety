import type { Answers, ReviewStatus } from '../src/lib/domain';

export const DEMO_VERSION = '2026-10-20.1';
export const DEMO_MARKER = 'Fixture de démonstration Clair';

type ReviewPreset = {
  status: ReviewStatus;
  justification: string;
  condition?: string;
};

export type DemoFixture = {
  key: string;
  id: string;
  title: string;
  department: string;
  owner: string;
  purpose: string;
  description: string;
  deploymentDate: string;
  vendor: { name: string; product: string };
  answers: Answers;
  documents: Record<string, string>;
  evidenceByControl: Record<string, string | null>;
  reviewOverrides: Record<string, ReviewPreset>;
  legalConclusions: Record<string, string>;
  notes: Record<string, string>;
  scoreValues?: number[];
  expected: { outcome: string; risk: string; score: number | null };
};

// All names, commitments, tests, prices and reviewer conclusions below are invented.
// These are reproducible teaching examples, not evidence about any real supplier.
const common: Answers = {
  U03: 'Enseignement',
  U04: 'Répondre au besoin décrit dans ce dossier fictif ; une solution manuelle reste possible.',
  U05: ['Enseignants'],
  U06: 'Non',
  U07: 'Non',
  U08: 'Non',
  U09: 'Non',
  U10: 'Non',
  U11: ['Publiques'],
  U12: 'Non',
  U13: 'Non',
  U14: 'Non',
  U15: 'Utilisateurs et destinataires situés en Suisse uniquement dans ce scénario.',
  U16: 'Non',
  U17: 'Non',
  U18: 'Oui',
  U19: 'Faible',
  U19a: 'Erreur de formulation détectable par la personne chargée de relire le résultat.',
  U20: 'Mise en service le 1er mars 2027 ; contrat de douze mois sans reconduction automatique.',
  U20a: 12,
  U21: 2400,
  U22: 'Non',
  U23: 'Non',
  U24: 'Non',
  U25: 'Non',
  'M-U02': 'Non',
  'M-U03': 'Non applicable : le contrat envisagé ne dépasse pas cinq ans.',
  F01: 'Entité et contact fictifs indiqués dans la fiche produit jointe.',
  F02: 'Usage limité à la tâche décrite. Aucune décision autonome sur une personne.',
  F03: 'Oui',
  F04: 'Version de démonstration 1.0 ; modèles inventés, détaillés dans la fiche produit.',
  F04a: 'Non',
  F05: 'Fournisseur du système',
  F06: 'Infrastructure dédiée fictive ; aucun autre prestataire ne reçoit le contenu.',
  F07: 'Fournisseur fictif établi en Suisse ; aucune autre entité n’intervient dans cet usage.',
  F08: 'Non',
  F09: 'Dans cette hypothèse suisse sans usage ni mise sur le marché dans l’UE, le champ territorial est examiné comme non rempli pour cet usage.',
  F10: 'Hors champ',
  F12: 'Non',
  F13: 'Non',
  F14: 'Aucune',
  F15: 'Non',
  F16: 'Oui',
  F17: 'Texte synthétique clairement présenté comme une sortie d’IA ; validation humaine requise.',
  F20: 'Tests fictifs documentés dans la fiche de sécurité ; limites et erreurs connues conservées.',
  F23: 'Aucune finalité propre sur le contenu fourni ; uniquement le service demandé.',
  F25: 'Aucun sous-traitant supplémentaire pour les contenus dans le périmètre fictif décrit.',
  F29: 'Oui',
  F30: 'Export en format ouvert puis suppression attestée sous trente jours, y compris sauvegardes.',
  F31: 'Oui',
  F32: 'Le fournisseur intervient uniquement selon les instructions définies au contrat fictif.',
  F33: 'Clés dédiées gérées dans une infrastructure suisse ; accès tracés et contrôlés.',
  F34: 'Oui',
  F36: 'Changement substantiel soumis à information préalable et accord écrit ; sortie possible.',
  F37: 'Matrice fonctionnalité / modèle / version / responsable fournie dans la fiche produit.',
  F22: 'Non',
  F24: 'Traitement, sauvegardes et accès depuis la Suisse uniquement.',
  F24a: 'Non',
  F19: 'Un utilisateur peut vérifier, corriger, refuser et remplacer toute sortie avant diffusion.',
  F27: 'Contrôle d’accès, chiffrement, séparation des clients et tests documentés ; aucune certification ISO revendiquée.',
  F28: 'Journalisation technique limitée ; gestion des incidents ; validation préalable des versions.',
  'I-F11':
    'Notification contractuelle au client sous vingt-quatre heures après découverte ; délai fictif de service, pas délai légal universel.',
  'I-F14':
    'Tests fictifs d’injection de consignes et de fuite de données décrits dans le document de sécurité.',
  'I-F16':
    'Métadonnées techniques et incidents, sans contenu ; conservation trente jours dans le scénario.',
  'I-F17': 'Journaux disponibles à la demande par export ; rétention définie au contrat fictif.',
  S01: 'Banc d’essai fictif, protocole et limites décrits dans la fiche de sécurité jointe.',
  C01: 'Assistance, export, suppression attestée, audit et résiliation précisés dans le contrat fictif.',
  C02: 'Droits de l’université préservés sur les entrées ; licence de sortie et confidentialité documentées.',
  C03: 2400,
  'M-F03': 'Situation financière inventée cohérente sur la durée ; pièce contractuelle jointe.',
  'M-F06': 'Deux déploiements de référence entièrement fictifs, décrits sans noms réels.',
  'M-F09': 'Interface web et export de fichiers ouverts ; aucune intégration UNIL effective.',
  'M-F10':
    'Consommation fictive mesurée par lot et politique de limitation des traitements inutiles.',
};

const personalData: Answers = {
  'I-U02': 'Oui',
  'I-U04': 'Oui',
  'I-U06':
    'Analyse fictive examinée par le groupe ; voir la note de traitement. Aucune validation institutionnelle réelle.',
  F21: 'Données définies par la finalité du dossier ; fournisseur sur instructions, sans finalité propre.',
  D01: 'Minimisation, droits et suppression sous trente jours selon le contrat fictif.',
  D02: 'Accord de traitement fictif signé dans l’univers du scénario ; rôles et instructions documentés.',
  'I-F06':
    'Données actives pendant la tâche ; suppression sous trente jours et purge des sauvegardes à échéance.',
  'I-F07':
    'Chiffrement au repos et en transit ; accès aux clés documenté dans la fiche de sécurité.',
  'I-F09': 'Interlocutrice fictive : Léa Exemple, par le canal contractuel de la simulation.',
  'I-F10': 'Accès, rectification, export et suppression via une demande suivie et journalisée.',
  'M-F05':
    'Interlocutrice de protection des données identifiée ; statut juridique du DPO examiné séparément.',
};

const swissScope = {
  lprd: 'NOT_APPLICABLE',
  lpdVendor: 'NOT_APPLICABLE',
  gdprUnil: 'NOT_APPLICABLE',
  gdprVendor: 'NOT_APPLICABLE',
  aiProvider: 'NOT_APPLICABLE',
  aiDeployer: 'NOT_APPLICABLE',
  category: 'OUT_OF_SCOPE',
};

export const fixtures: DemoFixture[] = [
  {
    key: 'translation',
    id: 'clair-demo-translation',
    title: 'Démo A — Traduction de documents publics',
    department: 'Faculté de lettres — unité fictive',
    owner: 'Camille Exemple',
    purpose: 'Enseignement',
    description:
      'Traduire des fiches pédagogiques déjà publiques, sans données personnelles ni notation. Une enseignante relit et approuve chaque traduction avant publication.',
    deploymentDate: '2027-03-01',
    vendor: { name: 'Lingua Campus SA — société fictive', product: 'Lingua Public 1.0' },
    answers: {
      ...common,
      U04: 'Préparer plus rapidement des fiches bilingues publiques ; la traduction manuelle reste possible.',
      F01: 'Lingua Campus SA — société fictive ; contact fictif : Alex Exemple.',
      F04: 'Lingua Public 1.0, modèle fictif Translate-CH 1.0, fourni par Lingua Campus SA.',
      F02: 'Traduction de documents publics uniquement. Pas de notation, d’admission ou de contenu confidentiel.',
      F20: 'Banc fictif de cent extraits : quatre-vingt-douze traductions jugées utilisables après relecture. Erreurs possibles sur les termes spécialisés ; aucune garantie statistique réelle.',
      S01: 'Cent extraits publics fictifs, comparaison à une traduction humaine et contrôle des termes spécialisés ; relecture systématique.',
      'M-F10':
        'Hypothèse fictive de 0,02 kWh par cent pages ; mesure illustrative sans audit indépendant.',
    },
    documents: {
      product: 'translation/produit-et-perimetre.txt',
      security: 'translation/securite-et-tests.txt',
      contract: 'translation/contrat-et-offre.txt',
    },
    evidenceByControl: {
      T01: 'product',
      T02: 'product',
      S01: 'security',
      S02: 'security',
      S03: 'product',
      C01: 'contract',
      C02: 'contract',
    },
    reviewOverrides: {},
    legalConclusions: { ...swissScope },
    notes: {
      T01: 'La fiche fictive Lingua Public 1.0 concorde avec l’usage déclaré : traduction publique, sans décision sur les personnes.',
      T02: 'Dans le scénario documenté, aucune donnée personnelle n’est transmise au service, le fournisseur commercialise cette version en Suisse seulement et aucun résultat n’est utilisé dans l’UE. Les conclusions concernent uniquement ce traitement fictif.',
      S01: 'Les mesures et tests simulés couvrent les besoins de cette traduction publique. Aucune certification ISO n’est exigée par la fiche de marché fictive ; des mesures équivalentes sont documentées.',
      S02: 'Le protocole fictif décrit les limites et la relecture obligatoire. La note de qualité tient compte des erreurs de terminologie observées dans la simulation.',
      S03: 'La fiche produit présente explicitement les sorties comme générées par IA et identifie le responsable de la chaîne fictive.',
      C01: 'L’offre simulée chiffre le coût total à 2 400 CHF pour douze mois. Les critères du marché fictif et le périmètre de la procédure sont documentés, sans prétendre fixer un seuil légal général.',
      C02: 'Le contrat fictif documente licences, restitution, confidentialité, suppression et résiliation pour l’usage public décrit.',
    },
    scoreValues: [4, 3, 5, 4],
    expected: { outcome: 'CONFORME', risk: 'Faible', score: 77 },
  },
  {
    key: 'research',
    id: 'clair-demo-research',
    title: 'Démo B — Recherche confidentielle',
    department: 'Institut de sciences sociales — équipe fictive',
    owner: 'Nora Exemple',
    purpose: 'Recherche',
    description:
      'Résumer des manuscrits inédits et des entretiens pseudonymisés comportant des informations sensibles. Les lieux d’accès, la maîtrise des clés et le verrouillage de la réutilisation restent à établir.',
    deploymentDate: '2027-03-01',
    vendor: { name: 'Research Harbor Inc. — société fictive', product: 'Manuscript Desk 2.0' },
    answers: {
      ...common,
      ...personalData,
      U03: 'Recherche',
      U04: 'Réduire le temps de synthèse de recherches inédites ; alternative : analyse locale manuelle sans transmission.',
      U05: ['Chercheurs'],
      U11: ['Personnelles', 'Confidentielles'],
      U12: 'Oui',
      U13: 'Oui',
      U13a: 'Consentements et protocole éthique fictifs limitent l’usage à cette étude ; aucune publication ni réutilisation commerciale autorisée.',
      U14: 'Oui',
      U19: 'Grave',
      U19a: 'Réidentification de participants ou divulgation de résultats non publiés ; aucune donnée réelle n’est jointe à cette démo.',
      U20: 'Mise en service envisagée le 1er mars 2027 pour douze mois ; aucun déploiement avant clarification.',
      U21: 12000,
      U22: 'Oui',
      U22a: 'Restriction fictive propre au projet : données inédites non réutilisables et accès limité aux personnes autorisées. Ce n’est pas une politique UNIL attestée.',
      F01: 'Research Harbor Inc. — société fictive, établie aux États-Unis ; contact fictif : Jordan Exemple.',
      F02: 'Synthèse assistée de recherches ; l’usage de données sensibles doit faire l’objet de garanties supplémentaires.',
      F04: 'Manuscript Desk 2.0, modèle fictif RH-Summary 2.0 et infrastructure RH-Cloud.',
      F04a: 'Oui',
      F06: 'RH-Cloud, infrastructure inventée ; liste de support et juridictions d’accès incomplètes.',
      F07: 'Entité contractante fictive aux États-Unis. Aucune exclusion déduite de cette nationalité seule.',
      F08: 'Oui',
      F09: 'Mise sur le marché UE déclarée pour le fournisseur ; usage de l’université limité à la Suisse dans ce scénario. La qualification n’établit pas la validité des transferts.',
      F10: 'Autres obligations',
      F20: 'Résumés pouvant omettre des réserves méthodologiques ; comparaison systématique par un chercheur. Aucun résultat de test réel revendiqué.',
      F21: 'Entretiens sensibles pseudonymisés et manuscrits inédits ; noms et identifiants exclus, risque de réidentification résiduel.',
      F22: 'Selon configuration',
      F24: 'Stockage suisse annoncé ; accès éventuels du support américain et localisation des sauvegardes non confirmés.',
      F24a: 'Inconnu',
      F25: 'Liste des sous-traitants et des accès de support non finalisée dans le dossier fictif.',
      F26: 'Inconnu',
      F31: 'Inconnu',
      F33: 'Le fournisseur annonce contrôler seul les clés ; accès et juridictions du support non documentés.',
      F27: 'Chiffrement annoncé et séparation des clients ; absence de preuve complète sur les clés et les accès privilégiés.',
      'I-F07': 'Repos et transit annoncés chiffrés ; contrôle indépendant des clés non démontré.',
      D01: 'Données limitées aux entretiens pseudonymisés et manuscrits de l’étude ; conservation et demandes de droits prévues dans la note fictive.',
      'I-U06':
        'Analyse d’impact fictive préparatoire réalisée ; elle demande la clarification des accès étrangers et du contrôle des clés avant toute transmission.',
      C02: 'Projet de contrat fictif sans clause finalisée sur le verrouillage organisationnel de l’entraînement.',
      C03: 12000,
      S01: 'Évaluation fictive des résumés et de leurs omissions ; les accès privilégiés restent hors du périmètre des preuves reçues.',
    },
    documents: {
      product: 'research/produit-et-perimetre.txt',
      data: 'research/traitement-et-confidentialite.txt',
      security: 'research/securite-provisoire.txt',
      contract: 'research/projet-contrat-et-offre.txt',
    },
    evidenceByControl: {
      T01: 'product',
      T02: 'product',
      D01: 'data',
      D02: 'data',
      D03: 'data',
      D04: null,
      D05: 'contract',
      S01: 'security',
      S02: 'security',
      S03: 'product',
      C01: 'contract',
      C02: 'contract',
    },
    reviewOverrides: {
      D04: {
        status: 'missing',
        justification:
          'La cartographie complète des accès étrangers et la pièce établissant les garanties de transfert n’ont pas été fournies. F24a et F26 restent Inconnu ; aucune interdiction ne découle du pays seul.',
      },
      D05: {
        status: 'correction',
        justification:
          'Le projet de contrat ne garantit pas encore la désactivation organisationnelle de la réutilisation ; le paramétrage et son verrouillage ne sont pas établis.',
        condition:
          'Obtenir une clause sans réutilisation des données et une configuration organisationnelle verrouillée avant transmission.',
      },
      S01: {
        status: 'correction',
        justification:
          'Le document provisoire annonce du chiffrement mais ne démontre pas des garanties suffisantes pour l’accès privilégié et la maîtrise des clés dans ce scénario sensible.',
        condition:
          'Documenter les accès et mettre en place une architecture ou des garanties adaptées, puis faire réexaminer la sécurité.',
      },
    },
    legalConclusions: {
      ...swissScope,
      lprd: 'APPLICABLE',
      lpdVendor: 'APPLICABLE',
      aiProvider: 'APPLICABLE',
      category: 'OTHER',
    },
    notes: {
      T01: 'Le produit et l’usage de synthèse sont identifiés. Le nom de recherche scientifique ne crée pas une exemption générale pour ce produit commercial fictif.',
      T02: 'Hypothèses de qualification du scénario : traitement public vaudois, fournisseur privé avec effets en Suisse, commercialisation UE du fournisseur, aucun résultat utilisé dans l’UE pour l’université. Les garanties de transfert restent un contrôle distinct non résolu.',
      D01: 'La note de traitement fictive justifie la tâche, les rôles et les instructions. Elle ne valide pas les accès étrangers encore inconnus.',
      D02: 'La note de traitement décrit la minimisation, les délais précis de conservation et l’exercice des droits dans le scénario.',
      D03: 'L’analyse fictive documente les données sensibles et la pseudonymisation ; les recommandations techniques restent ouvertes dans les contrôles D04 et S01.',
      S02: 'Les limites des résumés sont connues et la vérification humaine est systématique. Ce constat ne couvre pas la sécurité des accès.',
      S03: 'Les documents identifient les fonctions et le responsable fictif ; le traitement des transferts demeure à clarifier séparément.',
      C01: 'La fiche fictive chiffre le coût total à 12 000 CHF et documente les critères ; aucune notation n’est autorisée tant que les prérequis ne sont pas résolus.',
      C02: 'Les clauses générales de restitution et de sortie sont présentes ; la correction de la réutilisation est explicitement portée par D05.',
    },
    expected: { outcome: 'À CLARIFIER', risk: 'Élevé', score: null },
  },
  {
    key: 'admissions',
    id: 'clair-demo-admissions',
    title: 'Démo C — Classement des admissions',
    department: 'Programme conjoint Suisse–France — programme fictif',
    owner: 'Samir Exemple',
    purpose: 'Mixte',
    description:
      'Aider une commission à classer des candidatures pour un master conjoint fictif avec un établissement français. Les résultats sont transmis en France ; une commission prend chaque décision et traite les contestations.',
    deploymentDate: '2027-03-01',
    vendor: { name: 'Campus Décision SAS — société fictive', product: 'Admission Assist 3.0' },
    answers: {
      ...common,
      ...personalData,
      U03: 'Mixte',
      U04: 'Organiser les candidatures du programme conjoint ; alternative : classement entièrement manuel par la commission.',
      U05: ['Étudiants', 'Personnel'],
      U06: 'Oui',
      U06a: 'Admission',
      U06b: 'Classement indicatif avec profilage. La commission examine les pièces et peut ignorer le score ; recours à une seconde commission humaine.',
      U07: 'Oui',
      U11: ['Personnelles'],
      U15: 'Candidats, commission et établissement partenaire situés en Suisse et en France ; programme proposé aux personnes situées en France.',
      U16: 'Oui',
      U17: 'Oui',
      U18: 'Partiellement',
      U19: 'Grave',
      U19a: 'Classement injustifié, biais entre groupes et refus d’admission erroné. La commission et le recours limitent le risque sans le faire disparaître.',
      U20: 'Mars 2027 à février 2030 : trente-six mois, options incluses, traversant le calendrier de décembre 2027.',
      U20a: 36,
      U21: 54000,
      U22: 'Oui',
      U22a: 'Exigences fictives du projet : décision humaine, recours et réévaluation de toute modification. Aucune politique officielle UNIL inventée.',
      U23: 'Non',
      U24: 'Oui',
      'I-U06':
        'Analyse d’impact fictive jointe et clôturée dans le scénario ; contrôle trimestriel des écarts prévu.',
      F01: 'Campus Décision SAS — société fictive établie en France ; contact fictif : Léa Exemple.',
      F02: 'Aide au classement des admissions avec décision finale humaine. Décision automatique et reconnaissance d’émotions exclues.',
      F04: 'Admission Assist 3.0, modèle fictif Rank-EDU 3.0 ; fournisseur responsable : Campus Décision SAS.',
      F07: 'Fournisseur et hébergement fictifs en France ; université acquéreuse située en Suisse.',
      F08: 'Oui',
      F09: 'Fournisseur établi dans l’UE ; résultats utilisés en France par le programme conjoint. Les rôles et traitements sont évalués séparément dans la note fictive.',
      F10: 'Haut risque',
      F11: 'Aucune dérogation revendiquée : classement d’admission avec profilage. La qualification renforcée est retenue dans le scénario.',
      F12: 'Oui',
      F13: 'Oui',
      F16: 'Non',
      F17: 'Scores et explications structurées, sans média synthétique diffusé au public ; interface explicitant l’aide algorithmique.',
      F18: 'Documentation fictive : gestion des risques, données, tests de biais, journaux, instructions et supervision ; mise à niveau planifiée avant le 2 décembre 2027.',
      F19: 'La commission vérifie les pièces, peut ignorer le classement et documente sa propre décision. Une seconde commission traite les recours.',
      F20: 'Tests fictifs par groupes et contrôle des erreurs ; performances à recontrôler à chaque changement de modèle.',
      F21: 'Résultats académiques et dossiers de candidature ordinaires minimisés ; aucune donnée sensible demandée dans ce scénario.',
      F24: 'Stockage et sauvegardes en France, accès par les équipes habilitées en Suisse et en France.',
      F24a: 'Oui',
      F25: 'Infrastructure Campus Hébergement, prestataire entièrement fictif établi en France, listé au contrat.',
      F26: 'Cartographie et analyse fictives des communications Suisse–France ; rôles, destinataires, secret et garanties contractuelles documentés.',
      F33: 'Clés dédiées hébergées en France, accès privilégiés tracés et soumis à une validation contractuelle.',
      F35: 'Engagement fictif de fournir les mesures et preuves nécessaires avant le 2 décembre 2027, puis pendant toute la durée du contrat.',
      F36: 'Aucun changement automatique de finalité ou de modèle ; information préalable, accord écrit, nouvelle évaluation et possibilité de résilier.',
      C03: 54000,
      C02: 'Contrat fictif avec supervision, recours, interdiction de réutilisation et clause de conformité future datée.',
      S01: 'Protocole fictif de tests de classement, d’équité et de dérive, réexécuté à chaque version avant accord de l’université.',
      'M-F09':
        'Import de fichiers ouverts et export de résultats ; aucun raccordement au système réel de l’université.',
      'M-F10':
        'Mesure fictive des traitements par campagne, sans entraînement spécifique et avec suivi de consommation.',
    },
    documents: {
      product: 'admissions/produit-et-qualification.txt',
      data: 'admissions/traitement-et-impact.txt',
      transfer: 'admissions/flux-et-garanties.txt',
      security: 'admissions/supervision-et-tests.txt',
      contract: 'admissions/contrat-et-calendrier.txt',
    },
    evidenceByControl: {
      T01: 'product',
      T02: 'product',
      T03: 'security',
      D01: 'data',
      D02: 'data',
      D04: 'transfer',
      S01: 'security',
      S02: 'security',
      S03: 'product',
      C01: 'contract',
      C02: 'contract',
    },
    reviewOverrides: {
      T03: {
        status: 'conditional',
        justification:
          'Le scénario retient une catégorie à haut risque pour l’admission avec profilage. La commission conserve la décision ; la supervision partielle exige un suivi continu documenté.',
        condition:
          'Maintenir une décision humaine effective, un recours accessible et un contrôle trimestriel des biais pendant toute l’utilisation.',
      },
      C02: {
        status: 'conditional',
        justification:
          'Le contrat fictif contient les engagements datés et les droits de sortie ; leur réalisation et leur maintien doivent être suivis.',
        condition:
          'Obtenir les preuves de conformité future au calendrier applicable et réévaluer toute modification substantielle avant son acceptation.',
      },
    },
    legalConclusions: {
      lprd: 'APPLICABLE',
      lpdVendor: 'APPLICABLE',
      gdprUnil: 'APPLICABLE',
      gdprVendor: 'APPLICABLE',
      aiProvider: 'APPLICABLE',
      aiDeployer: 'APPLICABLE',
      category: 'HIGH_RISK',
    },
    notes: {
      T01: 'La finalité réelle est l’aide au classement d’admission, concordante avec la documentation du produit fictif ; la décision demeure humaine.',
      T02: 'Les faits inventés établissent le programme proposé en France, les résultats utilisés en France et le fournisseur français. Les champs sont analysés acteur par acteur ; le haut risque est retenu sans dérogation liée à une tâche accessoire. La décision n’est pas exclusivement automatisée.',
      D01: 'La note fictive traite la tâche publique, les rôles, les instructions et la nécessité des catégories de candidature déclarées.',
      D02: 'Les données sont minimisées, les durées et les droits sont définis, avec suppression et export documentés dans la note fictive.',
      D04: 'Les flux fictifs Suisse–France, les accès habilités et les garanties sont identifiés ; la conclusion ne repose pas sur le seul pays d’hébergement.',
      S01: 'Le dossier fictif comporte les mesures de sécurité et les tests décrits ; les engagements futurs restent suivis dans les conditions.',
      S02: 'Les tests simulés et leurs limites sont documentés ; le contrôle des biais et de la dérive est périodique et lié aux versions.',
      S03: 'La chaîne de fourniture et les explications de scores sont documentées. Aucune fonction de biométrie, d’émotion ou de manipulation n’est déclarée.',
      C01: 'La fiche de marché fictive indique une valeur totale de 54 000 CHF pour trente-six mois et les critères utilisés, sans automatiser une procédure à partir du seul montant.',
    },
    scoreValues: [4.5, 4, 4, 4],
    expected: { outcome: 'CONFORME SOUS CONDITIONS', risk: 'Élevé', score: 84 },
  },
];
