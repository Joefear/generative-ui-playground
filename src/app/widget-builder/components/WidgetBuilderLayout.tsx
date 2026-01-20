"use client";

import { ReactNode } from "react";

interface WidgetBuilderLayoutProps {
  navigation: ReactNode;
  main: ReactNode;
  chat?: ReactNode; // Optional - only shown in editor view
}

/**
 * 3-column layout for Widget Builder
 * Left: Navigation (240px) | Center: Main content | Right: Chat (380px)
 */
export function WidgetBuilderLayout({
  navigation,
  main,
  chat,
}: WidgetBuilderLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left navigation */}
      <div className="w-60 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
        {navigation}
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden flex flex-col min-w-0">
        {main}
      </div>

      {/* Right chat sidebar - only rendered when chat is provided */}
      {chat && (
        <div className="w-[380px] flex-shrink-0 border-l border-gray-200 bg-white overflow-hidden">
          {chat}
        </div>
      )}
    </div>
  );
}
