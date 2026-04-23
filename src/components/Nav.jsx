import React from "react";
import {
  Sparkles, TrendingUp, Calculator, Coins, Home, Play, HelpCircle, PiggyBank,
} from "lucide-react";
import { T, FONT_SANS } from "../theme";
import useIsMobile from "../hooks/useIsMobile";

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
  const m = useIsMobile();

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(250, 250, 251, 0.92)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: m ? "10px 16px" : "14px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: m ? 12 : 24, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: m ? 32 : 38, height: m ? 32 : 38, borderRadius: 10,
            background: `linear-gradient(135deg, ${T.teal} 0%, ${T.tealDark} 100%)`,
            display: "grid", placeItems: "center",
            boxShadow: "0 4px 12px rgba(13, 148, 136, 0.25)",
          }}>
            <PiggyBank size={m ? 16 : 19} color="white" strokeWidth={2.2} />
          </div>
          {!m && (
            <div>
              <div style={{
                fontFamily: FONT_SANS, fontSize: 17, fontWeight: 700,
                color: T.ink, letterSpacing: "-0.02em", lineHeight: 1,
              }}>Omaad Retraite</div>
              <div style={{
                fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted,
                marginTop: 3, fontWeight: 500,
              }}>Investissement BRVM · Guide retraite 2026</div>
            </div>
          )}
        </div>
        <div style={{
          display: "flex", gap: 2,
          background: T.bgSoft, padding: m ? 3 : 4,
          borderRadius: 12, border: `1px solid ${T.border}`,
          overflowX: "auto", WebkitOverflowScrolling: "touch",
          maxWidth: m ? "calc(100vw - 70px)" : "none",
          scrollbarWidth: "none",
        }}>
          {TABS.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  display: "flex", alignItems: "center", gap: m ? 0 : 7,
                  padding: m ? "7px 10px" : "8px 14px",
                  border: "none",
                  borderRadius: 8,
                  background: active ? T.bgCard : "transparent",
                  color: active ? T.ink : T.inkMuted,
                  fontFamily: FONT_SANS, fontSize: 13, fontWeight: active ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  boxShadow: active ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
                title={t.label}
              >
                <Icon size={m ? 16 : 14} strokeWidth={2.2} />
                {!m && t.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
