# Spécification finale des livrables d’Ahmed — Triage juridique et application web de due diligence IA pour l’UNIL

## Résumé exécutif

La contribution d’Ahmed doit devenir le **moteur d’entrée et de décision juridique** du projet. Elle ne doit pas simplement produire une liste de lois ni renvoyer systématiquement vers « une validation juridique ». À partir des réponses de l’UNIL et du fournisseur, l’application doit rendre une **recommandation déterministe, motivée et traçable** :

- **CONFORME** : aucun obstacle applicable identifié sur la base des faits et preuves disponibles ;
- **CONFORME SOUS CONDITIONS** : l’usage est admissible à condition d’appliquer les mesures précisément indiquées ;
- **À CLARIFIER** : une information nécessaire au raisonnement manque ;
- **À CORRIGER** : le dossier présente un défaut remédiable ;
- **BLOQUANT** : une règle impérative applicable interdit l’usage dans la configuration proposée, ou une condition éliminatoire de marché public valablement fixée n’est pas satisfaite.

Le moteur doit en parallèle produire la **qualification juridique**, qui est autre chose que le statut final : LPrD applicable ou non ; LPD applicable à tel acteur ; RGPD applicable ou non après son test territorial ; AI Act applicable au fournisseur et/ou à l’UNIL ; système potentiellement à haut risque ; pratique interdite ; exigences de transparence ; procédure de marché public. Un système « high-risk » n’est donc **pas** automatiquement « BLOQUANT ». Le rapport Ahmed existant va déjà dans cette direction. fileciteturn0file0

Les documents de Manel et d’Iliana ont été intégrés comme **sources de questions**, mais certaines conséquences juridiques qu’ils associent aux réponses doivent être corrigées. Par exemple, l’AIMP ne transforme pas ISO 27001 en certification légalement obligatoire pour tout achat, et la localisation hors Suisse/UE n’est pas automatiquement interdite. Les documents de Manel posent aujourd’hui ces exigences comme systématiquement « mandatory ». fileciteturn0file1 Le questionnaire d’Iliana contient de son côté plusieurs bons contrôles, mais transforme notamment certains pays, l’entraînement des données, la détention des clés, l’AIPD, la journalisation ou les décisions automatisées en interdictions trop absolues. fileciteturn0file2

Le **point de départ en matière de données de l’UNIL est la LPrD vaudoise**, puisque le régime cantonal s’applique aux autorités et établissements publics vaudois. L’article 18 LPrD autorise par ailleurs la sous-traitance sous conditions cumulatives ; le recours à un tiers n’est donc pas en soi interdit. citeturn27search0turn27search1 La LPD fédérale vise, quant à son champ personnel principal, les personnes privées et les organes fédéraux ; elle est donc particulièrement pertinente pour les fournisseurs privés, mais ne remplace pas la LPrD pour les activités publiques de l’UNIL. citeturn28search1

Le RGPD doit être testé acteur par acteur : l’article 3 couvre notamment un traitement effectué dans le contexte d’un établissement dans l’Union et, pour un acteur non établi dans l’Union, certaines activités d’offre de biens ou services aux personnes se trouvant dans l’Union ou de suivi de leur comportement. La nationalité européenne d’un étudiant ne suffit pas. citeturn28search3

Pour l’AI Act, le site doit être **date-aware**. Le règlement modificatif (UE) 2026/1744 prévoit notamment l’application des sections centrales du régime des systèmes à haut risque de l’annexe III à partir du **2 décembre 2027**, et de celles relatives aux systèmes de l’article 6(1)/annexe I à partir du **2 août 2028**. Les chapitres I et II sont déjà applicables depuis le 2 février 2025, sous réserve de certaines nouvelles interdictions introduites en 2026 qui prennent effet le 2 décembre 2026. citeturn27search2turn27search13

La spécification ci-dessous est conçue pour être transmise directement à la personne qui développe le prototype P0 avant le **30 octobre 2026**.

## Questionnaires consolidés et corrigés

### Architecture du questionnaire

Il faut conserver **deux couches distinctes** dans la base :

1. `source_text_exact` et `source_options_exact` : texte original produit par Manel, Iliana ou Ahmed, sans réécriture silencieuse ;
2. `display_text` et `decision_rules` : formulation affichée et conséquences juridiquement corrigées.

C’est essentiel notamment pour les réponses originales d’Iliana qui comportent « rédhibitoire ». Le mot doit pouvoir être conservé dans la traçabilité du projet, mais **le moteur ne doit pas conclure BLOQUANT simplement parce que le PDF initial disait “rédhibitoire”**. fileciteturn0file2

Chaque question reçoit au minimum :

`id | owner | audience | source_text_exact | source_options_exact | display_text | obligation_type | legal_basis | evidence_required | rule_ids | dedupe_group`

Les valeurs de `obligation_type` sont :

- `LEGAL_OBLIGATION`
- `PROCUREMENT_REQUIREMENT`
- `CONTRACTUAL_REQUIREMENT`
- `SCORING_CRITERION`
- `BEST_PRACTICE`
- `TRIAGE_INFORMATION`

### Questionnaire interne UNIL — noyau Ahmed

Le noyau suivant reprend le travail Ahmed du rapport actuel et constitue le questionnaire de caractérisation obligatoire. fileciteturn0file0

| ID | Question à l’UNIL | Propriétaire | Nature / activation |
|---|---|---|---|
| U01 | Quel service/faculté souhaite acquérir l’outil ? | Ahmed | TRIAGE_INFORMATION |
| U02 | Quelle tâche exacte doit accomplir l’outil ? | Ahmed | Finalité ; obligatoire avant tout raisonnement |
| U03 | L’usage est-il pédagogique, scientifique, administratif, RH ou autre ? | Ahmed | Branchement |
| U04 | Pourquoi une solution d’IA est-elle nécessaire ? Existe-t-il une solution moins intrusive ? | Ahmed | Proportionnalité / besoin |
| U05 | Qui utilisera l’outil : étudiants, enseignants, chercheurs, personnel, public ? | Ahmed | Personnes concernées |
| U06 | Le résultat sert-il uniquement d’assistance ou influence-t-il une décision sur une personne ? | Ahmed | RGPD / AI Act |
| U07 | Est-il utilisé pour l’admission ou l’affectation à une formation ? | Ahmed | Annexe III AI Act |
| U08 | Évalue-t-il les acquis, attribue-t-il une note ou oriente-t-il l’apprentissage ? | Ahmed | Annexe III AI Act |
| U09 | Surveille-t-il les étudiants pendant des examens ou détecte-t-il des comportements interdits ? | Ahmed | Annexe III / art. 5 |
| U10 | Sera-t-il utilisé pour recruter, évaluer ou gérer du personnel ? | Ahmed | Annexe III emploi |
| U11 | Quelles données seront saisies ou accessibles ? | Ahmed | LPrD / confidentialité |
| U12 | Des données sensibles sont-elles concernées ? | Ahmed | Protection renforcée |
| U13 | Des documents de recherche non publiés, sous embargo ou confidentiels seront-ils transmis ? | Ahmed | Confidentialité / PI |
| U14 | S’agit-il de données de participants, de santé ou de recherche sur l’être humain ? | Ahmed | Droit sectoriel |
| U15 | Où se trouvent les utilisateurs et personnes concernées ? | Ahmed | Territoire RGPD |
| U16 | Les outputs seront-ils utilisés dans l’UE ? Où et par qui ? | Ahmed | AI Act art. 2 |
| U17 | Le service est-il volontairement proposé à des personnes se trouvant dans l’UE ou suit-il leur comportement dans l’UE ? | Ahmed | RGPD art. 3(2) |
| U18 | Une personne humaine peut-elle vérifier, ignorer ou corriger l’output avant qu’il n’ait un effet ? | Ahmed | Décision automatisée / supervision |
| U19 | Quelle serait la gravité d’une erreur : faible, significative ou grave ? | Ahmed | Risque interne |
| U20 | Quelle est la date prévue de mise en service et la durée du contrat ? | Ahmed | Calendrier AI Act |
| U21 | Quelle est la valeur totale estimée, options/prolongations incluses ? | Ahmed | AIMP |
| U22 | Existe-t-il une politique UNIL spécifique sur l’IA, le cloud, l’hébergement ou les données ? | Ahmed | Politique interne ; **ne rien inventer** |

Pour le prototype, ajouter trois questions Ahmed qui manquent encore pour fermer le moteur :

| ID | Question ajoutée | Pourquoi |
|---|---|---|
| U23 | L’utilisation proposée entraînera-t-elle une décision exclusivement automatisée produisant des effets juridiques ou des effets significatifs comparables sur une personne ? | Permet le test exact de l’art. 22 RGPD lorsque le RGPD est applicable. |
| U24 | Le projet prévoit-il que des personnes situées dans l’UE soient directement destinataires ou affectées par les résultats du système ? Préciser pays et contexte. | Complète l’analyse extraterritoriale AI Act. |
| U25 | L’usage ou les catégories de données peuvent-ils être modifiés après le déploiement sans nouvelle autorisation ? | Déclenche la réévaluation en cas de changement de finalité ou de risque. |

L’article 22 RGPD ne prohibe pas toutes les décisions assistées par IA : il vise les décisions **fondées exclusivement sur un traitement automatisé** avec effet juridique ou effet significatif analogue, et prévoit des exceptions et garanties. citeturn28search4

### Questions internes originales d’Iliana à préserver

Les questions et choix suivants proviennent des pages 6–7 du document d’Iliana et doivent être stockés tels quels dans `source_text_exact` / `source_options_exact`. fileciteturn0file2

| ID source | Libellé original et réponses originales | Mapping corrigé |
|---|---|---|
| I-U01 | **« L’outil IA est-il utilisé pour une finalité précise ? »** a) Oui ; b) Non - rédhibitoire | `b` = BLOQUANT uniquement si un traitement personnel nécessitant une finalité déterminée ne peut être défini ; sinon À CORRIGER avant de poursuivre. |
| I-U02 | **« Cette finalité est licite car elle est justifiée par l’une des conditions suivantes : »** [conditions LPrD reproduites dans le PDF] a) Oui ; b) Aucune de ces conditions - rédhibitoire | Si LPrD applicable et aucune base légale/tâche publique ou condition renforcée pour données sensibles : BLOQUANT tant qu’aucune base valable n’existe. |
| I-U03 | **« Quel type de données seront traitées ? En dresser la liste du côté de l’UNIL ⚠️ »** a) Donnés simples ; b) Données personnelles ordinaires ; c) Donnée personnelles sensible, biométrique, profil de la personnalité… | Information de triage ; aucune option n’est en soi non conforme. |
| I-U04a | **« Des données identifiantes doivent-elles être collectées afin de répondre à la finalité ? »** a) Non - anonymisation ; b) Oui - pseudonymisation ; c) Oui - et données supplémentaires à l’objectif poursuivi | `c` + données non nécessaires = À CORRIGER. |
| I-U04b | **« Selon la finalité poursuivie, seules les données strictement nécessaires seront collectées ? »** a) Oui ; b) Non, plus que nécessaire au cas où - rédhibitoire | `b` = À CORRIGER ; BLOQUANT seulement si la collecte disproportionnée est indispensable à la configuration et ne peut être réduite. |
| I-U05 | **« La confidentialité, l’intégrité, la disponibilité et la traçabilité sont assurées… ? »** a) principes + audit ; b) principes mais pas de vérification régulière ; c) Non - rédhibitoire | `a` conforme ; `b` condition/audit ; `c` À CORRIGER, puis BLOQUANT si aucune sécurité appropriée ne peut être assurée. |
| I-U06 | **« Le traitement … présente au moins 2 des caractéristiques suivantes (ligne directrices G29) »** a) Oui → AIPD ; b) Non… | Ne jamais déduire automatiquement une AIPD LPrD. Appliquer le régime juridiquement applicable. |
| I-U07 | **« Des données personnelles particulièrement sensibles sont-elles traitées ? »** a) Non ; b) Oui, une journalisation devra obligatoirement être réalisée (art. 4 OPDo)… | `b` active une revue de journalisation ; l’OPDo fédérale ne s’applique pas automatiquement à l’UNIL. |
| I-U08 | **« Il sera aisé de communiquer avec le sous-traitant… afin de permettre … les droits… ? »** a) Oui ; b) Non - rédhibitoire | `b` = À CORRIGER ; si sous-traitant refuse toute coopération nécessaire → BLOQUANT pour le traitement personnel concerné. |
| I-U09 | **« Les résultats de l'IA serviront-ils à prendre une décision sur une personne ? »** a) Non ; b) Oui + contrôle humain + information ; c) Oui, décision prise par l’outil - rédhibitoire | `c` déclenche le test RGPD art. 22 s’il s’applique ; pas de blocage universel automatique. |

