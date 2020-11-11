# Post Module

## Behavior Defination

### Post Editing

-   When as a new post, the page will not fetch data from the backend.
-   When as a existed post, the page will fetch post data from the backend.
-   Markdown can be used in main content
-   When changing the context, the preview will be updated.
-   File upload bar will be on the left side

### Post Removal

-   After user arrives removePostPage page, a DELETE will be sent to backend.
-   After removal, user will be redirected to "/home"

## API Defination

-   fetchPosts: Fetch all posts from the database
-   fetchOnePost: Fetch one specific post from the database
-   updateOnePost: Update one specific post from the database
-   createOnePost: Create one post in the database
-   removeOnePost: Remove one specific post from the database

## Initial State

-   posts: All posts fetched from the database
-   currentpost: Current post in use
-   status: A flag indicating where the statemachine goes
