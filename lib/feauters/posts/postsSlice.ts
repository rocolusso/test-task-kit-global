import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export interface Comment {
    id: string
    text: string
    author: string
    createdAt: string
}

export interface Post {
    id: string
    title: string
    content: string
    author: string
    createdAt: string
    comments: Comment[]
}

interface PostsState {
    posts: Post[]
    selectedPostId: string | null
    loading: boolean
    error: string | null
}

const initialState: PostsState = {
    posts: [],
    selectedPostId: null,
    loading: false,
    error: null,
}

// Async thunks
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
    try {
        const postsCollection = collection(db, "posts")
        const postsSnapshot = await getDocs(postsCollection)
        const postsList = postsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Post[]
        return postsList
    } catch (error: any) {
        console.error("Error fetching posts:", error)
        return rejectWithValue(error.message || "Failed to fetch posts")
    }
})

export const createPost = createAsyncThunk("posts/createPost", async (post: Omit<Post, "id">, { rejectWithValue }) => {
    try {
        console.log("Creating post:", post)
        const postsCollection = collection(db, "posts")
        const docRef = await addDoc(postsCollection, {
            ...post,
            // Ensure comments is an array
            comments: post.comments || [],
        })
        console.log("Post created with ID:", docRef.id)
        return {
            id: docRef.id,
            ...post,
        } as Post
    } catch (error: any) {
        console.error("Error creating post:", error)
        return rejectWithValue(error.message || "Failed to create post")
    }
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        selectPost: (state, action: PayloadAction<string>) => {
            state.selectedPostId = action.payload
        },
        clearSelectedPost: (state) => {
            state.selectedPostId = null
        },
        addComment: (state, action: PayloadAction<{ postId: string; comment: Comment }>) => {
            const { postId, comment } = action.payload
            const post = state.posts.find((p) => p.id === postId)
            if (post) {
                post.comments.push(comment)
            }
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(createPost.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false
                state.posts.push(action.payload)
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { selectPost, clearSelectedPost, addComment, clearError } = postsSlice.actions
export default postsSlice.reducer