En particulier, l’article 35 RGPD exige une AIPD lorsque le traitement est **susceptible d’engendrer un risque élevé**, et cite notamment certains traitements automatisés importants, les traitements à grande échelle de catégories particulières et la surveillance systématique à grande échelle. L’existence d’une IA ne suffit donc pas, à elle seule, à produire automatiquement cette obligation. citeturn28search3

La LPD fédérale contient elle aussi un mécanisme d’analyse d’impact à son article 22 lorsqu’un traitement peut entraîner un risque élevé ; mais, selon l’article 2 LPD, ce régime vise les traitements des personnes privées et des organes fédéraux, pas automatiquement ceux d’un établissement public cantonal vaudois. citeturn28search1

### Questions internes originales de Manel à préserver

Manel prévoit trois questions internes de marché public. fileciteturn0file1

| ID | `source_text_exact` | Nature corrigée |
|---|---|---|
| M-U01 | « combien coûte l’outil par an (ou par mois) ? » / « pendant combien de temps ? » / « le conetrat prévoit-il une possibilité de prolonger ? » | TRIAGE_INFORMATION AIMP |
| M-U02 | « D’autres facultés ou services de l’UNIL achètent-ils déjà le même outil, ou prévoient-ils de le faire ? » | TRIAGE_INFORMATION ; détecter fractionnement potentiel |
| M-U03 | « La durée prévue du contrat dépasse-t-elle cinq ans ? » | TRIAGE_INFORMATION ; si oui → justification requise selon l’art. 15 AIMP, pas « illégalité automatique » |

Le développeur doit **conserver la faute “conetrat” uniquement dans `source_text_exact`**. L’interface peut afficher « contrat ».

### DDQ fournisseur — noyau Ahmed

Le questionnaire Ahmed actuel F01–F30 est à conserver. fileciteturn0file0

| ID | Question fournisseur | Branche principale |
|---|---|---|
| F01 | Indiquez le nom juridique du fournisseur, l’entité contractante, le produit et sa version. | Identification |
| F02 | Décrivez les fonctionnalités et la finalité prévue ainsi que les usages exclus/interdits. | Finalité |
| F03 | Le produit constitue-t-il un système d’IA au sens de l’AI Act ? Justifiez. | AI Act art. 3 |
| F04 | Utilise-t-il un ou plusieurs modèles d’IA à usage général ? Lesquels, de quelle version et de quel fournisseur ? | GPAI |
| F05 | Quel rôle exerce votre entreprise : fournisseur du système, fournisseur du modèle, intégrateur, importateur, distributeur ou autre ? | Acteurs |
| F06 | Quels autres prestataires, API, modèles et infrastructures sont nécessaires au service ? | Chaîne de valeur |
| F07 | Dans quels pays sont établies les entités concernées ? | Territoire |
| F08 | Le système ou le modèle est-il mis sur le marché ou mis en service dans l’UE ? | AI Act art. 2 |
| F09 | Selon votre analyse, le système relève-t-il de l’AI Act ? Pour quels acteurs et quelles activités ? | AI Act |
| F10 | Quelle classification AI Act attribuez-vous à chaque cas d’usage : interdit, high-risk, art. 50, autre ? | Qualification |
| F11 | Si vous considérez un cas de l’annexe III comme non-high-risk, fournissez l’analyse documentée fondée sur l’art. 6(3). | Art. 6(3) |
| F12 | Le système effectue-t-il un profilage de personnes ? | Art. 6 / données |
| F13 | Peut-il être utilisé pour admission, notation, évaluation, orientation ou surveillance d’examens ? | Annexe III |
| F14 | Le produit infère-t-il des émotions ou utilise-t-il la biométrie ? | Art. 5 / annexe III |
| F15 | Possède-t-il une fonction de manipulation comportementale, exploitation de vulnérabilités ou autre fonction pouvant relever de l’art. 5 ? | Interdictions |
| F16 | Interagit-il directement avec des personnes ? | Transparence |
| F17 | Produit-il du texte, de l’audio, des images ou vidéos synthétiques, et comment sont-ils détectables/marqués ? | Art. 50 |
| F18 | Si high-risk, fournissez votre documentation sur les exigences pertinentes des art. 8–15 et votre conformité à la date prévue de déploiement. | High-risk |
| F19 | Quelles possibilités de supervision humaine le système offre-t-il ? | Art. 14 / 26 |
| F20 | Quelles sont les limites connues, taux d’erreur, biais et conditions de mauvaise utilisation raisonnablement prévisibles ? | Risque / score |
| F21 | Quelles données le système reçoit, produit, conserve et journalise ? | Données |
| F22 | Utilisez-vous les données, prompts ou outputs de l’UNIL pour entraîner, affiner, évaluer ou améliorer vos modèles ? | Réutilisation |
| F23 | Pour quelles finalités déterminez-vous vous-même l’utilisation de ces données ? | Qualification des rôles |
| F24 | Dans quels pays les données sont-elles traitées, stockées, sauvegardées ou accessibles ? | Transferts |
| F25 | Quels sous-traitants ou sous-traitants ultérieurs accèdent aux données ? | LPrD art. 18 / RGPD art. 28 |
| F26 | Quelles garanties juridiques couvrent les transferts vers des pays sans protection adéquate ? | Transferts |
| F27 | Quelles mesures de sécurité et procédures d’incident sont mises en œuvre ? | Sécurité |
| F28 | Comment les changements de modèles, versions, finalités ou sous-traitants sont-ils communiqués ? | Réévaluation |
| F29 | Acceptez-vous de fournir les documents et logs nécessaires pour démontrer la conformité et permettre l’audit ? | Preuves / audit |
| F30 | Quelles données et formats sont restitués ou supprimés à la fin du contrat ? | Réversibilité |

Ajouter les questions suivantes pour rendre le DDQ complet :

| ID | Question | Owner | Nature |
|---|---|---|---|
| F31 | La fonctionnalité d’utilisation des données clients pour l’entraînement peut-elle être désactivée **au niveau de l’organisation par défaut et verrouillée administrativement** ? | Ahmed / Iliana | CONTRACTUAL + DATA |
| F32 | Pour chaque traitement de données UNIL, indiquez si vous agissez uniquement sur instructions de l’UNIL ou si vous déterminez une finalité propre. | Ahmed | LEGAL_TRIAGE |
| F33 | Quelle entité peut accéder aux clés de chiffrement et depuis quelle juridiction ? | Ahmed / Noé | DATA / SECURITY |
| F34 | Pouvez-vous assurer une séparation logique des données UNIL et empêcher leur utilisation par d’autres clients ? | Noé | SECURITY |
| F35 | Indiquez la date d’introduction prévue des mesures nécessaires à la conformité AI Act pendant toute la durée envisagée du contrat. | Ahmed | DATE_AWARE |
| F36 | Une modification substantielle du produit ou de sa finalité peut-elle intervenir automatiquement ? Comment l’UNIL peut-elle la refuser ? | Ahmed / Manel | CONTRACTUAL |
| F37 | Pouvez-vous fournir une matrice indiquant, pour chaque fonctionnalité, le modèle sous-jacent, la version et l’entité juridiquement responsable ? | Ahmed | SUPPLY_CHAIN |

### Questions exactes de Manel à rattacher au DDQ

Les libellés sont conservés. fileciteturn0file1

| ID | Libellé original | Qualification correcte |
|---|---|---|
| M-F01 | « Disposez-vous d’une certification de sécurité de l’information ? » | Critère d’aptitude **seulement si UNIL l’a défini comme tel** ; sinon preuve de sécurité / best practice |
| M-F02 | « Pouvez-vous héberger les données de l’UNIL en Suisse ou dans l’Union européenne ? » | Question de localisation ; pas exclusion légale automatique |
| M-F03 | « Pouvez-vous démontrer la stabilité financière de votre entreprise pour toute la durée du contrat ? » | Critère d’aptitude possible si annoncé |
| M-F04 | « Disposez-vous d’une procédure de gestion des incidents de sécurité, et dans quel délai informez-vous vos clients ? (Renforce la protection des données même en dehors d’un contexte données personnelles) » | Sécurité + éventuelle exigence contractuelle |
| M-F05 | « Avez-vous désigné un responsable de la protection des données ? » | Vérifier d’abord si un DPO est légalement exigé ; sinon demander interlocuteur privacy |
| M-F06 | « Pouvez-vous présenter des déploiements comparables à celui envisagé par l’UNIL ? » | Critère d’aptitude possible |
| M-F07 | « Quelle est la précision de votre outil, et comment ses résultats peuvent-ils être vérifiés (ex: citation des sources) ? » | SCORE |
| M-F08 | « Quel est le coût total de l’outil sur toute la durée du contrat, y compris l’intégration, la formation et la sortie ? » | SCORE |
| M-F09 | « Votre outil s’intègre-t-il aux systèmes informatiques existants de l’UNIL ou à des systèmes équivalents ? » | SCORE ou exigence technique |
| M-F10 | « Quel est l’impact environnemental de votre outil, notamment sa consommation énergétique ? » | SCORE |

Les spécifications, critères d’aptitude et critères d’adjudication doivent être annoncés dans les documents de procédure, et les critères d’adjudication avec leur pondération. L’État de Vaud précise également qu’un adjudicateur **peut** définir certains critères d’aptitude et demander des certificats ; cela démontre précisément qu’une certification particulière résulte de la conception du marché et non d’une obligation universelle de l’art. 27 AIMP. citeturn28search2turn28search7

Les pondérations 40/30/15/15 de Manel sont donc une **proposition du groupe**, non un commandement légal. fileciteturn0file1

### Questions exactes d’Iliana — fournisseur

Les réponses originales doivent être stockées sans modification ; la colonne finale indique l’effet juridique corrigé. fileciteturn0file2

