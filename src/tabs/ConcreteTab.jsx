import React, { useState } from "react";
import {
  Zap, Droplet, Phone, Utensils, Car, Heart, Home, Target,
  GraduationCap, Users, Smile, Sparkles,
} from "lucide-react";
import { T, FONT_SANS, FONT_DISPLAY, FONT_MONO } from "../theme";
import { fmtFCFA, fmtFCFAfull, projectDCA } from "../utils";
import Card from "../components/Card";
import Pill from "../components/Pill";
import PageHeader from "../components/PageHeader";
import ScenarioCards from "../components/ScenarioCards";

const BILLS = [
  { icon: Zap,     label: "Facture Senelec (électricité)", amount: 25000, color: T.amber },
  { icon: Droplet, label: "Facture SDE (eau)",             amount: 10000, color: T.blue },
  { icon: Phone,   label: "Abonnement Canal+ + Internet",  amount: 35000, color: T.teal },
  { icon: Utensils,label: "Contribution courses semaine",   amount: 40000, color: T.gold },
  { icon: Car,     label: "Carburant + entretien véhicule", amount: 30000, color: T.inkSoft },
  { icon: Heart,   label: "Soutien famille élargie / dons", amount: 25000, color: T.red },
];

const LIFE_SCENARIOS = [
  { icon: GraduationCap, title: "Financer les études des petits-enfants", desc: "Une année à l'université privée à Dakar coûte environ 800 000 à 1,5 M FCFA. Le capital final peut en financer plusieurs.", color: T.blue },
  { icon: Home, title: "Rénover son logement sereinement", desc: "Réfection toiture, peinture, agrandissement — le capital permet de financer les travaux nécessaires sans toucher aux revenus mensuels.", color: T.teal },
  { icon: Heart, title: "Soutenir la famille sans se priver", desc: "Contribuer aux mariages, baptêmes et événements familiaux devient possible sans impacter son propre niveau de vie.", color: T.red },
  { icon: Users, title: "Voyager pour voir ses proches", desc: "Un billet Paris-Dakar coûte 400-700k F. Les revenus mensuels permettent un voyage par an sans effort financier.", color: T.gold },
  { icon: Smile, title: "Une tranquillité d'esprit durable", desc: "Une retraite sereine, c'est ne plus se demander comment finir le mois. Les dividendes apportent cette sécurité.", color: T.tealDark },
  { icon: Sparkles, title: "Transmettre un patrimoine", desc: "Le capital BRVM est transmissible. Les actions restent, les dividendes continuent. C'est un héritage concret pour les générations suivantes.", color: T.amber },
];

