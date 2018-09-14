# Intro

- This is the spec for Doc Gen.
- We should be able to create documents.
- these documents will have sections.
- A Section will have a type e.g. => type: "h1" and also have a content e.g. "Document Title"

The Project will be a stand alone project and have it's own instance.
This will allow us to accept data from both our v4 and v5 clients.
There needs to be a way to accept data from v4.
When setting up a Document/account?
perhaps an account has like org details etc.
A document can get its data from agreements?
Something to shape how we get this data

###### tables discussion

- Should we be using tables for markdown? It could be a good win if we can get it right.
- Thoughts. The tables

Colons can be used to align columns.

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

# API

## QUERIES

### App Queries

###### get Documents

```
query {
  documentFeed {
    id
    name
    createdBy {
      id
      email
      name
    }
    sections {
      id
      name
    }
  }
}
```

###### get Single Document

```
query getSingleDocumet($id: ID!){
  singleDocument(id:$id) {
    name
    id
    createdAt
    createdBy {
      id
      name
    }
    createdFor {
      id
      name
    }
  }
}
```

###### get Users

```
query {
  allUsers {
    id
    name
  }
}
```

### DB Queries

####### get all users
This gets all of the users with their attached organisations and documents
NOTE: you wouldnt do this query in the app

```
query {
  users {
    id
    email
    name
    organisations {
      id
      name
    }
    documents {
      id
      name
    }
  }
}
```

###### get all Tags

```
query {
  tags {
    id
    name
    documents {
      id
      name
    }
  }
}
```

## MUTATIONS

### App Mutations

###### postDocument

- The app will send the token with the logged in user to be associated with the document creation.
- An organisation id is supplied so that a user could potentially create documents for different organisations

```
mutation PostMutation($name:String!){
  postDocument(name: $name, orgId: "cjm14c2tc8xgx0b05cc5xrp51") {
    name
    createdAt
    createdFor {
      name
    }
    createdBy {
      email
      name
      id
    }
  }
}
```

###### signup/create user

```
mutation {
  signup(email: "testuser@test.com" name:"Test User" password:"test123") {
    user {
      id
      name
    }
  }
}
```

###### Login

```
mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
```

You will need to include variables

```
{
"email": "testuser@test.com",
"password": "test123"
}
```

### DB Mutations

###### create Organisation

Note: currently on a db/server function. i.e the client app cannot create an organisation

```
mutation {
  createOrganisation(data:{
    name: "Insert Organisation Name"
  }) {
    name
    id
  }
}
```

###### DB: create User

```
mutation {
  createUser(data:{
    name:"Heath"
    email:"heath.dunlop.hd@gmail.com"
    password:"password123"
    organisations:{
      connect:{
        id: "cjm1ckgh59fjt0b05y658miof"
      }
    }
  }) {
    id
    email
    name
  }
}
```

###### DB: create Tag

```
mutation {
  createTag (data:{
    name: "Lease"
  }){
  	id
    name
  }
}
```

###### create Document

```
mutation {
  createDocument(data: {
    name: "Here is the First Document For Nomos"
    createdBy:{
      connect: {
        id:"cjm1cwasd9gdn0b05ur3ev17g"
      }
    }
    tags:{
      connect:{
        id:"cjm1dcfkb9hef0b05ub7ildcd"
      }
    }
    createdFor:{
      connect:{
        id:"cjm1ckgh59fjt0b05y658miof"
      }
    }
  }) {
    name
    id
    tags {
      id
      name
    }
    sections {
      id
      type
      rawContent
    }
  }
}
```

###### create Document wth short codes

```
mutation {
  createDocument(data: {
    name: "Here is the First Document For Nomos"
    createdBy:{
      connect: {
        id:"cjm1qpsuaaish0b05ortyisv4"
      }
    }
    shortCodes:"{\"int\": 1, \"string\": \"value\"}"
    createdFor:{
      connect:{
        id:"cjm1qmjnyailj0b05ns7uh04b"
      }
    }
  }) {
    name
    id
    shortCodes
    tags {
      id
      name
    }
    sections {
      id
      type
      rawContent

    }
  }
}
```

###### DB: create Section

```
mutation {
  createSection(data: {
    createdBy:{
      connect: {
        id: "cjm1cwasd9gdn0b05ur3ev17g"
      }
    }
    belongsTo:{
      connect:{
        id: "cjm1dhf879hod0b05djdyqtzq"
      }
    }
    type:"h1"
    rawContent:"{\"int\": 1, \"string\": \"value\"}"
  }) {
    id
    type
    rawContent
    belongsTo {
      id
      name
    }
  }
}
```

## SUBSCRIPTIONS

### App Subscriptions

### DB Subscriptions

# Source Material

[The Fullstack Tutorial for GraphQL](https://www.howtographql.com/)

[Build a GraphQL server with any database](https://www.prisma.io/)

[Prisma File Handling](https://www.prisma.io/docs/reference/upgrade-guides/graphcool-to-prisma/file-handling-hahcee3eef/)

[Prisma files example](https://github.com/prisma/prisma/tree/master/examples/archive/file-handling-s3)

[Just use Yogo files?](https://github.com/prisma/graphql-yoga)

# DOCS

- [Prisma Data modelling Docs](<https://www.prisma.io/docs/reference/service-configuration/data-modelling-(sdl)-eiroozae8u#scalar-types>)

- [Prisma Types](https://www.prisma.io/docs/data-model-and-migrations/data-model-knul/#object-types)

- https://www.prisma.io/docs/prisma-graphql-api/using-the-prisma-api-nms2/
