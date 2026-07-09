"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

type NotificationType =
  | "success"
  | "error"
  | "info";

interface NotificationState {
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  notification: NotificationState | null;

  showNotification: (
    message: string,
    type?: NotificationType
  ) => void;

  clearNotification: () => void;
}

const NotificationContext =
  createContext<
    NotificationContextType | undefined
  >(undefined);

export function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notification, setNotification] =
    useState<NotificationState | null>(
      null
    );

  const showNotification = useCallback(
    (
      message: string,
      type: NotificationType = "info"
    ) => {
      setNotification({
        message,
        type,
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    },
    []
  );

  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(
    NotificationContext
  );

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider"
    );
  }

  return context;
}