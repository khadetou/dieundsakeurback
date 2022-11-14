import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decoration';
import { Roles } from 'src/auth/roles/role.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { User } from 'src/auth/schema/user.schema';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { CreateReviewsDto } from './dto/create-review.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './schema/agent.schema';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  // GET AGENTS
  @Get()
  async getAgents(): Promise<Agent[]> {
    return await this.agentService.getAllAgents();
  }

  // GET MY AGENTS
  @Get('my-agents')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin, Role.Agency)
  async getMyAgents(@GetUser() user: User): Promise<Agent[]> {
    return await this.agentService.getMyAgents(user);
  }

  // GET AGENT BY ID
  @Get('/:id')
  async getAgentById(@Param('id') id: string): Promise<Agent> {
    return await this.agentService.getAgentById(id);
  }

  // CREATE REVIEWS
  @Post('/:id/reviews')
  @UseGuards(AuthGuard())
  async createReviews(
    @Body() createReviewsDto: CreateReviewsDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Agent> {
    return await this.agentService.createReviews(createReviewsDto, id, user);
  }

  // UPDATE AGENT
  @Put('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin, Role.Agency)
  async updateAgents(
    @Body() updateAgentsDto: UpdateAgentDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Agent> {
    return await this.agentService.updateAgent(updateAgentsDto, id, user);
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

  // delete Agent
  @Delete('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin, Role.Agency)
  async deleteAgent(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Agent> {
    return await this.agentService.deleteAgent(id, user);
  }
}
