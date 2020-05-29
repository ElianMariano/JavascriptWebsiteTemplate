# JavascriptWebsiteTemplate
A customized website template built with ExpressJs in the backend and ReactJs in the frontend. The backend of the application has the following dependecies:

- ExpressJS
- Cross-Env
- Jest
- Nodemon
- Supertest
- Knex JS

## API Methods
The following API methods are used to communicate with the backend:

### Posts API
| **Route** | **Method** |  **Params**  | **Description** |
|    :-:    |     :-:    |      :-:     |       :-:       |
| post-create|    POST   |**json**: name,</br>title, content(**json**),</br>category</br>**header**: authorization| Creates a new post </br> in the database|
| post-profile|   GET    |**query**: page | Shows the page of posts|
|   post  |   GET    |**query**: title| Shows the post according with title|
| post-search |   GET    |**query**: search,</br>category| Search a post </br> according with the title</br>or category|
| post-edit |    POST    |**json**: name,</br> title, content,</br>category</br>**header**: authorization</br>**query**: id| Search a post </br> according with the title|
| post-delete |  DELETE  |**json**: name</br>**query**: id</br>**header**: authorization| Delete the post |

### Categories API
| **Route** | **Method** |  **Params**  | **Description** |
|    :-:    |     :-:    |      :-:     |       :-:       |
| categories-profile |   GET  |  **None**  | Gets all the categories |
| categories-create  |  POST  |  **json**: name,</br> category</br>**header**: authorization| Creates a new category|
| categories-delete  |  DELETE  |  **json**: name,</br> category, new_category</br>**header**: authorization| Deletes a category|
| categories-edit  |  POST  |  **json**: name,</br> category, new_category</br>**header**: authorization| Edits a category|

### User API
| **Route** | **Method** |  **Params**  | **Description** |
|    :-:    |     :-:    |      :-:     |       :-:       |
|  sign-up  |    POST    | **json**: name,</br> email</br>**header**: password| Sign up a new </br> user|
|   login   |    POST    |**json**: name</br>**header**: password| Initializes a </br> new session|
|   logout  |    POST    |**json**: name</br>**header**: authorization | Terminates the </br> session|
