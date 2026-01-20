"use client";

import { useEffect, useCallback } from "react";
import {
  CopilotKitProvider,
  CopilotSidebar,
  useAgent,
  useCopilotKit,
} from "@copilotkitnext/react";
import { randomUUID, DEFAULT_AGENT_ID } from "@copilotkitnext/shared";
import { createA2UIMessageRenderer } from "@copilotkit/a2ui-renderer";
import { a2uiTheme } from "../../theme";

// Create A2UI renderer with custom theme - module level for stable reference
const A2UIRenderer = createA2UIMessageRenderer({ theme: a2uiTheme });
const activityRenderers = [A2UIRenderer];

interface BuilderChatSidebarProps {
  onWidgetGenerated?: (components: unknown[]) => void;
  onDataGenerated?: (data: Record<string, unknown>) => void;
  initialMessage?: string;
  onMessageSent?: () => void;
}

/**
 * Inner component that sends initial message after context initializes
 * Must be inside CopilotKitProvider to access hooks
 */
function ChatContent({
  initialMessage,
  onMessageSent,
}: {
  initialMessage?: string;
  onMessageSent?: () => void;
}) {
  const { agent } = useAgent({ agentId: DEFAULT_AGENT_ID });
  const { copilotkit } = useCopilotKit();

  const sendMessage = useCallback(
    async (message: string) => {
      agent.addMessage({ id: randomUUID(), role: "user", content: message });
      try {
        await copilotkit.runAgent({ agent });
      } catch (error) {
        console.error("Failed to run agent:", error);
      }
    },
    [agent, copilotkit]
  );

  useEffect(() => {
    if (initialMessage) {
      // 100ms delay for context initialization after provider mount
      const timer = setTimeout(() => {
        sendMessage(initialMessage);
        onMessageSent?.();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initialMessage, sendMessage, onMessageSent]);

  return null;
}

/**
 * Chat Sidebar for Widget Builder
 * Uses same A2A agent as main demo to generate A2UI widgets
 *
 * Note: Widget interception (auto-populating editor from chat) is planned
 * for a future enhancement. Currently, users can see widgets in chat
 * and manually copy/edit them in the editor.
 */
export function BuilderChatSidebar({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onWidgetGenerated,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDataGenerated,
  initialMessage,
  onMessageSent,
}: BuilderChatSidebarProps) {
  return (
    <CopilotKitProvider
      runtimeUrl="/api/copilotkit-a2ui"
      showDevConsole={false}
      renderActivityMessages={activityRenderers}
    >
      <ChatContent initialMessage={initialMessage} onMessageSent={onMessageSent} />
      <CopilotSidebar
        defaultOpen={true}
        labels={{
          modalHeaderTitle: "Widget Builder",
          chatInputPlaceholder: "Describe the widget you want to create...",
        }}
        className="h-full [&>div]:h-full"
      />
    </CopilotKitProvider>
  );
}
