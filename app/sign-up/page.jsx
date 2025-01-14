'use client'

import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function SignUpPage() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [passwordMatchedError, setPasswordMatchedError] = useState(false);

    const router = useRouter();
    const signUp = (data) => {
        if (data.password !== data.passwordConfirmation) {
            setPasswordMatchedError(true);
            return;
        } else {
            setPasswordMatchedError(false);
        }
        fetch("api/sign-up", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 200) {
                router.push('/sign-in');
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
                    <label htmlFor="accountPwd">Password confirmation</label>
                    <input type="password" className="form-control" {...register("passwordConfirmation", {required: true})} />
                    {errors.passwordConfirmation && <div className="text-danger">Password is required</div>}
                    {passwordMatchedError && <div className="text-danger">Password confirmation is not matched</div>}
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={handleSubmit((data) => signUp(data))}>
                        Sign up
                    </button>
                </div>
            </form>


        </div>

    )
}