import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        clearErrors("root.serverError")
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        let responseData = await response.json();
        if (!response.ok) {
            setError("root.serverError", { type: "server", message: responseData.message })
            return
        }
        localStorage.setItem("token",responseData.token)
        navigate("/")
    }
    

    return (
        <div>
            <h1>Login</h1>
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
                <input disabled={isSubmitting} type="submit" />
                <p>{errors.root && errors.root?.serverError?.message}</p>

            </form>
        </div>
    )
}

export default Login
