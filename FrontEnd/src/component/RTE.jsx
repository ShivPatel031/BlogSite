import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
// controller do same work as forwordRef but exclusive for hook form

export function RTE({name,control,label,defaultValue=""})
{

    return (
        <div className="w-full">    
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}

             <Controller 
                name={name || "content"}
                control={control}
                render={({field: {onChange}})=>(
                    <Editor 
                    apiKey='oe9xszhyedc8iannop2m108r3m5ffokcorccli4yg7n4ttok'
                    initialValue={defaultValue}
                    init={
                        {
                            branding:false,
                            height:500,
                            menubar:true,
                            plugins:[
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:'undo redo | formateselct | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                            content_style:"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }
                    }
                    onEditorChange={onChange}
                    />
                )}
                />
        </div>
    )


    // can do it like this 
    // return (
    // <Editor 
    //     initialValue="default value"
    //     init={
    //         {
    //             branding:false,
    //             height:500,
    //             menubar:true,
    //             plugins:['advlist autolink lists link image charmap print preview anchor',
    //                 'searchreplace visualblocks code fullscreen',
    //                 'insertdatetime media table paste code help wordcount'
    //             ]
    //         }
    //     }/>
    // )
}