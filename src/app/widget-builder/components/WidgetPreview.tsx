"use client";

import type { A2UIComponent } from "../hooks/useWidgetStorage";

interface WidgetPreviewProps {
  components: A2UIComponent[];
  data: Record<string, unknown>;
}

/**
 * Widget Preview - Shows a visual representation of A2UI components
 *
 * Note: Direct @a2ui/lit Surface rendering requires additional setup.
 * For now, this shows a visual summary of the components. Users can
 * see live rendered widgets in the chat sidebar.
 */
export function WidgetPreview({ components, data }: WidgetPreviewProps) {
  if (components.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-gray-400">
        <span className="material-symbols-outlined text-4xl mb-2">widgets</span>
        <p className="text-sm">No components to preview</p>
        <p className="text-xs mt-1">Add components via JSON or chat with AI</p>
      </div>
    );
  }

  // Extract component types for display
  const componentTypes = components.map((comp) => {
    // A2UI components have type directly on the object (e.g., { type: "Column", children: [...] })
    const type = comp.type || "Unknown";
    return { type };
  });

  return (
    <div className="space-y-3">
      {/* Visual component tree */}
      <div className="space-y-2">
        {componentTypes.map((comp, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100"
          >
            <ComponentIcon type={comp.type} />
            <span className="flex-1 text-sm font-medium text-gray-700">{comp.type}</span>
            <span className="text-xs text-gray-400">#{index + 1}</span>
          </div>
        ))}
      </div>

      {/* Data summary */}
      {Object.keys(data).length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs font-medium text-blue-700 mb-1">Data Model</p>
          <p className="text-xs text-blue-600">
            {Object.keys(data).length} field{Object.keys(data).length !== 1 ? "s" : ""}:{" "}
            {Object.keys(data).slice(0, 5).join(", ")}
            {Object.keys(data).length > 5 && "..."}
          </p>
        </div>
      )}

      {/* Tip */}
      <p className="text-xs text-gray-400 text-center mt-4">
        Live preview available in chat sidebar when AI generates widgets
      </p>
    </div>
  );
}

// Icon mapping for component types
function ComponentIcon({ type }: { type: string }) {
  const iconMap: Record<string, string> = {
    Text: "text_fields",
    Button: "smart_button",
    TextField: "input",
    CheckBox: "check_box",
    Image: "image",
    Icon: "stars",
    Card: "credit_card",
    Row: "view_column",
    Column: "view_agenda",
    List: "list",
    Divider: "horizontal_rule",
    Tabs: "tab",
    Slider: "linear_scale",
    DateTimeInput: "calendar_today",
    MultipleChoice: "radio_button_checked",
    Video: "videocam",
    AudioPlayer: "audiotrack",
    Modal: "open_in_new",
  };

  const icon = iconMap[type] || "widgets";

  return (
    <span className="material-symbols-outlined text-lg text-[#383b99]">{icon}</span>
  );
}
