const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Simple Node Server API',
    version: '1.0.0',
    description: 'API documentation for Simple Node Server',
  },
  servers: [{ url: process.env.BASE_URL || `http://localhost:${process.env.PORT || 5001}` }],
  paths: {
    '/api/users': {
      get: {
        summary: 'List users',
        responses: { '200': { description: 'OK' } },
      },
      post: {
        summary: 'Create user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserCreate' },
            },
          },
        },
        responses: { '201': { description: 'Created' } },
      },
    },
    '/api/users/{id}': {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      get: {
        summary: 'Get user',
        responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } },
      },
      put: {
        summary: 'Update user',
        responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } },
      },
      delete: {
        summary: 'Delete user',
        responses: { '204': { description: 'No Content' }, '404': { description: 'Not found' } },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          email: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
        },
      },
      UserCreate: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
        },
      },
    },
  },
};

export default swaggerDocument;