| ID | Question/options originales essentielles | Mapping du moteur |
|---|---|---|
| I-F01 | Fournisseur/maison mère pour données ordinaires : a CH ; b UE ; c pays listé ; d USA DPF ; e filiale CH/UE groupe US ; f USA non-DPF ; g autre - rédhibitoire | Toutes les options = déclenchement d’analyse, **pas de blocage par pays seul**. |
| I-F02 | Même question données sensibles ; d/e/f qualifiés « rédhibitoire » | CLOUD Act / secrets / chiffrement → analyse renforcée ; pas de rejet automatique par nationalité. |
| I-F03 | Où données ordinaires traitées/stockées/sauvegardées/consultées ? CH / pays adéquat / US DPF / autre | Déclenche LPrD art. 17 et garanties. |
| I-F04 | Même question données sensibles ; plusieurs options « rédhibitoire » | Appliquer secret + garanties renforcées ; correction ou blocage uniquement après analyse concrète. |
| I-F05 | Si pays non adéquat, quelle base de transfert selon art. 17 LPrD ? a–g exceptions/garanties ; h aucune - rédhibitoire | `h` → À CORRIGER ; BLOQUANT si aucun mécanisme valable ne peut être établi et transfert indispensable. |
| I-F06 | Conservation proportionnelle : a durée proportionnelle ; b « aussi longtemps que nécessaire - rédhibitoire » | `b` = À CLARIFIER, pas BLOQUANT : demander durée/critères précis. |
| I-F07 | Chiffrement : a repos+transit ; b transit seul - rédhibitoire ; c non - rédhibitoire ; remarque « UNIL doit détenir les clés » | Mesures proportionnées au risque ; régime spécial lorsque données sensibles exposées à législation étrangère. |
| I-F08 | Réutilisation entraînement : a non ; b désactivation user/admin - rédhibitoire ; c oui - rédhibitoire | `b` peut devenir CONFORME SOUS CONDITIONS si désactivation organisationnelle verrouillée ; `c` dépend données/rôles/finalité. |
| I-F09 | Communication pour droits : a contact ; b non - rédhibitoire | `b` = À CORRIGER ; blocage si coopération requise impossible. |
| I-F10 | Accès/modification/export/suppression : a ≤10 jours ; b pas backups/logs ; c impossible - rédhibitoire | 10 jours = SLA contractuel, pas délai légal universel. |
| I-F11 | Notification violation : a 24–72h ; b >72h justification | Délai fournisseur contractuel distinct du délai du responsable vers l’autorité. |
| I-F12 | Mesures CIA+traçabilité : a + ISO/audit ; b sans cert/audit ; c principe manquant - rédhibitoire ; d aucune description - rédhibitoire | Évaluer mesures réelles ; ISO ≠ obligation légale universelle. |
| I-F13 | Fin contrat : a export + suppression attestée ; b suppression sans export ; c rien | `a` favorable ; `b` condition selon besoin ; `c` À CORRIGER. |
| I-F14 | Tests attaques IA : a tests documentés ; b tests non documentés ; c non | Exigence sécurité/risk-based ou SCORE ; pas universal blocking. |
| I-F15 | Journalisation : a oui + « 6 mois minimum » ; b non mais recommandée | Séparer OPDo et AI Act ; ne pas fusionner leurs durées/champs. |
| I-F16 | Événements journalisés, dont « contenu - rédhibitoire » | Le contenu dans les logs n’est pas automatiquement interdit ; appliquer nécessité/proportionnalité/confidentialité. |
| I-F17 | Journaux mis à disposition UNIL : a oui au moins 1 an ; b non | Durée dépend du régime applicable et du besoin contractuel. |

Pour la sous-traitance LPrD, le texte opérationnel déterminant est l’article 18 : la sous-traitance est permise notamment si le traitement est prévu par la loi ou un contrat offrant un niveau adéquat de protection, si l’autorité peut elle-même traiter les données et si aucun secret ne l’interdit. citeturn27search0

URL officielle : `https://www.vd.ch/etat-droit-finances/protection-des-donnees-et-droit-a-linformation/protection-des-donnees`

## Moteur de décision déterministe

### Principe de calcul

Le moteur doit appliquer des règles de droit, pas un LLM.

Chaque exécution produit au moins :

```text
law_applicability
legal_classification
rule_results[]
required_evidence[]
missing_evidence[]
conditions[]
remediations[]
blocking_reasons[]
score_eligibility
overall_status
human_readable_recommendation
source_versions[]
```

La règle d’agrégation globale est :

```text
SI au moins un BLOQUANT confirmé
    => BLOQUANT

SINON SI un fait ou document indispensable manque
    => À CLARIFIER

SINON SI une non-conformité actuelle mais remédiable existe
    => À CORRIGER

SINON SI l'usage n'est admissible qu'avec une condition future/contractuelle/technique
    => CONFORME SOUS CONDITIONS

SINON
    => CONFORME
```

Une condition de marché public peut elle aussi produire `BLOQUANT`, mais le moteur doit enregistrer :

```json
{
  "status": "BLOQUANT",
  "blocking_type": "PROCUREMENT_REQUIREMENT"
}
```

et non laisser croire que le fournisseur est « illégal ».

### Arbre décisionnel

```mermaid
flowchart TD
    A[Créer dossier UNIL] --> B{Finalité précise ?}

    B -- Non --> B1[À CORRIGER / préciser usage]
    B -- Oui --> C[Caractériser produit + fournisseur]

    C --> D{Informations essentielles disponibles ?}
    D -- Non --> D1[À CLARIFIER]
    D -- Oui --> E[Appliquer tests de champ juridique]

    E --> E1[LPrD Vaud]
    E --> E2[LPD fédérale]
    E --> E3[RGPD art. 3]
    E --> E4[AI Act art. 2]
    E --> E5[AIMP / LMP-VD]

    E4 --> F{AI Act applicable à l'acteur / usage ?}
    F -- Non --> G[Continuer autres régimes]
    F -- Oui --> H{Pratique art. 5 interdite et interdiction en vigueur ?}

    H -- Oui sans exception --> H1[BLOQUANT]
    H -- Non --> I{Cas annexe III / art. 6 ?}

    I -- Oui --> J{Dérogation art. 6(3) applicable ?}
    J -- Oui documentée --> K[Non-high-risk pour ce cas]
    J -- Non --> L[HIGH-RISK]

    L --> M{Obligations high-risk déjà applicables à la date du déploiement ?}
    M -- Oui --> N[Vérifier art. 8-15 + 26/27 selon rôle]
    M -- Non mais contrat dépasse date --> O[CONFORME SOUS CONDITIONS : future compliance]

    E1 --> P{Données personnelles ?}
    P -- Oui --> Q{Base légale / tâche publique + proportionnalité ?}
    Q -- Non --> Q1[BLOQUANT si aucune régularisation possible]
    Q -- Oui --> R{Sous-traitance ?}
    R -- Oui --> S[Vérifier art. 18 LPrD + contrat]

    S --> T{Accès / transfert étranger ?}
    T -- Oui --> U[Vérifier adéquation / garanties / secret / accès étranger]
    U --> V{Garantie suffisante possible ?}
    V -- Non --> V1[BLOQUANT]
    V -- Oui mais à mettre en place --> V2[À CORRIGER ou SOUS CONDITIONS]

    E3 --> W{RGPD art. 3 positif ?}
    W -- Oui --> X[Activer RGPD]
    X --> Y{Décision exclusivement automatisée significative ?}
    Y -- Oui --> Z{Exception art.22 + garanties ?}
    Z -- Non --> Z1[BLOQUANT]
    Z -- Oui --> Z2[CONFORME SOUS CONDITIONS]

    E5 --> AA[Calcul valeur / procédure]
    AA --> AB[Appliquer spécifications + aptitude annoncées]
    AB --> AC{Exigence éliminatoire valablement fixée échouée ?}
    AC -- Oui --> AC1[BLOQUANT - PROCUREMENT]
    AC -- Non --> AD[Éligible aux critères d'adjudication]
    AD --> AE[Calcul score]

    G --> AF[Agrégation]
    K --> AF
    N --> AF
    O --> AF
    V2 --> AF
    Z2 --> AF
    AE --> AF

    AF --> AG[Rapport motivé + sources + conditions]
```

### Registre juridique du moteur

Les textes doivent être stockés comme **données versionnées**, pas codés en dur dans les composants React.

| Source ID | Texte / article | Test | Date importante |
|---|---|---|---|
| VD-LPRD-18 | LPrD art. 18 | Sous-traitance | En vigueur |
| CH-LPD-2 | LPD art. 2 | Champ LPD | En vigueur depuis nouvelle LPD, 1.9.2023 |
| CH-LPD-22 | LPD art. 22 | AIPD du responsable relevant de LPD | En vigueur |
| CH-OPDO-4 | OPDo art. 4 | Journalisation dans son champ | En vigueur |
| EU-GDPR-3 | RGPD art. 3 | Territoire | Depuis 25.5.2018 |
| EU-GDPR-22 | RGPD art. 22 | Décisions automatisées | En vigueur |
| EU-GDPR-28 | RGPD art. 28 | Sous-traitant | En vigueur |
| EU-GDPR-35 | RGPD art. 35 | DPIA | En vigueur |
| EU-GDPR-45-46 | RGPD art. 45–46 | Transferts | En vigueur |
| EU-AIA-2 | AI Act art. 2 | Champ territorial/matériel | Selon art. 113 |
| EU-AIA-5 | AI Act art. 5 | Pratiques interdites | Principalement 2.2.2025 ; certaines nouvelles règles 2.12.2026 |
| EU-AIA-6 | AI Act art. 6 | High-risk | Calendrier 2026/1744 |
| EU-AIA-AIII | Annexe III | Cas éducation/RH, etc. | Régime principal 2.12.2027 |
| EU-AIA-50 | AI Act art. 50 | Transparence | Calendrier propre |
| AIMP-15 | AIMP art. 15 | Valeur/durée | En vigueur VD |
| AIMP-27 | AIMP art. 27 | Aptitude | En vigueur VD |
| AIMP-29 | AIMP art. 29 | Adjudication | En vigueur VD |

Pour la LPD, l’article 2 dit en substance que la loi couvre les traitements des **personnes privées et organes fédéraux** ; l’article 22 impose une analyse d’impact au responsable lorsque le traitement envisagé peut entraîner un risque élevé. citeturn28search1

URL Fedlex : `https://www.fedlex.admin.ch/eli/cc/2022/491/fr`

Pour le RGPD, l’article 3(1) applique le règlement au traitement effectué dans le contexte des activités d’un établissement d’un responsable ou sous-traitant dans l’Union. L’article 3(2) ajoute certains traitements par des acteurs hors UE liés à l’offre à des personnes dans l’Union ou à leur suivi. citeturn28search3

URL : `https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra`

Pour les décisions automatisées, l’extrait essentiel de l’article 22 est : **« décision fondée exclusivement sur un traitement automatisé »** ayant l’effet qualifié par l’article ; l’article prévoit ensuite des exceptions et notamment des garanties d’intervention humaine. citeturn28search4

Pour l’AI Act, utiliser la version consolidée intégrant le règlement 2026/1744. citeturn27search13

URL consolidée : `https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng`

URL modificative : `https://eur-lex.europa.eu/eli/reg/2026/1744/oj`

Le règlement modificatif fixe explicitement le **2 décembre 2027** pour les systèmes high-risk de l’article 6(2)/annexe III et le **2 août 2028** pour ceux de l’article 6(1)/annexe I. citeturn27search2

### Règles d’applicabilité

