import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    lastname: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'boolean' })
    is_active: string;

    @Column({ type: 'varchar' })
    email: string;


}
