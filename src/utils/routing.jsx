import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import route from './routers';

const SetRoutes = () => {
    const Routers = () => useRoutes([...route])
    return (
        <Router>
            <Routers />
        </Router>
    )
}

export default SetRoutes