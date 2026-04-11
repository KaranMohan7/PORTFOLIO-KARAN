"use client";
import React from "react";
import { Home, Folder, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100 overflow-hidden">

      {/* Sidebar FIXED */}
      <aside className="w-64 bg-[#18181B] text-white p-5 hidden md:flex flex-col fixed left-0 top-0 h-screen">
        <h1 className="text-2xl font-bold mb-10">Karan.dev</h1>

        <nav className="space-y-6">
          <Link href="/admin-karanK771" className="flex items-center gap-3 hover:text-gray-300">
            <Home size={20} /> Dashboard
          </Link>

          <Link href="/admin-karanK771/list-project" className="flex items-center gap-3 hover:text-gray-300">
            <Folder size={20} /> Projects
          </Link>

          <Link href="/admin-karanK771/create-project" className="flex items-center gap-3 hover:text-gray-300">
            <PlusCircle size={20} /> Add Project
          </Link>
        </nav>
      </aside>

      {/* Right Section SCROLLABLE */}
      <div className="flex-1 ml-0 md:ml-64 min-h-screen overflow-y-auto p-6">
        {children}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={10}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0f0f0f",
              color: "#fff",
              borderRadius: "14px",
              padding: "14px 18px",
              fontSize: "14px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#0f0f0f",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#0f0f0f",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminLayout;