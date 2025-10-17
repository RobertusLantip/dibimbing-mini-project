import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);   // wraps button and anchored dropdown
  const buttonRef = useRef(null);    // hamburger button
  const navigate = useNavigate();

  // close when clicking outside wrapperRef
  useEffect(() => {
    function onDocClick(e) {
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(e.target)) return;
      setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const navHeightClass = "h-16";
  const menuItems = [
    { label: "Home", to: "/", type: "link" },
    { label: "Users", to: "/users", type: "link" },
    { label: "Register", to: "/register", type: "link" },
    { label: "Login", to: "/login", type: "link" },
    { label: "Logout", type: "action" },
  ];

  function handleLogout() {
    try {
      localStorage.removeItem("token");
    } catch {}
    navigate("/login", { replace: true });
    setOpen(false);
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${navHeightClass} backdrop-blur bg-white/75 shadow-sm`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="text-2xl font-bold text-blue-800 select-none">Logo</div>

            {/* Web menu items */}
            <ul className="hidden md:flex items-center space-x-3 text-blue-900 font-medium">
              {menuItems.map((item) => (
                <li key={item.label}>
                  {item.type === "link" ? (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md transition-colors duration-150 ${isActive ? "bg-blue-100" : "hover:bg-blue-50"}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 rounded-md transition-colors duration-150 hover:bg-blue-50"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile menu items */}
            <div className="md:hidden" ref={wrapperRef}>
              <button
                ref={buttonRef}
                onClick={(e) => {
                  e.stopPropagation(); // avoid immediate outside-click close
                  setOpen((s) => !s);
                }}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="p-2 rounded-md focus:outline-none"
              >
                <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div
                id="mobile-menu"
                className={`absolute right-4 mt-2 w-56 min-w-[12rem] origin-top-right rounded-md shadow-lg ring-1 ring-black/5 bg-white/95 overflow-hidden transform transition-all duration-180 ${
                  open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
                }`}
                style={{ transformOrigin: "top right", top: "100%" }}
              >
                <ul className="flex flex-col p-2 gap-1">
                  {menuItems.map((item) => (
                    <li key={item.label} className="py-1">
                      {item.type === "link" ? (
                        <NavLink
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `block w-full py-2 px-3 rounded-md text-blue-900 ${isActive ? "bg-blue-100" : "hover:bg-blue-50"}`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ) : (
                        <button
                          onClick={handleLogout}
                          className="w-full text-left py-2 px-3 rounded-md text-blue-900 hover:bg-blue-50"
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* spacer keeps page content visible below fixed navbar */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
