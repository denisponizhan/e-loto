import { Entity, Column, OneToMany } from 'typeorm';
import { Stake } from '../stakes/stake.entity';
import { CommonColumns } from '../../common/entities/common.entity';

@Entity()
export class Game extends CommonColumns {
  @Column({
    nullable: true,
  })
  winningNumber: number;

  @Column()
  ethereumId: string;

  @OneToMany((type) => Stake, (stake) => stake.game)
  stakes: Stake[];
}
