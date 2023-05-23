import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Endpoint not found',
      error: 'Not Found',
    });
  }
}
