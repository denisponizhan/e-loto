import { EntityRepository, Repository } from 'typeorm';
import { Game } from './game.entity';

@EntityRepository(Game)
export class GamesRepository extends Repository<Game> {
  findByEthereumId(id: string): Promise<Game> {
    return this.findOne({
      where: { ethereumId: id },
    });
  }
}
