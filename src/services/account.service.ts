import { Injectable } from "@nestjs/common";
import { PrismaService } from "@service/prisma.service";
import { Account } from "@prisma/client";

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async account(id: string): Promise<Account | null> {
    return this.prisma.account.findUnique({
      where: {
        id,
      },
    });
  }

  async accounts(params: { skip?: number; take?: number }): Promise<Account[]> {
    const { skip, take } = params;
    return this.prisma.account.findMany({
      skip,
      take,
    });
  }

  async createAccount(data: {
    email: string;
    password: string;
  }): Promise<Account> {
    return this.prisma.account.create({
      data,
    });
  }

  async updateAccount(id: string, data: { email: string }): Promise<Account> {
    return this.prisma.account.update({
      where: { id },
      data,
    });
  }
}
