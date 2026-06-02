import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm()
    let password = watch("password")
    const onSubmit = async (data) => {
        clearErrors("root.serverError")
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        let responseData = await response.json();
        if (!response.ok) {
            setError("root.serverError", { type: "server", message: responseData.message })
            return
        }
        navigate("/login")
    }

    return (
        <div>
            <h1>Register</h1>
            <div>{isSubmitting && <div> Loading.....</div>}</div>
            <form action="" onSubmit={handleSubmit(onSubmit)} >
                Email :
                <input type="text"
                    {...register("email", {
                        required: { value: true, message: "Email is required" },
                        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Not an email" }
                    })} />
                {errors.email && <span className="error">{errors.email.message}</span>}
                <br />
                <br />
                Password :
                <input type="password"
                    {...register("password", {
                        required: { value: true, message: "Password is required" },
                        minLength: { value: 8, message: "Minimum Length required is 8" }
                    })} />
                {errors.password && <span className="error">{errors.password.message}</span>}
                <br />
                <br />
                Confirm Password :
                <input type="password"
                    {...register("confirmPassword", {
                        required: { value: true, message: "Password is required" },
                        validate: (value) =>
                            value === password || "Passwords do not match"
                    })} />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                <br />
                <br />
                <input disabled={isSubmitting} type="submit" />
                <p>{errors.root && errors.root?.serverError?.message}</p>
                <Link to="/login" > Already a member? Sign In</Link>

            </form>
        </div>
    )
}

export default Register
