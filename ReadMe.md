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