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

## Technologies

- [GraphQL](https://graphql.org/) Will be used as it will allow us to scale our application with speed and maximum flexibility
- [Prisma Server](https://www.prisma.io/) Will be used for our GraphQL backend. Prisma makes working with databases easy through the simplicity of GraphQL. We are able to easily construct our database model through a schema and on to of that is a layer where we can add our business logic when certain queries are called
- [Apollo Client](https://www.apollographql.com/docs/react/) It is simply the best way to use GraphL for our front end. This works best with Libraries such as ReactJS
- [ReactJS](https://reactjs.org/) ReactJS is simply the best Library for building user interfaces.

## Deployment

The current technologies can be deployed anywhere.

###### Server

The server is a Prisma(GraphQL) Server and can be deployed anywhere.
ToDo: decide where it would be hosted

###### Client

The Client is composed of Apollo, GraphQl, and React. This client can be deployed anywhere and will retrieve it's data via graphQL queries that it will retrieve from our servers endpoint

# How To Build It

### Organisation

- An Organisation at it's core will contain users and documents.
- There will be an organisation Config which will set up the details/config that the application needs.
-

### Organisation Config

- When an organisation is setup it will a config associated with it
- This config can be used to retrieve data from endpoints like v4 and v5 etc.
- The config could be an interface to retrieve this information, depending on how different v4 & v5 are at getting their information. This is fine, It just means we would have an interface for the different versions and they know how to pipe in the information we want

### User

- There will be users.
- Users will be associated with an organisation.
- Users can be associated with many organisations.

### Documents

- Documents will be associated with 1 Organisation only.
- They will be created by A user for an Organisation.
- Will be able to have many authors associated with it.
- Will be composed of sections.
- Can have many document configs associated with it.
- many configs means we can supply different ways a document gets the data it needs
- has a Data Config field.

### Document Config

- A document Config can belong to many different documents.
- It will essentially be a config on How to retrieve data that can be used in the documents, Similar but also quite different to the organisation config.
- These can then also be viewed as a sort of template that can be applied to a document that would then instantly expose data for the document
- Example. A config that gets the data for a certain Agreement in v4. This data is then used across multiple documents and could be titled "My Agreements Data".
- Example: A more generic Document Config could be a list of all the Agreements. To Understand this the DataConfig needs to be explained.

### Section

Note: could actually rename to RichComponent

- A section will belong to a document.
- A section Will essentially be a rich component.
- A section will have three main fields. type, content, and position.
- type: will tell us what type of rich component it is.
- content: will hold the content for the rich component
- position: an int telling the document at what position to render the component
- There will be an interface containing all the different section types. They will be able to be dragged onto the document at anytime creating a new section/component

### Templates

- These will essentially be Sections with fleshed out content/dataConfig variables.
- These templates/sections will be able to be dropped into various documents.
- A template can be used in many different documents.
- The way I see this working is that when you drop a template into a document it simply creates a new section for that document. A section can then be saved as a template to be used in other documents.

### dataConfig

This will a field on the document. We are able to store Json blobs and this is exactly what that will be.

- it will be able to store an array of deep nested objects(objects and arrays) and these will eventually have keys with values. These are obviously reached through going through the required path. This path is what our document will be referencing.
- So our dataConfig field will store their key value pairs for this data in it's config, and will update it's data when needed.
- If the document config somehow loses these ability to retrieve it's data we still have reference to what it's value use to be. We could event add pretty colors/alerts saying that this data is no longer reachable/updated. (Busines logic, business logic)

- NOTE: [INSERT CONFIG EXAMPLE].
- Below is a data that could be returned from a config. This data would then fit nicely into a sidebar to be dragged into a document section at anytime

```
const SHORT_CODES = [
  {
    "organisation-title": "Nomos One",
  },
  {
    agreements: [
      {
        id: "1",
        name: "The first Agreement short code name",
        amount: "$89",
        date: "24/03/1991",
        events: [
          {
            id: "dfss",
            name: "First event for the first agreements",
            type: "Depreciation",
            amount: 68.7,
            date: "31/08/1991",
            subEvents: [
              {
                type: "Depreciation",
                amount: 68.7,
                date: "31/08/1991",
              },
              {
                type: "Depreciation",
                amount: 90.7,
                date: "31/09/1991",
              },
              {
                type: "Depreciation",
                amount: 100.7,
                date: "31/10/1991",
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "Trons First Agreement",
        amount: "$89",
        date: "24/03/1991",
        events: [
          {
            id: "dfss",
            name: "First event for the first agreements",
            type: "Depreciation",
            amount: 68.7,
            date: "31/08/1991",
          },
        ],
      },
      {
        id: "3",
        name: "The first Agreement short code name",
        amount: "$89",
        date: "24/03/1991",
        events: [
          {
            id: "dfss",
            name: "First event for the first agreements",
            type: "Depreciation",
            amount: 68.7,
            date: "31/08/1991",
          },
        ],
      },
    ],
  },
```

### Printing

- We are going to build a canvas that will print pixel perfect documents.
- It will Have all the standard sizes, A4 etc etc

### Exporting

- People will print straight from our application and we should make it so spectacular that they won't want to use anything else.
- However there is a lot of use cases for exporting. Email etc.
- Our documents are stored with raw data essentially. This means we can export it however we want and easily.
- we can easily create various export functions, like export as email, export as markdown etc, etc

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
