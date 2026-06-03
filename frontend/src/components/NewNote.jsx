import React from 'react'
import { useForm } from 'react-hook-form'

const NewNote = () => {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (data) => {
        clearErrors("root.serverError")
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            setError("root.serverError", { type: "server", message: "Title can't be same" })
            return
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <span>Title :</span>
                <input type="text" className="styles.input" {...register("title",
                    { required: { value: true, message: "Title is required" } }
                )} />
                <input type="submit" className="submitButton" value="Create Note" />
                <br />{errors.title && errors.title.message}
                <p>{errors.root && errors.root?.serverError?.message}</p>

            </form>
        </div>
    )
}

export default NewNote
