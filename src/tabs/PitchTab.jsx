import React from "react";
import {
  Sparkles, CheckCircle2, Shield, TrendingUp, Clock, Lightbulb, Coins, Info,
} from "lucide-react";
import { T, FONT_SANS, FONT_DISPLAY } from "../theme";
import Card from "../components/Card";
import ScenarioCards from "../components/ScenarioCards";

const KEY_NUMBERS = [
  { label: "Performance BRVM 2025", value: "+25,3%", sub: "Bien mieux que le livret bancaire", color: T.green },
  { label: "Performance 5 ans", value: "+99,15%", sub: "Le capital a presque doublé", color: T.teal },
  { label: "Rendement dividendes moyen", value: "~9%", sub: "par an, encaissés sur le compte", color: T.gold },
  { label: "Capital minimum", value: "25k", sub: "FCFA pour commencer", color: T.blue },
];

const REASONS = [
  {
    icon: Shield,
    title: "C'est chez nous",
    desc: "La BRVM est la bourse commune à 8 pays d'Afrique de l'Ouest : Sénégal, Côte d'Ivoire, Bénin, Togo, Burkina, Mali, Niger, Guinée-Bissau. Les entreprises cotées sont des acteurs majeurs de la région : Sonatel, Orange, SODECI, CIE, BOA, SGBCI.",
    color: T.teal,
  },
  {
    icon: TrendingUp,
    title: "Les chiffres sont là",
    desc: "La bourse a gagné +25% en 2025, +99% sur 5 ans. Les banques BOA ont versé 88 milliards FCFA de dividendes à leurs actionnaires en 2024. Sonatel verse un dividende tous les ans depuis plus de 20 ans — sans interruption.",
    color: T.gold,
  },
  {
    icon: Clock,
    title: "Même 5-6 ans suffisent",
    desc: "Avec 75 000 F/mois pendant 6 ans (soit ~5,4 M F au total), le capital final peut atteindre 7,3 M F. À 8-9% de rendement en dividendes, cela génère environ 55 000 F par mois de revenus passifs — sans entamer le capital.",
    color: T.blue,
  },
];

export default function PitchTab() {
  return (
    <div>
      {/* Hero */}
      <div style={{
        marginBottom: 40,
        padding: "48px 40px",
        background: `linear-gradient(135deg, ${T.tealDark} 0%, ${T.teal} 60%, #047857 100%)`,
        borderRadius: 24,
        color: T.inkInv,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -100, right: -100,
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(251, 191, 36, 0.25), transparent 60%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: -80,
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 60%)",
          borderRadius: "50%",
        }} />
        <div style={{ position: "relative", maxWidth: 820 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 14px",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(8px)",
            borderRadius: 999,
            fontFamily: FONT_SANS, fontSize: 12, color: "#FEF3C7",
            fontWeight: 600, letterSpacing: "0.02em",
            marginBottom: 20,
          }}>
            <Sparkles size={14} />
            Stratégie retraite BRVM · horizon 5-6 ans
          </div>
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: 52, fontWeight: 500,
            letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 20,
          }}>
            Un complément de retraite<br />
            <span style={{ color: "#FBBF24", fontStyle: "italic" }}>fabriqué en 6 ans.</span>
          </div>
          <div style={{
            fontFamily: FONT_SANS, fontSize: 18, lineHeight: 1.55,
            color: "rgba(255,255,255,0.92)", marginBottom: 28,
            maxWidth: 680,
          }}>
            En investissant entre 50 000 et 100 000 FCFA par mois sur la BRVM, il est possible de constituer un capital qui, à la retraite, <strong style={{ color: "#FBBF24" }}>couvre les factures d'électricité, d'eau, télécoms et plus encore chaque mois</strong> — sans jamais toucher au capital lui-même.
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {["Argent toujours accessible", "Investi au Sénégal et en UEMOA", "Encadré par une SGI agréée"].map(txt => (
              <div key={txt} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 16px",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                borderRadius: 10,
                fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600,
              }}>
                <CheckCircle2 size={16} color="#86EFAC" />
                {txt}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key numbers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32 }}>
        {KEY_NUMBERS.map(n => (
          <Card key={n.label} padding={20}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted, fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 8 }}>{n.label}</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 36, color: n.color, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1 }}>{n.value}</div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, marginTop: 6, lineHeight: 1.4 }}>{n.sub}</div>
          </Card>
        ))}
      </div>

      {/* Why now */}
      <Card title="Pourquoi la BRVM, et pourquoi maintenant ?" subtitle="3 raisons simples" icon={Lightbulb} accent={T.gold} style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {REASONS.map((r, i) => (
            <div key={i} style={{
              padding: 20,
              background: T.bgSubtle,
              border: `1px solid ${T.borderSoft}`,
              borderRadius: 14,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: r.color + "18",
                display: "grid", placeItems: "center",
                marginBottom: 14,
              }}>
                <r.icon size={20} color={r.color} strokeWidth={2.2} />
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 17, fontWeight: 700, color: T.ink, marginBottom: 8, letterSpacing: "-0.015em" }}>{r.title}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkMuted, lineHeight: 1.6 }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Scenarios intro */}
      <Card title="3 niveaux de contribution mensuelle" subtitle="Choisissez ce qui est confortable — l'important est de commencer" icon={Coins} accent={T.teal}>
        <ScenarioCards years={6} rate={9} />
        <div style={{
          marginTop: 20, padding: "14px 18px",
          background: T.tealPale,
          border: `1px solid ${T.tealSoft}`,
          borderRadius: 12,
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <Info size={18} color={T.teal} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkSoft, lineHeight: 1.55 }}>
            <strong>Hypothèse retenue : 9% par an.</strong> Ce taux est <em>inférieur</em> à la performance réelle de la BRVM sur 5 ans (14,8%/an). L'estimation reste prudente. Le capital est exposé à la croissance économique de l'UEMOA — ce qui n'est pas le cas d'une épargne classique en banque.
          </div>
        </div>
      </Card>
    </div>
  );
}
