"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body>
        <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1rem", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#122032" }}>Bir Hata Oluştu</h1>
          <p style={{ marginTop: "0.75rem", color: "#666", maxWidth: "28rem" }}>
            Beklenmeyen bir hata meydana geldi. Lütfen tekrar deneyin.
          </p>
          <button
            onClick={() => reset()}
            style={{ marginTop: "1.5rem", padding: "0.625rem 1.25rem", backgroundColor: "#e3000f", color: "white", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}
          >
            Tekrar Dene
          </button>
        </div>
      </body>
    </html>
  );
}
