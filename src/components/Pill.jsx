import React from "react";
import { T, FONT_SANS } from "../theme";

export default function Pill({ children, color = T.inkMuted, bg }) {
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
