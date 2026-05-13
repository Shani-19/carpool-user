"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { deleteCookie } from "cookies-next";

export default function DashboardGroupLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      deleteCookie("isAuthenticated", { path: "/" });
      // Use router.push for client-side navigation if possible
      window.location.href = "/login";
    }
  }, [user, loading, router]);

  if (loading) return (
    <>
      <div className="min-h-screen bg-gray-50">{children}</div>
      {/* <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> */}
    </>);
  if (!user) return null;

  // console.log("Authenticated user:", user);

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
