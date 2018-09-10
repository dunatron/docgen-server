# Intro

- This is the spec for Doc Gen.
- We should be able to create documents.
- these documents will have sections.
- A Section will have a type e.g. => type: "h1" and also have a content e.g. "Document Title"

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

## MUTATIONS

### App Mutations

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

### DB Mutations

###### create Document

```
mutation {
  createDocument(data: {
    createdBy:{
      connect: {
        id: "cjlvr4enenesd0b52en666s98"
      }
    }
    name: "Shape it like this. But pass in flat args. Makes sense"
  }) {
    id
    name
  }
}
```

###### create Section

```
mutation {
  createSection(data: {
    createdBy:{
      connect: {
        id: "cjlvr4enenesd0b52en666s98"
      }
    }
    belongsTo:{
      connect:{
        id: "cjlvsupqpnj9b0b52nrsv5jvm"
      }
    }
    name: "Here is a section for a document"
  }) {
    id
    name
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
