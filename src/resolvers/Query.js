function documentFeed(root, args, context, info) {
  return context.db.query.documents({}, info)
}

function allUsers(root, args, context, info) {
  return context.db.query.users({}, info)
}

function singleDocument(root, args, context, info) {
  // return context.db.query.documents({ where: { id: args.id } }, info)
  return context.db.query.documents(
    { where: { id: "cjlzzscm3667o0b05w4gyszul" } },
    "{ id }"
  )
}

function info(root, args, context, info) {
  return "😎 => 🔯 => 🔥 => 💯 => ()"
}

module.exports = {
  singleDocument,
  documentFeed,
  allUsers,
  info,
}
