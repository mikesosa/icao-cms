import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::simulation.simulation', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    const sanitizedQuery = await this.sanitizeQuery(ctx);
    const results = await strapi.service('api::simulation.simulation').find(sanitizedQuery);
    const sanitizedResults = await this.sanitizeOutput(results, ctx);
    return this.transformResponse(sanitizedResults);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    const sanitizedQuery = await this.sanitizeQuery(ctx);
    const result = await strapi.service('api::simulation.simulation').findOne(id, sanitizedQuery);
    const sanitizedResult = await this.sanitizeOutput(result, ctx);
    return this.transformResponse(sanitizedResult);
  },

  async create(ctx) {
    const { data } = ctx.request.body;
    const sanitizedInputData = await this.sanitizeInput(data, ctx);
    const result = await strapi.service('api::simulation.simulation').create(sanitizedInputData);
    const sanitizedResult = await this.sanitizeOutput(result, ctx);
    return this.transformResponse(sanitizedResult);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;
    const sanitizedInputData = await this.sanitizeInput(data, ctx);
    const result = await strapi.service('api::simulation.simulation').update(id, sanitizedInputData);
    const sanitizedResult = await this.sanitizeOutput(result, ctx);
    return this.transformResponse(sanitizedResult);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    const result = await strapi.service('api::simulation.simulation').delete(id);
    const sanitizedResult = await this.sanitizeOutput(result, ctx);
    return this.transformResponse(sanitizedResult);
  }
})); 