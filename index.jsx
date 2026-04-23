import React, { useState, useMemo, useEffect } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, ReferenceLine
} from "recharts";
import {
  TrendingUp, Shield, Coins, Calculator, Briefcase, CheckCircle2,
  Sparkles, Activity, ArrowUpRight, ArrowRight, Zap, Home, Heart,
  GraduationCap, ShoppingCart, Lightbulb, BookOpen, Info, Play,
  HelpCircle, Award, Flame, Target, Clock, Quote, Smile, Users,
  PiggyBank, Car, Utensils, Phone, Droplet
} from "lucide-react";

// ============================================================
// DESIGN TOKENS — FINTECH PEDAGOGICAL (clearer, more inviting)
// ============================================================
const T = {
  bg:        "#FAFAFB",
  bgSoft:    "#F4F5F7",
  bgCard:    "#FFFFFF",
  bgSubtle:  "#F8FAFC",
  bgDark:    "#0F172A",
  bgWarm:    "#FEF7F0",

  ink:       "#0F172A",
  inkSoft:   "#334155",
  inkMuted:  "#64748B",
  inkDim:    "#94A3B8",
  inkInv:    "#FFFFFF",

  // Primary teal+green — rassurant, patrimoine, croissance
  teal:      "#0D9488",
  tealDark:  "#0F766E",
  tealSoft:  "#CCFBF1",
  tealPale:  "#F0FDFA",

  // Accent : or chaud pour dividendes / revenus
  gold:      "#D97706",
  goldSoft:  "#FEF3C7",
  goldPale:  "#FFFBEB",

  // Electric blue pour data
  blue:      "#2563EB",
  blueSoft:  "#DBEAFE",

  // Success
  green:     "#10B981",
  greenSoft: "#D1FAE5",

  // Warning / info
  amber:     "#F59E0B",
  amberSoft: "#FEF3C7",

  red:       "#DC2626",
  redSoft:   "#FEE2E2",

  border:    "#E2E8F0",
  borderSoft:"#F1F5F9",
};

const FONT_SANS = "'Geist', 'Plus Jakarta Sans', -apple-system, sans-serif";
const FONT_MONO = "'Geist Mono', 'JetBrains Mono', monospace";
const FONT_DISPLAY = "'Fraunces', 'Geist', serif";

// ============================================================
// HELPERS
// ============================================================
const fmtFCFA = (n) => {
  if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(2) + "Md";
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(0) + "k";
  return Math.round(n).toString();
};
const fmtFCFAfull = (n) => new Intl.NumberFormat("fr-FR").format(Math.round(n));

function projectDCA({ monthly, years, annualRate }) {
  const monthlyRate = Math.pow(1 + annualRate / 100, 1/12) - 1;
  const data = [];
  let value = 0, invested = 0;
  for (let m = 0; m <= years * 12; m++) {
    if (m > 0) {
      value = value * (1 + monthlyRate) + monthly;
      invested += monthly;
    }
    if (m % 12 === 0) {
      data.push({
        year: m / 12, invested,
        value: Math.round(value),
        gain: Math.round(value - invested),
        monthlyDividend: Math.round(value * 0.08 / 12), // 8% yield approximation
      });
    }
  }
  return data;
}

// ============================================================
// PRIMITIVES
// ============================================================

