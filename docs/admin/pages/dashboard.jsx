import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {supabase } from './supabaseClient';
const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Inventory", path: "/inventory" },
  { name: "Sales", path: "/sales" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/settings" },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [summary, setSummary] = useState({});
  const [recentSales, setRecentsales] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
        const { data: products, error: productError } = await supabase
           .from("products")
           .select("*");

           const { data: sales, error: salesError } = await supabase
             .from("sales")
             .select("*")
             .order("created_at", {ascending: false})
             .limit(5);
             if (productError || salesError) {
                console.error("Fetch error:", productError || salesError);
                return;
             }
             const lowStockCount = products.filter(p => p.quantity < 5).length;
      const expiringSoonCount = products.filter(p => {
        const expiry = new Date(p.expiry_date);
        const now = new Date();
        const in3Days = new Date(now.setDate(now.getDate() + 3));
        return expiry <= in3Days;
      }).length;

      const totalSalesToday = sales
        .filter(s => new Date(s.created_at).toDateString() === new Date().toDateString())
        .reduce((acc, s) => acc + s.total_amount, 0);

      setSummary({
        totalProducts: products.length,
        totalSalesToday,
        lowStock: lowStockCount,
        expiringSoon: expiringSoonCount,
      });

      setRecentSales(sales.map((s, idx) => ({
        id: s.id,
        product: s.product_name,
        qty: s.quantity,
        amount: s.total_amount,
        time: new Date(s.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })));
    };

    fetchDashboardData();
  }, []);


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-white border-r shadow-md transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 text-2xl font-bold border-b">Butchee Admin</div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded hover:bg-gray-100 ${
                location.pathname === item.path ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div></div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <SummaryCard label="Total Products" value={summary.totalProducts} color="bg-blue-100" />
            <SummaryCard
              label="Sales Today"
              value={`Ksh ${summary.totalSalesToday}`}
              color="bg-green-100"
            />
            <SummaryCard label="Low Stock" value={summary.lowStock} color="bg-yellow-100" />
            <SummaryCard label="Expiring Soon" value={summary.expiringSoon} color="bg-red-100" />
          </div>

          {/* Alerts */}
          {summary.lowStock > 0 && (
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded mb-6">
              ⚠️ {summary.lowStock} product(s) are running low on stock!
            </div>
          )}

          {/* Recent Sales */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Product</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="border-b hover:bg-gray-100">
                    <td className="py-2">{sale.product}</td>
                    <td>{sale.qty}</td>
                    <td>Ksh {sale.amount}</td>
                    <td>{sale.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, color }) => (
  <div className={`p-4 rounded shadow ${color}`}>
    <p className="text-gray-600">{label}</p>
    <h3 className="text-2xl font-bold">{value}</h3>
  </div>
);

export default Dashboard;
