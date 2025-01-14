'use client'

import {useRouter} from 'next/navigation'
import {useForm} from 'react-hook-form'

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const router = useRouter();
    const login = (data) => {
        console.log(JSON.stringify(data));
        fetch("api/sign-in", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 200) {
                router.push('/transfer');
            } else {
                res.json()
                    .then(body => {
                        window.alert(`Login failed: ${JSON.stringify(body)}`);
                    });
            }

        });
    };

    return (
        <div className="d-flex vh-100 flex-column align-items-center justify-content-center">
            <h1>Virtual Bank</h1>
            <form className={"border p-3"}>
                <div className="mb-3">
                    <label htmlFor="accountName">Account name</label>
                    <input type="text" className="form-control" {...register("accountName", {required: true})} />
                    {errors.accountName && <div className="text-danger">An account name is required.</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="accountPwd">Password</label>
                    <input type="password" className="form-control" {...register("password", {required: true})} />
                    {errors.password && <div className="text-danger">A password is required</div>}
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={handleSubmit((data) => login(data))}>
                        Sign in
                    </button>
                </div>
            </form>


        </div>

    )
}