| Rule ID | Condition déterministe | Conséquence |
|---|---|---|
| LAW-VD-01 | `unil_processes_personal_data == true` dans ses activités publiques | `LPRD = APPLICABLE` |
| LAW-CH-01 | `vendor_private_entity == true` et traitement entrant dans champ suisse pertinent | `LPD_VENDOR = APPLICABLE/POTENTIAL` |
| LAW-GDPR-01 | `actor_established_in_EU == true` et traitement dans contexte établissement | `GDPR(actor)=APPLICABLE` |
| LAW-GDPR-02 | acteur hors UE + `offers_goods_services_to_people_in_EU == true` | `GDPR(actor)=APPLICABLE` |
| LAW-GDPR-03 | acteur hors UE + `monitors_behaviour_in_EU == true` | `GDPR(actor)=APPLICABLE` |
| LAW-AI-01 | fournisseur met système/GPAI sur marché UE | `AI_ACT_PROVIDER=APPLICABLE` |
| LAW-AI-02 | déployeur établi/situé UE | `AI_ACT_DEPLOYER=APPLICABLE` |
| LAW-AI-03 | fournisseur/déployeur pays tiers + outputs utilisés UE | AI Act applicable au rôle correspondant |
| LAW-AI-04 | produit spécifiquement développé et mis en service **uniquement** pour R&D scientifique | examiner exclusion art. 2(6) |
| LAW-AI-05 | produit commercial généraliste simplement utilisé par chercheur UNIL | **pas** d’exclusion R&D automatique |
| LAW-PROC-01 | achat soumis au cadre vaudois de marchés publics | activer AIMP/LMP-VD |

**Ne jamais réutiliser le test RGPD comme test AI Act ou inversement.** Le RGPD ne contient pas un critère général « output utilisé dans l’UE ». L’AI Act, lui, comporte un mécanisme extraterritorial spécifique à certains résultats utilisés dans l’Union. citeturn28search3turn27search13

### Règles AI Act

| ID | Condition | Preuve | Résultat |
|---|---|---|---|
| AI-ART5-01 | Fonction + usage correspondent exactement à une pratique interdite de l’art. 5, disposition déjà applicable, aucune exception | Documentation fonctionnelle + cas d’usage | BLOQUANT |
| AI-EDU-01 | admission/accès à établissement/programme + AI Act applicable | intended purpose, workflow | `HIGH_RISK_CANDIDATE` |
| AI-EDU-02 | évaluation des acquis/notes/orientation pédagogique | idem | `HIGH_RISK_CANDIDATE` |
| AI-EDU-03 | surveillance/détection comportement interdit durant examens | idem | `HIGH_RISK_CANDIDATE` |
| AI-EMOTION-01 | inférence d’émotions dans établissement d’enseignement et pas exception applicable | documentation | BLOQUANT si interdiction applicable |
| AI-63-01 | cas annexe III + fournisseur invoque art. 6(3) | analyse art. 6(3) documentée | À CLARIFIER jusqu’à réception |
| AI-63-02 | système fait profilage de personnes | preuve fonctionnelle | ne pas permettre dérogation art. 6(3) |
| AI-HR-DATE-01 | Annex III high-risk + déploiement/contrat après 2.12.2027 | documentation art. 8–15 | exigences high-risk activées |
| AI-HR-DATE-02 | achat avant 2.12.2027 mais contrat continue après | roadmap contractuelle | CONFORME SOUS CONDITIONS si conformité future crédible et contractualisée |
| AI-DEP-01 | UNIL est déployeur relevant des obligations high-risk applicables | instructions, supervision, processus | vérifier art. 26 |
| AI-FRIA-01 | conditions de l’art. 27 réunies | FRIA documentée | À CORRIGER si exigible et non réalisée |
| AI-TRANSP-01 | interaction directe / contenu synthétique relevant art. 50 | interface, marquage | vérifier obligation de transparence |

Le texte consolidé distingue clairement pratiques interdites et high-risk ; il ne permet pas de transformer une qualification high-risk en interdiction générale d’achat. citeturn27search13

### Règles LPrD et transferts

| ID | Condition | Résultat |
|---|---|---|
| VD-PURPOSE-01 | données personnelles + aucune finalité déterminée | À CORRIGER ; BLOQUANT si aucune finalité légitime ne peut être définie |
| VD-LAWFUL-01 | données personnelles + UNIL sans base légale/tâche publique adéquate | BLOQUANT |
| VD-MIN-01 | données supplémentaires non nécessaires | À CORRIGER |
| VD-PROC-01 | fournisseur traite pour UNIL sur instructions | exiger contrat art. 18 |
| VD-PROC-02 | contrat art. 18 absent mais négociable | À CORRIGER |
| VD-PROC-03 | fournisseur refuse les garanties nécessaires art. 18 | BLOQUANT pour le traitement concerné |
| VD-XFER-01 | traitement hors Suisse | analyser pays + accès + secret + garanties ; jamais block uniquement sur pays |
| VD-XFER-02 | pays non adéquat + garanties supplémentaires possibles | CONFORME SOUS CONDITIONS / À CORRIGER |
| VD-XFER-03 | transfert indispensable + aucun mécanisme légal de protection disponible | BLOQUANT |
| VD-OWNPURPOSE-01 | sous-traitant veut réutiliser données personnelles UNIL pour finalité propre | requalifier rôle + licéité ; À CORRIGER jusqu’à résolution |
| VD-TRAIN-01 | entraînement désactivable globalement et contractualisé | CONFORME SOUS CONDITIONS |
| VD-TRAIN-02 | vendor exige entraînement avec données personnelles/confidentielles et aucune base/autorisation valable | BLOQUANT pour cette configuration |

La position officielle vaudoise est particulièrement importante ici : l’article 18 permet la sous-traitance **sous conditions**, il ne l’interdit pas. citeturn27search0

L’Autorité vaudoise maintient en outre un registre pour les fichiers des autorités et établissements publics ; la supervision cantonale relève de l’APDI vaudoise, et non automatiquement du PFPDT fédéral. citeturn27search6turn27search8

### Règles RGPD

| ID | Condition | Sortie |
|---|---|---|
| GDPR-PURPOSE-01 | RGPD applicable + données collectées sans finalité déterminée / compatible | À CORRIGER / éventuellement BLOQUANT |
| GDPR-PROC-01 | processor + contrat art. 28 manquant | À CORRIGER |
| GDPR-SUB-01 | nouveau sous-traitant ultérieur sans mécanisme prévu art. 28 | À CORRIGER |
| GDPR-DPIA-01 | RGPD applicable + traitement susceptible de risque élevé art. 35 | DPIA_REQUIRED |
| GDPR-DPIA-02 | DPIA required et non réalisée avant traitement | À CORRIGER |
| GDPR-AUTO-01 | décision entièrement automatisée + effet juridique/significatif | vérifier art. 22(2) |
| GDPR-AUTO-02 | aucune exception art. 22(2) | BLOQUANT |
| GDPR-AUTO-03 | exception existe mais intervention/contestation requises absentes | À CORRIGER |
| GDPR-XFER-01 | transfert vers pays couvert adéquation | voie art. 45 possible |
| GDPR-XFER-02 | pas d’adéquation + garantie art. 46 valide | CONFORME SOUS CONDITIONS |
| GDPR-XFER-03 | ni adéquation, ni garantie/derogation applicable | BLOQUANT si transfert indispensable |

Le RGPD autorise expressément des mécanismes de transfert hors pays adéquat via des garanties appropriées ; une destination hors UE n’est donc pas automatiquement interdite. citeturn28search3

### Mapping complet des réponses sensibles d’Iliana

C’est la table la plus importante pour le développeur, car elle remplace les « rédhibitoire » écrits dans le PDF par des règles défendables.

| Réponse | Statut automatique corrigé | Justification |
|---|---|---|
| I-U01 b — aucune finalité | À CORRIGER ; BLOQUANT si traitement personnel demeure sans finalité/base valable | La finalité est préalable à la licéité |
| I-U02 b — aucune condition légale | BLOQUANT lorsque LPrD applicable et aucune autre base n’existe | Traitement public sans fondement |
| I-U04a c — données supplémentaires | À CORRIGER | Minimisation/proportionnalité |
| I-U04b b — collecte « au cas où » | À CORRIGER | Réduire données |
| I-U05 b — pas de vérification fournisseur | CONFORME SOUS CONDITIONS | Ajouter contrôle/audit adapté |
| I-U05 c — sécurité inadéquate | À CORRIGER ; BLOQUANT si non remédiable | Sécurité requise |
| I-U06 a — ≥2 critères G29 | `DPIA_CANDIDATE`, pas résultat final | Appliquer art. 35 RGPD ou autre régime réellement applicable |
| I-U07 b — données sensibles | `ENHANCED_REVIEW`, pas journalisation automatique OPDo | OPDo ≠ LPrD |
| I-U08 b — aucune coopération droits | À CORRIGER ; refus persistant → BLOQUANT | Sous-traitance ne doit pas rendre droits impraticables |
| I-U09 b — contrôle humain | CONFORME SOUS CONDITIONS selon autres règles | Vérifier intervention réelle |
| I-U09 c — décision outil seule | À CLARIFIER puis test art. 22 si RGPD | Pas prohibition universelle |
| I-F01/02 — localisation étrangère | À CLARIFIER jusqu’à analyse transfert/accès | Pays seul insuffisant |
| I-F03/04 — traitement étranger | activer VD-XFER / GDPR-XFER | Pas automatic block |
| I-F05 h — aucun mécanisme | À CORRIGER ; BLOQUANT si impossible à corriger | Ajouter voie juridique ou changer architecture |
| I-F06 b — « aussi longtemps que nécessaire » | À CLARIFIER | Exiger durée/critère précis ; formulation n’est pas en soi illégale |
| I-F07 a — repos + transit | CONFORME sur ce contrôle seulement | Sous réserve des clés/architecture |
| I-F07 b — transit uniquement | À CLARIFIER/À CORRIGER selon risque | Pas interdiction universelle |
| I-F07 c — aucun chiffrement | À CORRIGER ; éventuellement BLOQUANT selon risque | Sécurité insuffisante possible |
| I-F08 a — aucune réutilisation | CONFORME sur ce contrôle | Contractualiser |
| I-F08 b — opt-out nécessaire | CONFORME SOUS CONDITIONS si admin peut verrouiller | Exiger configuration organisationnelle |
| I-F08 c — entraînement | À CLARIFIER puis rôle/finalité/base | BLOQUANT seulement si usage ne peut être rendu licite |
| I-F09 b — pas de contact | À CORRIGER | Mécanisme de coopération |
| I-F10 a — ≤10 jours | CONFORME comme SLA | Pas présenter comme délai légal universel |
| I-F10 b — backups/logs non modifiables | À CLARIFIER | Examiner architecture, rétention et exceptions |
| I-F10 c — droits impossibles | À CORRIGER ; potentiellement BLOQUANT | Selon droit applicable |
| I-F11 a/b | CONTRACTUAL_REQUIREMENT | Distinguer notification vendor→UNIL et UNIL→autorité |
| I-F12 b — pas ISO | **pas d’échec légal automatique** | Examiner mesures réelles |
| I-F12 c/d — principe absent / aucune doc | À CORRIGER ou À CLARIFIER | Exiger preuve |
| I-F13 a | CONFORME | Réversibilité forte |
| I-F13 b | CONFORME SOUS CONDITIONS | Vérifier absence de besoin d’export |
| I-F13 c | À CORRIGER | Ajouter réversibilité/suppression |
| I-F14 a/b/c | SCORE ou SECURITY_REQUIREMENT selon cas | Risk-based |
| I-F15 a | appliquer régime de logs approprié | Ne pas fusionner OPDo et AI Act |
| I-F16 « contenu » | pas de bloc automatique | Évaluer minimisation/confidentialité |
| I-F17 b | À CORRIGER si logs contractuellement/légalement nécessaires | Pas durée universelle |

L’OPDo est un texte fédéral entré en vigueur avec la nouvelle LPD ; son champ ne doit pas être appliqué mécaniquement à l’UNIL en tant qu’établissement public cantonal. citeturn28search5turn28search1

### Mapping Manel — marché public

