import React, { useState } from "react";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { T, FONT_SANS, FONT_DISPLAY, FONT_MONO } from "../theme";
import useIsMobile from "../hooks/useIsMobile";
import PageHeader from "../components/PageHeader";

const FAQS = [
  { q: "Est-ce risqué ? Peut-on perdre la totalité du capital ?", a: "Non. Le capital est réparti sur plusieurs entreprises solides (Sonatel, BOA, SGBCI, CIE, SODECI). Une perte totale supposerait la faillite simultanée de toutes ces entreprises — un scénario extrêmement improbable. En revanche, le capital fluctue à court terme : certaines années il peut baisser de 5-15%, d'autres monter de 20-30%. Sur 5-6 ans, historiquement, la BRVM progresse en moyenne de 9-12% par an." },
  { q: "Comment récupérer son argent en cas d'urgence ?", a: "C'est l'un des avantages majeurs de la BRVM par rapport à l'immobilier : le capital est liquide. Il suffit de donner un ordre de vente, total ou partiel. L'exécution se fait en quelques jours (règlement T+2), et les fonds sont disponibles sur le compte bancaire sous 1 à 2 semaines." },
  { q: "Pourquoi ne pas simplement utiliser un livret d'épargne bancaire ?", a: "Un livret bancaire au Sénégal rapporte environ 3,5% par an. Sur 6 ans avec 75 000 F/mois, cela représente ~6,1 M F. Sur la BRVM à 9%, le même investissement atteint ~7,3 M F, soit +1,2 M F de différence (+20%). Surtout, à la retraite, le livret rapporte 3,5% tandis que la BRVM génère 8-9% en dividendes." },
  { q: "Comment la SGI gagne-t-elle sa vie ? Y a-t-il des frais cachés ?", a: "La SGI facture une commission de courtage de 0,5 à 1% par ordre, et parfois une commission de tenue de compte annuelle (~5-10k F/an). Ces frais sont transparents et publiés." },
  { q: "Les dividendes sont-ils imposés ?", a: "Oui. Une retenue à la source (IRVM) de 10% est prélevée automatiquement. Les 8-9% de rendement cités sont déjà nets d'IRVM." },
  { q: "Que se passe-t-il en cas de chute du marché ?", a: "En mars 2020 (Covid), la BRVM a perdu 30% en quelques semaines. Elle a intégralement récupéré sur 2021-2022, puis progressé de +25% en 2025. Tant que les positions ne sont pas vendues, une baisse temporaire n'affecte pas le patrimoine réel." },
  { q: "À 5-6 ans de la retraite, n'est-il pas trop tard ?", a: "Non. Même sur 5-6 ans, l'effet composé génère 15-20% de gain au-delà du capital versé. Avec 5,4 M F de capital, les dividendes rapportent 35 à 40 000 F par mois, sans entamer le capital. L'essentiel est de commencer." },
  { q: "Qu'advient-il des actions en cas de décès du titulaire ?", a: "Elles font partie du patrimoine et sont transmises aux héritiers selon le droit successoral sénégalais. Il est recommandé de désigner un mandataire et d'informer ses proches de l'existence du compte SGI." },
  { q: "La BRVM est-elle un marché réglementé ?", a: "Oui. La BRVM est régulée par le CREPMF, l'équivalent de l'AMF française. Les comptes titres sont conservés auprès d'un dépositaire central indépendant — en cas de défaillance de la SGI, les titres restent protégés." },
  { q: "Quelles sont les premières étapes concrètes ?", a: "Semaine 1 : identifier 2-3 SGI. Semaine 1-2 : rassembler les documents (CNI, justificatif de domicile, RIB). Semaine 2-3 : ouverture du compte. Semaine 3-4 : premier virement et premier ordre. En moins d'un mois, le compte est opérationnel." },
];

export default function FAQTab() {
  const m = useIsMobile();
  const [open, setOpen] = useState(0);

  return (
    <div>
      <PageHeader
        eyebrow="Questions & réponses"
        title="Questions fréquentes"
        description="Les 10 questions les plus courantes sur l'investissement BRVM pour la retraite."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: m ? 8 : 10 }}>
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{
              background: T.bgCard,
              border: `1px solid ${isOpen ? T.teal : T.border}`,
              borderRadius: m ? 12 : 14, overflow: "hidden",
              transition: "all 0.2s",
            }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: "100%", padding: m ? "14px 16px" : "20px 24px",
                background: isOpen ? T.tealPale : "transparent",
                border: "none", textAlign: "left", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: m ? 10 : 16,
                transition: "background 0.2s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: m ? 10 : 14 }}>
                  <div style={{
                    width: m ? 26 : 30, height: m ? 26 : 30, borderRadius: 8,
                    background: isOpen ? T.teal : T.bgSoft,
                    color: isOpen ? "white" : T.inkMuted,
                    display: "grid", placeItems: "center",
                    fontFamily: FONT_MONO, fontSize: m ? 11 : 13, fontWeight: 600,
                    flexShrink: 0,
                  }}>{i + 1}</div>
                  <div style={{
                    fontFamily: FONT_SANS, fontSize: m ? 13 : 15, fontWeight: 600,
                    color: T.ink,
                  }}>{f.q}</div>
                </div>
                <div style={{
                  transition: "transform 0.2s",
                  transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                  color: isOpen ? T.teal : T.inkMuted, flexShrink: 0,
                }}>
                  <ArrowRight size={m ? 16 : 18} />
                </div>
              </button>
              {isOpen && (
                <div style={{
                  padding: m ? "4px 16px 16px 52px" : "4px 24px 24px 68px",
                  fontFamily: FONT_SANS, fontSize: m ? 13 : 14, color: T.inkSoft, lineHeight: 1.65,
                }}>
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final CTA */}
      <div style={{
        marginTop: m ? 28 : 40, padding: m ? 28 : 40,
        background: `linear-gradient(135deg, ${T.tealDark} 0%, ${T.teal} 100%)`,
        borderRadius: m ? 16 : 20, color: T.inkInv,
        position: "relative", overflow: "hidden", textAlign: "center",
      }}>
        <div style={{ position: "relative", maxWidth: 660, margin: "0 auto" }}>
          <Sparkles size={m ? 24 : 32} color="#FBBF24" style={{ marginBottom: 14 }} />
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: m ? 24 : 38, fontWeight: 500,
            letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 14,
          }}>
            Le meilleur moment pour planter un arbre,<br />
            <span style={{ color: "#FBBF24", fontStyle: "italic" }}>c'était il y a 20 ans.</span>
          </div>
          <div style={{
            fontFamily: FONT_SANS, fontSize: m ? 14 : 17, lineHeight: 1.55,
            color: "rgba(255,255,255,0.92)", marginBottom: m ? 20 : 28,
          }}>
            Le deuxième meilleur moment, c'est <strong style={{ color: "#FBBF24" }}>maintenant</strong>.
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: m ? "10px 18px" : "12px 22px",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)", borderRadius: 12,
            fontFamily: FONT_SANS, fontSize: m ? 13 : 14, fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.2)",
          }}>
            <Play size={14} />
            Appeler 2-3 SGI cette semaine
          </div>
        </div>
      </div>
    </div>
  );
}
