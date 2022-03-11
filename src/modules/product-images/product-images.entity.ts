
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Images')
export class Images{
    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    id: number;
    @ApiProperty()
    @Column({ type: 'varchar' })
    url: string;
    @ApiProperty()
    @Column({ type: 'int' })
     productId: number;
  


}