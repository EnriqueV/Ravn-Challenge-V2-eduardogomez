import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  lastname: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty()
  @Column({ type: 'boolean' })
  is_active: boolean;

  @ApiProperty()
  @Column({ type: 'varchar' })
  email: string;
  @Column({ type: 'varchar' })
  code: string;
}
