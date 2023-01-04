import useAuthHook from "./use-auth.hook";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({redirectPath = '/', children}:{redirectPath: string, children: React.ReactElement}) =>{
    const {isConnected} = useAuthHook();
    if(!isConnected){
        return <Navigate to={redirectPath} replace={true}/>
    }
    return children ? children : <Outlet/>
}

export default ProtectedRoute;