import React from "react";
import { Shield, Target, Flame } from "lucide-react";
import { T, FONT_SANS, FONT_DISPLAY } from "../theme";
import { fmtFCFA, fmtFCFAfull, projectDCA } from "../utils";
import Pill from "./Pill";
import useIsMobile from "../hooks/useIsMobile";

const SCENARIOS = [
  { monthly: 50000,  label: "Prudent",   color: T.blue, bg: T.blueSoft, icon: Shield },
  { monthly: 75000,  label: "Équilibré", color: T.teal, bg: T.tealSoft, icon: Target },
  { monthly: 100000, label: "Ambitieux", color: T.gold, bg: T.goldSoft, icon: Flame },
];

export default function ScenarioCards({ selected, setSelected, years = 6, rate = 9 }) {
  const m = useIsMobile();

  return (
    <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "repeat(3, 1fr)", gap: m ? 10 : 14 }}>
      {SCENARIOS.map(s => {
        const data = projectDCA({ monthly: s.monthly, years, annualRate: rate });
        const final = data[data.length - 1];
        const isSelected = selected === s.monthly;
        const Icon = s.icon;
        return (
          <button
            key={s.monthly}
            onClick={() => setSelected && setSelected(s.monthly)}
            style={{
              textAlign: "left",
              padding: m ? 16 : 22,
              background: isSelected ? s.bg : T.bgCard,
              border: `2px solid ${isSelected ? s.color : T.border}`,
              borderRadius: 16,
              cursor: setSelected ? "pointer" : "default",
              transition: "all 0.2s",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: m ? 10 : 16 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: s.color + "22",
                display: "grid", placeItems: "center",
              }}>
                <Icon size={16} color={s.color} strokeWidth={2.2} />
              </div>
              <Pill color={s.color} bg={s.bg}>{s.label}</Pill>
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, fontWeight: 500, marginBottom: 4 }}>DCA mensuel</div>
            <div style={{ fontFamily: FONT_SANS, fontSize: m ? 22 : 26, color: T.ink, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: m ? 12 : 18 }}>
              {fmtFCFAfull(s.monthly)} <span style={{ fontSize: 14, color: T.inkMuted, fontWeight: 500 }}>F</span>
            </div>
            <div style={{
              padding: "12px 14px",
              background: isSelected ? T.bgCard : s.bg,
              borderRadius: 10, marginBottom: 8,
            }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted, fontWeight: 500, marginBottom: 4 }}>Capital à {years} ans</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: m ? 22 : 26, color: s.color, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>
                {fmtFCFA(final.value)} F
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted, marginTop: 4 }}>
                dont <span style={{ color: T.green, fontWeight: 600 }}>+{fmtFCFA(final.gain)}</span> de gains
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted }}>
              <span>Investi: {fmtFCFA(final.invested)} F</span>
              <span>×{(final.value / final.invested).toFixed(2)}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
