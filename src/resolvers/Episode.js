export default {
  serie (parent, args, context) {
    return context.prisma.episode({
      id: parent.id
    }).serie()
  },
  saison (parent, args, context) {
    return context.prisma.episode({
      id: parent.id
    }).saison()
  }
}
