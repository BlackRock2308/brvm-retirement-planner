import React from "react";
import { ArrowRight, Info, Briefcase } from "lucide-react";
import { T, FONT_SANS, FONT_DISPLAY, FONT_MONO } from "../theme";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";

const STEPS = [
  {
    n: "01", title: "Choisir une SGI agréée", color: T.teal,
    desc: "Une SGI (Société de Gestion et d'Intermédiation) est une société agréée par le régulateur (CREPMF) pour passer les ordres sur la BRVM. Au Sénégal, il y en a plusieurs : CGF Bourse, SGI IMPAXIS, FGI, Invictus Capital, etc.",
    action: "Comparer les SGI de Dakar : frais, interface en ligne, accessibilité mobile money.",
    time: "1-2 jours de recherche",
  },
  {
    n: "02", title: "Préparer les documents", color: T.blue,
    desc: "Carte d'identité, justificatif de domicile récent, photo d'identité, RIB bancaire. Certaines SGI acceptent des ouvertures 100% digitales, d'autres demandent un passage en agence.",
    action: "Rassembler les 4 pièces et prendre rendez-vous (ou formulaire en ligne).",
    time: "30 minutes",
  },
  {
    n: "03", title: "Ouvrir le compte titres", color: T.gold,
    desc: "La SGI crée un compte titres pour conserver les actions achetées, et un compte espèces pour alimenter les achats. Le compte est nominatif et personnel.",
    action: "Signer la convention d'ouverture. Aucun dépôt initial obligatoire dans la plupart des cas.",
    time: "3-7 jours ouvrés",
  },
  {
    n: "04", title: "Approvisionner le compte", color: T.green,
    desc: "Virement bancaire ou mobile money (Orange Money, Wave) selon la SGI. Une partie des SGI acceptent déjà les paiements Wave — ça facilite énormément pour le DCA mensuel.",
    action: "Virement de la première contribution mensuelle (50k / 75k / 100k).",
    time: "Immédiat à 24h",
  },
  {
    n: "05", title: "Passer le premier ordre", color: T.red,
    desc: "Depuis l'espace client en ligne de la SGI, sélectionner le titre souhaité (ex: SNTS), indiquer le nombre d'unités et le prix maximum accepté (ordre à cours limité). La SGI exécute l'ordre sur le marché.",
    action: "Premier ordre : 1 action Sonatel (SNTS) à ~29 000 F — ligne socle.",
    time: "5-10 minutes",
  },
  {
    n: "06", title: "Automatiser le DCA", color: T.tealDark,
    desc: "Mettre en place un virement permanent mensuel depuis le compte bancaire vers le compte SGI. Chaque mois, passer 2-3 ordres d'achat selon le calendrier du plan.",
    action: "Virement automatique le 5 de chaque mois + routine achat bourse le 10.",
    time: "20 min/mois ensuite",
  },
];

const PORTFOLIO = [
  { ticker: "SNTS", name: "Sonatel",           weight: 25, reason: "20 ans de dividende sans interruption — le plus sûr", color: T.teal },
  { ticker: "BOAB", name: "BOA Bénin",          weight: 20, reason: "Yield 9,4% + croissance div. +16%/an", color: T.green },
  { ticker: "BOAS", name: "BOA Sénégal",        weight: 20, reason: "Proximité diaspora, yield ~9,5%", color: T.green },
  { ticker: "CIEC", name: "CIE (électricité)",  weight: 15, reason: "Utility défensive, dividende stable", color: T.blue },
  { ticker: "SDCC", name: "SODECI (eau)",        weight: 10, reason: "Quasi-obligataire, très défensif", color: T.blue },
  { ticker: "SGBC", name: "SGBCI",              weight: 10, reason: "Signature rendement bancaire premier plan", color: T.gold },
];

export default function HowToTab() {
  return (
    <div>
      <PageHeader
        eyebrow="Mode d'emploi"
        title="Par où commencer, étape par étape."
        description="L'ouverture d'un compte titres à la BRVM est comparable à l'ouverture d'un compte bancaire. Voici le parcours complet en 6 étapes, avec les délais réalistes."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
        {STEPS.map((s, i) => (
          <div key={s.n} style={{
            background: T.bgCard,
            border: `1px solid ${T.border}`,
            borderRadius: 16, padding: 28,
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 24, alignItems: "center",
            position: "relative",
          }}>
            {i < STEPS.length - 1 && (
              <div style={{
                position: "absolute", left: 48, top: "100%",
                width: 2, height: 16, background: T.border,
              }} />
            )}
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: s.color + "18",
              display: "grid", placeItems: "center",
              fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 700,
              color: s.color, letterSpacing: "-0.02em",
            }}>{s.n}</div>
            <div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 17, fontWeight: 700, color: T.ink, marginBottom: 6, letterSpacing: "-0.015em" }}>{s.title}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkMuted, lineHeight: 1.55, marginBottom: 10 }}>{s.desc}</div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 12px",
                background: s.color + "10", borderRadius: 8,
                fontFamily: FONT_SANS, fontSize: 12, color: s.color, fontWeight: 600,
              }}>
                <ArrowRight size={14} />
                {s.action}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted, fontWeight: 500, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>Durée</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkSoft, fontWeight: 600 }}>{s.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio suggestion */}
      <Card title="Un portefeuille de départ" subtitle="Conservateur, diversifié, revenus stables" icon={Briefcase} accent={T.teal}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: T.inkMuted, marginBottom: 20, lineHeight: 1.55 }}>
          Pour un profil pré-retraite (5-6 ans d'horizon), la priorité est la <strong style={{ color: T.ink }}>stabilité des dividendes</strong> plutôt que la croissance pure. Voici une allocation recommandée :
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {PORTFOLIO.map(p => (
            <div key={p.ticker} style={{
              padding: 18, background: T.bgSubtle,
              border: `1px solid ${T.borderSoft}`, borderRadius: 14,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: p.color, fontWeight: 700, letterSpacing: "0.05em" }}>{p.ticker}</div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: T.ink, fontWeight: 600, marginTop: 2 }}>{p.name}</div>
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: p.color, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>{p.weight}%</div>
              </div>
              <div style={{ height: 4, background: T.bgSoft, borderRadius: 999, marginBottom: 10, overflow: "hidden" }}>
                <div style={{ width: `${p.weight * 4}%`, height: "100%", background: p.color, borderRadius: 999 }} />
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, lineHeight: 1.5 }}>{p.reason}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 20, padding: "14px 18px",
          background: T.tealPale,
          border: `1px solid ${T.tealSoft}`,
          borderRadius: 12,
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <Info size={18} color={T.teal} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkSoft, lineHeight: 1.55 }}>
            <strong>Comment allouer le DCA mensuel ?</strong> Avec 75 000 F/mois par exemple : 1 action SNTS (~29k F) + 4 actions CIEC (13,6k F) + le reste pour alterner BOA et SGBCI selon le mois.
          </div>
        </div>
      </Card>
    </div>
  );
}
