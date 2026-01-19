import type { Metadata } from "next";
import "./globals.css";
import "./a2ui-theme.css";

export const metadata: Metadata = {
  title: "UI Protocols Demo - CopilotKit Generative UI Playground",
  description: "Explore three approaches to Generative UI: Static GenUI, MCP Apps, and A2UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts required for A2UI Lit components */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Code&family=Google+Sans+Flex:opsz,wght,ROND@6..144,1..1000,100&family=Google+Sans:opsz,wght@17..18,400..700&display=block&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
        />
        {/* Google Symbols for icons */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Google+Symbols:opsz,wght,FILL,GRAD,ROND@20..48,100..700,0..1,-50..200,0..100&display=swap&icon_names=arrow_drop_down,check_circle,close,communication,content_copy,delete,draw,error,info,mobile_layout,pen_size_1,progress_activity,rectangle,send,upload,warning"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
