function documentFeed(root, args, context, info) {
  return context.db.query.documents({}, info)
}

function info(root, args, context, info) {
  return "😎 => 🔯 => 🔥 => 💯 => ()"
}

module.exports = {
  documentFeed,
  info,
}
