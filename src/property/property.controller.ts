import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decoration';
import { Roles } from 'src/auth/roles/role.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { User } from 'src/auth/schema/user.schema';
import { CreatePropertyDto } from './dto/create-property.dto';
import { GetPropertyFilterDto } from './dto/get-property.dto';
import { PropertyService } from './property.service';
import { Property } from './schema/property.schema';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
  // GET ALL PROPERTIES
  @Get()
  async getProperty(
    @Query() getPropertyFilterDto: GetPropertyFilterDto,
  ): Promise<Property[]> {
    return await this.propertyService.getProperties(getPropertyFilterDto);
  }

  // GET ALL PROPERTIES TO SELL
  @Get('/sell')
  async getPropertyToSell(
    @Query() getPropertyFilterDto: GetPropertyFilterDto,
  ): Promise<Property[]> {
    return await this.propertyService.getPropertiestoSell(getPropertyFilterDto);
  }

  // GET ALL PROPERTIES TO RENT
  @Get('/rent')
  async getPropertyToRent(
    @Query() getPropertyFilterDto: GetPropertyFilterDto,
  ): Promise<Property[]> {
    return await this.propertyService.getPropertiestoRent(getPropertyFilterDto);
  }

  //CREATE PROPERTIES
  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin, Role.Agency, Role.Owner)
  async createProperty(
    @Body() createPropertyDto: CreatePropertyDto,
    @GetUser() user: User,
  ): Promise<Property> {
    return await this.propertyService.createProperty(createPropertyDto, user);
  }
}
