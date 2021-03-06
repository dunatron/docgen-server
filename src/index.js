const { GraphQLServer } = require("graphql-yoga")
const { Prisma } = require("prisma-binding")
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const AuthPayload = require("./resolvers/AuthPayload")

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
}

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "https://us1.prisma.sh/heath-dunlop-37e897/doc_gen_db/dev",
      secret: "win-win-win",
      debug: true,
    }),
  }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
