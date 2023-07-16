import { RoleUserEnum } from 'src/common/entities/role-user.enum';
import { User } from 'src/common/entities/user.entity';

export class CreateUserDto extends User {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: RoleUserEnum;
}
