import { NextResponse } from "next/server";

export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Fiyat Hesaplama</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; }
    #root { width: 100%; min-height: 100vh; }
  </style>
</head>
<body>
  <div id="root">
    <iframe 
      src="/embed/fiyat-hesaplama" 
      style="width:100%;min-height:600px;border:none;"
      title="Fiyat Hesaplama"
    ></iframe>
  </div>
  <script>
    // Yükseklik ayarlama
    window.addEventListener("message", function(e) {
      if (e.data && e.data.type === "kozcuoglu-resize" && e.data.height) {
        document.querySelector("iframe").style.height = e.data.height + "px";
      }
    });
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
