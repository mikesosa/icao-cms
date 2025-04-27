import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::practice-set.practice-set', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    const sanitizedQuery = await this.sanitizeQuery(ctx);
    const results = await strapi.service('api::practice-set.practice-set').find(sanitizedQuery);
    const sanitizedResults = await this.sanitizeOutput(results, ctx);
    return this.transformResponse(sanitizedResults);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    const sanitizedQuery = await this.sanitizeQuery(ctx);
    const result = await strapi.service('api::practice-set.practice-set').findOne(id, sanitizedQuery);
    const sanitizedResult = await this.sanitizeOutput(result, ctx);
    return this.transformResponse(sanitizedResult);
  },

  async create(ctx) {
    const { data } = ctx.request.body;
    const sanitizedInputData = await this.sanitizeInput(data, ctx);
    const result = await strapi.service('api::practice-set.practice-set').create(sanitizedInputData);
    const sanitizedResult = await this.sanitizeOutput(result, ctx);
    return this.transformResponse(sanitizedResult);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;
    const sanitizedInputData = await this.sanitizeInput(data, ctx);
    const result = await strapi.service('api::practice-set.practice-set').update(id, sanitizedInputData);
    const sanitizedResult = await this.sanitizeOutput(result, ctx);
    return this.transformResponse(sanitizedResult);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    const result = await strapi.service('api::practice-set.practice-set').delete(id);
    const sanitizedResult = await this.sanitizeOutput(result, ctx);
    return this.transformResponse(sanitizedResult);
  }
})); 