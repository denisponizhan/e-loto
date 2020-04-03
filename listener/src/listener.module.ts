import Web3 from 'web3';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ListenerService } from './listener.service';
import { CONTRACT_PROVIDER } from './common/constants';
import abi from './common/abis/eloto.abi';
import configuration, { msListenerOptions } from './config';

const contractFactory = {
  provide: CONTRACT_PROVIDER,
  useFactory: (configService: ConfigService) => {
    const web3 = new Web3(configService.get<string>('ethereum.provider'));
    return new web3.eth.Contract(
      // @ts-ignore
      abi,
      configService.get<string>('ethereum.contract')
    );
  },
  inject: [ConfigService]
};

@Module({
  imports: [
    ClientsModule.register(msListenerOptions),
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  providers: [ListenerService, contractFactory]
})
export class ListenerModule {}
