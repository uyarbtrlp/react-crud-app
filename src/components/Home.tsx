import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { authActions } from "../store/auth-slice";

const Home : React.FC<{}> = () => {
    const dispatch: AppDispatch = useDispatch();
    const tokenDuration = useSelector((state:RootState) => state.auth.tokenDuration);
    useEffect(()=>{
        dispatch(authActions.getStoredToken())
    },[])
    return (
        <p>HOME</p>
    )
}

export default Home