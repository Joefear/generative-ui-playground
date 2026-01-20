"use client";

import { useState, useCallback } from "react";
import { WidgetBuilderLayout } from "./components/WidgetBuilderLayout";
import { NavigationSidebar, type ActiveView } from "./components/NavigationSidebar";
import { EditorPanel } from "./components/EditorPanel";
import { BuilderChatSidebar } from "./components/BuilderChatSidebar";
import { CreateView } from "./views/CreateView";
import { GalleryView } from "./views/GalleryView";
import { ComponentsView } from "./views/ComponentsView";
import { IconsView } from "./views/IconsView";
import { useWidgetStorage, type A2UIComponent } from "./hooks/useWidgetStorage";
import type { GalleryTemplate } from "./data/gallery-templates";

/**
 * Widget Builder Page
 * Full-page experience for creating and editing A2UI widgets
 */
export default function WidgetBuilderPage() {
  // View state
  const [activeView, setActiveView] = useState<ActiveView>("create");

  // Editor state
  const [widgetName, setWidgetName] = useState("Untitled Widget");
  const [components, setComponents] = useState<A2UIComponent[]>([]);
  const [data, setData] = useState<Record<string, unknown>>({});
  const [currentWidgetId, setCurrentWidgetId] = useState<string | undefined>();

  // Chat state for auto-sending create description
  const [initialChatMessage, setInitialChatMessage] = useState<string>();

  // Widget storage
  const { savedWidgets, saveWidget, deleteWidget, loadWidget } = useWidgetStorage();

  // Handle AI create request from CreateView - sends description to chat
  const handleCreateRequest = useCallback((description: string) => {
    setWidgetName("New Widget");
    setComponents([]);
    setData({});
    setCurrentWidgetId(undefined);
    setInitialChatMessage(description); // Store message to auto-send
    setActiveView("editor");
  }, []);

  // Handle starting blank from CreateView
  const handleStartBlank = useCallback(() => {
    setWidgetName("Untitled Widget");
    setComponents([]);
    setData({});
    setCurrentWidgetId(undefined);
    setActiveView("editor");
  }, []);

  // Handle template selection from GalleryView
  const handleTemplateSelect = useCallback((template: GalleryTemplate) => {
    setWidgetName(template.name);
    setComponents(template.components);
    setData(template.data);
    setCurrentWidgetId(undefined);
    setActiveView("editor");
  }, []);

  // Handle widget generation from chat
  const handleWidgetGenerated = useCallback((newComponents: unknown[]) => {
    setComponents(newComponents as A2UIComponent[]);
  }, []);

  // Handle data generation from chat
  const handleDataGenerated = useCallback((newData: Record<string, unknown>) => {
    setData(newData);
  }, []);

  // Handle saving widget
  const handleSaveWidget = useCallback(() => {
    const id = saveWidget({
      id: currentWidgetId,
      name: widgetName,
      components,
      data,
    });
    setCurrentWidgetId(id);
  }, [saveWidget, currentWidgetId, widgetName, components, data]);

  // Handle loading saved widget
  const handleWidgetSelect = useCallback(
    (id: string) => {
      const widget = loadWidget(id);
      if (widget) {
        setWidgetName(widget.name);
        setComponents(widget.components);
        setData(widget.data);
        setCurrentWidgetId(widget.id);
        setActiveView("editor");
      }
    },
    [loadWidget]
  );

  // Handle deleting widget
  const handleWidgetDelete = useCallback(
    (id: string) => {
      deleteWidget(id);
      if (currentWidgetId === id) {
        setCurrentWidgetId(undefined);
        setWidgetName("Untitled Widget");
        setComponents([]);
        setData({});
      }
    },
    [deleteWidget, currentWidgetId]
  );

  // Handle new widget
  const handleNewWidget = useCallback(() => {
    setActiveView("create");
  }, []);

  // Render main content based on active view
  const renderMainContent = () => {
    switch (activeView) {
      case "create":
        return (
          <CreateView
            onCreateRequest={handleCreateRequest}
            onStartBlank={handleStartBlank}
          />
        );
      case "gallery":
        return <GalleryView onTemplateSelect={handleTemplateSelect} />;
      case "components":
        return <ComponentsView />;
      case "icons":
        return <IconsView />;
      case "editor":
        return (
          <EditorPanel
            widgetName={widgetName}
            components={components}
            data={data}
            onNameChange={setWidgetName}
            onComponentsChange={setComponents}
            onDataChange={setData}
            onSave={handleSaveWidget}
          />
        );
      default:
        return null;
    }
  };

  return (
    <WidgetBuilderLayout
      navigation={
        <NavigationSidebar
          activeView={activeView}
          onViewChange={setActiveView}
          savedWidgets={savedWidgets}
          onWidgetSelect={handleWidgetSelect}
          onWidgetDelete={handleWidgetDelete}
          onNewWidget={handleNewWidget}
          currentWidgetId={currentWidgetId}
        />
      }
      main={
        <div className="h-full overflow-auto">{renderMainContent()}</div>
      }
      chat={
        activeView === "editor" ? (
          <BuilderChatSidebar
            onWidgetGenerated={handleWidgetGenerated}
            onDataGenerated={handleDataGenerated}
            initialMessage={initialChatMessage}
            onMessageSent={() => setInitialChatMessage(undefined)}
          />
        ) : undefined
      }
    />
  );
}
