"use client";

/**
 * A2UI Page Component
 *
 * Uses @copilotkitnext/react for A2A compatibility.
 * The A2AAgent from @ag-ui/a2a works with the v2 runtime API.
 */

import { CopilotKitProvider, CopilotSidebar } from "@copilotkitnext/react";
import { createA2UIMessageRenderer } from "@copilotkit/a2ui-renderer";
import { a2uiTheme } from "../theme";

// Create A2UI renderer with custom theme - module level for stable reference
const A2UIRenderer = createA2UIMessageRenderer({ theme: a2uiTheme });
const activityRenderers = [A2UIRenderer];

interface A2UIPageProps {
  onSwitchMode: () => void;
  children: React.ReactNode;
}

export function A2UIPage({ onSwitchMode, children }: A2UIPageProps) {
  return (
    <CopilotKitProvider
      runtimeUrl="/api/copilotkit-a2ui"
      showDevConsole={false}
      renderActivityMessages={activityRenderers}
    >
      {children}
      <CopilotSidebar
        defaultOpen={true}
        labels={{
          modalHeaderTitle: "A2UI Assistant",
          chatInputPlaceholder: "Ask me to generate any UI - forms, lists, cards, and more!",
        }}
        className="min-w-[400px]"
      />
    </CopilotKitProvider>
  );
}