function Nav({ tab, setTab }) {
  const tabs = [
    { id: "pitch",      label: "Le pitch",         icon: Sparkles },
    { id: "compound",   label: "Intérêts composés", icon: TrendingUp },
    { id: "simulator",  label: "Simulateur",       icon: Calculator },
    { id: "dividends",  label: "Revenus passifs",  icon: Coins },
    { id: "concrete",   label: "Au quotidien",     icon: Home },
    { id: "howto",      label: "Comment faire",    icon: Play },
    { id: "faq",        label: "Questions",        icon: HelpCircle },
  ];
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
            boxShadow: `0 4px 12px rgba(13, 148, 136, 0.25)`,
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
            }}>Guide BRVM pour votre père · 2026</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, background: T.bgSoft, padding: 4, borderRadius: 12, border: `1px solid ${T.border}` }}>
          {tabs.map(t => {
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

function Card({ children, title, subtitle, icon: Icon, style, padding = 24, accent = T.teal }) {
  return (
    <div style={{
      background: T.bgCard,
      border: `1px solid ${T.border}`,
      borderRadius: 16,
      padding,
      boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
      ...style,
    }}>
      {(title || Icon) && (
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: 20,
        }}>
          {Icon && (
            <div style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: accent + "18",
              display: "grid", placeItems: "center", flexShrink: 0,
            }}>
              <Icon size={18} color={accent} strokeWidth={2.2} />
            </div>
          )}
          <div>
            {title && <div style={{
              fontFamily: FONT_SANS, fontSize: 16, fontWeight: 700,
              color: T.ink, letterSpacing: "-0.015em", lineHeight: 1.2,
            }}>{title}</div>}
            {subtitle && <div style={{
              fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted,
              marginTop: 3, fontWeight: 500,
            }}>{subtitle}</div>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

function Pill({ children, color = T.inkMuted, bg }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 10px",
      background: bg || T.bgSoft,
      color,
      borderRadius: 999,
      fontFamily: FONT_SANS, fontSize: 11, fontWeight: 600,
    }}>{children}</span>
  );
}

function PageHeader({ eyebrow, title, description, emoji }) {
  return (
    <div style={{ marginBottom: 32 }}>
      {eyebrow && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 12px",
          background: T.tealSoft,
          borderRadius: 999,
          fontFamily: FONT_SANS, fontSize: 11, color: T.tealDark,
          fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase",
          marginBottom: 14,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.teal }} />
          {eyebrow}
        </div>
      )}
      <div style={{
        fontFamily: FONT_DISPLAY, fontSize: 42, fontWeight: 500,
        color: T.ink, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 820,
      }}>{emoji && <span style={{ marginRight: 12 }}>{emoji}</span>}{title}</div>
      {description && (
        <div style={{
          fontFamily: FONT_SANS, fontSize: 16, color: T.inkMuted,
          marginTop: 14, maxWidth: 720, lineHeight: 1.55,
        }}>{description}</div>
      )}
    </div>
  );
}

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: T.bgCard,
      border: `1px solid ${T.border}`,
      borderRadius: 10,
      padding: "10px 14px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      fontFamily: FONT_SANS, fontSize: 12,
    }}>
      <div style={{ color: T.ink, fontWeight: 600, marginBottom: 6 }}>
        {typeof label === 'number' ? `Année ${label}` : label}
      </div>
      {payload.map((p, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 8,
          marginBottom: 2, color: T.inkMuted, fontSize: 11,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color, flexShrink: 0 }} />
          <span>{p.name}:</span>
          <span style={{ color: T.ink, fontWeight: 600, fontFamily: FONT_MONO, marginLeft: "auto" }}>
            {typeof p.value === 'number' ? fmtFCFAfull(p.value) + ' F' : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// Scenarios cards specific to this audience
function ScenarioCards({ selected, setSelected, years = 6, rate = 9 }) {
  const scenarios = [
    { monthly: 50000,  label: "Prudent",   color: T.blue, bg: T.blueSoft, icon: Shield },
    { monthly: 75000,  label: "Équilibré", color: T.teal, bg: T.tealSoft, icon: Target },
    { monthly: 100000, label: "Ambitieux", color: T.gold, bg: T.goldSoft, icon: Flame },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
      {scenarios.map(s => {
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
              padding: 22,
              background: isSelected ? s.bg : T.bgCard,
              border: `2px solid ${isSelected ? s.color : T.border}`,
              borderRadius: 16,
              cursor: setSelected ? "pointer" : "default",
              transition: "all 0.2s",
              position: "relative", overflow: "hidden",
            }}
            onMouseEnter={e => {
              if (setSelected && !isSelected) {
                e.currentTarget.style.borderColor = s.color;
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={e => {
              if (setSelected && !isSelected) {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: s.color + "22",
                display: "grid", placeItems: "center",
              }}>
                <Icon size={18} color={s.color} strokeWidth={2.2}/>
              </div>
              <Pill color={s.color} bg={s.bg}>{s.label}</Pill>
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, fontWeight: 500, marginBottom: 4 }}>DCA mensuel</div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: T.ink, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 18 }}>
              {fmtFCFAfull(s.monthly)} <span style={{ fontSize: 14, color: T.inkMuted, fontWeight: 500 }}>F</span>
            </div>
            <div style={{
              padding: "12px 14px",
              background: isSelected ? T.bgCard : s.bg,
              borderRadius: 10,
              marginBottom: 8,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <span style={{ fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted, fontWeight: 500 }}>Capital à {years} ans</span>
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: s.color, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>
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

// ============================================================
// TAB 1 — PITCH
// ============================================================
function PitchTab() {
  const numbers = [
    { label: "Performance BRVM 2025", value: "+25,3%", sub: "Bien mieux que le livret bancaire", color: T.green },
    { label: "Performance 5 ans", value: "+99,15%", sub: "Le capital a presque doublé", color: T.teal },
    { label: "Rendement dividendes moyen", value: "~9%", sub: "par an, encaissés sur le compte", color: T.gold },
    { label: "Capital minimum", value: "25k", sub: "FCFA pour commencer", color: T.blue },
  ];

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
          background: `radial-gradient(circle, rgba(251, 191, 36, 0.25), transparent 60%)`,
          borderRadius: "50%",
        }}/>
        <div style={{
          position: "absolute", bottom: -80, left: -80,
          width: 300, height: 300,
          background: `radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 60%)`,
          borderRadius: "50%",
        }}/>
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
            <Sparkles size={14}/>
            Proposition pour Papa · retraite dans 5-6 ans
          </div>
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: 52, fontWeight: 500,
            letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 20,
          }}>
            Un complément de retraite<br/>
            <span style={{ color: "#FBBF24", fontStyle: "italic" }}>fabriqué en 6 ans.</span>
          </div>
          <div style={{
            fontFamily: FONT_SANS, fontSize: 18, lineHeight: 1.55,
            color: "rgba(255,255,255,0.92)", marginBottom: 28,
            maxWidth: 680,
          }}>
            En mettant de côté entre 50 000 et 100 000 FCFA par mois sur la BRVM, on peut constituer un capital qui, une fois à la retraite, <strong style={{ color: "#FBBF24" }}>paie chaque mois les factures d'électricité, d'eau, Canal+ et plus encore</strong> — sans jamais toucher au capital lui-même.
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 16px",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              borderRadius: 10,
              fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600,
            }}>
              <CheckCircle2 size={16} color="#86EFAC"/>
              Argent toujours accessible
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 16px",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              borderRadius: 10,
              fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600,
            }}>
              <CheckCircle2 size={16} color="#86EFAC"/>
              Investi au Sénégal et en UEMOA
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 16px",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              borderRadius: 10,
              fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600,
            }}>
              <CheckCircle2 size={16} color="#86EFAC"/>
              Encadré par une SGI agréée
            </div>
          </div>
        </div>
      </div>

      {/* Key numbers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32 }}>
        {numbers.map(n => (
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
          {[
            {
              icon: Shield,
              title: "C'est chez nous",
              desc: "La BRVM est la bourse commune à 8 pays d'Afrique de l'Ouest : Sénégal, Côte d'Ivoire, Bénin, Togo, Burkina, Mali, Niger, Guinée-Bissau. Les entreprises cotées sont celles qu'on connaît au quotidien : Sonatel, Orange, SODECI, CIE, BOA, SGBCI.",
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
              desc: "Avec 75 000 F/mois pendant 6 ans (soit ~5,4 M F au total), le capital final peut atteindre 7,3 M F. À 8-9% de dividendes par an, cela génère ensuite ~55 000 F par mois de revenus passifs — sans jamais toucher au capital.",
              color: T.blue,
            },
          ].map((r, i) => (
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
                <r.icon size={20} color={r.color} strokeWidth={2.2}/>
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 17, fontWeight: 700, color: T.ink, marginBottom: 8, letterSpacing: "-0.015em" }}>{r.title}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkMuted, lineHeight: 1.6 }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* The 3 scenarios intro */}
      <Card title="3 niveaux de contribution mensuelle" subtitle="Choisissez ce qui est confortable — l'important est de commencer" icon={Coins} accent={T.teal}>
        <ScenarioCards years={6} rate={9}/>
        <div style={{
          marginTop: 20, padding: "14px 18px",
          background: T.tealPale,
          border: `1px solid ${T.tealSoft}`,
          borderRadius: 12,
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <Info size={18} color={T.teal} style={{ flexShrink: 0, marginTop: 2 }}/>
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkSoft, lineHeight: 1.55 }}>
            <strong>Hypothèse retenue : 9% par an.</strong> C'est <em>en dessous</em> de la performance réelle de la BRVM sur 5 ans (14,8%/an). On reste prudent. Dans tous les cas, le capital est exposé à la croissance économique de l'UEMOA — ce qui n'est pas le cas d'une épargne classique en banque.
          </div>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// TAB 2 — COMPOUND INTEREST EXPLAINER
