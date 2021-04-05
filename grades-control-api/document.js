export const swaggerDocument = {
  swagger: '2.0',
  info: {
    title: 'Grades Control API',
    version: '1.0.0',
    description: 'Control of student grades',
  },
  host: 'localhost:3000',
  tags: [
    {
      name: 'grades',
      description: 'Control of Grades',
    },
  ],
  paths: {
    '/grade/': {
      post: {
        tags: ['grades'],
        summary: 'Create a new grade',
        description: 'Create a new grade with the received parameters',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Student grade object',
            required: true,
            schema: {
              type: 'object',
              properties: {
                student: {
                  type: 'string',
                  description: "student's name",
                  example: 'Daniel Oliveira',
                },
                subject: {
                  type: 'string',
                  enum: [
                    '01 - JavaScript',
                    '02 - Node',
                    '03 - React',
                    '04 - MongoDB',
                  ],
                  example: '03 - React',
                },
                type: {
                  type: 'string',
                  enum: ['Trabalho Prático', 'Desafio', 'Fórum'],
                  example: 'Desafio',
                },
                value: {
                  type: 'number',
                  format: 'double',
                  minimum: 0,
                  maximum: 50,
                  example: 23.50,
                },
              },
            },
          },
        ],
        responses: {
          '200': {
            description: 'Grade created',
            schema: {
              $ref: '#/definitions/grade',
            },
          },
          '400': {
            description: 'Invalid value provided. (property: value)',
          },
        },
      },
    },
    '/grade/{id}': {
      get: {
        tags: ['grades'],
        summary: 'Get a grade',
        description: 'Search by id',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Return grade corresponding to id',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/grade',
            },
          },
          '400': {
            description: 'Error occurred',
          },
          '404': {
            description: 'Grade not found',
          },
        },
      },
      put: {
        tags: ['grades'],
        summary: 'Update a grade',
        description: 'Updates student grade with json data',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'id that need to be updated',
            required: true,
            type: 'integer',
            format: 'int64',
          },
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                student: {
                  type: 'string',
                  description: "student",
                },
                subject: {
                  type: 'string',
                  enum: [
                    '01 - JavaScript',
                    '02 - Node',
                    '03 - React',
                    '04 - MongoDB',
                  ],
                },
                type: {
                  type: 'string',
                  enum: ['Trabalho Prático', 'Desafio', 'Fórum'],
                },
                value: {
                  type: 'number',
                  format: 'double',
                  minimum: 0,
                  maximum: 50,
                  example: 20.25,
                },
              },
            },
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              $ref: '#/definitions/grade',
            },
          },
          '400': {
            description: 'error occurred',
          },
          '404': {
            description: 'grade not found',
          },
        },
      },
      delete: {
        tags: ['grades'],
        summary: 'Delete a grade',
        description: 'Delete the grade',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Grade id to delete',
            required: true,
            type: 'integer',
            format: 'int64',
          },
        ],
        responses: {
          '400': {
            description: 'error occurred',
          },
          '404': {
            description: 'grade not found',
          },
        },
      },
    },
    '/grade/totalGrade/{student}/{subject}': {
      get: {
        tags: ['grades'],
        summary: 'Get total student grade',
        description: 'Get total student grade by subject',
        produces: ['application/json'],
        parameters: [
          {
            name: 'student',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'subject',
            in: 'path',
            required: true,
            type: 'string',
            enum: [
              '01 - JavaScript',
              '02 - Node',
              '03 - React',
              '04 - MongoDB',
            ],
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation',
            schema: {
              type: 'object',
              properties: {
                total: {
                  type: 'number',
                  format: 'double',
                },
              },
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },
    '/grade/average/{subject}/{type}': {
      get: {
        tags: ['grades'],
        summary: 'Get average grade',
        description: 'Get average grade by type',
        produces: ['application/json'],
        parameters: [
          {
            name: 'subject',
            in: 'path',
            required: true,
            type: 'string',
            enum: [
              '01 - JavaScript',
              '02 - Node',
              '03 - React',
              '04 - MongoDB',
            ],
          },
          {
            name: 'type',
            in: 'path',
            required: true,
            type: 'string',
            enum: ['Trabalho Prático', 'Desafio', 'Fórum'],
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation',
            schema: {
              type: 'object',
              properties: {
                average: {
                  type: 'number',
                  format: 'double',
                },
              },
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },
    '/grade/best/{subject}/{type}': {
      get: {
        tags: ['grades'],
        summary: 'Get firts three',
        description: 'Get the three highest grades',
        produces: ['application/json'],
        parameters: [
          {
            name: 'subject',
            in: 'path',
            required: true,
            type: 'string',
            enum: [
              '01 - JavaScript',
              '02 - Node',
              '03 - React',
              '04 - MongoDB',
            ],
          },
          {
            name: 'type',
            in: 'path',
            required: true,
            type: 'string',
            enum: ['Trabalho Prático', 'Desafio', 'Fórum'],
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/grade',
              },
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },
  },
  definitions: {
    grade: {
      type: 'object',
      required: ['student', 'subject', 'type', 'value'],
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        student: {
          type: 'string',
          description: "student's name",
        },
        subject: {
          type: 'string',
          enum: ['01 - JavaScript', '02 - Node', '03 - React', '04 - MongoDB'],
        },
        type: {
          type: 'string',
          enum: ['Trabalho Prático', 'Desafio', 'Fórum'],
        },
        value: {
          type: 'number',
          format: 'double',
          minimum: 0,
          maximum: 50,
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
        },
      },
    },
  },
};
