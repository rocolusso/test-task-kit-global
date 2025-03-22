"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addComment, clearSelectedPost } from "@/lib/feauters/posts/postsSlice"
import type { RootState } from "@/lib/store"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
import { formatDate } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"

export default function PostDetail() {
    const dispatch = useDispatch()
    const { posts, selectedPostId } = useSelector((state: RootState) => state.posts)
    const [commentText, setCommentText] = useState("")

    const post = posts.find((p) => p.id === selectedPostId)

    if (!post) {
        return <div>Post not found</div>
    }

    const handleAddComment = () => {
        if (commentText.trim()) {
            dispatch(
                addComment({
                    postId: post.id,
                    comment: {
                        id: Date.now().toString(),
                        text: commentText,
                        author: "Anonymous",
                        createdAt: new Date().toISOString(),
                    },
                }),
            )
            setCommentText("")
        }
    }

    return (
        <>
            {/*<div className="space-y-6">*/}
            {/*    <Button variant="ghost" className="flex items-center gap-2 mb-4"*/}
            {/*            onClick={() => dispatch(clearSelectedPost())}>*/}
            {/*        <ArrowLeft className="h-4 w-4"/> Back to posts*/}
            {/*    </Button>*/}

            {/*    <Card>*/}
            {/*        <CardHeader>*/}
            {/*            <CardTitle className="text-2xl">{post.title}</CardTitle>*/}
            {/*            <CardDescription>*/}
            {/*                By {post.author} • {formatDate(post.createdAt)}*/}
            {/*            </CardDescription>*/}
            {/*        </CardHeader>*/}
            {/*        <CardContent>*/}
            {/*            <div className="prose max-w-none">*/}
            {/*                {post.content.split("\n").map((paragraph, i) => (*/}
            {/*                    <p key={i}>{paragraph}</p>*/}
            {/*                ))}*/}
            {/*            </div>*/}
            {/*        </CardContent>*/}
            {/*    </Card>*/}

            {/*    <div className="space-y-4">*/}
            {/*        <h3 className="text-xl font-semibold">Comments ({post.comments.length})</h3>*/}

            {/*        <div className="flex gap-2">*/}
            {/*            <Input placeholder="Add a comment..." value={commentText}*/}
            {/*                   onChange={(e) => setCommentText(e.target.value)}/>*/}
            {/*            <Button onClick={handleAddComment}>Post</Button>*/}
            {/*        </div>*/}

            {/*        {post.comments.length > 0 ? (*/}
            {/*            <div className="space-y-4">*/}
            {/*                {post.comments.map((comment) => (*/}
            {/*                    <Card key={comment.id}>*/}
            {/*                        <CardHeader className="py-3">*/}
            {/*                            <div className="flex justify-between items-center">*/}
            {/*                                <CardTitle className="text-sm font-medium">{comment.author}</CardTitle>*/}
            {/*                                <CardDescription*/}
            {/*                                    className="text-xs">{formatDate(comment.createdAt)}</CardDescription>*/}
            {/*                            </div>*/}
            {/*                        </CardHeader>*/}
            {/*                        <CardContent className="py-2">*/}
            {/*                            <p>{comment.text}</p>*/}
            {/*                        </CardContent>*/}
            {/*                    </Card>*/}
            {/*                ))}*/}
            {/*            </div>*/}
            {/*        ) : (*/}
            {/*            <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="space-y-6">
                <button  className="flex items-center gap-2 mb-4"
                        onClick={() => dispatch(clearSelectedPost())}>
                    <ArrowLeft className="h-4 w-4"/> Back to posts
                </button>

                <div>
                    <div>
                        <h1 className="text-2xl">{post.title}</h1>
                        <p>
                            By {post.author} • {formatDate(post.createdAt)}
                        </p>
                    </div>
                    <div>
                        <div className="prose max-w-none">
                            {post.content.split("\n").map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Comments ({post.comments.length})</h3>

                    <div className="flex gap-2">
                        <input placeholder="Add a comment..." value={commentText}
                               onChange={(e) => setCommentText(e.target.value)}/>
                        <button onClick={handleAddComment}>Post</button>
                    </div>

                    {post.comments.length > 0 ? (
                        <div className="space-y-4">
                            {post.comments.map((comment) => (
                                <div key={comment.id}>
                                    <div className="py-3">
                                        <div className="flex justify-between items-center">
                                            <h1 className="text-sm font-medium">{comment.author}</h1>
                                            <p
                                                className="text-xs">{formatDate(comment.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <p>{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </div>
        </>

    )
}

