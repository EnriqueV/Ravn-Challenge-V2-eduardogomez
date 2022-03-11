
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product  {
    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    id: number;
    @ApiProperty()
    @Column({ type: 'varchar' })
    name: string;
    @ApiProperty()
    @Column({ type: 'varchar' })
    description: string;
    @ApiProperty()
    @Column({ type: 'float' })
    price: number;
    @Column({ type: 'float' })
    discount: number;
    @ApiProperty()
    @Column({ type: 'boolean' })
    status: boolean;


}