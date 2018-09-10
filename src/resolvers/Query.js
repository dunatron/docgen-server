function documentFeed(root, args, context, info) {
  return context.db.query.documents({}, info)
}

function allUsers(root, args, context, info) {
  return context.db.query.users({}, info)
}

function info(root, args, context, info) {
  return "😎 => 🔯 => 🔥 => 💯 => ()"
}

module.exports = {
  documentFeed,
  allUsers,
  info,
}
