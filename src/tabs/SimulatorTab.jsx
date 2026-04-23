import React, { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Coins, Clock, TrendingUp, Calculator } from "lucide-react";
import { T, FONT_SANS, FONT_DISPLAY, FONT_MONO } from "../theme";
import { fmtFCFA, fmtFCFAfull, projectDCA } from "../utils";
import useIsMobile from "../hooks/useIsMobile";
import Card from "../components/Card";
import Pill from "../components/Pill";
import PageHeader from "../components/PageHeader";
import ChartTooltip from "../components/ChartTooltip";

function SliderCard({ label, value, unit, icon: Icon, color, min, max, step, onChange, children }) {
  return (
    <Card padding={22}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>
            {typeof value === "number" && value >= 1000 ? fmtFCFAfull(value) : value} <span style={{ fontSize: 14, color: T.inkMuted, fontWeight: 500 }}>{unit}</span>
          </div>
        </div>
        <Icon size={24} color={color} />
      </div>
      <div style={{ position: "relative", height: 8, marginTop: 18 }}>
        <div style={{ position: "absolute", inset: 0, background: T.bgSoft, borderRadius: 999 }} />
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${((value - min) / (max - min)) * 100}%`,
          background: color, borderRadius: 999,
        }} />
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} />
      </div>
      {children}
    </Card>
  );
}

export default function SimulatorTab() {
  const m = useIsMobile();
  const [monthly, setMonthly] = useState(75000);
  const [years, setYears] = useState(6);
  const [rate, setRate] = useState(9);

  const data = useMemo(() => projectDCA({ monthly, years, annualRate: rate }), [monthly, years, rate]);
  const final = data[data.length - 1];
  const monthlyIncome = (final.value * 0.08) / 12;

  return (
    <div>
      <PageHeader
        eyebrow="Simulateur interactif"
        title="Ajustez, voyez, décidez."
        description="Ajustez les paramètres ci-dessous pour visualiser l'impact sur le capital final et les revenus mensuels passifs."
      />

      <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", gap: m ? 10 : 14, marginBottom: 20 }}>
        <SliderCard label="Mensuel" value={monthly} unit="F" icon={Coins} color={T.teal} min={25000} max={200000} step={5000} onChange={setMonthly}>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: FONT_MONO, fontSize: 10, color: T.inkDim }}>
            <span>25 000</span><span>200 000</span>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {[50000, 75000, 100000].map(v => (
              <button key={v} onClick={() => setMonthly(v)} style={{
                flex: 1, padding: "8px 4px",
                background: monthly === v ? T.teal : T.bgSoft,
                color: monthly === v ? "white" : T.inkSoft,
                border: "none", borderRadius: 8,
                fontFamily: FONT_MONO, fontSize: 11, fontWeight: 600, cursor: "pointer",
              }}>{v / 1000}k</button>
            ))}
          </div>
        </SliderCard>

        <SliderCard label="Durée" value={years} unit="ans" icon={Clock} color={T.blue} min={3} max={15} step={1} onChange={setYears}>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: FONT_MONO, fontSize: 10, color: T.inkDim }}>
            <span>3 ans</span><span>15 ans</span>
          </div>
        </SliderCard>

        <SliderCard label="Rendement" value={rate} unit="%/an" icon={TrendingUp} color={T.gold} min={5} max={14} step={0.5} onChange={setRate}>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: FONT_MONO, fontSize: 10, color: T.inkDim }}>
            <span>5%</span><span>14%</span>
          </div>
        </SliderCard>
      </div>

      {/* Results */}
      <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <Card title="Trajectoire sur les années" subtitle="Le capital grandit avec le temps" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={m ? 240 : 340}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: m ? -20 : -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.teal} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={T.teal} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={T.borderSoft} vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke={T.inkDim} tick={{ fontSize: 10, fontFamily: FONT_MONO, fill: T.inkMuted }} axisLine={false} tickLine={false} />
              <YAxis stroke={T.inkDim} tick={{ fontSize: 10, fontFamily: FONT_MONO, fill: T.inkMuted }} tickFormatter={fmtFCFA} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              {!m && <Legend wrapperStyle={{ fontFamily: FONT_SANS, fontSize: 12, paddingTop: 10 }} />}
              <Area type="monotone" dataKey="invested" stroke={T.inkDim} strokeWidth={1.5} strokeDasharray="4 4" fill="none" name="Montant déposé" />
              <Area type="monotone" dataKey="value" stroke={T.teal} strokeWidth={2.5} fill="url(#gT)" name="Capital total" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Big result */}
        <div style={{
          padding: m ? 24 : 32,
          background: `linear-gradient(135deg, ${T.tealDark} 0%, ${T.teal} 100%)`,
          borderRadius: 16, color: T.inkInv,
          position: "relative", overflow: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{
            position: "absolute", top: -60, right: -60, width: 200, height: 200,
            background: "radial-gradient(circle, rgba(251, 191, 36, 0.3), transparent 65%)", borderRadius: "50%",
          }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>
              Capital estimé à {years} ans
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: m ? 40 : 56, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8 }}>
              {fmtFCFA(final.value)} F
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#FBBF24", fontWeight: 500, marginBottom: 22 }}>
              dont +{fmtFCFA(final.gain)} F de gains (×{(final.value / final.invested).toFixed(2)})
            </div>
            <div style={{
              padding: m ? 14 : 18, background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(8px)", borderRadius: 12,
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>
                Revenu mensuel possible (dividendes 8%)
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: m ? 28 : 36, fontWeight: 600, color: "#FBBF24", letterSpacing: "-0.02em", lineHeight: 1 }}>
                {fmtFCFAfull(Math.round(monthlyIncome))} F
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 6, lineHeight: 1.5 }}>
                reçus chaque mois <strong>sans toucher au capital</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Year-by-year */}
      <Card title="Année par année" subtitle="Voir la progression détaillée" icon={Calculator}>
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", minWidth: m ? 500 : "auto", borderCollapse: "collapse", fontFamily: FONT_SANS, fontSize: m ? 12 : 13 }}>
            <thead>
              <tr>
                {["Année", "Déposé", "Valeur", "Gain", "Rev. mensuel"].map(h => (
                  <th key={h} style={{
                    padding: m ? "8px 10px" : "10px 14px",
                    textAlign: h === "Année" ? "left" : "right",
                    fontFamily: FONT_SANS, fontSize: 10, color: T.inkMuted,
                    fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase",
                    borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((d, i) => {
                const isLast = i === data.length - 2;
                const yearlyDiv = (d.value * 0.08) / 12;
                return (
                  <tr key={d.year} style={{ background: isLast ? T.tealPale : "transparent" }}>
                    <td style={{ padding: m ? "10px" : "13px 14px", color: T.ink, fontWeight: isLast ? 700 : 500, borderBottom: `1px solid ${T.borderSoft}`, whiteSpace: "nowrap" }}>
                      An {d.year}{isLast && " ✦"}
                    </td>
                    <td style={{ padding: m ? "10px" : "13px 14px", textAlign: "right", fontFamily: FONT_MONO, color: T.inkSoft, borderBottom: `1px solid ${T.borderSoft}` }}>
                      {fmtFCFAfull(d.invested)}
                    </td>
                    <td style={{ padding: m ? "10px" : "13px 14px", textAlign: "right", fontFamily: FONT_MONO, color: isLast ? T.tealDark : T.ink, fontWeight: isLast ? 700 : 600, borderBottom: `1px solid ${T.borderSoft}` }}>
                      {fmtFCFAfull(d.value)}
                    </td>
                    <td style={{ padding: m ? "10px" : "13px 14px", textAlign: "right", borderBottom: `1px solid ${T.borderSoft}` }}>
                      <Pill color={T.green} bg={T.greenSoft}>+{fmtFCFA(d.gain)}</Pill>
                    </td>
                    <td style={{ padding: m ? "10px" : "13px 14px", textAlign: "right", fontFamily: FONT_MONO, color: T.gold, fontWeight: 600, borderBottom: `1px solid ${T.borderSoft}` }}>
                      {fmtFCFAfull(Math.round(yearlyDiv))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
