import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaErrorEnum } from '../enum/prismaError.enum';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {

      case PrismaErrorEnum.UniqueConstraintFailed: {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          errorCode: 'UNI-01',
          message: `conflict unicity key : ${exception.meta.target} for table: ${exception.meta.modelName}`
        });
        break;
      }

      case PrismaErrorEnum.ForeignKeyConstraintFailed: {
        const status = HttpStatus.BAD_REQUEST;
        response.status(status).json({
          statusCode: status,
          errorCode: 'BPL-01',
          message: `bad payload : ${exception.meta.modelName}.${exception.meta.field_name}`
        });
        break;
      }

      case PrismaErrorEnum.RecordDoesNotExist: {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          errorCode: 'NFD-01',
          message: `Record not found for table:  ${exception.meta.modelName}`
        });
        break;
      }

      default:
        // default 500 error code
        console.error(exception.code);
        console.error(exception.meta);

        super.catch(exception, host);

        break;

    }
  }
}