"use client";

import { useNotification } from "../context/NotificationContext";

export default function Notification() {
  const { notification } = useNotification();

  if (!notification) {
    return null;
  }

  const colors = {
    success:
      "bg-green-600 border-green-500",

    error:
      "bg-red-600 border-red-500",

    info:
      "bg-blue-600 border-blue-500",
  };

  return (
    <div
      className="
        fixed
        top-6
        right-6
        z-50
        animate-pulse
      "
    >
      <div
        className={`
          min-w-[300px]
          rounded-xl
          border
          px-5
          py-4
          shadow-xl
          text-white
          ${colors[notification.type]}
        `}
      >
        <p className="font-semibold">
          {notification.message}
        </p>
      </div>
    </div>
  );
}