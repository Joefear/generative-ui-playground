/**
 * A2UI Component Documentation
 * Used by ComponentsView to display interactive documentation
 */

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
}

export interface ComponentDoc {
  name: string;
  category: "Layout" | "Display" | "Input" | "Container" | "Navigation" | "Visual";
  description: string;
  props: PropDefinition[];
  example: object;
}

export const componentDocs: ComponentDoc[] = [
  // Layout Components
  {
    name: "Row",
    category: "Layout",
    description:
      "Arranges child components horizontally in a row. Useful for inline layouts, button groups, and side-by-side content.",
    props: [
      {
        name: "children",
        type: "Component[]",
        required: true,
        description: "Child components to arrange horizontally",
      },
    ],
    example: {
      type: "Row",
      children: [
        { type: "Button", label: "Cancel" },
        { type: "Button", label: "Save" },
      ],
    },
  },
  {
    name: "Column",
    category: "Layout",
    description:
      "Arranges child components vertically in a column. The default layout for most widgets.",
    props: [
      {
        name: "children",
        type: "Component[]",
        required: true,
        description: "Child components to arrange vertically",
      },
    ],
    example: {
      type: "Column",
      children: [
        { type: "Text", variant: "h2", text: "Welcome" },
        { type: "Text", variant: "body", text: "Please fill out the form below." },
      ],
    },
  },
  {
    name: "List",
    category: "Layout",
    description:
      "Renders a list of items from data. Supports data binding for dynamic content.",
    props: [
      {
        name: "items",
        type: "string",
        required: true,
        description: "Data path to array (e.g., '{{items}}')",
      },
      {
        name: "itemTemplate",
        type: "Component",
        required: true,
        description: "Template component for each item",
      },
    ],
    example: {
      type: "List",
      items: "{{tasks}}",
      itemTemplate: {
        type: "Row",
        children: [
          { type: "CheckBox", checked: "{{item.done}}" },
          { type: "Text", variant: "body", text: "{{item.title}}" },
        ],
      },
    },
  },

  // Display Components
  {
    name: "Text",
    category: "Display",
    description:
      "Displays text with various typography styles. Use for headings, body text, captions, and labels.",
    props: [
      {
        name: "text",
        type: "string",
        required: true,
        description: "The text content to display",
      },
      {
        name: "variant",
        type: '"h1" | "h2" | "h3" | "h4" | "h5" | "body" | "caption"',
        required: false,
        description: "Typography variant",
        default: '"body"',
      },
    ],
    example: {
      type: "Text",
      variant: "h2",
      text: "Hello World",
    },
  },
  {
    name: "Image",
    category: "Display",
    description:
      "Displays an image. Supports various sizes and aspect ratios.",
    props: [
      {
        name: "src",
        type: "string",
        required: true,
        description: "Image URL",
      },
      {
        name: "alt",
        type: "string",
        required: false,
        description: "Alternative text for accessibility",
      },
      {
        name: "size",
        type: '"avatar" | "icon" | "smallFeature" | "mediumFeature" | "largeFeature" | "header"',
        required: false,
        description: "Predefined size preset",
      },
    ],
    example: {
      type: "Image",
      src: "https://picsum.photos/200",
      alt: "Sample image",
      size: "mediumFeature",
    },
  },
  {
    name: "Icon",
    category: "Display",
    description:
      "Displays a Material Icon. Use icon names from Material Symbols.",
    props: [
      {
        name: "icon",
        type: "string",
        required: true,
        description: "Material icon name (e.g., 'star', 'favorite')",
      },
      {
        name: "size",
        type: "number",
        required: false,
        description: "Icon size in pixels",
        default: "24",
      },
    ],
    example: {
      type: "Icon",
      icon: "star",
      size: 24,
    },
  },
  {
    name: "Video",
    category: "Display",
    description: "Embeds a video player with controls.",
    props: [
      {
        name: "src",
        type: "string",
        required: true,
        description: "Video URL",
      },
      {
        name: "poster",
        type: "string",
        required: false,
        description: "Thumbnail image URL",
      },
    ],
    example: {
      type: "Video",
      src: "https://example.com/video.mp4",
      poster: "https://example.com/poster.jpg",
    },
  },
  {
    name: "AudioPlayer",
    category: "Display",
    description: "Embeds an audio player with controls.",
    props: [
      {
        name: "src",
        type: "string",
        required: true,
        description: "Audio file URL",
      },
    ],
    example: {
      type: "AudioPlayer",
      src: "https://example.com/audio.mp3",
    },
  },

  // Input Components
  {
    name: "Button",
    category: "Input",
    description:
      "A clickable button. Can trigger actions or submit forms.",
    props: [
      {
        name: "label",
        type: "string",
        required: true,
        description: "Button text",
      },
      {
        name: "onClick",
        type: "Action",
        required: false,
        description: "Action to perform when clicked",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        description: "Whether the button is disabled",
        default: "false",
      },
    ],
    example: {
      type: "Button",
      label: "Submit",
      onClick: { type: "submit" },
    },
  },
  {
    name: "TextField",
    category: "Input",
    description:
      "A single-line text input field with optional label.",
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "Label text above the input",
      },
      {
        name: "placeholder",
        type: "string",
        required: false,
        description: "Placeholder text inside the input",
      },
      {
        name: "value",
        type: "string",
        required: false,
        description: "Current value (for data binding)",
      },
      {
        name: "type",
        type: '"text" | "email" | "password" | "number"',
        required: false,
        description: "Input type",
        default: '"text"',
      },
    ],
    example: {
      type: "TextField",
      label: "Email",
      placeholder: "Enter your email",
      inputType: "email",
    },
  },
  {
    name: "CheckBox",
    category: "Input",
    description: "A checkbox input with label.",
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "Label text next to the checkbox",
      },
      {
        name: "checked",
        type: "boolean",
        required: false,
        description: "Whether the checkbox is checked",
        default: "false",
      },
    ],
    example: {
      type: "CheckBox",
      label: "I agree to the terms",
      checked: false,
    },
  },
  {
    name: "DateTimeInput",
    category: "Input",
    description: "A date and/or time picker input.",
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "Label text",
      },
      {
        name: "type",
        type: '"date" | "time" | "datetime"',
        required: false,
        description: "Type of picker",
        default: '"datetime"',
      },
      {
        name: "value",
        type: "string",
        required: false,
        description: "Current value (ISO format)",
      },
    ],
    example: {
      type: "DateTimeInput",
      label: "Select Date",
      inputType: "date",
    },
  },
  {
    name: "MultipleChoice",
    category: "Input",
    description: "A set of radio buttons or checkboxes for selecting options.",
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "Label text for the group",
      },
      {
        name: "options",
        type: "Array<{label: string, value: string}>",
        required: true,
        description: "Available options",
      },
      {
        name: "multiple",
        type: "boolean",
        required: false,
        description: "Allow multiple selections",
        default: "false",
      },
    ],
    example: {
      type: "MultipleChoice",
      label: "Select size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
  },
  {
    name: "Slider",
    category: "Input",
    description: "A range slider for selecting numeric values.",
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "Label text",
      },
      {
        name: "min",
        type: "number",
        required: false,
        description: "Minimum value",
        default: "0",
      },
      {
        name: "max",
        type: "number",
        required: false,
        description: "Maximum value",
        default: "100",
      },
      {
        name: "value",
        type: "number",
        required: false,
        description: "Current value",
      },
    ],
    example: {
      type: "Slider",
      label: "Volume",
      min: 0,
      max: 100,
      value: 50,
    },
  },

  // Container Components
  {
    name: "Card",
    category: "Container",
    description:
      "A container with padding, background, and rounded corners. Use to group related content.",
    props: [
      {
        name: "children",
        type: "Component[]",
        required: true,
        description: "Content inside the card",
      },
    ],
    example: {
      type: "Card",
      children: [
        { type: "Text", variant: "h3", text: "Card Title" },
        { type: "Text", variant: "body", text: "Card content goes here." },
      ],
    },
  },
  {
    name: "Modal",
    category: "Container",
    description:
      "A dialog overlay that appears above other content. Use for confirmations, forms, or important messages.",
    props: [
      {
        name: "title",
        type: "string",
        required: false,
        description: "Modal title",
      },
      {
        name: "children",
        type: "Component[]",
        required: true,
        description: "Modal content",
      },
      {
        name: "open",
        type: "boolean",
        required: false,
        description: "Whether the modal is visible",
        default: "false",
      },
    ],
    example: {
      type: "Modal",
      title: "Confirm Action",
      open: true,
      children: [
        { type: "Text", variant: "body", text: "Are you sure you want to proceed?" },
        {
          type: "Row",
          children: [
            { type: "Button", label: "Cancel" },
            { type: "Button", label: "Confirm" },
          ],
        },
      ],
    },
  },

  // Navigation Components
  {
    name: "Tabs",
    category: "Navigation",
    description:
      "Tabbed navigation for switching between views within a widget.",
    props: [
      {
        name: "tabs",
        type: 'Array<{label: string, content: Component[]}>',
        required: true,
        description: "Tab definitions with labels and content",
      },
      {
        name: "activeTab",
        type: "number",
        required: false,
        description: "Index of the active tab",
        default: "0",
      },
    ],
    example: {
      type: "Tabs",
      tabs: [
        {
          label: "Overview",
          content: [{ type: "Text", variant: "body", text: "Overview content" }],
        },
        {
          label: "Details",
          content: [{ type: "Text", variant: "body", text: "Details content" }],
        },
      ],
    },
  },

  // Visual Components
  {
    name: "Divider",
    category: "Visual",
    description: "A horizontal line to separate content sections.",
    props: [],
    example: {
      type: "Divider",
    },
  },
];

// Group components by category
export const componentsByCategory = componentDocs.reduce(
  (acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  },
  {} as Record<string, ComponentDoc[]>
);
