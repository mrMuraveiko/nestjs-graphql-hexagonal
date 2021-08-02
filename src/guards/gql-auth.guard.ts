import { Injectable, ExecutionContext } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class GqlAuthGuard extends AuthGuard("jwt") {
  // getRequest(context: ExecutionContext) {
  //   const ctx = GqlExecutionContext.create(context);
  //   console.log("ctx", ctx.getContext());
  //   return ctx.getContext().req;
  // }

  canActivate(context: ExecutionContext) {
    const req = GqlExecutionContext.create(context).getContext().req;
    console.log("context", req.account);
    return super.canActivate(new ExecutionContextHost([req]));
  }

  handleRequest(err: any, user: any) {
    console.log("err =", err, user);
    if (err || !user) {
      throw err || new Error("GqlAuthGuard");
    }
    return user;
  }
}
