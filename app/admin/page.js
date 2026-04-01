"use client";
import React, { useEffect, useState } from "react";
import { Home, Folder, PlusCircle } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-[#18181B] text-white p-5 hidden md:block">
        <h1 className="text-2xl font-bold mb-10">Karan.dev</h1>

        <nav className="space-y-6">
          <Link href="/admin" className="flex items-center gap-3 hover:text-gray-300">
            <Home size={20} /> Dashboard
          </Link>

          <Link href="/admin/list-project" className="flex items-center gap-3 hover:text-gray-300">
            <Folder size={20} /> Projects
          </Link>

          <Link href="/admin/create-project" className="flex items-center gap-3 hover:text-gray-300">
            <PlusCircle size={20} /> Add Project
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* Topbar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <div className="bg-black text-white px-4 py-2 rounded-lg">
            Karan Mohan Talwar 🔥
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card title="Total Projects" value={0} />
          <Card title="Completed" value={0} />
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">

          <Link href="/admin/create-project">
            <div className="bg-[#18181B] text-white p-6 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">➕ Add New Project</h3>
              <p className="text-sm text-gray-300">
                Add your latest work to portfolio
              </p>
            </div>
          </Link>

          <Link href="/list-project">
            <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">📁 View Projects</h3>
              <p className="text-sm text-gray-500">
                Manage and explore your projects
              </p>
            </div>
          </Link>

        </div>

        {/* Recent Projects */}
{/*         <div className="mt-10 bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>

          {projects.length === 0 ? (
            <p className="text-gray-500 text-sm">No projects added yet.</p>
          ) : (
            <ul className="space-y-3">
              {projects.slice(0, 3).map((project, index) => (
                <li key={index} className="border-b pb-2">
                  🚀 {project.name}
                </li>
              ))}
            </ul>
          )}
        </div> */}

      </div>
    </div>
  );
};

export default Dashboard;


/* Card */
const Card = ({ title, value }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:scale-105 transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
};