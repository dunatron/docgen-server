const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET, getUserId } = require("../utils")

async function signup(parent, args, context, info) {
  if (args.email.length < 3) {
    throw new Error("Email should have more than 3 characters")
  }
  // 1
  const password = await bcrypt.hash(args.password, 10)
  // 2
  const user = await context.db.mutation.createUser(
    {
      data: { ...args, password },
    },
    `{ id }`
  )

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 4
  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.db.query.user(
    { where: { email: args.email } },
    ` { id password } `
  )
  if (!user) {
    throw new Error("No such user found")
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error("Invalid password")
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 3
  return {
    token,
    user,
  }
}

function postDocument(parent, args, context, info) {
  const userId = getUserId(context)
  return context.db.mutation.createDocument(
    {
      data: {
        name: args.name,
        createdBy: { connect: { id: userId } },
        createdFor: { connect: { id: args.orgId } },
        // createdFor: { connect: { where: { id: args.createdFor } } },
        // createdFor: { connect: { where: { id: args.orgID } } },
        //createdFor: { connect: { id: args.createdFor } },
        //return context.db.query.document({ where: { id: args.id } }, info)
      },
    },
    info
  )
}

function postSection(parent, args, context, info) {
  const userId = getUserId(context)
  return context.db.mutation.createSection(
    {
      data: {
        type: args.type,
        createdBy: { connect: { id: userId } },
        belongsTo: { connect: { id: args.belongsTo } },
      },
    },
    info
  )
}

function postDataConfig(parent, args, context, info) {
  const userId = getUserId(context)
  const camelName = args.name
    .replace(/\s(.)/g, function($1) {
      return $1.toUpperCase()
    })
    .replace(/\s/g, "")
    .replace(/^(.)/, function($1) {
      return $1.toLowerCase()
    })
  return context.db.mutation.createDataConfig(
    {
      data: {
        name: camelName,
        organisation: { connect: { id: args.orgId } },
      },
    },
    info
  )
}

module.exports = {
  signup,
  login,
  postDocument,
  postSection,
  postDataConfig,
}
