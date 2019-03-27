export default {
  saisons (parent, args, context) {
    return context.prisma.serie({
      id: parent.id
    }).saisons()
  },

  episodes (parent, args, context) {
    return context.prisma.serie({
      id: parent.id
    }).episodes()
  }
}
