// this is our form for the post which will have title,slug,description,image upload etc
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    // watch=to keep wactch any input field in form when inputing
    // control=passed to component used in from but not in this file passed to our RTE
    // setvalue and getvalue to setvalues in form
    // {post} holds all info abt post it has attributes title,slug,content,status which is passed when clicked on edit button

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // this function runs when user submit form ie when click on update or post button in ed of createpost form
    // this data have values of input fields in the form in this page
    const submit = async (data) => {
        // if user has come to edit the post when hits update button,we have previous data of post in post variable
        if (post) {
            // we get new image from data.image[0]ie from our form and upload it in database 
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            // deleteing previous image file from database
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
            // add updated details like title,content,etc in database also change id of featured image in database of that post
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            // as updation done redirect user to its post

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // this when creating new post 
            // add new image to db
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                // add title,content of post
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                // as post created done redirect user to its post

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform=useCallback((value)=>{
        if (value && typeof(value)==="string")
        return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
        
        return "";
        

    },[]);


    // watch method from reatc hook form 
    React.useEffect(() => {

        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        // this done to optimise code
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    


    
return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                {/* title */}
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                {/* as title input then watch it and slug transports  */}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {/* our realtimeeditor */}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                {/* take image,accept attribute image/png */}
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {/* if post exists then we updating show update button else submit button */}
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}