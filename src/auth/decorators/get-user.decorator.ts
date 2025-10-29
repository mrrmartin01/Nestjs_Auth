import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    if (data) {
      if (!request.user) return null;
      //eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return request.user[data];
    }
    return request.user;
  },
);
