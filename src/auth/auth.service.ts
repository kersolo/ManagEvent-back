import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async createToken(
    payload: { id: string; email: string },
    secret: string,
    expiration: string | number,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn: expiration,
    });
  }
}
