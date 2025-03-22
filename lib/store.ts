import { configureStore } from "@reduxjs/toolkit"
// import postsReducer from "./features/posts/postsSlice"
import postsReducer from "./feauters/posts/postsSlice"

// Create store
const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// Export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Export store
export { store }

