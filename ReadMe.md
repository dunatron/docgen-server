## QUERIES

### App Queries

### DB Queries

## MUTATIONS

### App Mutations

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
