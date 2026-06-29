import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/history', label: 'History' },
  { to: '/statistics', label: 'Statistics' },
];

function Navbar() {
  return (
    <nav aria-label="Main navigation" className="bg-indigo-600 text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          EMI Loan Calculator
        </h1>
        <div className="flex gap-1 sm:gap-2">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
                  isActive
                    ? 'bg-white text-indigo-600'
                    : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
