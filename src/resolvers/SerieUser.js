export default {
  serie (parent, args, context) {
    return context.prisma.serieUser({
      id: parent.id
    }).serie()
  },
  user (parent, args, context) {
    return context.prisma.SerieUser({
      id: parent.id
    }).user()
  }
}
