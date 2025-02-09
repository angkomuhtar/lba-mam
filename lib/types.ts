import { Prisma } from "@prisma/client";

/**
 * Pagination information
 */
export type PaginationData = {
  page?: number;
  limit?: number;
};

/**
 * Proxy functions
 *
 * used to create custom methods for prisma models
 */
export type ProxyFunctions = {
  findMany: (params: unknown, pagination: PaginationData) => Promise<any>;
  count: (params: unknown) => Promise<number>;
};

// Define a union type of all model names available in Prisma
export type ModelNames =
  (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName];

// Define a type for Prisma operations specific to a given model
type PrismaOperations<ModelName extends ModelNames> =
  Prisma.TypeMap["model"][ModelName]["operations"];

// Define a type for Prisma findMany arguments specific to a given model
type PrismaFindManyArgs<ModelName extends ModelNames> =
  PrismaOperations<ModelName>["findMany"]["args"] & { include?: any };

// Define a type for pagination options, including model name, query filters, and pagination parameters
export type PaginationOptions<ModelName extends ModelNames> = {
  modelName: ModelName; // Name of the model to paginate
  where?: PrismaFindManyArgs<ModelName>["where"]; // Filtering conditions for the query
  orderBy?: PrismaFindManyArgs<ModelName>["orderBy"]; // Sorting criteria for the query
  include?: PrismaFindManyArgs<ModelName>["include"]; // Related models to include in the query
  // include?: PrismaFindManyArgs<ModelName>['include']; // Related models to include in the query
  page?: string; // Page number for pagination
  pageSize?: string; // Number of items per page for pagination
};
