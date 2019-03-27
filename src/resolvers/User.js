export default {
  film (parent, args, context) {
    return context.prisma.user({
      id: parent.id
    }).film()
  },

  serie (parent, args, context) {
    return context.prisma.user({
      id: parent.id
    }).serie()
  }
}
