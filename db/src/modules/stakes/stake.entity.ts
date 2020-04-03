import { Entity, Column, ManyToOne } from 'typeorm';
import { Game } from '../games/game.entity';
import { CommonColumns } from '../common/common.columns';

@Entity()
export class Stake extends CommonColumns {
  @Column()
  userAddress: string;

  @Column()
  bet: number;

  @Column({ default: false })
  isWinning: boolean;

  @Column({ default: 0 })
  rewardAmount: string;

  @ManyToOne((type) => Game, (game) => game.stakes, {
    cascade: true,
  })
  game: Game;
}