// ============================================================
function CompoundTab() {
  const years = 10;
  const monthly = 75000;

  const compound = projectDCA({ monthly, years, annualRate: 9 });
  const simple = useMemo(() => {
    const data = [];
    for (let y = 0; y <= years; y++) {
      const invested = monthly * 12 * y;
      const simpleInterest = invested * 0.09 * y / 2; // rough simple interest
      data.push({
        year: y,
        invested,
        simple: invested + simpleInterest,
        compound: compound[y]?.value || 0,
      });
    }
    return data;
  }, [compound, monthly, years]);

  return (
    <div>
      <PageHeader
        eyebrow="Pédagogie"
        title="L'intérêt composé — la merveille du monde."
        description="Einstein l'appelait « la 8ème merveille du monde ». C'est le mécanisme par lequel vos gains génèrent eux-mêmes des gains, qui génèrent encore des gains. Plus vous gardez, plus ça s'accélère."
      />

      {/* The big idea */}
      <Card style={{ marginBottom: 20, padding: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 10px",
              background: T.goldSoft,
              color: T.gold,
              borderRadius: 999,
              fontFamily: FONT_SANS, fontSize: 11, fontWeight: 600,
              letterSpacing: "0.02em", textTransform: "uppercase",
              marginBottom: 16,
            }}>
              <Flame size={12}/> Le secret
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, fontWeight: 500, color: T.ink, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 18 }}>
              Le temps fait le travail,<br/>pas l'effort.
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 15, color: T.inkMuted, lineHeight: 1.6, marginBottom: 16 }}>
              Si Papa place <strong style={{ color: T.ink }}>75 000 F par mois</strong> pendant 10 ans à 9%/an :
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${T.borderSoft}` }}>
                <span style={{ fontFamily: FONT_SANS, fontSize: 14, color: T.inkSoft }}>Il aura versé de sa poche</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 15, color: T.ink, fontWeight: 600 }}>9,0 M F</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${T.borderSoft}` }}>
                <span style={{ fontFamily: FONT_SANS, fontSize: 14, color: T.inkSoft }}>Capital final</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 15, color: T.teal, fontWeight: 700 }}>14,5 M F</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
                <span style={{ fontFamily: FONT_SANS, fontSize: 14, color: T.inkSoft }}>Gain "gratuit"</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: 15, color: T.green, fontWeight: 700 }}>+5,5 M F</span>
              </div>
            </div>
            <div style={{
              padding: "14px 18px",
              background: `linear-gradient(90deg, ${T.tealSoft}, ${T.goldSoft})`,
              borderRadius: 12,
              fontFamily: FONT_SANS, fontSize: 13, color: T.inkSoft, lineHeight: 1.55,
            }}>
              <strong style={{ color: T.tealDark }}>→ L'argent a travaillé pour Papa</strong> pendant qu'il dormait, pendant qu'il voyageait, pendant qu'il était avec ses enfants. Voilà ce qu'est l'intérêt composé.
            </div>
          </div>

          <div>
            <ResponsiveContainer width="100%" height={380}>
              <AreaChart data={simple} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={T.teal} stopOpacity={0.35}/>
                    <stop offset="100%" stopColor={T.teal} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={T.inkDim} stopOpacity={0.15}/>
                    <stop offset="100%" stopColor={T.inkDim} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={T.borderSoft} vertical={false} strokeDasharray="3 3"/>
                <XAxis dataKey="year" stroke={T.inkDim} tick={{ fontSize: 11, fontFamily: FONT_MONO, fill: T.inkMuted }} axisLine={false} tickLine={false}/>
                <YAxis stroke={T.inkDim} tick={{ fontSize: 11, fontFamily: FONT_MONO, fill: T.inkMuted }} tickFormatter={fmtFCFA} axisLine={false} tickLine={false}/>
                <Tooltip content={<ChartTooltip />}/>
                <Legend wrapperStyle={{ fontFamily: FONT_SANS, fontSize: 12, paddingTop: 10 }}/>
                <Area type="monotone" dataKey="invested" stroke={T.inkDim} strokeWidth={1.5} strokeDasharray="4 4" fill="none" name="Ce que Papa dépose"/>
                <Area type="monotone" dataKey="compound" stroke={T.teal} strokeWidth={3} fill="url(#cg)" name="Avec intérêts composés"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* The 3 levers */}
      <Card title="Les 3 leviers qui font exploser le capital" subtitle="Vous pouvez jouer sur chacun" icon={Zap} accent={T.gold} style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            {
              n: "01",
              title: "Le temps",
              desc: "Plus Papa commence tôt, plus ça compose. Même 6 ans suffisent, mais 10 ans c'est la magie — la moitié du capital final vient des intérêts eux-mêmes.",
              icon: Clock, color: T.teal,
            },
            {
              n: "02",
              title: "Le montant mensuel",
              desc: "Doubler le DCA double aussi (quasiment) le capital final. 50k devient ~3,8M F à 6 ans. 100k devient ~7,6M F à 6 ans. C'est linéaire — donc chacun dose selon ses moyens.",
              icon: Coins, color: T.gold,
            },
            {
              n: "03",
              title: "Le rendement",
              desc: "À 6%, 9% ou 12% par an, la différence à 10 ans est énorme. La BRVM a fait 14,8%/an sur 5 ans. On parie prudemment sur 8-9% pour la suite.",
              icon: TrendingUp, color: T.blue,
            },
          ].map(l => (
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
                <l.icon size={20} color={l.color} strokeWidth={2.2}/>
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
        }}/>
        <div style={{ position: "relative", maxWidth: 720, textAlign: "center", margin: "0 auto" }}>
          <Quote size={36} color={T.gold} strokeWidth={1.5} style={{ marginBottom: 18 }}/>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.01em", fontStyle: "italic", marginBottom: 14 }}>
            Celui qui comprend l'intérêt composé le gagne.<br/>Celui qui ne le comprend pas le paie.
          </div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#CBD5E1", fontWeight: 500, letterSpacing: "0.05em" }}>
            — Albert Einstein
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TAB 3 — SIMULATOR
// ============================================================
function SimulatorTab() {
  const [monthly, setMonthly] = useState(75000);
  const [years, setYears] = useState(6);
  const [rate, setRate] = useState(9);

  const data = useMemo(() => projectDCA({ monthly, years, annualRate: rate }), [monthly, years, rate]);
  const final = data[data.length - 1];

  const yieldFactor = 0.08; // 8% yield on final capital
  const yearlyIncome = final.value * yieldFactor;
  const monthlyIncome = yearlyIncome / 12;

  return (
    <div>
      <PageHeader
        eyebrow="Simulateur interactif"
        title="Ajustez, voyez, décidez."
        description="Déplacez les curseurs pour voir en direct l'impact sur le capital final et les revenus mensuels passifs. Testez différentes combinaisons et trouvez celle qui correspond à la situation de Papa."
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
        {/* DCA Slider */}
        <Card padding={22}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 4 }}>Mensuel</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: T.teal, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>
                {fmtFCFAfull(monthly)} <span style={{ fontSize: 14, color: T.inkMuted, fontWeight: 500 }}>F</span>
              </div>
            </div>
            <Coins size={24} color={T.teal}/>
          </div>
          <div style={{ position: "relative", height: 8, marginTop: 18 }}>
            <div style={{ position: "absolute", inset: 0, background: T.bgSoft, borderRadius: 999 }}/>
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${((monthly - 25000) / (200000 - 25000)) * 100}%`,
              background: T.teal,
              borderRadius: 999,
            }}/>
            <input type="range" min={25000} max={200000} step={5000} value={monthly} onChange={e => setMonthly(+e.target.value)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: FONT_MONO, fontSize: 10, color: T.inkDim }}>
            <span>25 000</span><span>200 000</span>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {[50000, 75000, 100000].map(v => (
              <button key={v}
                onClick={() => setMonthly(v)}
                style={{
                  flex: 1,
                  padding: "8px 4px",
                  background: monthly === v ? T.teal : T.bgSoft,
                  color: monthly === v ? "white" : T.inkSoft,
                  border: "none",
                  borderRadius: 8,
                  fontFamily: FONT_MONO, fontSize: 11, fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}>
                {v/1000}k
              </button>
            ))}
          </div>
        </Card>

        <Card padding={22}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 4 }}>Durée</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: T.blue, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>
                {years} <span style={{ fontSize: 14, color: T.inkMuted, fontWeight: 500 }}>ans</span>
              </div>
            </div>
            <Clock size={24} color={T.blue}/>
          </div>
          <div style={{ position: "relative", height: 8, marginTop: 18 }}>
            <div style={{ position: "absolute", inset: 0, background: T.bgSoft, borderRadius: 999 }}/>
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${((years - 3) / (15 - 3)) * 100}%`,
              background: T.blue,
              borderRadius: 999,
            }}/>
            <input type="range" min={3} max={15} step={1} value={years} onChange={e => setYears(+e.target.value)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: FONT_MONO, fontSize: 10, color: T.inkDim }}>
            <span>3 ans</span><span>15 ans</span>
          </div>
          <div style={{ marginTop: 14, padding: "8px 12px", background: T.blueSoft, borderRadius: 8, fontFamily: FONT_SANS, fontSize: 11, color: T.blue, fontWeight: 500 }}>
            💡 Retraite dans ~6 ans. Tester 5, 6, 7 ans est le plus réaliste.
          </div>
        </Card>

        <Card padding={22}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 4 }}>Rendement</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: T.gold, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>
                {rate} <span style={{ fontSize: 14, color: T.inkMuted, fontWeight: 500 }}>%/an</span>
              </div>
            </div>
            <TrendingUp size={24} color={T.gold}/>
          </div>
          <div style={{ position: "relative", height: 8, marginTop: 18 }}>
            <div style={{ position: "absolute", inset: 0, background: T.bgSoft, borderRadius: 999 }}/>
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${((rate - 5) / (14 - 5)) * 100}%`,
              background: T.gold,
              borderRadius: 999,
            }}/>
            <input type="range" min={5} max={14} step={0.5} value={rate} onChange={e => setRate(+e.target.value)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: FONT_MONO, fontSize: 10, color: T.inkDim }}>
            <span>5% (prudent)</span><span>14% (historique)</span>
          </div>
          <div style={{ marginTop: 14, padding: "8px 12px", background: T.goldPale, borderRadius: 8, fontFamily: FONT_SANS, fontSize: 11, color: T.gold, fontWeight: 500 }}>
            📈 BRVM réelle 2020-2025 : 14,8%/an. On reste prudent.
          </div>
        </Card>
      </div>

      {/* Results */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <Card title="Trajectoire sur les années" subtitle="Le capital grandit avec le temps" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={340}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.teal} stopOpacity={0.3}/>
                  <stop offset="100%" stopColor={T.teal} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke={T.borderSoft} vertical={false} strokeDasharray="3 3"/>
              <XAxis dataKey="year" stroke={T.inkDim} tick={{ fontSize: 11, fontFamily: FONT_MONO, fill: T.inkMuted }} axisLine={false} tickLine={false}/>
              <YAxis stroke={T.inkDim} tick={{ fontSize: 11, fontFamily: FONT_MONO, fill: T.inkMuted }} tickFormatter={fmtFCFA} axisLine={false} tickLine={false}/>
              <Tooltip content={<ChartTooltip />}/>
              <Legend wrapperStyle={{ fontFamily: FONT_SANS, fontSize: 12, paddingTop: 10 }}/>
              <Area type="monotone" dataKey="invested" stroke={T.inkDim} strokeWidth={1.5} strokeDasharray="4 4" fill="none" name="Ce que Papa dépose"/>
              <Area type="monotone" dataKey="value" stroke={T.teal} strokeWidth={2.5} fill="url(#gT)" name="Capital total"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Big result card */}
        <div style={{
          padding: 32,
          background: `linear-gradient(135deg, ${T.tealDark} 0%, ${T.teal} 100%)`,
          borderRadius: 16,
          color: T.inkInv,
          position: "relative", overflow: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 200, height: 200,
            background: `radial-gradient(circle, rgba(251, 191, 36, 0.3), transparent 65%)`,
            borderRadius: "50%",
          }}/>
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 14 }}>
              Dans {years} ans, Papa aura
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 56, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8 }}>
              {fmtFCFA(final.value)} F
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: "#FBBF24", fontWeight: 500, marginBottom: 26 }}>
              dont +{fmtFCFA(final.gain)} F de gains (×{(final.value / final.invested).toFixed(2)})
            </div>

            <div style={{
              padding: 18,
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(8px)",
              borderRadius: 12,
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>
                Revenu mensuel possible (dividendes 8%)
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 600, color: "#FBBF24", letterSpacing: "-0.02em", lineHeight: 1 }}>
                {fmtFCFAfull(Math.round(monthlyIncome))} F
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 6, lineHeight: 1.5 }}>
                reçus chaque mois <strong>sans toucher au capital</strong> — comme un salaire
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Year-by-year breakdown */}
      <Card title="Année par année" subtitle="Voir la progression détaillée" icon={Calculator}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT_SANS, fontSize: 13 }}>
            <thead>
              <tr>
                {["Année", "Cumul déposé", "Valeur portefeuille", "Gain", "Revenu mensuel possible"].map(h => (
                  <th key={h} style={{
                    padding: "10px 14px",
                    textAlign: h === "Année" ? "left" : "right",
                    fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted,
                    fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase",
                    borderBottom: `1px solid ${T.border}`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((d, i) => {
                const isLast = i === data.length - 2;
                const yearlyDiv = d.value * 0.08 / 12;
                return (
                  <tr key={d.year} style={{
                    background: isLast ? T.tealPale : "transparent",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => { if (!isLast) e.currentTarget.style.background = T.bgSubtle; }}
                  onMouseLeave={e => { if (!isLast) e.currentTarget.style.background = "transparent"; }}
                  >
                    <td style={{ padding: "13px 14px", color: T.ink, fontWeight: isLast ? 700 : 500, borderBottom: `1px solid ${T.borderSoft}` }}>
                      Année {d.year}{isLast && " ✦"}
                    </td>
                    <td style={{ padding: "13px 14px", textAlign: "right", fontFamily: FONT_MONO, color: T.inkSoft, borderBottom: `1px solid ${T.borderSoft}` }}>
                      {fmtFCFAfull(d.invested)} F
                    </td>
                    <td style={{ padding: "13px 14px", textAlign: "right", fontFamily: FONT_MONO, color: isLast ? T.tealDark : T.ink, fontWeight: isLast ? 700 : 600, borderBottom: `1px solid ${T.borderSoft}` }}>
                      {fmtFCFAfull(d.value)} F
                    </td>
                    <td style={{ padding: "13px 14px", textAlign: "right", borderBottom: `1px solid ${T.borderSoft}` }}>
                      <Pill color={T.green} bg={T.greenSoft}>+{fmtFCFA(d.gain)}</Pill>
                    </td>
                    <td style={{ padding: "13px 14px", textAlign: "right", fontFamily: FONT_MONO, color: T.gold, fontWeight: 600, borderBottom: `1px solid ${T.borderSoft}` }}>
                      {fmtFCFAfull(Math.round(yearlyDiv))} F
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

// ============================================================
// TAB 4 — DIVIDENDS / PASSIVE INCOME
// ============================================================
function DividendsTab() {
  const [dcaChoice, setDcaChoice] = useState(75000);
  const years = 6;
  const rate = 9;
  const yieldPct = 8;

  const data = projectDCA({ monthly: dcaChoice, years, annualRate: rate });
  const final = data[data.length - 1];
  const monthlyIncome = final.value * yieldPct / 100 / 12;

  return (
    <div>
      <PageHeader
        eyebrow="Revenus passifs"
        title="Un salaire supplémentaire, tous les mois."
        description="Une fois le capital constitué, les entreprises où vous êtes actionnaire vous versent chaque année une partie de leurs bénéfices : ce sont les dividendes. À la BRVM, ces dividendes rapportent en moyenne 8 à 9% par an — un vrai revenu mensuel récurrent."
        emoji="💰"
      />

      {/* Pick scenario */}
      <Card title="Choisissez le scénario qui parle à Papa" subtitle="Cliquez sur l'un des trois" icon={Target} style={{ marginBottom: 20 }}>
        <ScenarioCards selected={dcaChoice} setSelected={setDcaChoice} years={years} rate={rate}/>
      </Card>

      {/* What it means monthly */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div style={{
          padding: 32,
          background: `linear-gradient(135deg, ${T.gold}, #C2410C)`,
          borderRadius: 16,
          color: T.inkInv,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 220, height: 220,
            background: `radial-gradient(circle, rgba(252, 211, 77, 0.35), transparent 65%)`,
            borderRadius: "50%",
          }}/>
          <div style={{ position: "relative" }}>
            <Coins size={28} color="#FEF3C7" strokeWidth={2}/>
            <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: 600, letterSpacing: "0.02em", marginTop: 14, marginBottom: 10 }}>
              En versant {fmtFCFAfull(dcaChoice)} F/mois pendant {years} ans, Papa reçoit ensuite :
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 72, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 0.95, marginBottom: 8 }}>
              {fmtFCFAfull(Math.round(monthlyIncome))}
            </div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 18, fontWeight: 600 }}>
              FCFA <span style={{ color: "#FEF3C7" }}>par mois</span>
            </div>
            <div style={{
              marginTop: 22, padding: "12px 16px",
              background: "rgba(0,0,0,0.2)",
              borderRadius: 10,
              fontFamily: FONT_SANS, fontSize: 13, lineHeight: 1.5,
            }}>
              <strong>Sans vendre aucune action</strong> — le capital de {fmtFCFA(final.value)} F reste intact et continue de produire. Chaque année les dividendes peuvent même augmenter.
            </div>
          </div>
        </div>

        <Card title="3 idées pour bien comprendre" subtitle="Ce que représentent ces revenus" icon={Lightbulb} accent={T.gold}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkSoft, lineHeight: 1.6 }}>
            <div style={{
              padding: "12px 0",
              borderBottom: `1px solid ${T.borderSoft}`,
              display: "flex", gap: 12, alignItems: "flex-start",
            }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: T.goldSoft, display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Home size={15} color={T.gold}/>
              </div>
              <div>
                <strong style={{ color: T.ink }}>Comme un second loyer.</strong> Sauf qu'au lieu de louer un appartement, Papa "loue" ses actions aux entreprises qui les utilisent pour gagner de l'argent.
              </div>
            </div>
            <div style={{
              padding: "12px 0",
              borderBottom: `1px solid ${T.borderSoft}`,
              display: "flex", gap: 12, alignItems: "flex-start",
            }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: T.goldSoft, display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Briefcase size={15} color={T.gold}/>
              </div>
              <div>
                <strong style={{ color: T.ink }}>Sans travailler.</strong> Le dividende arrive sur le compte automatiquement, 1 à 2 fois par an (souvent en mai-juillet) pour chaque ligne détenue.
              </div>
            </div>
            <div style={{
              padding: "12px 0",
              display: "flex", gap: 12, alignItems: "flex-start",
            }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: T.goldSoft, display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Shield size={15} color={T.gold}/>
              </div>
              <div>
                <strong style={{ color: T.ink }}>Et ça continue.</strong> Sonatel verse un dividende tous les ans depuis <em>20 ans</em>. Les BOA aussi. C'est une source de revenus stable, année après année.
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Top dividend stocks */}
      <Card title="Les entreprises qui paient le plus" subtitle="Sélection des meilleures signatures BRVM" icon={Award} accent={T.gold}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { ticker: "BOAB", name: "BOA Bénin", flag: "🇧🇯", yield: 9.4, years: "> 10 ans", growth: "+16,5%/an", sector: "Banque" },
            { ticker: "BOAS", name: "BOA Sénégal", flag: "🇸🇳", yield: 9.5, years: "> 10 ans", growth: "+10-12%/an", sector: "Banque" },
            { ticker: "SGBC", name: "SGBCI", flag: "🇨🇮", yield: 7.0, years: "> 15 ans", growth: "+5-7%/an", sector: "Banque" },
            { ticker: "CIEC", name: "CIE", flag: "🇨🇮", yield: 7.0, years: "> 15 ans", growth: "+3-5%/an", sector: "Électricité" },
            { ticker: "SDCC", name: "SODECI", flag: "🇨🇮", yield: 6.5, years: "> 15 ans", growth: "+2-5%/an", sector: "Eau" },
            { ticker: "SNTS", name: "Sonatel", flag: "🇸🇳", yield: 5.7, years: "> 20 ans ✦", growth: "+6-8%/an", sector: "Télécoms" },
          ].map(s => (
            <div key={s.ticker} style={{
              padding: 20,
              background: T.bgSubtle,
              border: `1px solid ${T.borderSoft}`,
              borderRadius: 14,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 22 }}>{s.flag}</div>
                <Pill color={T.gold} bg={T.goldSoft}>{s.sector}</Pill>
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkMuted, fontWeight: 500 }}>{s.ticker}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 18, color: T.ink, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 14 }}>{s.name}</div>
              <div style={{
                padding: "10px 14px",
                background: T.bgCard,
                border: `1px solid ${T.borderSoft}`,
                borderRadius: 10,
                marginBottom: 10,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted, fontWeight: 500 }}>Dividende annuel</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: T.gold, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.yield}%</span>
                </div>
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, lineHeight: 1.5 }}>
                Versé sans interruption depuis <strong style={{ color: T.ink }}>{s.years}</strong><br/>
                Croissance moyenne : <strong style={{ color: T.green }}>{s.growth}</strong>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// TAB 5 — CONCRETE / DAILY LIFE
