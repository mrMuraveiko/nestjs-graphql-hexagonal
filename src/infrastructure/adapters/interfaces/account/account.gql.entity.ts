import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const AccountEntity = createParamDecorator(
  (data: null, context: ExecutionContext) => {
    return GqlExecutionContext.create(context).getContext().req;
  },
);
