import React, { useState } from "react";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { T, FONT_SANS, FONT_DISPLAY, FONT_MONO } from "../theme";
import PageHeader from "../components/PageHeader";

const FAQS = [
  {
    q: "Est-ce risqué ? Peut-on perdre la totalité du capital ?",
    a: "Non. Le capital est réparti sur plusieurs entreprises solides (Sonatel, BOA, SGBCI, CIE, SODECI). Une perte totale supposerait la faillite simultanée de toutes ces entreprises — un scénario extrêmement improbable. En revanche, le capital fluctue à court terme : certaines années il peut baisser de 5-15%, d'autres monter de 20-30%. Sur 5-6 ans, historiquement, la BRVM progresse en moyenne de 9-12% par an.",
  },
  {
    q: "Comment récupérer son argent en cas d'urgence ?",
    a: "C'est l'un des avantages majeurs de la BRVM par rapport à l'immobilier : le capital est liquide. Il suffit de donner un ordre de vente, total ou partiel. L'exécution se fait en quelques jours (règlement T+2), et les fonds sont disponibles sur le compte bancaire sous 1 à 2 semaines. Il est toutefois recommandé de conserver 6 à 12 mois de charges en épargne bancaire classique — la BRVM ne remplace pas l'épargne de précaution.",
  },
  {
    q: "Pourquoi ne pas simplement utiliser un livret d'épargne bancaire ?",
    a: "Un livret bancaire au Sénégal rapporte environ 3,5% par an. Sur 6 ans avec 75 000 F/mois, cela représente ~6,1 M F. Sur la BRVM à 9%, le même investissement atteint ~7,3 M F, soit +1,2 M F de différence (+20%). Surtout, à la retraite, le livret continue de rapporter 3,5% tandis que la BRVM génère 8-9% en dividendes — un écart considérable sur le revenu mensuel.",
  },
  {
    q: "Comment la SGI gagne-t-elle sa vie ? Y a-t-il des frais cachés ?",
    a: "La SGI facture (1) une commission de courtage sur chaque achat/vente, généralement 0,5 à 1% du montant de l'ordre, (2) parfois une commission de tenue de compte annuelle très faible (~5-10k F/an). Ces frais sont transparents, publiés par la SGI. Un DCA de 75k/mois génère donc ~375 à 750 F de frais par ordre — largement couvert dès le premier dividende.",
  },
  {
    q: "Les dividendes sont-ils imposés ?",
    a: "Oui. Une retenue à la source (IRVM) de 10% est prélevée automatiquement par l'émetteur avant versement. Exemple : Sonatel annonce un dividende brut de 1 850 F par action → le montant net perçu est de 1 655 F après IRVM. Cette fiscalité est déjà intégrée dans les rendements affichés (les 8-9% cités sont nets d'IRVM).",
  },
  {
    q: "Que se passe-t-il en cas de chute du marché, comme en 2020 ?",
    a: "En mars 2020 (Covid), la BRVM a perdu 30% en quelques semaines. Elle a intégralement récupéré sur 2021-2022, puis progressé de +25% en 2025. Les entreprises cotées (Sonatel, CIE) continuent de générer des revenus même en période de crise. Tant que les positions ne sont pas vendues, une baisse temporaire n'affecte pas le patrimoine réel. Les dividendes continuent d'être versés.",
  },
  {
    q: "À 5-6 ans de la retraite, n'est-il pas trop tard pour commencer ?",
    a: "Non. Même sur 5-6 ans, l'effet composé génère 15-20% de gain au-delà du capital versé. L'objectif principal n'est pas la plus-value mais la constitution d'un capital générateur de revenus. Avec 5,4 M F de capital, les dividendes rapportent déjà 35 à 40 000 F par mois, de manière récurrente, sans entamer le capital. L'essentiel est de commencer.",
  },
  {
    q: "Qu'advient-il des actions en cas de décès du titulaire ?",
    a: "Elles font partie du patrimoine et sont transmises aux héritiers selon le droit successoral sénégalais, au même titre qu'un bien immobilier ou un compte bancaire. Il est recommandé de désigner une personne de confiance comme mandataire sur le compte, et d'informer ses proches de l'existence du compte SGI.",
  },
  {
    q: "La BRVM est-elle un marché sérieux et réglementé ?",
    a: "Oui. La BRVM est régulée par le CREPMF (Conseil Régional de l'Épargne Publique et des Marchés Financiers), l'équivalent de l'AMF française. Les SGI doivent obtenir un agrément officiel pour opérer. Les comptes titres sont conservés auprès d'un dépositaire central (DC/BR) indépendant de la SGI — en cas de défaillance de la SGI, les titres restent intégralement protégés.",
  },
  {
    q: "Quelles sont les premières étapes concrètes ?",
    a: "Semaine 1 : identifier 2-3 SGI et les contacter pour comparer (exemples à Dakar : CGF Bourse, SGI IMPAXIS, Invictus Capital). Semaine 1-2 : rassembler les documents requis (CNI, justificatif de domicile, RIB). Semaine 2-3 : prendre rendez-vous pour l'ouverture du compte ou effectuer la démarche en ligne. Semaine 3-4 : premier virement et premier ordre d'achat. En moins d'un mois, le compte est opérationnel.",
  },
];

