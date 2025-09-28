import { QRCodeSVG } from "qrcode.react";
import enigmas from "../assets/enigmas.json";
import ghosts from "../assets/ghosts.json";

export const QRCodes = () => {
  return (
    <div style={{ flexDirection: "column" }}>
      <h1>Fantômes</h1>
      <div style={{ display: "inline-block" }}>
        {ghosts.map((ghostId) => (
          <QRCodeSVG
            key={ghostId}
            value={`${window.location.origin}${window.location.pathname}/#/ghost/${ghostId}`}
            size={150}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            marginSize={2}
          />
        ))}
      </div>
      <h1>Enigmes</h1>
      <div style={{ display: "inline-block" }}>
        {enigmas.map((enigma) => (
          <QRCodeSVG
            key={enigma.id}
            value={`${window.location.origin}${window.location.pathname}/#/enigma/${enigma.id}`}
            size={150}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            marginSize={2}
          />
        ))}
      </div>
    </div>
  );
};
