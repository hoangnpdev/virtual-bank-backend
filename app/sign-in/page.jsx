'use client'

export default function SignIn() {

    const signIn = () => {
        fetch("api/sign-in", {
            method: "GET"
        }).then(res => res.json())
            .then(body => window.alert(body))
    };

    return (
        <div className="d-flex vh-100 flex-column align-items-center justify-content-center">
            <h1>Virtualbank</h1>
            <form className={"border p-3"}>
                <div className="mb-3">
                    <label htmlFor="accountName">Account name</label>
                    <input type="text" id="accountName" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="accountPwd">Password</label>
                    <input type="password" id="accountPwd" className="form-control"/>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary" onClick={signIn}>
                        Sign in
                    </button>
                </div>
            </form>


        </div>

    )
}