// ============================================================
function ConcreteTab() {
  const [dcaChoice, setDcaChoice] = useState(75000);
  const years = 6;
  const data = projectDCA({ monthly: dcaChoice, years, annualRate: 9 });
  const finalValue = data[data.length - 1].value;
  const monthlyDiv = finalValue * 0.08 / 12;

  // Monthly bills examples in Senegal
  const bills = [
    { icon: Zap, label: "Facture Senelec (électricité)", amount: 25000, color: T.amber },
    { icon: Droplet, label: "Facture SDE (eau)", amount: 10000, color: T.blue },
    { icon: Phone, label: "Abonnement Canal+ + Internet", amount: 35000, color: T.teal },
    { icon: Utensils, label: "Contribution courses semaine", amount: 40000, color: T.gold },
    { icon: Car, label: "Carburant + entretien véhicule", amount: 30000, color: T.inkSoft },
    { icon: Heart, label: "Soutien famille élargie / dons", amount: 25000, color: T.red },
  ];

  const totalBills = bills.reduce((a, b) => a + b.amount, 0);
  const coverage = (monthlyDiv / totalBills) * 100;
  const coveredBills = bills.reduce((acc, b) => {
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
        title="Concrètement, qu'est-ce que ça change pour Papa ?"
        description="Les chiffres c'est bien, mais ce qu'on veut vraiment savoir : qu'est-ce que ces revenus permettent de faire ? Voici à quoi correspondent les dividendes mensuels dans la vie de tous les jours à Dakar."
        emoji="🏠"
      />

      <Card title="Choisissez le scénario à visualiser" subtitle="L'impact change selon le DCA mensuel" icon={Target} style={{ marginBottom: 20 }}>
        <ScenarioCards selected={dcaChoice} setSelected={setDcaChoice} years={years} rate={9}/>
      </Card>

      {/* The headline */}
      <div style={{
        padding: 36,
        background: `linear-gradient(135deg, ${T.tealDark} 0%, ${T.teal} 100%)`,
        borderRadius: 20,
        color: T.inkInv,
        marginBottom: 20,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 300, height: 300,
          background: `radial-gradient(circle, rgba(251, 191, 36, 0.25), transparent 60%)`,
          borderRadius: "50%",
        }}/>
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
              background: "rgba(0,0,0,0.2)",
              borderRadius: 12,
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
              <div style={{ marginBottom: 4 }}>Mise de Papa : {fmtFCFA(dcaChoice * 12 * years)} F</div>
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
                <b.icon size={20} color={b.covered === true ? T.green : b.covered === "partial" ? T.amber : T.inkMuted}/>
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
                  background: T.bgSoft,
                  borderRadius: 999,
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    width: b.covered === true ? "100%" : b.covered === "partial" ? `${(b.partial / b.amount) * 100}%` : "0%",
                    background: b.covered === true ? T.green : T.amber,
                    borderRadius: 999,
                    transition: "width 0.4s",
                  }}/>
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
          {[
            {
              icon: GraduationCap,
              title: "Financer les études des petits-enfants",
              desc: "Une année à l'université privée à Dakar coûte environ 800 000 à 1,5 M FCFA. Le capital final peut en financer plusieurs.",
              color: T.blue,
            },
            {
              icon: Home,
              title: "Rénover la maison sans stress",
              desc: "Réfection toiture, peinture, agrandissement — avec le capital, Papa pioche selon ses besoins sans toucher aux revenus mensuels.",
              color: T.teal,
            },
            {
              icon: Heart,
              title: "Aider sans se priver",
              desc: "Soutenir les mariages, baptêmes, funérailles de la famille élargie devient possible sans impacter son niveau de vie.",
              color: T.red,
            },
            {
              icon: Users,
              title: "Voyager pour voir les enfants",
              desc: "Un billet Paris-Dakar coûte 400-700k F. Avec les revenus mensuels, c'est un voyage par an sans planifier, sans se demander.",
              color: T.gold,
            },
            {
              icon: Smile,
              title: "Dormir tranquille",
              desc: "Une retraite sereine, c'est d'abord ne plus se demander comment finir le mois. Les dividendes comblent exactement ça.",
              color: T.tealDark,
            },
            {
              icon: Sparkles,
              title: "Laisser un héritage",
              desc: "Le capital BRVM se transmet. Les actions restent, les dividendes continuent. Une vraie transmission aux enfants et petits-enfants.",
              color: T.amber,
            },
          ].map((s, i) => (
            <div key={i} style={{
              padding: 22,
              background: T.bgSubtle,
              border: `1px solid ${T.borderSoft}`,
              borderRadius: 14,
              borderLeft: `3px solid ${s.color}`,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: s.color + "18",
                display: "grid", placeItems: "center",
                marginBottom: 14,
              }}>
                <s.icon size={20} color={s.color} strokeWidth={2.2}/>
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

// ============================================================
// TAB 6 — HOW TO START
// ============================================================
function HowToTab() {
  const steps = [
    {
      n: "01",
      title: "Choisir une SGI agréée",
      desc: "Une SGI (Société de Gestion et d'Intermédiation) est une société agréée par le régulateur (CREPMF) pour passer les ordres sur la BRVM. Au Sénégal, il y en a plusieurs : CGF Bourse, SGI IMPAXIS, FGI, Invictus Capital, etc.",
      action: "Comparer les SGI de Dakar : frais, interface en ligne, accessibilité mobile money.",
      time: "1-2 jours de recherche",
      color: T.teal,
    },
    {
      n: "02",
      title: "Préparer les documents",
      desc: "Carte d'identité, justificatif de domicile récent, photo d'identité, RIB bancaire. Certaines SGI acceptent des ouvertures 100% digitales, d'autres demandent un passage en agence.",
      action: "Rassembler les 4 pièces et prendre rendez-vous (ou formulaire en ligne).",
      time: "30 minutes",
      color: T.blue,
    },
    {
      n: "03",
      title: "Ouvrir le compte titres",
      desc: "La SGI crée un compte titres qui va conserver les actions achetées, et un compte espèces pour alimenter les achats. Le compte est personnel, au nom de Papa.",
      action: "Signer la convention d'ouverture. Aucun dépôt initial obligatoire dans la plupart des cas.",
      time: "3-7 jours ouvrés",
      color: T.gold,
    },
    {
      n: "04",
      title: "Approvisionner le compte",
      desc: "Virement bancaire ou mobile money (Orange Money, Wave) selon la SGI. Une partie des SGI acceptent déjà les paiements Wave — ça facilite énormément pour le DCA mensuel.",
      action: "Virement de la première contribution mensuelle (50k / 75k / 100k).",
      time: "Immédiat à 24h",
      color: T.green,
    },
    {
      n: "05",
      title: "Passer le premier ordre",
      desc: "Connexion à l'espace client en ligne de la SGI. On sélectionne le titre (ex: SNTS), on indique le nombre d'unités et le prix maximum qu'on accepte (ordre à cours limité). La SGI exécute sur le marché.",
      action: "Premier ordre : 1 action Sonatel (SNTS) à ~29 000 F — ligne socle.",
      time: "5-10 minutes",
      color: T.red,
    },
    {
      n: "06",
      title: "Automatiser le DCA",
      desc: "Mettre en place un virement permanent mensuel depuis le compte bancaire vers le compte SGI. Chaque mois, passer 2-3 ordres d'achat selon le calendrier du plan.",
      action: "Virement automatique le 5 de chaque mois + routine achat bourse le 10.",
      time: "20 min/mois ensuite",
      color: T.tealDark,
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Mode d'emploi"
        title="Comment Papa peut commencer, étape par étape."
        description="Ouvrir un compte titres à la BRVM n'est pas plus compliqué que d'ouvrir un compte bancaire. Voici le parcours complet en 6 étapes, avec les délais réalistes et ce qu'il faut préparer à chaque fois."
        emoji="🚀"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
        {steps.map((s, i) => (
          <div key={s.n} style={{
            background: T.bgCard,
            border: `1px solid ${T.border}`,
            borderRadius: 16,
            padding: 28,
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 24,
            alignItems: "center",
            position: "relative",
          }}>
            {i < steps.length - 1 && (
              <div style={{
                position: "absolute",
                left: 48, top: "100%",
                width: 2, height: 16,
                background: T.border,
              }}/>
            )}
            <div style={{
              width: 52, height: 52,
              borderRadius: 16,
              background: s.color + "18",
              display: "grid", placeItems: "center",
              fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 700,
              color: s.color, letterSpacing: "-0.02em",
            }}>{s.n}</div>
            <div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 17, fontWeight: 700, color: T.ink, marginBottom: 6, letterSpacing: "-0.015em" }}>{s.title}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkMuted, lineHeight: 1.55, marginBottom: 10 }}>{s.desc}</div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 12px",
                background: s.color + "10",
                borderRadius: 8,
                fontFamily: FONT_SANS, fontSize: 12, color: s.color, fontWeight: 600,
              }}>
                <ArrowRight size={14}/>
                {s.action}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: T.inkMuted, fontWeight: 500, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>Durée</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkSoft, fontWeight: 600 }}>{s.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* First portfolio suggestion */}
      <Card title="Un portefeuille de départ pour Papa" subtitle="Conservateur, diversifié, revenus stables" icon={Briefcase} accent={T.teal}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: T.inkMuted, marginBottom: 20, lineHeight: 1.55 }}>
          Pour un profil pré-retraite (5-6 ans d'horizon), la priorité est la <strong style={{ color: T.ink }}>stabilité des dividendes</strong> plutôt que la croissance pure. Voici une allocation recommandée, concentrée sur les signatures les plus régulières de la BRVM :
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { ticker: "SNTS", name: "Sonatel", weight: 25, reason: "20 ans de dividende sans interruption — le plus sûr", color: T.teal },
            { ticker: "BOAB", name: "BOA Bénin", weight: 20, reason: "Yield 9,4% + croissance div. +16%/an", color: T.green },
            { ticker: "BOAS", name: "BOA Sénégal", weight: 20, reason: "Proximité diaspora, yield ~9,5%", color: T.green },
            { ticker: "CIEC", name: "CIE (électricité)", weight: 15, reason: "Utility défensive, dividende stable", color: T.blue },
            { ticker: "SDCC", name: "SODECI (eau)", weight: 10, reason: "Quasi-obligataire, très défensif", color: T.blue },
            { ticker: "SGBC", name: "SGBCI", weight: 10, reason: "Signature rendement bancaire premier plan", color: T.gold },
          ].map(p => (
            <div key={p.ticker} style={{
              padding: 18,
              background: T.bgSubtle,
              border: `1px solid ${T.borderSoft}`,
              borderRadius: 14,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: p.color, fontWeight: 700, letterSpacing: "0.05em" }}>{p.ticker}</div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: T.ink, fontWeight: 600, marginTop: 2 }}>{p.name}</div>
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: p.color, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>{p.weight}%</div>
              </div>
              <div style={{ height: 4, background: T.bgSoft, borderRadius: 999, marginBottom: 10, overflow: "hidden" }}>
                <div style={{ width: `${p.weight * 4}%`, height: "100%", background: p.color, borderRadius: 999 }}/>
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted, lineHeight: 1.5 }}>{p.reason}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 20, padding: "14px 18px",
          background: T.tealPale,
          border: `1px solid ${T.tealSoft}`,
          borderRadius: 12,
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <Info size={18} color={T.teal} style={{ flexShrink: 0, marginTop: 2 }}/>
          <div style={{ fontFamily: FONT_SANS, fontSize: 13, color: T.inkSoft, lineHeight: 1.55 }}>
            <strong>Comment allouer le DCA mensuel ?</strong> Avec 75 000 F/mois par exemple : 1 action SNTS (~29k F) + 4 actions CIEC (13,6k F) + le reste pour alterner BOA et SGBCI selon le mois. Le détail mois-par-mois est disponible dans le plan fourni.
          </div>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// TAB 7 — FAQ