export default function FAQTab() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      <PageHeader
        eyebrow="Questions & réponses"
        title="Questions fréquentes"
        description="Les 10 questions les plus courantes sur l'investissement BRVM pour la retraite. Réponses détaillées, avec les chiffres réels et les garde-fous à connaître."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{
              background: T.bgCard,
              border: `1px solid ${isOpen ? T.teal : T.border}`,
              borderRadius: 14, overflow: "hidden",
              transition: "all 0.2s",
            }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: "100%", padding: "20px 24px",
                background: isOpen ? T.tealPale : "transparent",
                border: "none", textAlign: "left", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                transition: "background 0.2s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: isOpen ? T.teal : T.bgSoft,
                    color: isOpen ? "white" : T.inkMuted,
                    display: "grid", placeItems: "center",
                    fontFamily: FONT_MONO, fontSize: 13, fontWeight: 600,
                    flexShrink: 0, transition: "all 0.2s",
                  }}>{i + 1}</div>
                  <div style={{
                    fontFamily: FONT_SANS, fontSize: 15, fontWeight: 600,
                    color: T.ink, letterSpacing: "-0.01em",
                  }}>{f.q}</div>
                </div>
                <div style={{
                  transition: "transform 0.2s",
                  transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                  color: isOpen ? T.teal : T.inkMuted,
                }}>
                  <ArrowRight size={18} />
                </div>
              </button>
              {isOpen && (
                <div style={{
                  padding: "4px 24px 24px 68px",
                  fontFamily: FONT_SANS, fontSize: 14, color: T.inkSoft, lineHeight: 1.65,
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
        marginTop: 40, padding: 40,
        background: `linear-gradient(135deg, ${T.tealDark} 0%, ${T.teal} 100%)`,
        borderRadius: 20, color: T.inkInv,
        position: "relative", overflow: "hidden", textAlign: "center",
      }}>
        <div style={{
          position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(251, 191, 36, 0.2), transparent 60%)",
          borderRadius: "50%",
        }} />
        <div style={{ position: "relative", maxWidth: 660, margin: "0 auto" }}>
          <Sparkles size={32} color="#FBBF24" style={{ marginBottom: 18 }} />
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: 38, fontWeight: 500,
            letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 18,
          }}>
            Le meilleur moment pour planter un arbre,<br />
            <span style={{ color: "#FBBF24", fontStyle: "italic" }}>c'était il y a 20 ans.</span>
          </div>
          <div style={{
            fontFamily: FONT_SANS, fontSize: 17, lineHeight: 1.55,
            color: "rgba(255,255,255,0.92)", marginBottom: 28,
          }}>
            Le deuxième meilleur moment, c'est <strong style={{ color: "#FBBF24" }}>maintenant</strong>. Chaque mois de report représente de l'intérêt composé perdu. Chaque mois investi est un mois supplémentaire qui contribue au capital retraite.
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 22px",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)", borderRadius: 12,
            fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.2)",
          }}>
            <Play size={16} />
            Étape 1 : appeler 2-3 SGI cette semaine
          </div>
        </div>
      </div>
    </div>
  );
}
