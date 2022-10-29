import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decoration';
import { Roles } from 'src/auth/roles/role.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { User } from 'src/auth/schema/user.schema';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { Agent } from './schema/agent.schema';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  // GET AGENTS
  @Get()
  async getAgents(): Promise<Agent[]> {
    return await this.agentService.getAllAgents();
  }

  // CREATE AGENT ADMIN && AGENCY
  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin, Role.Agency)
  async createAgent(
    @Body() createAgentDto: CreateAgentDto,
    @GetUser() user: User,
  ): Promise<Agent> {
    return await this.agentService.createAgent(createAgentDto, user);
  }
}
