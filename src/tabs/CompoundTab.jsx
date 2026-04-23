import React, { useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Flame, Clock, Coins, TrendingUp, Zap, Quote } from "lucide-react";
import { T, FONT_SANS, FONT_DISPLAY, FONT_MONO } from "../theme";
import { fmtFCFA, projectDCA } from "../utils";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import ChartTooltip from "../components/ChartTooltip";

export default function CompoundTab() {
  const years = 10;
  const monthly = 75000;

  const compound = projectDCA({ monthly, years, annualRate: 9 });
  const simple = useMemo(() => {
    const data = [];
    for (let y = 0; y <= years; y++) {
      const invested = monthly * 12 * y;
      const simpleInterest = (invested * 0.09 * y) / 2;
      data.push({
        year: y,
        invested,
        simple: invested + simpleInterest,
        compound: compound[y]?.value || 0,
      });
    }
    return data;
  }, [compound]);

  const LEVERS = [
    {
      n: "01", title: "Le temps", icon: Clock, color: T.teal,
      desc: "Plus l'investissement démarre tôt, plus l'effet de composition est puissant. Même 6 ans suffisent, mais à 10 ans, la moitié du capital final provient des intérêts eux-mêmes.",
    },
    {
      n: "02", title: "Le montant mensuel", icon: Coins, color: T.gold,
      desc: "Doubler le DCA double quasiment le capital final. 50k/mois donne ~3,8M F à 6 ans, 100k/mois donne ~7,6M F. La relation est linéaire — chacun ajuste selon ses moyens.",
    },
    {
      n: "03", title: "Le rendement", icon: TrendingUp, color: T.blue,
      desc: "À 6%, 9% ou 12% par an, la différence à 10 ans est considérable. La BRVM a réalisé 14,8%/an sur 5 ans. L'hypothèse retenue de 8-9% reste prudente.",
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Pédagogie"
        title="L'intérêt composé — la merveille du monde."
        description="Einstein l'appelait « la 8ème merveille du monde ». C'est le mécanisme par lequel vos gains génèrent eux-mêmes des gains, qui génèrent encore des gains. Plus vous gardez, plus ça s'accélère."
      />

      <Card style={{ marginBottom: 20, padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 10px",
              background: T.goldSoft, color: T.gold,
              borderRadius: 999,
              fontFamily: FONT_SANS, fontSize: 11, fontWeight: 600,
              letterSpacing: "0.02em", textTransform: "uppercase",
              marginBottom: 16,
            }}>
              <Flame size={12} /> Le secret
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 500, color: T.ink, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 18 }}>
              Le temps fait le travail,<br />pas l'effort.
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 15, color: T.inkMuted, lineHeight: 1.6, marginBottom: 16 }}>
              Avec un placement de <strong style={{ color: T.ink }}>75 000 F par mois</strong> pendant 10 ans à 9%/an :
            </div>
            <div style={{ marginBottom: 14 }}>
              {[
                { label: "Total des versements", value: "9,0 M F", color: T.ink, weight: 600 },
                { label: "Capital final", value: "14,5 M F", color: T.teal, weight: 700 },
                { label: "Gain \"gratuit\"", value: "+5,5 M F", color: T.green, weight: 700 },
              ].map((row, i, arr) => (
                <div key={row.label} style={{
                  display: "flex", justifyContent: "space-between", padding: "12px 0",
                  borderBottom: i < arr.length - 1 ? `1px solid ${T.borderSoft}` : "none",
                }}>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 14, color: T.inkSoft }}>{row.label}</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: 15, color: row.color, fontWeight: row.weight }}>{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{
              padding: "14px 18px",
              background: `linear-gradient(90deg, ${T.tealSoft}, ${T.goldSoft})`,
              borderRadius: 12,
              fontFamily: FONT_SANS, fontSize: 13, color: T.inkSoft, lineHeight: 1.55,
            }}>
              <strong style={{ color: T.tealDark }}>→ L'argent travaille en permanence</strong>, de jour comme de nuit, week-ends compris. C'est le principe même de l'intérêt composé.
            </div>
          </div>

          <div>
            <ResponsiveContainer width="100%" height={380}>
              <AreaChart data={simple} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={T.teal} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={T.teal} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={T.borderSoft} vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke={T.inkDim} tick={{ fontSize: 11, fontFamily: FONT_MONO, fill: T.inkMuted }} axisLine={false} tickLine={false} />
                <YAxis stroke={T.inkDim} tick={{ fontSize: 11, fontFamily: FONT_MONO, fill: T.inkMuted }} tickFormatter={fmtFCFA} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontFamily: FONT_SANS, fontSize: 12, paddingTop: 10 }} />
                <Area type="monotone" dataKey="invested" stroke={T.inkDim} strokeWidth={1.5} strokeDasharray="4 4" fill="none" name="Ce qui est déposé" />
                <Area type="monotone" dataKey="compound" stroke={T.teal} strokeWidth={3} fill="url(#cg)" name="Avec intérêts composés" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card title="Les 3 leviers qui font exploser le capital" subtitle="Vous pouvez jouer sur chacun" icon={Zap} accent={T.gold} style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {LEVERS.map(l => (
            <div key={l.n} style={{
              padding: 22,
              background: T.bgSubtle,
              border: `1px solid ${T.borderSoft}`,
              borderRadius: 14,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 16, right: 16,
                fontFamily: FONT_DISPLAY, fontSize: 42, fontWeight: 300,
                color: l.color + "30", lineHeight: 1,
              }}>{l.n}</div>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: l.color + "18",
                display: "grid", placeItems: "center",
                marginBottom: 14,
              }}>
                <l.icon size={20} color={l.color} strokeWidth={2.2} />
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 17, fontWeight: 700, color: T.ink, marginBottom: 8, letterSpacing: "-0.015em" }}>{l.title}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkMuted, lineHeight: 1.6 }}>{l.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quote */}
      <div style={{
        padding: 36,
        background: T.bgDark,
        borderRadius: 20,
        color: T.inkInv,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 200, height: 200,
          background: `radial-gradient(circle, ${T.gold}50, transparent 65%)`,
          borderRadius: "50%",
        }} />
        <div style={{ position: "relative", maxWidth: 720, textAlign: "center", margin: "0 auto" }}>
          <Quote size={36} color={T.gold} strokeWidth={1.5} style={{ marginBottom: 18 }} />
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.01em", fontStyle: "italic", marginBottom: 14 }}>
            Celui qui comprend l'intérêt composé le gagne.<br />Celui qui ne le comprend pas le paie.
          </div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#CBD5E1", fontWeight: 500, letterSpacing: "0.05em" }}>
            — Albert Einstein
          </div>
        </div>
      </div>
    </div>
  );
}
