import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function AdminWithoutPrivate() {
    const {currentAdmin} = useSelector(state => state.admin )
    return currentAdmin ? <Navigate to='/admin' /> : <Outlet />
}

export default AdminWithoutPrivate