import { useLocation } from 'react-router-dom'

function RouteLocation() {
    return <span>{useLocation().pathname}</span>
}

export default RouteLocation;