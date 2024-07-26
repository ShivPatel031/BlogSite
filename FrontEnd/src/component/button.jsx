function Button(
    {   text,
        type='button',
        bgColor="bg-blue-600",
        textColor="text-white",
        className="",
        ...props  //to handel additional props
    }){
    return(
        <button
            className={`px-4 py-2 rounded-lg ${className} ${textColor} ${bgColor}`} {...props}
            >
                {text}
        </button>
    )
}

export {Button};