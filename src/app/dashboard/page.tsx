"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen text-black text-xl">
      Welcome to the Dashboard
    </div>
  );
};

export default DashboardPage;
