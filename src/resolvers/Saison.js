export default {
  serie (parent, args, context) {
    return context.prisma.saison({
      id: parent.id
    }).serie()
  },
  episodes (parent, args, context) {
    return context.prisma.saison({
      id: parent.id
    }).episodes()
  }
}