| Réponse / situation | Moteur correct |
|---|---|
| Pas d’ISO 27001 | Ne rien bloquer légalement. Si ISO/équivalent a été défini comme critère d’aptitude dans la procédure : examiner preuves équivalentes, puis éventuellement `BLOQUANT_PROCUREMENT`. |
| Hébergement hors Suisse/UE | Activer règles de transfert. Pas d’exclusion automatique. |
| Pas de comptes financiers satisfaisants | Uniquement éliminatoire si critère d’aptitude pertinent, proportionné et annoncé. |
| Pas de procédure incident | Peut constituer non-respect d’une exigence de sécurité ou d’aptitude si définie ; sinon À CORRIGER/score. |
| Pas de DPO | Vérifier si la loi applicable impose réellement un DPO. Sinon demander un interlocuteur responsable. |
| Pas d’expérience comparable | Éliminatoire uniquement si critère d’aptitude valablement fixé. |
| Qualité faible | Réduction du score. |
| Coût élevé | Réduction du score. |
| Intégration faible | Réduction du score, sauf spécification technique minimale. |
| Impact environnemental défavorable | Réduction du score si critère annoncé. |

L’État de Vaud confirme que les offres sont évaluées au regard des spécifications, critères d’aptitude et critères d’adjudication annoncés dans la procédure, ces derniers avec pondération. citeturn28search2

### Exemple de trace de règle

**Cas : admissions UNIL, fournisseur suisse, système vendu en France, résultats transmis à un partenaire français, contrat 2027–2030.**

```text
INPUT U07 = true
→ AI-EDU-01 triggered
→ classification = ANNEX_III_EDUCATION_CANDIDATE

INPUT F08 = "system placed on EU market"
→ LAW-AI-01 triggered
→ AI_ACT_PROVIDER = APPLICABLE

INPUT U16 = "outputs used by partner in France"
→ LAW-AI-03 triggered
→ analyse extraterritorial deployer required
→ AI_ACT_UNIL_DEPLOYER = APPLICABLE for covered use, subject to role facts

INPUT F12 = "profiles applicants"
→ AI-63-02 triggered
→ art. 6(3) non-high-risk exception unavailable on profiling ground
→ classification = HIGH_RISK

INPUT U20 = deployment 2027-03-01, contract ends 2030
→ AI-HR-DATE-02 triggered
→ core Annex III obligations become applicable 2027-12-02
→ provider roadmap + contractual compliance milestone required

INPUT U23 = false (meaningful human decision)
→ GDPR-AUTO-01 NOT triggered as solely automated decision

INPUT personal_data = true
→ LAW-VD-01
→ LPrD applicable

INPUT provider documentation future compliance = supplied
→ AI-HR-DATE-02 satisfied conditionally

FINAL:
CONFORME SOUS CONDITIONS

CONDITIONS:
1. Compliance with applicable high-risk requirements by 02.12.2027.
2. Meaningful human oversight maintained.
3. Data protection checks completed.
4. Contractual change-notification mechanism.
5. Required impact assessments completed where legally triggered.
```

Le report au 2 décembre 2027 pour le régime principal des systèmes de l’annexe III vient du règlement 2026/1744. citeturn27search2

## Contrat de données et architecture technique

### JSON Schema — question

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://unil-ai-procurement.example/schemas/question.json",
  "title": "Question",
  "type": "object",
  "required": [
    "id",
    "owner",
    "audience",
    "sourceTextExact",
    "displayText",
    "answerType",
    "obligationType",
    "version"
  ],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[A-Z]+-[A-Z0-9-]+$"
    },
    "owner": {
      "enum": ["AHMED", "ILIANA", "NOE", "MANEL", "GROUP"]
    },
    "audience": {
      "enum": ["UNIL", "VENDOR", "REVIEWER"]
    },
    "sourceDocument": {
      "type": ["string", "null"]
    },
    "sourcePage": {
      "type": ["integer", "null"],
      "minimum": 1
    },
    "sourceTextExact": {
      "type": "string"
    },
    "sourceOptionsExact": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["value", "label"],
        "properties": {
          "value": {"type": "string"},
          "label": {"type": "string"}
        }
      }
    },
    "displayText": {
      "type": "string"
    },
    "helpText": {
      "type": ["string", "null"]
    },
    "answerType": {
      "enum": [
        "BOOLEAN",
        "SINGLE_CHOICE",
        "MULTI_CHOICE",
        "TEXT",
        "LONG_TEXT",
        "NUMBER",
        "DATE",
        "COUNTRY_LIST",
        "URL",
        "EVIDENCE"
      ]
    },
    "obligationType": {
      "enum": [
        "LEGAL_OBLIGATION",
        "PROCUREMENT_REQUIREMENT",
        "CONTRACTUAL_REQUIREMENT",
        "SCORING_CRITERION",
        "BEST_PRACTICE",
        "TRIAGE_INFORMATION"
      ]
    },
    "dedupeGroup": {
      "type": ["string", "null"]
    },
    "showWhen": {
      "type": ["object", "null"]
    },
    "legalSourceIds": {
      "type": "array",
      "items": {"type": "string"}
    },
    "evidenceRequirements": {
      "type": "array",
      "items": {"type": "string"}
    },
    "ruleIds": {
      "type": "array",
      "items": {"type": "string"}
    },
    "version": {
      "type": "integer",
      "minimum": 1
    },
    "activeFrom": {
      "type": ["string", "null"],
      "format": "date"
    },
    "activeTo": {
      "type": ["string", "null"],
      "format": "date"
    }
  }
}
```

### JSON Schema — règle

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://unil-ai-procurement.example/schemas/rule.json",
  "title": "LegalRule",
  "type": "object",
  "required": [
    "id",
    "version",
    "condition",
    "effect",
    "priority",
    "effectiveFrom"
  ],
  "properties": {
    "id": {"type": "string"},
    "version": {"type": "integer", "minimum": 1},
    "owner": {
      "enum": ["AHMED", "ILIANA", "NOE", "MANEL", "GROUP"]
    },
    "domain": {
      "enum": [
        "LPRD",
        "LPD",
        "GDPR",
        "AI_ACT",
        "AIMP",
        "LMP_VD",
        "SECURITY",
        "CONTRACT",
        "SCORING"
      ]
    },
    "condition": {
      "description": "Expression JSONLogic déterministe",
      "type": "object"
    },
    "priority": {
      "type": "integer"
    },
    "effect": {
      "type": "object",
      "required": ["status"],
      "properties": {
        "status": {
          "enum": [
            "CONFORME",
            "CONFORME_SOUS_CONDITIONS",
            "A_CLARIFIER",
            "A_CORRIGER",
            "BLOQUANT"
          ]
        },
        "blockingType": {
          "enum": [
            "NONE",
            "LEGAL",
            "PROCUREMENT_REQUIREMENT"
          ]
        },
        "setFlags": {
          "type": "object"
        },
        "activateModules": {
          "type": "array",
          "items": {"type": "string"}
        },
        "requiredEvidence": {
          "type": "array",
          "items": {"type": "string"}
        },
        "conditions": {
          "type": "array",
          "items": {"type": "string"}
        },
        "remediation": {
          "type": "array",
          "items": {"type": "string"}
        }
      }
    },
    "justificationTemplate": {"type": "string"},
    "legalSourceIds": {
      "type": "array",
      "items": {"type": "string"}
    },
    "effectiveFrom": {
      "type": "string",
      "format": "date"
    },
    "effectiveTo": {
      "type": ["string", "null"],
      "format": "date"
    }
  }
}
```

### Exemple réel de règle JSONLogic

```json
{
  "id": "GDPR-AUTO-02",
  "version": 1,
  "owner": "AHMED",
  "domain": "GDPR",
  "priority": 900,
  "condition": {
    "and": [
      {"==": [{"var": "laws.gdpr"}, "APPLICABLE"]},
      {"==": [{"var": "use.solelyAutomatedDecision"}, true]},
      {"==": [{"var": "use.legalOrSimilarSignificantEffect"}, true]},
      {"==": [{"var": "use.gdprArticle22Exception"}, false]}
    ]
  },
  "effect": {
    "status": "BLOQUANT",
    "blockingType": "LEGAL",
    "requiredEvidence": [],
    "conditions": [],
    "remediation": [
      "Introduire une intervention humaine significative ou démontrer une exception juridiquement applicable assortie des garanties requises."
    ]
  },
  "justificationTemplate": "L'usage projeté comporte une décision exclusivement automatisée avec effet qualifié et aucune exception de l'article 22(2) n'a été établie.",
  "legalSourceIds": ["EU-GDPR-22"],
  "effectiveFrom": "2018-05-25",
  "effectiveTo": null
}
```

### Modèle PostgreSQL

Le développeur doit éviter de mettre les règles dans le code frontend.

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE assessment_status AS ENUM (
  'CONFORME',
  'CONFORME_SOUS_CONDITIONS',
  'A_CLARIFIER',
  'A_CORRIGER',
  'BLOQUANT'
);

CREATE TYPE obligation_type AS ENUM (
  'LEGAL_OBLIGATION',
  'PROCUREMENT_REQUIREMENT',
  'CONTRACTUAL_REQUIREMENT',
  'SCORING_CRITERION',
  'BEST_PRACTICE',
  'TRIAGE_INFORMATION'
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN (
    'REQUESTER', 'VENDOR', 'REVIEWER', 'ADMIN'
  )),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  requesting_unit TEXT,
  intended_use TEXT,
  deployment_date DATE,
  contract_end_date DATE,
  estimated_value_chf NUMERIC(14,2),
  overall_status assessment_status,
  ruleset_version TEXT NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name TEXT NOT NULL,
  registered_country TEXT,
  product_name TEXT,
  product_version TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE assessment_vendors (
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  status assessment_status,
  PRIMARY KEY (assessment_id, vendor_id)
);

CREATE TABLE source_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author_module TEXT,
  original_filename TEXT,
  source_type TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE legal_sources (
  id TEXT PRIMARY KEY,
  jurisdiction TEXT NOT NULL,
  instrument TEXT NOT NULL,
  article TEXT,
  official_url TEXT NOT NULL,
  quoted_excerpt TEXT,
  source_status TEXT NOT NULL CHECK (
    source_status IN (
      'IN_FORCE',
      'ADOPTED_NOT_YET_APPLICABLE',
      'DRAFT',
      'GUIDANCE'
    )
  ),
  effective_from DATE,
  effective_to DATE,
  verified_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE questions (
  id TEXT NOT NULL,
  version INTEGER NOT NULL,
  owner TEXT NOT NULL,
  audience TEXT NOT NULL,
  source_document_id UUID REFERENCES source_documents(id),
  source_page INTEGER,
  source_text_exact TEXT NOT NULL,
  display_text TEXT NOT NULL,
  answer_type TEXT NOT NULL,
  obligation_type obligation_type NOT NULL,
  dedupe_group TEXT,
  show_when JSONB,
  active_from DATE,
  active_to DATE,
  PRIMARY KEY (id, version)
);

CREATE TABLE question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id TEXT NOT NULL,
  question_version INTEGER NOT NULL,
  value TEXT NOT NULL,
  source_label_exact TEXT NOT NULL,
  display_label TEXT,
  sort_order INTEGER NOT NULL,
  FOREIGN KEY (question_id, question_version)
    REFERENCES questions(id, version)
);

CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id),
  question_id TEXT NOT NULL,
  question_version INTEGER NOT NULL,
  answer JSONB NOT NULL,
  answered_by UUID REFERENCES users(id),
  answered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  FOREIGN KEY (question_id, question_version)
    REFERENCES questions(id, version)
);

CREATE TABLE evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id),
  evidence_type TEXT NOT NULL,
  title TEXT NOT NULL,
  file_object_key TEXT,
  external_url TEXT,
  sha256 TEXT,
  supplied_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (
    (file_object_key IS NOT NULL AND external_url IS NULL)
    OR
    (file_object_key IS NULL AND external_url IS NOT NULL)
  )
);