export default function ConcreteTab() {
  const [dcaChoice, setDcaChoice] = useState(75000);
  const years = 6;
  const data = projectDCA({ monthly: dcaChoice, years, annualRate: 9 });
  const finalValue = data[data.length - 1].value;
  const monthlyDiv = (finalValue * 0.08) / 12;

  const totalBills = BILLS.reduce((a, b) => a + b.amount, 0);
  const coverage = (monthlyDiv / totalBills) * 100;
  const coveredBills = BILLS.reduce((acc, b) => {
    if (acc.remaining >= b.amount) {
      return { list: [...acc.list, { ...b, covered: true }], remaining: acc.remaining - b.amount };
    } else if (acc.remaining > 0) {
      return { list: [...acc.list, { ...b, covered: "partial", partial: acc.remaining }], remaining: 0 };
    }
    return { list: [...acc.list, { ...b, covered: false }], remaining: 0 };
  }, { list: [], remaining: monthlyDiv });

  return (
    <div>
      <PageHeader
        eyebrow="Au quotidien"
        title="Concrètement, qu'est-ce que ça change ?"
        description="Au-delà des chiffres, voici ce que ces revenus permettent concrètement. Correspondance entre les dividendes mensuels et les charges courantes d'un foyer à Dakar."
      />

      <Card title="Choisissez le scénario à visualiser" subtitle="L'impact change selon le DCA mensuel" icon={Target} style={{ marginBottom: 20 }}>
        <ScenarioCards selected={dcaChoice} setSelected={setDcaChoice} years={years} rate={9} />
      </Card>

      {/* Headline */}
      <div style={{
        padding: 36,
        background: `linear-gradient(135deg, ${T.tealDark} 0%, ${T.teal} 100%)`,
        borderRadius: 20, color: T.inkInv,
        marginBottom: 20,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(251, 191, 36, 0.25), transparent 60%)",
          borderRadius: "50%",
        }} />
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 30, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 14 }}>
              Revenus mensuels à la retraite
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 64, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 0.95, marginBottom: 12 }}>
              {fmtFCFAfull(Math.round(monthlyDiv))} F
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 17, color: "#FBBF24", fontWeight: 500, marginBottom: 20 }}>
              chaque mois, à vie, sans travailler
            </div>
            <div style={{
              padding: "14px 18px",
              background: "rgba(0,0,0,0.2)", borderRadius: 12,
              fontFamily: FONT_SANS, fontSize: 14, lineHeight: 1.55,
            }}>
              C'est <strong style={{ color: "#FBBF24" }}>{coverage > 100 ? "plus que" : coverage > 75 ? "presque autant que" : "une partie de"}</strong> les charges courantes mensuelles d'un foyer sénégalais type.
            </div>
          </div>
          <div style={{
            padding: 24,
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.18)",
          }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: "0.02em", marginBottom: 10 }}>
              Capital constitué en {years} ans
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 38, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 14 }}>
              {fmtFCFA(finalValue)} F
            </div>
            <div style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.2)", fontFamily: FONT_SANS, fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
              <div style={{ marginBottom: 4 }}>Total versé : {fmtFCFA(dcaChoice * 12 * years)} F</div>
              <div>Gain : <strong style={{ color: "#86EFAC" }}>+{fmtFCFA(finalValue - dcaChoice * 12 * years)} F</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bills breakdown */}
      <Card title="À quoi ça correspond concrètement ?" subtitle={`Les ${fmtFCFAfull(Math.round(monthlyDiv))} F mensuels couvrent :`} icon={Home} accent={T.teal} style={{ marginBottom: 20 }}>
        <div>
          {coveredBills.list.map((b, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto",
              alignItems: "center", gap: 14,
              padding: "16px 0",
              borderBottom: i < coveredBills.list.length - 1 ? `1px solid ${T.borderSoft}` : "none",
              opacity: b.covered === false ? 0.45 : 1,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: b.covered === true ? T.greenSoft : b.covered === "partial" ? T.amberSoft : T.bgSoft,
                display: "grid", placeItems: "center",
              }}>
                <b.icon size={20} color={b.covered === true ? T.green : b.covered === "partial" ? T.amber : T.inkMuted} />
              </div>
              <div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: T.ink, fontWeight: 600, marginBottom: 2 }}>{b.label}</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: T.inkMuted }}>
                  {fmtFCFAfull(b.amount)} F/mois
                  {b.covered === "partial" && <span style={{ color: T.amber, marginLeft: 8 }}>· {fmtFCFAfull(b.partial)} F couverts</span>}
                </div>
              </div>
              <div>
                {b.covered === true && <Pill color={T.green} bg={T.greenSoft}>✓ Couvert</Pill>}
                {b.covered === "partial" && <Pill color={T.amber} bg={T.amberSoft}>Partiel</Pill>}
                {b.covered === false && <Pill color={T.inkMuted} bg={T.bgSoft}>Pas encore</Pill>}
              </div>
              <div style={{ minWidth: 80, textAlign: "right" }}>
                <div style={{
                  width: 60, height: 8,
                  background: T.bgSoft, borderRadius: 999,
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    width: b.covered === true ? "100%" : b.covered === "partial" ? `${(b.partial / b.amount) * 100}%` : "0%",
                    background: b.covered === true ? T.green : T.amber,
                    borderRadius: 999, transition: "width 0.4s",
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 20, padding: "14px 18px",
          background: coverage >= 100 ? T.tealPale : T.bgSubtle,
          border: `1px solid ${coverage >= 100 ? T.tealSoft : T.borderSoft}`,
          borderRadius: 12,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, fontWeight: 500, marginBottom: 2 }}>Total charges mensuelles du foyer</div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 18, color: T.ink, fontWeight: 700 }}>{fmtFCFAfull(totalBills)} F</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, fontWeight: 500, marginBottom: 2 }}>Couverture par les dividendes</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: coverage >= 100 ? T.green : T.gold, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>
              {Math.round(coverage)}%
            </div>
          </div>
        </div>
      </Card>

      {/* Life scenarios */}
      <Card title="Ce que ça permet vraiment" subtitle="Au-delà des chiffres" icon={Heart} accent={T.red}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {LIFE_SCENARIOS.map((s, i) => (
            <div key={i} style={{
              padding: 22, background: T.bgSubtle,
              border: `1px solid ${T.borderSoft}`,
              borderRadius: 14, borderLeft: `3px solid ${s.color}`,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: s.color + "18",
                display: "grid", placeItems: "center", marginBottom: 14,
              }}>
                <s.icon size={20} color={s.color} strokeWidth={2.2} />
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 15, fontWeight: 700, color: T.ink, marginBottom: 8, letterSpacing: "-0.015em" }}>{s.title}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkMuted, lineHeight: 1.55 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
