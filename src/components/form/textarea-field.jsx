const TextareaField = ({ error, className, ...props }) => {
    return (
        <div className="textarea-wrapper w-full">
            <textarea {...props} className={`w-full outline-none ${error ? "border-red-500" : "focus:ring-blue-300"
                } ${className}`} />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    )
}

export default TextareaField;