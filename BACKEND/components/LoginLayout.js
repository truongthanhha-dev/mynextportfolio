"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function LoginLayout({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      if (typeof window !== "undefined") {
        signIn(undefined, { callbackUrl: window.location.href });
      } else {
        signIn();
      }
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="full-h flex flex-center">
        <div className="loading-bar">Đang tải...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}
