"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDispatch, useSelector } from "react-redux"
import { createPost, clearError } from "@/lib/feauters/posts/postsSlice"
import type { RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const postSchema = z.object({
    title: z
        .string()
        .min(5, { message: "Title must be at least 5 characters" })
        .max(100, { message: "Title must be less than 100 characters" }),
    content: z.string().min(20, { message: "Content must be at least 20 characters" }),
    author: z.string().min(3, { message: "Author name must be at least 3 characters" }),
})

type PostFormValues = z.infer<typeof postSchema>

export default function PostForm() {
    const dispatch = useDispatch()

    // Use try-catch to handle potential Redux errors
    const state = useSelector((state: RootState) => state.posts)
    const loading = state.loading
    const error = state.error

    const form = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: "",
            author: "",
        },
    })

    // Clear error when component unmounts
    useEffect(() => {
        return () => {
            try {
                dispatch(clearError())
            } catch (err) {
                console.error("Error dispatching clearError:", err)
            }
        }
    }, [dispatch])

    const onSubmit = async (data: PostFormValues) => {
        try {

            const resultAction = await dispatch(
                // @ts-ignore
                createPost({
                    ...data,
                    createdAt: new Date().toISOString(),
                    comments: [],
                }),
            )

        } catch (err: any) {
            console.error("Error in form submission:", err)
            // toast({
            //     title: "Error",
            //     description: err.message || "An unexpected error occurred",
            //     variant: "destructive",
            // })
        }
    }

    return (
        <div className={''}>
            <Card style={{
                maxWidth:"400px",
                padding:"20px"
            }} >
                <CardHeader style={{
                    textAlign: "center"
                }}>
                    <CardTitle>Create New Post</CardTitle>
                    <CardDescription>Fill out the form below to create a new blog post</CardDescription>
                </CardHeader>
                <CardContent style={{
                    maxWidth:"350px",
                    margin:"0 auto"
                }}>
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Title</FormLabel>
                                        <FormControl >
                                            <Input style={{
                                                padding:"10px"
                                            }}  placeholder="Enter post title" {...field} />
                                        </FormControl>
                                        <FormDescription>The title of your blog post.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input style={{
                                                padding:"10px"
                                            }} placeholder="Your name" {...field} />
                                        </FormControl>
                                        <FormDescription>Your name as the author of this post.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea style={{
                                                padding:"10px",
                                                height:"150px"
                                            }} placeholder="Write your post content here..." className="min-h-[200px]" {...field} />
                                        </FormControl>
                                        <FormDescription>The main content of your blog post.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Creating..." : "Create Post"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

