import * as bcrypt from 'bcrypt';

export class CryptoService {
  constructor() {}
  static async createPasswordHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
  }
  static async validatePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
