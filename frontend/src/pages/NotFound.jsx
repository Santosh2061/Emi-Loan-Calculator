import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-md ring-1 ring-slate-200">
      <h2 className="text-2xl font-bold text-slate-800">Page Not Found</h2>
      <p className="mt-2 text-slate-500">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
