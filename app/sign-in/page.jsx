'use client'
import { useEffect } from "react";

export default function SignIn() {

    useEffect(() => {

    })

    const signIn = () => {
        fetch("api/sign-in", {
            method: "GET"
        }).then(res => res.json())
        .then(body => window.alert(body))
    };

    return <button onClick={signIn}>Sign in</button>
}