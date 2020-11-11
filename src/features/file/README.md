# File Module

## Behavior Defination

### File Upload

-   File uploaded will be shown in Quick Pick under the add portion. Therefore, user can quick remove or get URL when editing a post.

### File Removal

-   A removed file will disappear in both filelist and Quick Pick.

## API Defination

-   fetchFileMetas: Fetch all file metadata from the database
-   uploadOneFile: Upload a file via a FormData Object
-   removeOneFile: Remove a file from the server, fileId will be returned

## Initial State

-   files: All file metadatas
-   currentFile: Last upload file
-   fileInSession: File uploaded during one page
-   status: A flag indicating where the statemachine goes
