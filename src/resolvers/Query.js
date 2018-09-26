const { APP_SECRET, getUserId, getOrgId } = require("../utils")

function documentFeed(root, args, context, info) {
  // return context.db.query.documents({}, info)
  const orgId = getOrgId(context)
  return context.db.query.documents(
    { where: { createdFor: { id: orgId } } },
    info
  )
}

function organisation(root, args, context, info) {
  const orgId = getOrgId(context)
  return context.db.query.organisation({ where: { id: orgId } }, info)
}

function allUsers(root, args, context, info) {
  return context.db.query.users({}, info)
}

function allOrganisations(root, args, context, info) {
  return context.db.query.organisations({}, info)
}

function singleDocument(root, args, context, info) {
  // return context.db.query.documents({ where: { id: args.id } }, info)
  // return context.db.query.documents({ where: { id: "cjlzzscm3667o0b05w4gyszul" } }, "{ id }")
  // return context.db.query.documents({ where: { id: args.id } }, info)
  // return context.db.query.document({ where: { id: args.id } }, info)
  return context.db.query.document({ where: { id: args.id } }, info)
}

function getUser(root, args, context, info) {
  const userId = getUserId(context)
  return context.db.query.user({ where: { id: userId } }, info)
}

function orgDataConfigs(root, args, context, info) {
  return context.db.query.dataConfigs(
    { where: { organisation: { id: args.orgId } } },
    info
  )
}

function info(root, args, context, info) {
  return "😎 => 🔯 => 🔥 => 💯 => ()"
}

module.exports = {
  organisation,
  allOrganisations,
  getUser,
  orgDataConfigs,
  singleDocument,
  documentFeed,
  allUsers,
  info,
}
