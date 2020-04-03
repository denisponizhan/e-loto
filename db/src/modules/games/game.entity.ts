import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Stake } from '../stakes/stake.entity';
import { CommonColumns } from '../common/common.columns';

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
