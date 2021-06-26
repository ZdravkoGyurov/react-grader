import React from "react"

const User = ({user}) => {
    console.log("user>>", user);
    return (
        <div>{ user.username }</div>
    )
}

export default User