CREATE TABLE rules (
  id TEXT NOT NULL,
  version INTEGER NOT NULL,
  owner TEXT NOT NULL,
  domain TEXT NOT NULL,
  priority INTEGER NOT NULL,
  condition_jsonlogic JSONB NOT NULL,
  effect JSONB NOT NULL,
  justification_template TEXT NOT NULL,
  effective_from DATE NOT NULL,
  effective_to DATE,
  PRIMARY KEY (id, version)
);

CREATE TABLE rule_legal_sources (
  rule_id TEXT NOT NULL,
  rule_version INTEGER NOT NULL,
  legal_source_id TEXT NOT NULL REFERENCES legal_sources(id),
  PRIMARY KEY (rule_id, rule_version, legal_source_id),
  FOREIGN KEY (rule_id, rule_version)
    REFERENCES rules(id, version)
);

CREATE TABLE rule_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id),
  rule_id TEXT NOT NULL,
  rule_version INTEGER NOT NULL,
  triggered BOOLEAN NOT NULL,
  result_status assessment_status,
  facts_snapshot JSONB NOT NULL,
  explanation TEXT,
  executed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE evidence_links (
  rule_result_id UUID REFERENCES rule_results(id) ON DELETE CASCADE,
  evidence_id UUID REFERENCES evidence(id) ON DELETE CASCADE,
  PRIMARY KEY (rule_result_id, evidence_id)
);

CREATE TABLE scoring_criteria (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  weight NUMERIC(5,2) NOT NULL CHECK (weight >= 0 AND weight <= 100),
  max_score NUMERIC(5,2) NOT NULL DEFAULT 5,
  active_from DATE NOT NULL,
  active_to DATE
);

CREATE TABLE score_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessments(id),
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  criterion_id TEXT NOT NULL REFERENCES scoring_criteria(id),
  raw_score NUMERIC(5,2) NOT NULL,
  weighted_score NUMERIC(7,2) NOT NULL,
  justification TEXT
);

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessments(id),
  version INTEGER NOT NULL,
  overall_status assessment_status NOT NULL,
  content JSONB NOT NULL,
  ruleset_version TEXT NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (assessment_id, version)
);

