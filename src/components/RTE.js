// this is our realtime editor that word thing in which u type while doing the post

import React from 'react'
// our RTE comes from this
import {Editor } from '@tinymce/tinymce-react';
// control RTE from diffrent location
import {Controller } from 'react-hook-form';
import conf from '../conf/conf';


export default function RTE({name, control, label, defaultValue =""}) {
  
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

{/* controlling our RTE */}
    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        // our editor,word
        <Editor
        apiKey={conf.tinymceapikey}
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
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
            // buttons in header
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        // any change in editor render the changes ie user will able to see what his typing
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}