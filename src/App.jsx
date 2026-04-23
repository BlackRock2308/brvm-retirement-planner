import React, { useState } from "react";
import { T, FONT_SANS, FONT_MONO } from "./theme";
import useIsMobile from "./hooks/useIsMobile";
import Nav from "./components/Nav";
import PitchTab from "./tabs/PitchTab";
import CompoundTab from "./tabs/CompoundTab";
import SimulatorTab from "./tabs/SimulatorTab";
import DividendsTab from "./tabs/DividendsTab";
import ConcreteTab from "./tabs/ConcreteTab";
import HowToTab from "./tabs/HowToTab";
import FAQTab from "./tabs/FAQTab";

const TAB_COMPONENTS = {
  pitch: PitchTab,
  compound: CompoundTab,
  simulator: SimulatorTab,
  dividends: DividendsTab,
  concrete: ConcreteTab,
  howto: HowToTab,
  faq: FAQTab,
};

export default function App() {
  const [tab, setTab] = useState("pitch");
  const m = useIsMobile();

  const ActiveTab = TAB_COMPONENTS[tab] || PitchTab;

  return (
    <div style={{
      minHeight: "100vh",
      background: T.bg,
      color: T.ink,
      fontFamily: FONT_SANS,
    }}>
      <Nav tab={tab} setTab={setTab} />
      <main style={{
        maxWidth: 1280, margin: "0 auto",
        padding: m ? "24px 16px 60px" : "40px 28px 80px",
      }}>
        <ActiveTab />
      </main>
      <footer style={{
        maxWidth: 1280, margin: "0 auto",
        padding: m ? "24px 16px" : "32px 28px",
        borderTop: `1px solid ${T.border}`,
        display: "flex", flexDirection: m ? "column" : "row",
        justifyContent: "space-between", alignItems: m ? "flex-start" : "center",
        gap: m ? 8 : 16,
      }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 12, color: T.inkMuted }}>
          <strong style={{ color: T.ink }}>Omaad Retraite</strong> · Guide pédagogique pour un investissement progressif à la BRVM
        </div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: T.inkDim }}>
          Sources : BOC BRVM · SikaFinance · avril 2026
        </div>
      </footer>
    </div>
  );
}
