import React, { ReactNode } from "react"
import "assets/style.css"

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <title>Map sandbox</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            height: "100%",
            minHeight: "100dvh",
          }}
        >
          <header
            style={{
              background: "#468",
              boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.25)",
              display: "flex",
              justifyContent: "space-between",
              padding: ".5rem 1rem",
              position: "fixed",
              top: 0,
              width: "100%",
              zIndex: 1,
            }}
          >
            <h1 style={{ color: "#fff", lineHeight: 2 }}>Map sandbox</h1>
            <div
              style={{
                display: "flex",
              }}
            >
              <a
                href="//github.com/kixixixixi/map-sandbox"
                style={{ color: "#ccc", lineHeight: 2 }}
              >
                Github
              </a>
            </div>
          </header>
          <main style={{ height: "100%" }}>{children}</main>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
