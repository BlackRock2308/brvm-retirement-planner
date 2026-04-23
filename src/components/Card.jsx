import React from "react";
import { T, FONT_SANS } from "../theme";

export default function Card({ children, title, subtitle, icon: Icon, style, padding = 24, accent = T.teal }) {
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