// ============================================================
function FAQTab() {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      q: "Est-ce risqué ? Papa peut-il perdre tout son argent ?",
      a: "Non, il ne peut pas tout perdre, car son capital est réparti sur plusieurs entreprises solides (Sonatel, BOA, SGBCI, CIE, SODECI). Pour perdre tout, il faudrait que TOUTES ces entreprises fassent faillite en même temps — ce qui est extrêmement improbable. En revanche, le capital peut fluctuer à court terme : certaines années il baissera de 5-15%, d'autres il montera de 20-30%. Sur 5-6 ans, historiquement, la BRVM monte en moyenne de 9-12% par an.",
    },
    {
      q: "Et si Papa a besoin de son argent en urgence ?",
      a: "C'est l'un des grands avantages de la BRVM vs l'immobilier : le capital est liquide. En cas de besoin, Papa peut donner l'ordre de vendre tout ou partie de ses actions. La vente se fait en quelques jours (règlement T+2). Il faut juste anticiper 1-2 semaines pour récupérer les fonds sur le compte bancaire. Pour une vraie urgence vitale, garder toujours 6-12 mois de charges en épargne bancaire classique — la BRVM n'est PAS l'épargne de précaution.",
    },
    {
      q: "Pourquoi pas simplement un livret d'épargne bancaire ?",
      a: "Un livret à la banque rapporte 3,5% par an au Sénégal. Sur 6 ans avec 75k/mois, cela donne ~6,1 M F au total. Sur la BRVM à 9%, le même DCA donne ~7,3 M F. Différence : +1,2 M F, soit +20%. Et surtout, une fois le capital constitué, le livret continue à rapporter 3,5% alors que la BRVM rapporte 8-9% en dividendes — une différence énorme dans le revenu de retraite mensuel.",
    },
    {
      q: "Comment la SGI gagne-t-elle sa vie ? Y a-t-il des frais cachés ?",
      a: "La SGI facture (1) une commission de courtage sur chaque achat/vente, généralement 0,5 à 1% du montant de l'ordre, (2) parfois une commission de tenue de compte annuelle très faible (~5-10k F/an). Ces frais sont transparents, publiés par la SGI. Un DCA de 75k/mois génère donc ~375 à 750 F de frais par ordre — largement couvert dès le premier dividende.",
    },
    {
      q: "Les dividendes sont-ils taxés ?",
      a: "Oui, une retenue à la source (IRVM) de 10% est prélevée automatiquement par l'émetteur avant versement. Exemple : Sonatel annonce un dividende brut de 1 850 F par action → Papa reçoit 1 655 F net après IRVM. Cette fiscalité est déjà intégrée dans les calculs de rendement (les 8-9% cités sont déjà en NET d'IRVM, puisque c'est ce que le marché affiche).",
    },
    {
      q: "Et si la BRVM chute comme en 2020 ?",
      a: "C'est arrivé : mars 2020 (Covid), la BRVM a perdu 30% en quelques semaines. Mais elle a tout récupéré sur 2021-2022, puis a gagné +25% rien qu'en 2025. Les actions BRVM sont des entreprises réelles (Sonatel, CIE) qui continuent d'encaisser des revenus même en crise. Tant qu'on ne vend pas, une baisse temporaire n'est qu'un chiffre sur un écran. Les dividendes, eux, continuent d'être versés.",
    },
    {
      q: "Papa est proche de la retraite — n'est-il pas trop tard ?",
      a: "Non, et voici pourquoi : même sur 5-6 ans, l'effet composé génère ~15-20% de gain au-delà du capital déposé. Surtout, l'objectif n'est pas tant la plus-value que de constituer un CAPITAL GÉNÉRATEUR DE REVENUS. À 5,4 M F de capital, les dividendes rapportent déjà ~35-40k F par mois, à vie, sans toucher au capital. Ce n'est pas la durée qui prime ici, c'est le fait de commencer maintenant plutôt que jamais.",
    },
    {
      q: "Qu'arrive-t-il aux actions si Papa décède ?",
      a: "Elles font partie de son patrimoine et sont transmises à ses héritiers selon le droit successoral sénégalais — exactement comme un bien immobilier ou un compte bancaire. Un conseil utile : nommer une personne de confiance comme mandataire sur le compte, et informer les enfants de l'existence du compte SGI pour éviter que ces actifs ne soient oubliés.",
    },
    {
      q: "La BRVM, c'est sérieux ? C'est encadré ?",
      a: "Oui, très sérieusement encadré. La BRVM est régulée par le CREPMF (Conseil Régional de l'Épargne Publique et des Marchés Financiers), équivalent de l'AMF française. Les SGI doivent obtenir un agrément officiel avant d'opérer. Les comptes titres sont conservés chez un dépositaire central (DC/BR) indépendant de la SGI — même si la SGI faisait faillite, les titres de Papa resteraient protégés.",
    },
    {
      q: "Par où commencer concrètement cette semaine ?",
      a: "Étape 1 (aujourd'hui) : identifier 2-3 SGI et appeler pour comparer. Exemples à Dakar : CGF Bourse, SGI IMPAXIS, Invictus Capital. Étape 2 (cette semaine) : rassembler les pièces (CNI, justificatif domicile, RIB). Étape 3 (semaine prochaine) : rendez-vous pour ouverture ou démarche en ligne. Étape 4 (dans 2 semaines) : premier virement + premier ordre sur SNTS. En 3 semaines, Papa peut être actionnaire de Sonatel.",
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Questions & réponses"
        title="Tout ce qu'il faut savoir, sans langue de bois."
        description="Les 10 questions qu'on se pose avant de faire le pas. Réponses franches, avec les vrais chiffres et les vrais garde-fous."
        emoji="💬"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{
              background: T.bgCard,
              border: `1px solid ${isOpen ? T.teal : T.border}`,
              borderRadius: 14,
              overflow: "hidden",
              transition: "all 0.2s",
            }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: "100%",
                padding: "20px 24px",
                background: isOpen ? T.tealPale : "transparent",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
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
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}>{i + 1}</div>
                  <div style={{
                    fontFamily: FONT_SANS, fontSize: 15,
                    fontWeight: 600,
                    color: T.ink,
                    letterSpacing: "-0.01em",
                  }}>{f.q}</div>
                </div>
                <div style={{
                  transition: "transform 0.2s",
                  transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                  color: isOpen ? T.teal : T.inkMuted,
                }}>
                  <ArrowRight size={18}/>
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
        marginTop: 40,
        padding: 40,
        background: `linear-gradient(135deg, ${T.tealDark} 0%, ${T.teal} 100%)`,
        borderRadius: 20,
        color: T.inkInv,
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}>
        <div style={{
          position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
          width: 400, height: 400,
          background: `radial-gradient(circle, rgba(251, 191, 36, 0.2), transparent 60%)`,
          borderRadius: "50%",
        }}/>
        <div style={{ position: "relative", maxWidth: 660, margin: "0 auto" }}>
          <Sparkles size={32} color="#FBBF24" style={{ marginBottom: 18 }}/>
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: 38, fontWeight: 500,
            letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 18,
          }}>
            Le meilleur moment pour planter un arbre,<br/>
            <span style={{ color: "#FBBF24", fontStyle: "italic" }}>c'était il y a 20 ans.</span>
          </div>
          <div style={{
            fontFamily: FONT_SANS, fontSize: 17, lineHeight: 1.55,
            color: "rgba(255,255,255,0.92)", marginBottom: 28,
          }}>
            Le deuxième meilleur moment, c'est <strong style={{ color: "#FBBF24" }}>maintenant</strong>. Chaque mois de report, c'est de l'intérêt composé perdu. Chaque mois investi, c'est un mois de plus qui travaille pour la retraite de Papa.
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 22px",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            borderRadius: 12,
            fontFamily: FONT_SANS, fontSize: 14, fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.2)",
          }}>
            <Play size={16}/>
            Étape 1 : appeler 2-3 SGI cette semaine
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN
// ============================================================
export default function Dashboard() {
  const [tab, setTab] = useState("pitch");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => { if (link.parentNode) document.head.removeChild(link); };
  }, []);

  const Content = () => {
    switch (tab) {
      case "pitch":     return <PitchTab />;
      case "compound":  return <CompoundTab />;
      case "simulator": return <SimulatorTab />;
      case "dividends": return <DividendsTab />;
      case "concrete":  return <ConcreteTab />;
      case "howto":     return <HowToTab />;
      case "faq":       return <FAQTab />;
      default:          return <PitchTab />;
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: T.bg,
      color: T.ink,
      fontFamily: FONT_SANS,
    }}>
      <Nav tab={tab} setTab={setTab}/>
      <main style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "40px 28px 80px",
      }}>
        <Content />
      </main>
      <footer style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "32px 28px",
        borderTop: `1px solid ${T.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted }}>
          <strong style={{ color: T.ink }}>Retraite Sereine</strong> · Guide pédagogique pour un investissement progressif à la BRVM
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.inkDim }}>
          Sources : BOC BRVM · SikaFinance · avril 2026 · Document éducatif
        </div>
      </footer>
    </div>
  );
}