import { equals } from "@serenity-js/assertions";
const statusCode = require('http-status-codes').StatusCodes

export const hasCreatedStatus = equals(statusCode.CREATED);

export const hasSuccessfullStatus = equals(statusCode.OK);

export const hasNoContentStatus = equals(statusCode.NO_CONTENT);

export const wasNotAuthorizedStatus = equals(statusCode.UNAUTHORIZED)

export const wasABadRequestStatus = equals(statusCode.BAD_REQUEST);

export const wasForbiddenStatus = equals(statusCode.FORBIDDEN)

export const wasNotfoundStatus = equals(statusCode.NOT_FOUND);

export const wasAServerErrorStatus = equals(statusCode.INTERNAL_SERVER_ERROR);
