# Graphql API
### Note: Token will be passed in Authorization header
## User
**Create New User**
type: mutation
`mutation{
  CreateUser(email: "m9@k.com", password: "password", username: "mk", firstName: "Hello"
  lastName: "world", reputation:0)
}`
return: jwt token
Auth: Not required!

**Update User**
type: mutation
`mutation {
  UpdateUser(id : "30dec3d8-5322-438a-adbb-86f331bc2171", firstName:"Hel222o2", lastName: "World2") {
    lastName
    firstName
  }
}`
Auth: required!

**Login**
type: mutation
`mutation {
  Login(email: "m9@k.com", password: "password")
}`
return: jwt token
Auth: Not required!

**Update Password**
type: mutation
`mutation {
  UpdatePassword(email : "m9@k.com", password: "password", currentPassword:"password")
}`
return: String message
Auth: required!

**Current User**
type: Query
`{
  currentUser{
    email,
    id,
    username
  }
}`
Auth: required!

**User by id**
type: Query
`{
  user(id:"b7cbac8d-923e-48d6-b1cb-27927fae8586") {
    email
  }
}`
Auth: required!
