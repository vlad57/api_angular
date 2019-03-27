import { getUserId } from '../../utils'

export default {
  async createSerie (parent, args, ctx) {
    return ctx.prisma.createSerie ({
      name: args.name,
      genre: args.genre,
      description: args.description,
      nbEp: args.nbEp,
      nbSais: args.nbSais
    });
  },
  async updateSerie (parent, args, ctx) {
    return ctx.prisma.updateSerie ({
      where: {id: args.idSerie},
      data: {
        name: args.name,
        genre: args.genre,
        description: args.description,
        nbEp: args.nbEp,
        nbSais: args.nbSais
      }
    });
  },
  async deleteSerie (parent, args, ctx) {
    return ctx.prisma.deleteSerie ({
      id: args.idSerie
    });
  },

  async createSaison (parent, args, ctx){
    return ctx.prisma.createSaison ({
      number: args.number,
      serie: {
        connect: {id: args.idSerie},
      }
    });
  },
  async deleteSaison (parent, args, ctx){
    return ctx.prisma.deleteSaison({
      id: args.idSais
    });
  },

  async createEpisode (parent, args, ctx) {
    return ctx.prisma.createEpisode ({
      name: args.name,
      description: args.description,
      saison: {
        connect: {id: args.idSais}
      },
      serie: {
        connect: {id: args.idSerie}
      }
    });
  },
  async updateEpisode (parent, args, ctx) {
    return ctx.prisma.updateEpisode ({
      where:{id: args.idEp},
      data:{
        name: args.name,
        description: args.description
      }
    });
  },
  async deleteEpisode (parent, args, ctx) {
    return ctx.prisma.deleteEpisode ({
      id: args.idEp
    });
  },

  async createSerieUser (parent, args, ctx) {
    //const userId = user.id;
    const userId = getUserId(ctx);
    if (!userId){
      throw new Error("Not Authenticated");
    }
    return ctx.prisma.createSerieUser({
      finish: false,
      serie:{
        connect:{
          id: args.idSerie
        }},
      user: {
        connect: {id: userId}
      }
    });
  },
  async updateSerieUser (parent, args, ctx) {
    const userId = getUserId(ctx);
    if (!userId){
      throw new Error("Not Authenticated");
    }
    return ctx.prisma.updateSerieUser({
      where: {id: args.idSerie},
      data: {
        finish: args.finish,
      }
    });
  },
  async deleteSerieUser (parent, args, ctx) {
    const userId = getUserId(ctx);
    if (!userId) {
      throw new Error("Not Authenticated");
    }
    return ctx.prisma.deleteSerieUser({
      id: args.idSerie
    });
  },
}
