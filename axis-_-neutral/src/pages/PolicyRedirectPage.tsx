import { Navigate, useLocation } from 'react-router-dom';

const VALID = new Set(['shipping', 'returns', 'privacy', 'terms']);

export default function PolicyRedirectPage() {
  const section = useLocation().pathname.replace(/^\//, '');
  if (!VALID.has(section)) {
    return <Navigate to="/policies" replace />;
  }
  return <Navigate to={`/policies#${section}`} replace />;
}
