"use client"
import { useDispatch, useSelector } from "react-redux"
import { selectPost, fetchPosts } from "@/lib/feauters/posts/postsSlice"
import type { RootState } from "@/lib/store"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { RefreshCw } from "lucide-react"
import {useEffect} from "react";


export type Post = {
    id: string
    title: string,
    content: string,
    author: string,
    createdAt: string,
}

export default function PostList() {
    const dispatch = useDispatch()


    // @ts-ignore
    let posts:Post[] = []
    let loading = false
    let error = null

    try {
        const state = useSelector((state: RootState) => state.posts)
        posts = state.posts
        loading = state.loading
        error = state.error
    } catch (err) {
        console.error("Error accessing Redux state in PostList:", err)
        posts = []
        loading = false
        error = err instanceof Error ? err.message : "An unknown error occurred."
    }

    const handleRefresh = () => {
        try {
            // @ts-ignore
            dispatch(fetchPosts())
        } catch (err) {
            console.error("Error dispatching fetchPosts in PostList:", err)
        }
    }


    useEffect(() => {
        // @ts-ignore
        dispatch(fetchPosts())
    },[fetchPosts, dispatch])




    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin mr-2">
                    <RefreshCw className="h-5 w-5" />
                </div>
                <span>Loading posts...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-red-500 p-8">
                <p>Error: {error}</p>
                <Button onClick={handleRefresh} variant="outline" className="mt-4">
                    <RefreshCw className="h-4 w-4 mr-2" /> Try Again
                </Button>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="text-center p-8">
                <p className="mb-4">No posts found. Create your first post!</p>
                <Button onClick={handleRefresh} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                </Button>
            </div>
        )
    }

    return (
        <div>
            {/*<div className="flex justify-end mb-4">*/}
            {/*    <Button onClick={handleRefresh} variant="outline" size="sm">*/}
            {/*        <RefreshCw className="h-4 w-4 mr-2" /> Refresh*/}
            {/*    </Button>*/}
            {/*</div>*/}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-[400px]">
                {posts.map((post) => (
                    <Card key={post.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                            <CardDescription>{formatDate(post.createdAt)}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="line-clamp-3">{post.content}</p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    try {
                                        dispatch(selectPost(post.id))
                                    } catch (err) {
                                        console.error("Error dispatching selectPost:", err)
                                    }
                                }}
                            >
                                Read More
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