CREATE TABLE audit_events (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  assessment_id UUID REFERENCES assessments(id),
  event_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  before_value JSONB,
  after_value JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Règle de versionnement juridique

**Ne jamais modifier une règle historique en place.**

Exemple :

```text
AI-HR-DATE-01 v1
effective_from = 2024-08-01
effective_to   = 2026-07-26

AI-HR-DATE-01 v2
effective_from = 2026-07-27
effective_to   = NULL
```

Un rapport généré le 25 octobre 2026 continue ainsi à référencer `ruleset 2026.10.1`, même si une loi change en 2027.

Chaque source doit contenir :

```json
{
  "status": "IN_FORCE",
  "effectiveFrom": "2026-07-27",
  "verifiedAt": "2026-10-20T00:00:00Z",
  "officialUrl": "...",
  "article": "113",
  "instrument": "Regulation (EU) 2024/1689 as amended"
}
```

La révision vaudoise de la LPrD annoncée en mars 2026 est encore présentée officiellement comme un **projet mis en consultation** ; le moteur ne doit donc pas l’utiliser comme droit actuel. citeturn27search9

## API, écrans et critères d’acceptation

### Authentification

Aucun accès direct aux systèmes internes UNIL n’étant disponible dans le projet, le prototype doit abstraire l’authentification.

**P0 académique :**

```text
REQUESTER
VENDOR
REVIEWER
ADMIN
```

Pour la démonstration : comptes fictifs préchargés.

L’interface backend doit néanmoins prévoir un `AuthProvider` afin qu’une éventuelle version réelle puisse utiliser OIDC/SSO sans réécrire la logique métier.

Pour un fournisseur externe, une architecture future raisonnable serait :

```text
invitation email
→ lien à durée limitée
→ authentification/OTP
→ accès uniquement au dossier fournisseur concerné
```

Aucune vraie donnée étudiante, de recherche confidentielle ou de fournisseur ne doit être utilisée dans le prototype de cours.

### API P0

| Méthode | Endpoint | Rôle | Fonction |
|---|---|---|---|
| POST | `/api/v1/assessments` | REQUESTER | Créer dossier |
| GET | `/api/v1/assessments/:id` | autorisé | Lire dossier |
| PATCH | `/api/v1/assessments/:id` | REQUESTER | Modifier metadata |
| GET | `/api/v1/assessments/:id/questions/internal` | REQUESTER | Questions internes dynamiques |
| PUT | `/api/v1/assessments/:id/answers/internal` | REQUESTER | Enregistrer réponses |
| POST | `/api/v1/assessments/:id/evaluate` | REVIEWER/REQUESTER | Exécuter règles |
| GET | `/api/v1/assessments/:id/rule-results` | REVIEWER | Trace complète |
| POST | `/api/v1/assessments/:id/vendors` | REQUESTER | Ajouter fournisseur |
| GET | `/api/v1/assessments/:id/vendors/:vendorId/questions` | VENDOR | DDQ dynamique |
| PUT | `/api/v1/assessments/:id/vendors/:vendorId/answers` | VENDOR | Réponses fournisseur |
| POST | `/api/v1/assessments/:id/vendors/:vendorId/evidence` | VENDOR | PDF ou URL |
| DELETE | `/api/v1/evidence/:id` | owner/admin | Retirer justificatif |
| POST | `/api/v1/assessments/:id/vendors/:vendorId/evaluate` | REVIEWER | Réévaluer vendor |
| GET | `/api/v1/assessments/:id/vendors/:vendorId/score` | REVIEWER | Score |
| POST | `/api/v1/assessments/:id/vendors/:vendorId/score` | REVIEWER | Calcul score |
| GET | `/api/v1/assessments/:id/report` | autorisé | Rapport courant |
| POST | `/api/v1/assessments/:id/report` | REVIEWER | Figer nouvelle version |
| GET | `/api/v1/legal-sources/:id` | tous internes | Source juridique |
| GET | `/api/v1/rules/:id` | REVIEWER/ADMIN | Inspection règle |
| POST | `/api/v1/admin/rules` | ADMIN | Nouvelle version règle |
| POST | `/api/v1/admin/legal-sources` | ADMIN | Ajouter/mettre à jour source |

### Payload création dossier

```json
POST /api/v1/assessments

{
  "title": "Assistant IA - Admissions Master",
  "requestingUnit": "Faculté fictive",
  "intendedUse": "Pré-classement des dossiers d'admission",
  "deploymentDate": "2027-03-01",
  "contractEndDate": "2030-02-28",
  "estimatedValueChf": 220000
}
```

Réponse :

```json
{
  "id": "3c065a94-...",
  "status": "DRAFT",
  "nextStep": "INTERNAL_QUESTIONNAIRE",
  "rulesetVersion": "2026.10.1"
}
```

### Payload d’évaluation

```json
POST /api/v1/assessments/{id}/evaluate
```

```json
{
  "evaluationDate": "2026-10-20",
  "includeFutureRequirementsUntil": "2030-02-28"
}
```

Réponse :

```json
{
  "overallStatus": "CONFORME_SOUS_CONDITIONS",
  "legalApplicability": {
    "lprd": "APPLICABLE",
    "lpdVendor": "APPLICABLE",
    "gdprUnil": "APPLICABLE",
    "aiActProvider": "APPLICABLE",
    "aiActUnilDeployer": "APPLICABLE"
  },
  "classifications": [
    "AI_ACT_ANNEX_III_EDUCATION",
    "AI_ACT_HIGH_RISK_FUTURE_REQUIREMENTS"
  ],
  "conditions": [
    {
      "id": "COND-AI-2027",
      "deadline": "2027-12-02",
      "text": "Le fournisseur doit démontrer la conformité aux exigences high-risk devenues applicables."
    }
  ],
  "missingEvidence": [],
  "blockingReasons": [],
  "reportUrl": "/api/v1/assessments/.../report"
}
```

### Upload de preuves

Accepter :

```text
application/pdf
URL https
```

Pour P0 :

- taille PDF configurable, p. ex. 20 MB ;
- pas d’OCR obligatoire ;
- nom + type + description ;
- SHA-256 pour traçabilité ;
- accès privé.

Un justificatif doit pouvoir être rattaché à plusieurs contrôles.

Exemple :

```json
{
  "title": "Data Processing Agreement",
  "evidenceType": "DPA",
  "linkedQuestionIds": ["F25", "I-F09"],
  "linkedRuleIds": ["VD-PROC-01", "GDPR-PROC-01"]
}
```

### Écrans

**Écran accueil**

> Évaluer un fournisseur d’IA  
> Créer une évaluation / Ouvrir un dossier / Voir une démonstration

**Écran besoin UNIL**

Progression :

`Besoin → Usage → Données → Territoire → Décisions → Marché`

Questions conditionnelles, une à trois par page.

**Écran résultat du triage**

Ne pas afficher seulement « risque élevé ».

Afficher par exemple :

> **Recommandation actuelle : À CLARIFIER**
>
> LPrD : applicable  
> RGPD : non déterminé — lieu des personnes visées manquant  
> AI Act fournisseur : applicable  
> AI Act UNIL déployeur : à déterminer  
> Classification : usage éducatif susceptible de relever de l’annexe III  
>
> **Information manquante :** préciser où les résultats sont utilisés.

Chaque ligne a un bouton **« Pourquoi ? »**, montrant :

```text
Réponse déclenchante
→ Règle
→ Article
→ Explication
→ Source officielle
```

**Écran DDQ fournisseur**

Sections :

1. Produit et entités
2. Architecture IA
3. AI Act
4. Données
5. Transferts et sous-traitants
6. Sécurité
7. Contrat et réversibilité
8. Aptitude / offre

**Écran conformité**

Colonnes :

| Contrôle | Résultat | Preuve | Base | Action |
|---|---|---|---|---|
| Sous-traitance | À CORRIGER | DPA v1 | LPrD art. 18 | Ajouter clause |
| AI Act | SOUS CONDITIONS | Roadmap | Art. 6 + calendrier | échéance 2.12.27 |
| ISO | Non fournie | — | Critère de marché ? | vérifier dossier |

**Écran score**

Accessible seulement si :

```text
confirmed_legal_blockers == 0
AND
unresolved_mandatory_procurement_requirements == 0
```

Le score 40/30/15/15 reste configurable. Manel propose ces quatre pondérations dans son document. fileciteturn0file1

**Écran rapport**

Doit donner une conclusion substantielle :

> **CONFORME SOUS CONDITIONS**
>
> L’acquisition est juridiquement envisageable dans l’usage décrit sous réserve de quatre mesures listées ci-dessous…

Pas :

> « Veuillez consulter un juriste. »

Le rapport peut néanmoins identifier précisément une **question non résolue** lorsque les faits fournis ne permettent objectivement pas d’appliquer une règle.

### User stories prioritaires

**US — caractériser l’usage**

> En tant que demandeur UNIL, je veux décrire exactement l’usage envisagé afin que la légalité soit analysée par rapport à ce cas d’usage et non au produit abstrait.

Acceptation : une évaluation ne peut pas sortir CONFORME sans U02/U03/U06/U11/U20.

**US — expliquer le droit applicable**

> En tant que demandeur, je veux comprendre pourquoi une loi est marquée applicable.

Acceptation : chaque `APPLICABLE` cite au moins une règle et une source officielle.

**US — obtenir une vraie recommandation**

> En tant que responsable d’achat, je veux savoir si le dossier est conforme, corrigeable, incomplet ou bloqué.

Acceptation : un des cinq statuts est produit et accompagné d’actions concrètes.

**US — ne pas confondre high-risk et interdit**

> En tant qu’évaluateur, je veux que le site différencie pratique interdite et système high-risk.

Acceptation : U07=true ne peut jamais, seul, produire BLOQUANT.

**US — fournisseur**

> En tant que fournisseur, je veux répondre uniquement aux questions applicables.

Acceptation : pas de questions de données personnelles si aucune donnée personnelle n’est traitée, sauf questions initiales permettant de le confirmer.

**US — preuves**

> En tant qu’évaluateur, je veux savoir quelle pièce manque pour résoudre une règle.

Acceptation : `À CLARIFIER` doit afficher le document/fait attendu.

**US — droit dans le temps**

> En tant qu’acheteur, je veux que le système tienne compte d’une obligation qui entre en application pendant mon contrat.

Acceptation : contrat 2027–2030 sur Annex III déclenche le jalon du 2 décembre 2027. citeturn27search2

**US — marché public**

> En tant qu’évaluateur, je veux distinguer obligation légale, aptitude et score.

Acceptation : absence d’ISO n’est pas marquée `LEGAL_BLOCKER`.

**US — source exacte**

> En tant qu’enseignant ou auditeur, je veux cliquer sur l’article qui justifie la recommandation.

Acceptation : chaque règle juridique a `official_url`, article, date de vérification et version.

### Tests d’acceptation critiques

| Test | Input | Résultat attendu |
|---|---|---|
| AT-01 | U07 oui, AI Act applicable | HIGH_RISK candidate, pas BLOQUANT automatique |
| AT-02 | reconnaissance d’émotions dans enseignement, interdiction applicable, aucune exception | BLOQUANT |
| AT-03 | fournisseur USA | aucune exclusion automatique |
| AT-04 | pas ISO 27001, aucune spécification marché l’exige | pas BLOQUANT |
| AT-05 | pas ISO, critère d’aptitude valablement publié exige certification/équivalent, aucune preuve équivalente | BLOQUANT_PROCUREMENT |
| AT-06 | pays non adéquat mais garanties valables | CONFORME SOUS CONDITIONS |
| AT-07 | pays non adéquat + aucun mécanisme + transfert indispensable | BLOQUANT |
| AT-08 | données réutilisées pour entraînement mais fonction organisationnelle d’opt-out verrouillable | CONFORME SOUS CONDITIONS |
| AT-09 | données personnelles, aucun but déterminé | À CORRIGER/BLOQUANT selon possibilité de définir licitement le traitement |
| AT-10 | GDPR non applicable + décision automatisée | ne pas appliquer automatiquement art. 22 RGPD |
| AT-11 | GDPR applicable + décision exclusivement automatisée significative + aucune exception | BLOQUANT |
| AT-12 | Annex III, contrat se termine avant obligation future | ne pas marquer actuelle violation future |
| AT-13 | Annex III, contrat traverse 2.12.2027 | conformité future = condition contractuelle |
| AT-14 | questionnaire répond « Inconnu » sur pays d’accès | À CLARIFIER |
| AT-15 | preuve manquante | À CLARIFIER et nom exact de la preuve |
| AT-16 | score 95/100 + blocker légal | final BLOQUANT |
| AT-17 | blocker supprimé par correction | réexécution met à jour résultat |
| AT-18 | modification d’une règle | ancien rapport conserve ancienne version |

## Plan P0 et cas complets de démonstration

### Sprint jusqu’au 30 octobre

| Date | Priorité | Livraison |
|---|---|---|
| 20 oct. | P0 | Figer IDs questions, statuts, schéma de règles |
| 21 oct. | P0 | Importer questions Ahmed + originales Manel/Iliana |
| 22 oct. | P0 | Modèle DB + fixtures + API dossier/réponses |
| 23 oct. | P0 | Questionnaire interne conditionnel |
| 24 oct. | P0 | Moteur JSONLogic + source registry |
| 25 oct. | P0 | AI Act/LPrD/RGPD applicability + arbre |
| 26 oct. | P0 | DDQ vendor + preuves |
| 27 oct. | P0 | Agrégation des statuts + rapport |
| 28 oct. | P0 | Marché public + notation |
| 29 oct. | P0 | Tests des trois cas + corrections |
| 30 oct. | P0 | Démo stable + export rapport |

**À couper en premier si retard :**

1. authentification réelle ;
2. comparaison multi-vendeurs ;
3. PDF export sophistiqué ;
4. interface admin complète ;
5. notifications email ;
6. graphiques.

**À ne surtout pas couper :**

1. questionnaire interne ;
2. questionnaire fournisseur ;
3. règles déterministes ;
4. traçabilité article → règle → réponse ;
5. statuts ;
6. au moins trois scénarios reproductibles.

### Cas de démonstration — traduction de documents publics

**Situation**

UNIL souhaite acheter un outil commercial de traduction pour des brochures publiques. Aucun dossier étudiant, manuscrit confidentiel ou donnée personnelle n’est envoyé. Le fournisseur met son produit sur le marché de l’UE.

**Réponses**

```text
U03 = pédagogique/administratif
U06 = assistance
U07 = non
U08 = non
U09 = non
U11 = documents publics
U12 = non
U13 = non
U16 = non, utilisation finale uniquement en Suisse
F08 = oui, système sur marché UE
F22 = données publiques potentiellement utilisées pour amélioration
```

**Trace**

```text
LAW-VD-01: false
→ aucun traitement de données personnelles identifié pour ce cas

LAW-AI-01: true
→ obligations AI Act du fournisseur pouvant être applicables

LAW-AI-02: false pour UNIL
LAW-AI-03: false selon faits fournis

AI-EDU-01/02/03: false
AI-ART5-01: false

TRAINING:
contenu public uniquement
→ pas de blocker de données personnelles
→ vérifier droits d'auteur/licences contractuelles
```

**Rapport**

> **CONFORME SOUS CONDITIONS**
>
> Aucun obstacle relatif aux catégories éducatives high-risk n’a été identifié pour l’usage décrit. Le fournisseur est soumis à une analyse AI Act dans son rôle de fournisseur sur le marché de l’Union, sans que cela rende automatiquement l’UNIL déployeur soumis à toutes les obligations européennes. Avant signature, vérifier les droits contractuels sur les documents envoyés et sur les outputs, ainsi que les conditions de réutilisation.

### Cas de démonstration — recherche confidentielle avec données sensibles

**Situation**

Une équipe souhaite résumer des entretiens de recherche comportant des données sensibles. Fournisseur américain, certifié dans un mécanisme reconnu, mais certaines données sont accessibles depuis les États-Unis et le fournisseur contrôle seul les clés. Pas d’entraînement contractuellement autorisé.

**Réponses**

```text
U03 = recherche
U11 = données personnelles
U12 = oui
U13 = oui
U14 = participants à la recherche
F22 = non entraînement
F24 = Suisse + USA
F33 = clé accessible au fournisseur
I-F02 = fournisseur USA
I-F04 = USA
```

**Trace**

```text
LAW-VD-01 = APPLICABLE

VD-PROC-01
→ contrat art.18 requis

VD-XFER-01
→ accès étranger détecté

sensitive_data = true
foreign_law_access = true
key_control = vendor

→ architecture actuelle insuffisamment protégée pour accepter automatiquement
→ remédiation techniquement envisageable:
   - changer architecture,
   - contrôle indépendant/suisse des clés,
   - ou autre base/garantie juridiquement suffisante.

FINAL = À CORRIGER
```

L’orientation officielle vaudoise impose une analyse particulièrement prudente de la sous-traitance et des protections lorsque des données sensibles et des possibilités d’accès depuis l’étranger sont concernées ; elle ne justifie pas, pour autant, une règle simpliste « entreprise américaine = interdite ». citeturn27search0turn27search1

**Rapport**

> **À CORRIGER**
>
> L’utilisation n’est pas validée dans la configuration actuelle. Les données sensibles sont soumises à la LPrD et le dispositif proposé expose les données à un accès étranger avec une maîtrise des clés insuffisamment indépendante. Cette difficulté paraît techniquement remédiable. L’UNIL doit obtenir une architecture et des garanties contractuelles compatibles avec l’article 18 LPrD et les exigences applicables de sécurité/confidentialité avant déploiement.

### Cas de démonstration — système de classement des admissions

**Situation**

Le système attribue un score aux candidatures d’un master commun avec une université française. Les résultats sont envoyés à cette institution. Les données concernent des candidats et le système réalise du profilage. Une commission humaine prend la décision finale. Contrat mars 2027–février 2030.

**Trace essentielle**

```text
LPrD = APPLICABLE
personal_data = true

GDPR territorial test:
service offered in EU / joint programme facts = true
→ GDPR = APPLICABLE for relevant processing

AI Act provider:
marketed in EU = true
→ applicable

AI Act third-country deployer:
outputs used in France = true
→ applicable to covered use

Annex III education:
admission scoring = true
→ high-risk candidate

profiling = true
→ art. 6(3) exception unavailable on profiling ground

effective date:
contract crosses 2027-12-02
→ future high-risk compliance required

solely automated decision:
false
→ art.22(1) sole-automation branch not triggered on current facts

DPIA:
high-risk personal data processing indicators
→ GDPR art.35 assessment required

FINAL = CONFORME SOUS CONDITIONS
```

**Conditions générées**

1. réaliser l’analyse d’impact de protection des données lorsqu’elle est requise ;
2. préserver une intervention humaine réelle dans l’admission ;
3. établir les garanties de données et de sous-traitance ;
4. contracter l’obligation du fournisseur de satisfaire au régime high-risk applicable au plus tard le 2 décembre 2027 ;
5. prévoir changement de modèle, documentation, logs et supervision ;
6. effectuer les évaluations supplémentaires du déployeur lorsque les conditions légales deviennent applicables.

La date du 2 décembre 2027 vient du règlement 2026/1744. citeturn27search2 Le principe RGPD concernant les décisions exclusivement automatisées et les garanties humaines ressort de l’article 22. citeturn28search4

## Corrections juridiques à présenter à Manel et Iliana

### Corrections à envoyer à Manel

| Point à corriger | Ce qui apparaît actuellement | Correction à proposer | Preuve |
|---|---|---|---|
| ISO 27001 | Tout fournisseur doit être certifié / équivalent sous art. 27 AIMP | L’AIMP permet à l’adjudicateur de définir des critères d’aptitude pertinents ; ISO peut être demandé mais n’est pas légalement obligatoire dans tout marché | L’État de Vaud explique qu’un adjudicateur **peut** demander une certification dans un critère d’aptitude. citeturn28search7 |
| « Tous les critères d’aptitude sont mandatory » | Manel présente sécurité, hosting, stabilité, DPO, références comme universellement mandatory | Ils ne sont éliminatoires que s’ils sont juridiquement justifiés et intégrés aux documents de la procédure comme critères/exigences | Les critères doivent être annoncés dans les documents de la procédure. citeturn28search2 |
| Hébergement Suisse/UE | hors Suisse/UE → fournisseur écarté | Le droit des données permet dans certaines circonstances un traitement/transfert étranger avec garanties adaptées ; localisation = déclencheur d’analyse | LPrD art. 18 autorise la sous-traitance sous conditions. citeturn27search0 |
| DPO fournisseur | absence de responsable → exclusion | Demander plutôt « interlocuteur protection des données » ; ne rendre DPO obligatoire que lorsqu’une législation applicable l’impose | La LPD fédérale ne transforme pas chaque fournisseur en organe fédéral ni n’impose cette conséquence via AIMP art. 27. citeturn28search1 |
| Stabilité financière | toujours mandatory | Peut être critère d’aptitude si pertinent/annoncé ; ne pas présenter comme obligation générale de toute acquisition IA | Cadre d’évaluation VD. citeturn28search2 |
| Références comparables | toujours mandatory | Même correction : aptitude possible, pas automatiquement obligatoire | Idem. citeturn28search2 |
| Procédure incident | absence = exclusion automatique | Sécurité peut être exigée, mais conséquence dépend de la source : obligation data/security, critère d’aptitude ou clause contractuelle | Séparer les catégories |
| Pondérations 40/30/15/15 | semblent devenir modèle quasi-légal | Étiqueter **proposition du projet** ; elles doivent être fixées et annoncées pour la procédure | Vaud exige annonce de la pondération, pas ces pourcentages particuliers. citeturn28search2 |
| Score avant contrat | « si score bon → contrat » | Avant contrat, il faut aussi résoudre toutes les conditions juridiques et d’aptitude ; un bon score ne neutralise aucun blocker | Architecture proposée |
| Clauses AI Act art. 53 | appliquées au « fournisseur » de manière générale | Art. 53 vise les obligations des fournisseurs de modèles GPAI : qualifier le rôle avant d’appliquer | AI Act consolidé. citeturn27search13 |
| Durée >5 ans | « sinon elle est ramenée à cinq ans » | Écrire plutôt que la durée supérieure au régime ordinaire doit être juridiquement justifiée ; ne pas programmer une réduction automatique du contrat | Vérifier art. 15 AIMP lors de paramétrage |
| Qualité | bonne logique | Conserver : le droit vaudois révisé renforce qualité et prix ; qualité est un élément central du nouveau paradigme | État de Vaud. citeturn28search9 |

Le passage du document de Manel qui affirme « Tous ces critères sont mandatory » doit donc être modifié. fileciteturn0file1

**Formulation à lui envoyer :**

> *Je garderais tes questions, mais je changerais la colonne “mandatory”. L’art. 27 AIMP ne rend pas ISO 27001, l’hébergement Suisse/UE, un DPO ou des références comparables automatiquement obligatoires pour tous les marchés. Ils peuvent devenir des critères d’aptitude si l’UNIL les définit de manière appropriée et les annonce dans la procédure. Le site doit donc distinguer “obligation légale” et “critère d’aptitude choisi pour ce marché”.*

### Corrections à envoyer à Iliana

| Point | Formulation actuelle | Correction nécessaire | Source |
|---|---|---|---|
| LPD vs LPrD | mélange LPrD/LPD pour UNIL | LPrD = point de départ pour UNIL public vaudois ; LPD notamment fournisseur privé/fédéral | LPD art. 2 ne vise que personnes privées et organes fédéraux. citeturn28search1 |
| UNIL = responsable / vendor = processor toujours | présenté comme axiome | Souvent vrai, mais vérifier chaque finalité. Un vendor utilisant les données pour sa propre finalité ne reste pas nécessairement simple processor | LPrD art. 18 + analyse fonctionnelle. citeturn27search0 |
| Tout outil IA = AIPD | « effectuer une AIPD car le risque est élevé » | Faux comme règle universelle ; appliquer le seuil du droit applicable | LPD art. 22 : risque élevé ; RGPD art. 35 : risque élevé. citeturn28search1turn28search3 |
| Deux critères G29 = obligation absolue | automatisé | Les lignes directrices servent à apprécier le risque ; le moteur doit appliquer le texte juridiquement applicable | RGPD art. 35. citeturn28search3 |
| Liste CNIL | utilisée pour UNIL comme si obligatoire | Utile comme inspiration RGPD, mais une liste française de la CNIL ne devient pas automatiquement norme cantonale vaudoise | UNIL/LPrD relève du cadre vaudois. citeturn27search0 |
| « informer le PFPDT » sous LPrD | document dit PFPDT, art. 20/21 LPrD | Pour le régime vaudois, l’autorité compétente est l’APDI/Préposée vaudoise ; ne pas confondre avec autorité fédérale | Registre et APDI Vaud. citeturn27search6turn27search8 |
| Pays tiers = rédhibitoire | plusieurs options | Faux comme règle universelle ; examiner adéquation, garanties, secrets, accès | LPrD sous-traitance/garanties. citeturn27search0 |
| USA/DPF = rédhibitoire pour sensible | automatique | Analyse renforcée possible, mais ne pas faire du pays ou de la maison mère la règle de blocage en soi | Appliquer architecture + secret + garanties, pas nationalité seule |
| « aucun soumis au droit américain » | blanket ban | Remplacer par questions : qui peut accéder ? sous quelle juridiction ? quelles clés ? quelles garanties ? | Approche LPrD art. 18. citeturn27search0 |
| UNIL doit toujours détenir les clés | présenté comme absolu | Trop large. La maîtrise des clés dépend du risque et de l’architecture ; conserver comme exigence renforcée dans certains cas, pas loi générale de tout traitement | Sécurité doit être contextualisée |
| « aussi longtemps que nécessaire » = rédhibitoire | I-F06 | Inverser : c’est proche du principe de limitation ; problème = manque de précision. Statut À CLARIFIER et demander critères/durées | RGPD exige limitation au nécessaire. citeturn28search3 |
| Réutilisation entraînement toujours interdite | I-F08 b/c rédhibitoire | Si vendor agit strictement comme sous-traitant, une finalité propre doit être empêchée ou requalifiée ; mais pour données publiques/non personnelles la conclusion peut différer | LPrD art. 18. citeturn27search0 |
| Opt-out manuel = rédhibitoire | b | Peut être accepté sous conditions si l’admin UNIL peut le désactiver de façon organisationnelle et contractuellement garantie | Contractualisation |
| Décision IA = toujours rédhibitoire | I-U09 c | RGPD art. 22 a un champ précis et des exceptions ; autres droits nécessitent leur propre analyse | Art. 22 RGPD. citeturn28search4 |
| Délai 10 jours | présenté comme norme vendor | Garder comme SLA souhaité, pas comme délai légal universel | Le moteur doit distinguer LAW vs CONTRACT |
| Incident 24–72 h | mélange des obligations | Distinguer délai du processor vers controller et éventuel délai du controller vers l’autorité | RGPD doit être appliqué selon rôles |
| Journalisation OPDo | « données sensibles → obligatoire » | Art. 4 OPDo a son propre champ ; ne pas l’appliquer automatiquement à UNIL cantonal | LPD/OPDo fédéraux ont leur champ propre. citeturn28search1turn28search5 |
| Six mois de logs | associé OPDo/AI Act | Séparer : les règles et durées AI Act ne sont pas celles de l’OPDo | AI Act et OPDo doivent avoir deux Rule IDs distincts |
| Art. 19 AI Act | utilisé comme base générale logging | Pour high-risk, répartir correctement les exigences entre logs du système/provider et obligations du deployer ; ne pas utiliser art. 19 isolément comme règle universelle | AI Act consolidé. citeturn27search13 |
| « outil connecté à messagerie/agenda = risque élevé » | automatique | Fort signal de risque, mais pas classification légale automatique dans tous les régimes | Le seuil DPIA dépend nature, portée, contexte et finalité |
| Minimisation art. 25 RGPD | article utilisé comme base principale | Art. 25 est privacy by design/default ; le principe de minimisation est d’abord à l’art. 5(1)(c) | RGPD officiel. citeturn28search3 |

Le document d’Iliana contient par ailleurs une idée très utile qu’il faut **absolument garder** : inventorier les données, les lieux de traitement, les sous-traitants, les durées, les mesures de sécurité, les réutilisations et la possibilité d’exercer les droits. C’est la conséquence automatique « rédhibitoire » attachée à plusieurs réponses qui doit être recalibrée, pas l’utilité des questions elles-mêmes. fileciteturn0file2

### Extraits juridiques courts à montrer au groupe

Ces extraits suffisent à démontrer les principales corrections sans noyer la discussion.

**LPD, art. 2 — champ personnel**

La loi fédérale vise les traitements effectués par **« des personnes privées »** et **« des organes fédéraux »**. Cela montre pourquoi elle ne doit pas remplacer automatiquement la LPrD pour UNIL. citeturn28search1

URL : `https://www.fedlex.admin.ch/eli/cc/2022/491/fr`

**RGPD, art. 22**

Le texte vise une **« décision fondée exclusivement sur un traitement automatisé »** ayant l’effet qualifié par l’article ; il prévoit ensuite des exceptions et des garanties, dont l’intervention humaine dans certains cas. citeturn28search4

URL : `https://eur-lex.europa.eu/eli/reg/2016/679/oj/fra`

**LPrD, art. 18**

L’État de Vaud explique que la sous-traitance est possible lorsque trois conditions cumulatives sont satisfaites : fondement légal ou contrat protecteur, droit du responsable de traiter lui-même, et absence d’un secret qui l’interdit. citeturn27search0

URL : `https://www.vd.ch/etat-droit-finances/protection-des-donnees-et-droit-a-linformation/protection-des-donnees`

**AIMP — critères**

L’État de Vaud précise que spécifications, critères d’aptitude et critères d’adjudication doivent être annoncés dans les documents de procédure ; l’exemple officiel des certifications environnementales montre qu’un certificat est quelque chose que l’adjudicateur **peut définir comme critère**, pas une exigence universelle créée automatiquement par l’art. 27. citeturn28search2turn28search7

URLs :
`https://www.vd.ch/etat-droit-finances/marches-publics/modeles-et-recommandations/evaluation-des-offres`

`https://www.vd.ch/etat-droit-finances/marches-publics/aspects-sociaux-et-environnementaux-des-marches-publics/aspects-environnementaux-des-marches-publics`

**AI Act — calendrier**

Le règlement (UE) 2026/1744 reporte le régime principal de l’annexe III au **2 décembre 2027** et celui de l’article 6(1)/annexe I au **2 août 2028**. citeturn27search2

URL : `https://eur-lex.europa.eu/eli/reg/2026/1744/oj`

### Instruction finale à transmettre au développeur

Le développeur peut recevoir exactement la règle de conception suivante :

> **Le moteur ne doit jamais coder une conclusion juridique directement dans le bouton d’une question.**
>
> Une réponse met à jour des faits. Les règles utilisent ces faits, la date, le territoire, le rôle des acteurs et les preuves pour produire les conséquences.
>
> Exemple incorrect :
>
> `vendor_country == "USA" → BLOQUANT`
>
> Exemple correct :
>
> `personal_data + foreign_access → activate transfer rules`
>
> puis :
>
> `no adequate mechanism + no safeguard + transfer indispensable → BLOQUANT`.
>
> De même :
>
> `education_use → HIGH_RISK` est insuffisant ;
>
> il faut tester l’usage exact, l’applicabilité de l’AI Act, l’annexe III, l’article 6, l’éventuelle dérogation, le profilage et la date d’application.
>
> Chaque résultat doit pouvoir répondre à quatre questions : **quelle réponse l’a déclenché ? quelle règle a été appliquée ? quel article la justifie ? que faut-il faire concrètement ?**

Cette architecture transforme effectivement le travail des quatre membres du groupe en un **outil d’analyse juridique**, plutôt qu’en un simple formulaire : Ahmed caractérise le produit et active le droit pertinent ; Iliana approfondit les contrôles de données ; Noé contrôle sécurité et exigences système ; Manel applique aptitude, adjudication et contrat. Les questions sources de Manel et d’Iliana restent traçables dans leur formulation originale, tandis que leurs conséquences sont juridiquement corrigées dans le moteur. fileciteturn0file0 fileciteturn0file1 fileciteturn0file2