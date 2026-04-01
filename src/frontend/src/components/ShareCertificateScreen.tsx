import React, { useRef, useState } from "react";

interface ShareCertificateScreenProps {
  onClose: () => void;
}

export default function ShareCertificateScreen({
  onClose,
}: ShareCertificateScreenProps) {
  const [shareholderName, setShareholderName] = useState("");
  const [numShares, setNumShares] = useState(100);
  const [certificateNo] = useState(`NH-${Date.now().toString().slice(-6)}`);
  const [issued, setIssued] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => {
    const printContent = certRef.current?.innerHTML;
    if (!printContent) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Natural Hunt Share Certificate - ${certificateNo}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { background: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .cert-wrapper { width: 210mm; height: 148mm; position: relative; }
            @page { size: A4 landscape; margin: 0; }
            @media print {
              body { margin: 0; }
              .cert-wrapper { width: 100vw; height: 100vh; }
            }
          </style>
        </head>
        <body>
          <div class="cert-wrapper">${printContent}</div>
          <script>window.onload = () => { window.print(); window.close(); }<\/script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="min-h-screen bg-midnight text-cream flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <button
          type="button"
          onClick={onClose}
          className="text-gold text-sm font-semibold"
        >
          ← Back
        </button>
        <h1 className="text-lg font-bold text-gold">Share Certificate</h1>
        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {!issued ? (
          <div className="max-w-md mx-auto space-y-6">
            <p className="text-cream/60 text-sm text-center">
              Generate an official share certificate for Natural Hunt. Maximum
              1,000 shares per certificate.
            </p>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="shareholder-name"
                  className="block text-xs text-cream/50 mb-1 uppercase tracking-wider"
                >
                  Shareholder Full Name
                </label>
                <input
                  id="shareholder-name"
                  type="text"
                  value={shareholderName}
                  onChange={(e) => setShareholderName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50"
                />
              </div>

              <div>
                <label
                  htmlFor="num-shares"
                  className="block text-xs text-cream/50 mb-1 uppercase tracking-wider"
                >
                  Number of Shares (1 – 1,000)
                </label>
                <input
                  id="num-shares"
                  type="number"
                  min={1}
                  max={1000}
                  value={numShares}
                  onChange={(e) =>
                    setNumShares(
                      Math.min(1000, Math.max(1, Number(e.target.value))),
                    )
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50"
                />
                <input
                  type="range"
                  min={1}
                  max={1000}
                  value={numShares}
                  onChange={(e) => setNumShares(Number(e.target.value))}
                  className="w-full mt-2 accent-yellow-400"
                  aria-label="Shares slider"
                />
                <div className="flex justify-between text-xs text-cream/40 mt-1">
                  <span>1</span>
                  <span>{numShares} shares selected</span>
                  <span>1,000</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (shareholderName.trim()) setIssued(true);
              }}
              disabled={!shareholderName.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-300 text-midnight font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20"
            >
              Generate Certificate
            </button>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Certificate Preview */}
            <div
              ref={certRef}
              style={{
                background:
                  "linear-gradient(135deg, #1a1200 0%, #2d1f00 50%, #1a1200 100%)",
                border: "3px solid #c9a227",
                borderRadius: "12px",
                padding: "40px",
                position: "relative",
                overflow: "hidden",
                fontFamily: "Georgia, serif",
              }}
            >
              {/* Corner decorations */}
              {(
                [
                  "top-2 left-2",
                  "top-2 right-2",
                  "bottom-2 left-2",
                  "bottom-2 right-2",
                ] as const
              ).map((pos, i) => (
                <div
                  key={pos}
                  className={`absolute ${pos} w-8 h-8`}
                  style={{
                    borderTop: i < 2 ? "2px solid #c9a227" : "none",
                    borderBottom: i >= 2 ? "2px solid #c9a227" : "none",
                    borderLeft: i % 2 === 0 ? "2px solid #c9a227" : "none",
                    borderRight: i % 2 === 1 ? "2px solid #c9a227" : "none",
                  }}
                />
              ))}

              {/* Watermark */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(-30deg)",
                  fontSize: "80px",
                  fontWeight: "900",
                  color: "rgba(201,162,39,0.05)",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                NATURAL HUNT
              </div>

              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "6px",
                    color: "#c9a227",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Certificate of Share Ownership
                </div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "900",
                    color: "#f5d060",
                    letterSpacing: "2px",
                    textShadow: "0 0 20px rgba(201,162,39,0.5)",
                  }}
                >
                  NATURAL HUNT
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#c9a227",
                    letterSpacing: "3px",
                    marginTop: "4px",
                  }}
                >
                  PLANT INTELLIGENCE PLATFORM
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, #c9a227, transparent)",
                  marginBottom: "24px",
                }}
              />

              {/* Body */}
              <div
                style={{
                  textAlign: "center",
                  color: "#e8d5a3",
                  lineHeight: "1.8",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#c9a227",
                    marginBottom: "12px",
                  }}
                >
                  This Certifies That
                </p>
                <p
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    color: "#f5d060",
                    letterSpacing: "1px",
                    borderBottom: "1px solid #c9a227",
                    display: "inline-block",
                    paddingBottom: "4px",
                    marginBottom: "16px",
                  }}
                >
                  {shareholderName}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#d4b87a",
                    marginBottom: "8px",
                  }}
                >
                  is the registered holder of
                </p>
                <p
                  style={{
                    fontSize: "36px",
                    fontWeight: "900",
                    color: "#f5d060",
                    letterSpacing: "2px",
                    textShadow: "0 0 15px rgba(245,208,96,0.4)",
                  }}
                >
                  {numShares.toLocaleString()}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#c9a227",
                    margin: "4px 0 20px",
                  }}
                >
                  Fully Paid Shares
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#a08050",
                    maxWidth: "480px",
                    margin: "0 auto 24px",
                  }}
                >
                  of Natural Hunt Plant Intelligence Platform, subject to the
                  memorandum and articles of association of the company.
                </p>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, #c9a227, transparent)",
                  marginBottom: "20px",
                }}
              />

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      borderTop: "1px solid #c9a227",
                      paddingTop: "6px",
                      fontSize: "10px",
                      color: "#a08050",
                      letterSpacing: "1px",
                    }}
                  >
                    AUTHORIZED SIGNATORY
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#a08050",
                      letterSpacing: "1px",
                    }}
                  >
                    CERTIFICATE NO.
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#c9a227",
                      fontWeight: "700",
                    }}
                  >
                    {certificateNo}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#a08050",
                      marginTop: "4px",
                    }}
                  >
                    DATE: {today}
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      borderTop: "1px solid #c9a227",
                      paddingTop: "6px",
                      fontSize: "10px",
                      color: "#a08050",
                      letterSpacing: "1px",
                    }}
                  >
                    DIRECTOR
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIssued(false)}
                className="flex-1 py-3 rounded-xl border border-white/20 text-cream/70 text-sm font-semibold"
              >
                Edit Details
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-300 text-midnight font-bold text-sm shadow-lg shadow-yellow-500/20"
              >
                Download as PDF
              </button>
            </div>

            <p className="text-xs text-cream/30 text-center">
              This certificate is for illustrative purposes only and does not
              constitute a legally binding financial instrument.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
