"use client";

/**
 * useSendMessage - Hook for sending messages to the CopilotKit chat
 *
 * Provides a simple interface to programmatically send messages to the agent.
 * Used by PromptPill and protocol card pills to trigger chat interactions.
 */

import { useCallback } from "react";
import { useAgent, useCopilotKit } from "@copilotkitnext/react";
import { randomUUID, DEFAULT_AGENT_ID } from "@copilotkitnext/shared";

export function useSendMessage() {
  const { agent } = useAgent({ agentId: DEFAULT_AGENT_ID });
  const { copilotkit } = useCopilotKit();

  const sendMessage = useCallback(
    async (message: string) => {
      // Add the user message to the chat
      agent.addMessage({ id: randomUUID(), role: "user", content: message });
      try {
        // Run the agent to process the message
        await copilotkit.runAgent({ agent });
      } catch (error) {
        console.error("Failed to run agent:", error);
      }
    },
    [agent, copilotkit]
  );

  return { sendMessage };
}
