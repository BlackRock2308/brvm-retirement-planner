import React from "react";
import { ArrowRight, Info, Briefcase } from "lucide-react";
import { T, FONT_SANS, FONT_DISPLAY, FONT_MONO } from "../theme";
import useIsMobile from "../hooks/useIsMobile";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";

const STEPS = [
  { n: "01", title: "Choisir une SGI agréée", color: T.teal, desc: "Une SGI (Société de Gestion et d'Intermédiation) est une société agréée par le régulateur (CREPMF) pour passer les ordres sur la BRVM.", action: "Comparer les SGI de Dakar : frais, interface en ligne, accessibilité mobile money.", time: "1-2 jours" },
  { n: "02", title: "Préparer les documents", color: T.blue, desc: "Carte d'identité, justificatif de domicile récent, photo d'identité, RIB bancaire.", action: "Rassembler les 4 pièces et prendre rendez-vous.", time: "30 min" },
  { n: "03", title: "Ouvrir le compte titres", color: T.gold, desc: "La SGI crée un compte titres pour conserver les actions et un compte espèces pour les achats.", action: "Signer la convention d'ouverture.", time: "3-7 jours" },
  { n: "04", title: "Approvisionner le compte", color: T.green, desc: "Virement bancaire ou mobile money (Orange Money, Wave) selon la SGI.", action: "Virement de la première contribution mensuelle.", time: "Immédiat" },
  { n: "05", title: "Passer le premier ordre", color: T.red, desc: "Depuis l'espace client de la SGI, sélectionner le titre et indiquer le nombre d'unités.", action: "Premier ordre : 1 action Sonatel (SNTS) à ~29 000 F.", time: "5-10 min" },
  { n: "06", title: "Automatiser le DCA", color: T.tealDark, desc: "Virement permanent mensuel depuis le compte bancaire vers le compte SGI.", action: "Virement automatique le 5 de chaque mois.", time: "20 min/mois" },
];

const PORTFOLIO = [
  { ticker: "SNTS", name: "Sonatel", weight: 25, reason: "20 ans de dividende sans interruption", color: T.teal },
  { ticker: "BOAB", name: "BOA Bénin", weight: 20, reason: "Yield 9,4% + croissance +16%/an", color: T.green },
  { ticker: "BOAS", name: "BOA Sénégal", weight: 20, reason: "Proximité diaspora, yield ~9,5%", color: T.green },
  { ticker: "CIEC", name: "CIE (électricité)", weight: 15, reason: "Utility défensive, dividende stable", color: T.blue },
  { ticker: "SDCC", name: "SODECI (eau)", weight: 10, reason: "Quasi-obligataire, très défensif", color: T.blue },
  { ticker: "SGBC", name: "SGBCI", weight: 10, reason: "Rendement bancaire premier plan", color: T.gold },
];

export default function HowToTab() {
  const m = useIsMobile();

  return (
    <div>
      <PageHeader
        eyebrow="Mode d'emploi"
        title="Par où commencer, étape par étape."
        description="L'ouverture d'un compte titres à la BRVM est comparable à l'ouverture d'un compte bancaire."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: m ? 10 : 16, marginBottom: m ? 20 : 32 }}>
        {STEPS.map((s, i) => (
          <div key={s.n} style={{
            background: T.bgCard,
            border: `1px solid ${T.border}`,
            borderRadius: m ? 12 : 16, padding: m ? 16 : 28,
            display: "grid",
            gridTemplateColumns: m ? "auto 1fr" : "auto 1fr auto",
            gap: m ? 12 : 24, alignItems: m ? "flex-start" : "center",
            position: "relative",
          }}>
            {!m && i < STEPS.length - 1 && (
              <div style={{
                position: "absolute", left: 48, top: "100%",
                width: 2, height: 16, background: T.border,
              }} />
            )}
            <div style={{
              width: m ? 40 : 52, height: m ? 40 : 52, borderRadius: m ? 12 : 16,
              background: s.color + "18", display: "grid", placeItems: "center",
              fontFamily: FONT_DISPLAY, fontSize: m ? 16 : 20, fontWeight: 700,
              color: s.color,
            }}>{s.n}</div>
            <div>
              <div style={{ fontFamily: FONT_SANS, fontSize: m ? 15 : 17, fontWeight: 700, color: T.ink, marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkMuted, lineHeight: 1.55, marginBottom: 8 }}>{s.desc}</div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 10px", background: s.color + "10", borderRadius: 8,
                fontFamily: FONT_SANS, fontSize: 11, color: s.color, fontWeight: 600,
              }}>
                <ArrowRight size={12} />
                {s.action}
              </div>
              {m && (
                <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted }}>
                  Durée : <strong style={{ color: T.inkSoft }}>{s.time}</strong>
                </div>
              )}
            </div>
            {!m && (
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted, fontWeight: 500, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>Durée</div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkSoft, fontWeight: 600 }}>{s.time}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Card title="Un portefeuille de départ" subtitle="Conservateur, diversifié, revenus stables" icon={Briefcase} accent={T.teal}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: T.inkMuted, marginBottom: 16, lineHeight: 1.55 }}>
          Pour un profil pré-retraite, la priorité est la <strong style={{ color: T.ink }}>stabilité des dividendes</strong>.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", gap: m ? 10 : 14 }}>
          {PORTFOLIO.map(p => (
            <div key={p.ticker} style={{
              padding: m ? 14 : 18, background: T.bgSubtle,
              border: `1px solid ${T.borderSoft}`, borderRadius: 14,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: p.color, fontWeight: 700 }}>{p.ticker}</div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: T.ink, fontWeight: 600, marginTop: 2 }}>{p.name}</div>
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: m ? 24 : 28, color: p.color, fontWeight: 700, lineHeight: 1 }}>{p.weight}%</div>
              </div>
              <div style={{ height: 4, background: T.bgSoft, borderRadius: 999, marginBottom: 8, overflow: "hidden" }}>
                <div style={{ width: `${p.weight * 4}%`, height: "100%", background: p.color, borderRadius: 999 }} />
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, lineHeight: 1.5 }}>{p.reason}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 16, padding: "12px 14px",
          background: T.tealPale, border: `1px solid ${T.tealSoft}`,
          borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <Info size={16} color={T.teal} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkSoft, lineHeight: 1.55 }}>
            <strong>Exemple avec 75 000 F/mois :</strong> 1 action SNTS (~29k F) + 4 actions CIEC (13,6k F) + le reste pour alterner BOA et SGBCI.
          </div>
        </div>
      </Card>
    </div>
  );
}
