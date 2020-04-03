import { EntityRepository, Repository } from 'typeorm';
import { Stake } from './stake.entity';

@EntityRepository(Stake)
export class StakesRepository extends Repository<Stake> {
  findByUserAddressAndGameId(userAddress: string, id: string): Promise<Stake> {
    return this.findOne({
      where: { userAddress: userAddress, game: { id: id } },
    });
  }
}
