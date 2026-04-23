import React, { useState } from "react";
import {
  Coins, Target, Home, Briefcase, Shield, Award, Lightbulb,
} from "lucide-react";
import { T, FONT_SANS, FONT_DISPLAY, FONT_MONO } from "../theme";
import { fmtFCFA, fmtFCFAfull, projectDCA } from "../utils";
import useIsMobile from "../hooks/useIsMobile";
import Card from "../components/Card";
import Pill from "../components/Pill";
import PageHeader from "../components/PageHeader";
import ScenarioCards from "../components/ScenarioCards";

const TOP_STOCKS = [
  { ticker: "BOAB", name: "BOA Bénin", flag: "\u{1F1E7}\u{1F1EF}", yield: 9.4, years: "> 10 ans", growth: "+16,5%/an", sector: "Banque" },
  { ticker: "BOAS", name: "BOA Sénégal", flag: "\u{1F1F8}\u{1F1F3}", yield: 9.5, years: "> 10 ans", growth: "+10-12%/an", sector: "Banque" },
  { ticker: "SGBC", name: "SGBCI", flag: "\u{1F1E8}\u{1F1EE}", yield: 7.0, years: "> 15 ans", growth: "+5-7%/an", sector: "Banque" },
  { ticker: "CIEC", name: "CIE", flag: "\u{1F1E8}\u{1F1EE}", yield: 7.0, years: "> 15 ans", growth: "+3-5%/an", sector: "Électricité" },
  { ticker: "SDCC", name: "SODECI", flag: "\u{1F1E8}\u{1F1EE}", yield: 6.5, years: "> 15 ans", growth: "+2-5%/an", sector: "Eau" },
  { ticker: "SNTS", name: "Sonatel", flag: "\u{1F1F8}\u{1F1F3}", yield: 5.7, years: "> 20 ans \u2726", growth: "+6-8%/an", sector: "Télécoms" },
];

export default function DividendsTab() {
  const m = useIsMobile();
  const [dcaChoice, setDcaChoice] = useState(75000);
  const years = 6;
  const rate = 9;
  const yieldPct = 8;

  const data = projectDCA({ monthly: dcaChoice, years, annualRate: rate });
  const final = data[data.length - 1];
  const monthlyIncome = (final.value * yieldPct) / 100 / 12;

  return (
    <div>
      <PageHeader
        eyebrow="Revenus passifs"
        title="Un salaire supplémentaire, tous les mois."
        description="Une fois le capital constitué, les entreprises où vous êtes actionnaire vous versent chaque année une partie de leurs bénéfices : ce sont les dividendes."
      />

      <Card title="Choisissez le scénario" subtitle="Cliquez sur l'un des trois" icon={Target} style={{ marginBottom: 20 }}>
        <ScenarioCards selected={dcaChoice} setSelected={setDcaChoice} years={years} rate={rate} />
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div style={{
          padding: m ? 24 : 32,
          background: `linear-gradient(135deg, ${T.gold}, #C2410C)`,
          borderRadius: 16, color: T.inkInv,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "relative" }}>
            <Coins size={24} color="#FEF3C7" strokeWidth={2} />
            <div style={{ fontFamily: FONT_SANS, fontSize: m ? 12 : 13, color: "rgba(255,255,255,0.9)", fontWeight: 600, marginTop: 12, marginBottom: 10 }}>
              Avec un versement de {fmtFCFAfull(dcaChoice)} F/mois pendant {years} ans :
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: m ? 48 : 72, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 0.95, marginBottom: 8 }}>
              {fmtFCFAfull(Math.round(monthlyIncome))}
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: m ? 16 : 18, fontWeight: 600 }}>
              FCFA <span style={{ color: "#FEF3C7" }}>par mois</span>
            </div>
            <div style={{
              marginTop: 18, padding: "12px 14px",
              background: "rgba(0,0,0,0.2)", borderRadius: 10,
              fontFamily: FONT_SANS, fontSize: 13, lineHeight: 1.5,
            }}>
              <strong>Sans vendre aucune action</strong> — le capital de {fmtFCFA(final.value)} F reste intact.
            </div>
          </div>
        </div>

        <Card title="3 idées pour bien comprendre" subtitle="Ce que représentent ces revenus" icon={Lightbulb} accent={T.gold}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkSoft, lineHeight: 1.6 }}>
            {[
              { icon: Home, text: <><strong style={{ color: T.ink }}>Un revenu comparable à un loyer perçu.</strong> Au lieu de louer un bien immobilier, l'actionnaire perçoit une part des bénéfices des entreprises dans lesquelles il investit.</> },
              { icon: Briefcase, text: <><strong style={{ color: T.ink }}>Aucune action requise.</strong> Le dividende est versé automatiquement sur le compte, 1 à 2 fois par an.</> },
              { icon: Shield, text: <><strong style={{ color: T.ink }}>Une régularité éprouvée.</strong> Sonatel verse un dividende chaque année depuis plus de 20 ans sans interruption.</> },
            ].map((item, i, arr) => (
              <div key={i} style={{
                padding: "12px 0",
                borderBottom: i < arr.length - 1 ? `1px solid ${T.borderSoft}` : "none",
                display: "flex", gap: 10, alignItems: "flex-start",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: T.goldSoft, display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <item.icon size={14} color={T.gold} />
                </div>
                <div>{item.text}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Les entreprises qui paient le plus" subtitle="Sélection des meilleures signatures BRVM" icon={Award} accent={T.gold}>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", gap: m ? 10 : 14 }}>
          {TOP_STOCKS.map(s => (
            <div key={s.ticker} style={{
              padding: m ? 16 : 20, background: T.bgSubtle,
              border: `1px solid ${T.borderSoft}`, borderRadius: 14,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 20 }}>{s.flag}</div>
                <Pill color={T.gold} bg={T.goldSoft}>{s.sector}</Pill>
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, fontWeight: 500 }}>{s.ticker}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 16, color: T.ink, fontWeight: 700, marginBottom: 12 }}>{s.name}</div>
              <div style={{
                padding: "10px 12px", background: T.bgCard,
                border: `1px solid ${T.borderSoft}`, borderRadius: 10, marginBottom: 8,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted }}>Dividende annuel</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: T.gold, fontWeight: 700, lineHeight: 1 }}>{s.yield}%</span>
                </div>
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, lineHeight: 1.5 }}>
                Versé depuis <strong style={{ color: T.ink }}>{s.years}</strong><br />
                Croissance : <strong style={{ color: T.green }}>{s.growth}</strong>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
