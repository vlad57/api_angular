import { getUserId, storeUpload } from '../../utils'

export default {
  async createFilm (parent, args, ctx) {
    const userId = getUserId(ctx);
    if (!userId){
      throw new Error("Not Authenticated");
    }
    return ctx.prisma.createFilm({
      name: args.name,
      genre: args.genre,
      description: args.description,
      duration: args.duration
    })
  },
  async updateFilm (parent, args, ctx){
    const userId = getUserId(ctx);
    if (!userId){
      throw new Error("Not Authenticated");
    }
    return ctx.prisma.updateFilm ({
      where: {id: args.id},
      data:{
        name: args.name,
        genre: args.genre,
        description: args.description,
        duration: args.duration
      }
    });
  },
  async deleteFilm (parent, args, ctx) {
    const userId = getUserId(ctx);
    if (!userId){
      throw new Error("Not Authenticated");
    }
    return ctx.prisma.deleteFilm ({
      id: args.idFilm
    });
  },


  async createFilmUser (parent, args, ctx) {
    //const userId = user.id;
    const userId = getUserId(ctx);
    return ctx.prisma.createFilmUser({
      finish: false,
      progress: "0",
      film:{
        connect:{
          id: args.idFilm
        }},
      user: {
        connect: {id: userId}
      }
    });
  },
  async updateFilmUser (parent, args, ctx) {
    const userId = getUserId(ctx);
    if (!userId){
      throw new Error("Not Authenticated");
    }
    return ctx.prisma.updateFilmUser({
      where: {id: args.idFilm},
      data: {
        finish: args.finish,
        progress: args.progress,
      }
    });
  },
  async deleteFilmUser (parent, args, ctx) {
    const userId = getUserId(ctx);
    if (!userId) {
      throw new Error("Not Authenticated");
    }
    return ctx.prisma.deleteFilmUser({
      id: args.idFilm
    });
  },
}
