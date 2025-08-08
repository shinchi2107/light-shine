const InputField = ({ error, className, ...props }) => {
    return (
        <div className="input-wrapper w-full">
            <input
                {...props}
                className={`w-full outline-none ${error ? "border-red-500" : "focus:ring-blue-300"
                    } ${className}`}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    )
}

export default InputField;