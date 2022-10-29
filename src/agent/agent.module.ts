import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { Agent, Agentchema } from './schema/agent.schema';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([
      {
        name: Agent.name,
        schema: Agentchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
