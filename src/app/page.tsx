"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// All modes use @copilotkitnext packages
import { CopilotKitProvider, CopilotSidebar } from "@copilotkitnext/react";
// A2UI mode: separate component with A2UI-specific configuration
import { A2UIPage } from "./components/A2UIPage";
import { CopilotContextProvider } from "./components/CopilotContextProvider";
import { StaticGenUICard } from "./components/protocol-cards/StaticGenUICard";
import { MCPAppsCard } from "./components/protocol-cards/MCPAppsCard";
import { A2UICard } from "./components/protocol-cards/A2UICard";
import { ComparisonTable } from "./components/ComparisonTable";
import { PromptPill } from "./components/PromptPill";
import { useSendMessage } from "./hooks/useSendMessage";
import "@copilotkitnext/react/styles.css";

// Shared page content component - rendered inside either provider
function PageContent({
  activeAgent,
  setActiveAgent,
  pendingMessage,
  clearPendingMessage,
  onPillClick,
}: {
  activeAgent: "default" | "a2ui";
  setActiveAgent: (agent: "default" | "a2ui") => void;
  pendingMessage: string | null;
  clearPendingMessage: () => void;
  onPillClick: (prompt: string, targetMode: "default" | "a2ui") => void;
}) {
  const { sendMessage } = useSendMessage();

  // Process pending message after provider remount
  useEffect(() => {
    if (pendingMessage) {
      // Delay ensures CopilotKit context (useAgent, useCopilotKit) is fully initialized
      // after provider remount. 100ms is sufficient for React to complete hydration.
      const timer = setTimeout(() => {
        sendMessage(pendingMessage);
        clearPendingMessage();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pendingMessage, sendMessage, clearPendingMessage]);

  return (
    <>
      {/* Abstract animated background */}
      <div className="abstract-bg">
        <div className="blob-3" />
      </div>

      {/* Main content with sidebar */}
      <div className="flex min-h-screen">
        {/* Left panel - Protocol info */}
        <div className="relative z-10 flex-1 p-8 overflow-auto">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="text-center mb-8">
              <div className="flex justify-center items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold">
                  <span className="text-gradient">Generative UI</span> Protocols
                </h1>
                <Link
                  href="/widget-builder"
                  className="px-3 py-1.5 text-sm bg-[#9f8fef]/20 text-[#383b99] rounded-full hover:bg-[#9f8fef]/30 transition-colors font-medium"
                >
                  Widget Builder →
                </Link>
              </div>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                Explore three approaches to building AI-powered user interfaces with CopilotKit
              </p>
            </header>

            {/* Agent Switching Tabs */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveAgent("default")}
                className={`protocol-tab ${activeAgent === "default" ? "active" : ""}`}
              >
                <span className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 9h6v6H9z" />
                  </svg>
                  Static + MCP Apps
                </span>
              </button>
              <button
                onClick={() => setActiveAgent("a2ui")}
                className={`protocol-tab ${activeAgent === "a2ui" ? "active" : ""}`}
              >
                <span className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  A2UI
                </span>
              </button>
            </div>

            {/* Protocol Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StaticGenUICard isActive={activeAgent === "default"} onPromptClick={(prompt) => onPillClick(prompt, "default")} />
              <MCPAppsCard isActive={activeAgent === "default"} onPromptClick={(prompt) => onPillClick(prompt, "default")} />
              <A2UICard isActive={activeAgent === "a2ui"} onPromptClick={(prompt) => onPillClick(prompt, "a2ui")} />
            </div>

            {/* Comparison Table */}
            <ComparisonTable />

            {/* Example Prompts */}
            <div className="mt-8 text-center">
              <p className="text-[var(--color-text-tertiary)] mb-4">
                Try these prompts in the chat:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {activeAgent === "default" ? (
                  <>
                    <PromptPill prompt="What's the weather in Tokyo?" />
                    <PromptPill prompt="Get stock price for AAPL" />
                    <PromptPill prompt="Open the calculator" />
                    <PromptPill prompt="Search for flights to Paris" />
                  </>
                ) : (
                  <>
                    <PromptPill prompt="Find Italian restaurants nearby" />
                    <PromptPill prompt="Show me Chinese food options" />
                    <PromptPill prompt="Book a table for 4" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  // Active agent state - switches between "default" (Static+MCP) and "a2ui"
  const [activeAgent, setActiveAgent] = useState<"default" | "a2ui">("default");
  // Pending message for cross-mode pill clicks (sent after provider remount)
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  // Handler for protocol card pill clicks - triggers mode switch if needed
  const handlePillClick = (prompt: string, targetMode: "default" | "a2ui") => {
    setPendingMessage(prompt);
    if (targetMode !== activeAgent) {
      setActiveAgent(targetMode);
    }
  };

  const clearPendingMessage = () => setPendingMessage(null);

  // A2UI mode: uses separate component with A2UI-specific configuration
  // (different API endpoint, A2UI renderer, etc.)
  if (activeAgent === "a2ui") {
    return (
      <A2UIPage onSwitchMode={() => setActiveAgent("default")}>
        <PageContent
          activeAgent={activeAgent}
          setActiveAgent={setActiveAgent}
          pendingMessage={pendingMessage}
          clearPendingMessage={clearPendingMessage}
          onPillClick={handlePillClick}
        />
      </A2UIPage>
    );
  }

  // Default mode: Static GenUI + MCP Apps (no A2UI renderer needed)
  // Key forces complete remount when switching to avoid stale state issues
  return (
    <CopilotKitProvider key="default-provider" runtimeUrl="/api/copilotkit" showDevConsole={false}>
      <CopilotContextProvider>
        <PageContent
          activeAgent={activeAgent}
          setActiveAgent={setActiveAgent}
          pendingMessage={pendingMessage}
          clearPendingMessage={clearPendingMessage}
          onPillClick={handlePillClick}
        />
        <CopilotSidebar
          defaultOpen={true}
          labels={{
            modalHeaderTitle: "Static + MCP Apps",
            chatInputPlaceholder: "Ask about weather, stocks, or try the interactive apps!",
          }}
          className="min-w-[400px]"
        />
      </CopilotContextProvider>
    </CopilotKitProvider>
  );
}
