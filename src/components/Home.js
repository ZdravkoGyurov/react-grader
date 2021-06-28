import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Home() {
    let history = useHistory()

    useEffect(() => {
        history.push('/sign-in')
    })

    return (
        <div></div>
    )
}