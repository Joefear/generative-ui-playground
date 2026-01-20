"use client";

import { useState, useEffect, useCallback } from "react";

// A2UI component type (simplified for widget builder)
export interface A2UIComponent {
  type: string;
  [key: string]: unknown;
}

// Saved widget format
export interface SavedWidget {
  id: string;
  name: string;
  components: A2UIComponent[];
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "a2ui-widget-builder-widgets";

/**
 * Hook for persisting widgets to localStorage
 */
export function useWidgetStorage() {
  const [savedWidgets, setSavedWidgets] = useState<SavedWidget[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load widgets from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedWidgets(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load widgets from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage when widgets change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedWidgets));
      } catch (error) {
        console.error("Failed to save widgets to localStorage:", error);
      }
    }
  }, [savedWidgets, isLoaded]);

  // Save a new widget or update existing
  const saveWidget = useCallback(
    (widget: Omit<SavedWidget, "id" | "createdAt" | "updatedAt"> & { id?: string }) => {
      const now = new Date().toISOString();

      if (widget.id) {
        // Update existing widget
        setSavedWidgets((prev) =>
          prev.map((w) =>
            w.id === widget.id
              ? { ...w, ...widget, updatedAt: now }
              : w
          )
        );
        return widget.id;
      } else {
        // Create new widget
        const newWidget: SavedWidget = {
          id: `widget-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
          name: widget.name,
          components: widget.components,
          data: widget.data,
          createdAt: now,
          updatedAt: now,
        };
        setSavedWidgets((prev) => [...prev, newWidget]);
        return newWidget.id;
      }
    },
    []
  );

  // Delete a widget
  const deleteWidget = useCallback((id: string) => {
    setSavedWidgets((prev) => prev.filter((w) => w.id !== id));
  }, []);

  // Load a widget by ID
  const loadWidget = useCallback(
    (id: string): SavedWidget | undefined => {
      return savedWidgets.find((w) => w.id === id);
    },
    [savedWidgets]
  );

  return {
    savedWidgets,
    saveWidget,
    deleteWidget,
    loadWidget,
    isLoaded,
  };
}
