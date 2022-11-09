import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decoration';
import { Roles } from 'src/auth/roles/role.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { User } from 'src/auth/schema/user.schema';
import { UpdateProductDto } from 'src/product/dto/update-produt.dto';
import { CreatePropertyDto } from './dto/create-property.dto';
import { CreateReviewsDto } from './dto/create-review.dto';
import { GetPropertyFilterDto } from './dto/get-property.dto';
import { UpdatePropertyDto } from './dto/update-product.dto';
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

  // GET MY PROPERTY
  @Get('/my-properties')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin, Role.Agency, Role.Owner)
  async getMyProperties(
    @Query() getPropertyFilterDto: GetPropertyFilterDto,
    @GetUser() user: User,
  ): Promise<Property[]> {
    return await this.propertyService.getMyProperties(
      getPropertyFilterDto,
      user,
    );
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

  // UPDATE PROPERTY
  @Put('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin, Role.Agency, Role.Owner)
  async updateProperty(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    return await this.propertyService.updateProduct(
      updatePropertyDto,
      id,
      user,
    );
  }

  // CREATE REVIEWS
  @Post('/:id/reviews')
  @UseGuards(AuthGuard())
  async createReviews(
    @Body() createReviewsDto: CreateReviewsDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Property> {
    return await this.propertyService.createReviews(createReviewsDto, id, user);
  }
  //GET PROPERTY BY ID
  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Property> {
    return await this.propertyService.getPropertyById(id);
  }
  // DELETE PROPERTY
  @Delete('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin, Role.Agency, Role.Owner)
  async deleteProperty(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Property> {
    return await this.propertyService.deleteProperty(id, user);
  }

  //GET TOP RATED PROPERTY
  @Get('/top-rated')
  async getTopRatedProducts(): Promise<Property[]> {
    return await this.propertyService.getTopRatedProperty();
  }
}
