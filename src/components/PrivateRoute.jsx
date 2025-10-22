import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children, isLoggedIn }) {
    const location = useLocation();

    if (!isLoggedIn) {
        // Redirect ke login page dengan state dari mana user berasal
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}