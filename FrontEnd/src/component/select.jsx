import { useId,forwardRef } from "react";

function Select(
    {
        options=[],
        label,
        className="",
        ...props
    },
    ref
){
    const id  = useId();

    return (
        <div className="w-full">
            {label && <label htmlFor={id} className=""></label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-200 duration-200 border border-gray-400 w-full ${className}`}
            >
                {options?.map((option)=>{
                    return <option value={option} key={option}>{option}</option>
                })}

            </select>
        </div>
    )
}


export default forwardRef(Select) //can do this way also