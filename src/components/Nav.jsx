import React from "react";
import {
  Sparkles, TrendingUp, Calculator, Coins, Home, Play, HelpCircle, PiggyBank,
} from "lucide-react";
import { T, FONT_SANS } from "../theme";

const TABS = [
  { id: "pitch",      label: "Le pitch",          icon: Sparkles },
  { id: "compound",   label: "Intérêts composés",  icon: TrendingUp },
  { id: "simulator",  label: "Simulateur",         icon: Calculator },
  { id: "dividends",  label: "Revenus passifs",    icon: Coins },
  { id: "concrete",   label: "Au quotidien",       icon: Home },
  { id: "howto",      label: "Comment faire",      icon: Play },
  { id: "faq",        label: "Questions",          icon: HelpCircle },
];

export default function Nav({ tab, setTab }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(250, 250, 251, 0.92)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "14px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 24, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12,
            background: `linear-gradient(135deg, ${T.teal} 0%, ${T.tealDark} 100%)`,
            display: "grid", placeItems: "center",
            boxShadow: "0 4px 12px rgba(13, 148, 136, 0.25)",
          }}>
            <PiggyBank size={19} color="white" strokeWidth={2.2} />
          </div>
          <div>
            <div style={{
              fontFamily: FONT_SANS, fontSize: 17, fontWeight: 700,
              color: T.ink, letterSpacing: "-0.02em", lineHeight: 1,
            }}>Retraite Sereine</div>
            <div style={{
              fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted,
              marginTop: 3, fontWeight: 500,
            }}>Investissement BRVM · Guide retraite 2026</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, background: T.bgSoft, padding: 4, borderRadius: 12, border: `1px solid ${T.border}` }}>
          {TABS.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: 8,
                  background: active ? T.bgCard : "transparent",
                  color: active ? T.ink : T.inkMuted,
                  fontFamily: FONT_SANS, fontSize: 13, fontWeight: active ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  boxShadow: active ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = T.ink; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = T.inkMuted; }}
              >
                <Icon size={14} strokeWidth={2.2} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
