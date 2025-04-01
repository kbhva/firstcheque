"use client";
import Footer from "@/components/navigation/Footer";
import DashboardPublic from "@/components/pageComponents/DashboardPublic";
import NavBar from "@/components/navigation/NavBar";
import DashboardPrivate from "@/components/pageComponents/DashboardPrivate";
import EmployerDashboard from "@/components/pageComponents/EmployerDashboard";
import { useAuthInfo } from "@/context/AuthInfo";

export default function Home() {
  const { user, role } = useAuthInfo();

  return (
    <main>
      <NavBar />
      <div className=" flex flex-col items-center text-center justify-center">
        {user ? (
          role === "freelancer" ? (
            <DashboardPrivate />
          ) : (
            <EmployerDashboard />
          )
        ) : (
          <DashboardPublic />
        )}
      </div>
      <Footer />
    </main>
  );
}