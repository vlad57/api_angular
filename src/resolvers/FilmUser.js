export default {
  film (parent, args, context) {
    return context.prisma.filmUser({
      id: parent.id
    }).film()
  },
  user (parent, args, context) {
    return context.prisma.filmUser({
      id: parent.id
    }).user()
  }
}
