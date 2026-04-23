import React from "react";
import { T, FONT_SANS, FONT_DISPLAY } from "../theme";
import useIsMobile from "../hooks/useIsMobile";

export default function PageHeader({ eyebrow, title, description, emoji }) {
  const m = useIsMobile();

  return (
    <div style={{ marginBottom: m ? 24 : 32 }}>
      {eyebrow && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "4px 12px",
          background: T.tealSoft,
          borderRadius: 999,
          fontFamily: FONT_SANS, fontSize: 11, color: T.tealDark,
          fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase",
          marginBottom: m ? 10 : 14,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.teal }} />
          {eyebrow}
        </div>
      )}
      <div style={{
        fontFamily: FONT_DISPLAY, fontSize: m ? 28 : 42, fontWeight: 500,
        color: T.ink, letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 820,
      }}>{emoji && <span style={{ marginRight: 8 }}>{emoji}</span>}{title}</div>
      {description && (
        <div style={{
          fontFamily: FONT_SANS, fontSize: m ? 14 : 16, color: T.inkMuted,
          marginTop: m ? 10 : 14, maxWidth: 720, lineHeight: 1.55,
        }}>{description}</div>
      )}
    </div>
  );
}
