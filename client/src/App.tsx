import { useEffect, useState } from "react";
import { APIError, getHealth, getRoot } from "./lib/api";

export default function App() {
  const [status, setStatus] = useState("...");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch health status
        let healthStatus = "down";
        try {
          const healthRes = await getHealth();
          healthStatus = healthRes.ok ? "ok" : "down";
        } catch (error) {
          console.warn("Health check failed:", error instanceof APIError ? error.message : error);
          healthStatus = "down";
        }

        // Fetch root message
        let message = "";
        try {
          const rootRes = await getRoot();
          message = rootRes.message;
        } catch (error) {
          console.warn("Root endpoint failed:", error instanceof APIError ? error.message : error);
          message = "Unable to connect to server";
        }

        setStatus(healthStatus);
        setMsg(message);
      } catch (error) {
        console.error("Unexpected error:", error);
        setStatus("down");
        setMsg("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statusColor = status === "ok" ? "text-green-600" : "text-red-600";
  const statusBg = status === "ok" ? "bg-green-100" : "bg-red-100";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              React + FastAPI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Modern full-stack development with TypeScript
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {/* API Status Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">API Status</h2>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusBg} ${statusColor}`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                      Checking...
                    </div>
                  ) : (
                    status.toUpperCase()
                  )}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Backend health check status</p>
            </div>

            {/* Server Message Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Server Message
              </h2>
              {loading ? (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Loading...
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{msg || "No message received"}</p>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Tech Stack Features
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">R</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  React 19
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Latest React with TypeScript, Vite, and modern development tools
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-green-600 dark:text-green-400 text-xl font-bold">F</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  FastAPI
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  High-performance Python API with automatic docs and validation
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-purple-600 dark:text-purple-400 text-xl font-bold">T</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  TailwindCSS
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Utility-first CSS framework for rapid UI development
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
