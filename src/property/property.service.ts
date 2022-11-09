import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v2 } from 'cloudinary';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { CreateReviewsDto } from './dto/create-review.dto';
import { GetPropertyFilterDto } from './dto/get-property.dto';
import { UpdatePropertyDto } from './dto/update-product.dto';
import { Property, PropertyDocument } from './schema/property.schema';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name)
    private readonly propertyModel: Model<PropertyDocument>,
  ) {}

  //GET ALL PRODUCTS
  async getProperties(
    getPropertyFilterDto: GetPropertyFilterDto,
  ): Promise<any> {
    let { pageSize, pageNumber, keyword, location } = getPropertyFilterDto;

    pageSize = 8;
    const page = Number(pageNumber) || 1;

    keyword = keyword
      ? {
          name: { $regex: keyword, $options: 'i' },
        }
      : (keyword = location
          ? {
              category: { $regex: location, $options: 'i' },
            }
          : {});

    const count = await this.propertyModel.countDocuments({ ...keyword });
    const properties = await this.propertyModel
      .find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return { properties, page, pages: Math.ceil(count / pageSize) };
  }

  // GET MY PROPERTIES
  async getMyProperties(
    getPropertyFilterDto: GetPropertyFilterDto,
    user: any,
  ): Promise<any> {
    let { pageSize, pageNumber, keyword, location } = getPropertyFilterDto;

    pageSize = 8;
    const page = Number(pageNumber) || 1;

    const count = await this.propertyModel.countDocuments({ ...keyword });
    const properties = await this.propertyModel
      .find({ ...keyword, user: user._id })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return { properties, page, pages: Math.ceil(count / pageSize) };
  }
  //GET ALL PROPERTIES TO RENT
  async getPropertiestoRent(
    getPropertyFilterDto: GetPropertyFilterDto,
  ): Promise<any> {
    let { pageSize, pageNumber, keyword, location } = getPropertyFilterDto;

    pageSize = 8;
    const page = Number(pageNumber) || 1;

    keyword = keyword
      ? {
          name: { $regex: keyword, $options: 'i' },
        }
      : (keyword = location
          ? {
              category: { $regex: location, $options: 'i' },
            }
          : {});

    const count = await this.propertyModel.countDocuments({ ...keyword });
    const properties = await this.propertyModel
      .find({ ...keyword, status: 'RENT' })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return { properties, page, pages: Math.ceil(count / pageSize) };
  }
  //GET ALL PROPERTIES TO SELL
  async getPropertiestoSell(
    getPropertyFilterDto: GetPropertyFilterDto,
  ): Promise<any> {
    let { pageSize, pageNumber, keyword, location } = getPropertyFilterDto;

    pageSize = 8;
    const page = Number(pageNumber) || 1;

    keyword = keyword
      ? {
          name: { $regex: keyword, $options: 'i' },
        }
      : (keyword = location
          ? {
              category: { $regex: location, $options: 'i' },
            }
          : {});

    const count = await this.propertyModel.countDocuments({ ...keyword });
    const properties = await this.propertyModel
      .find({ ...keyword, status: 'SELL' })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return { properties, page, pages: Math.ceil(count / pageSize) };
  }

  //CREATE PROPERTY
  async createProperty(
    createProperty: CreatePropertyDto,
    user: any,
  ): Promise<Property> {
    const {
      name,
      images,
      address,
      area,
      beds,
      location,
      status,
      type,
      description,
      rating,
      baths,
      price,
      balcony,
      airconditioning,
      cctv,
      elevator,
      emergencyexit,
      internet,
      laundry,
      parking,
      securityguard,
      terrace,
      video,
      rooms,
      pool,
      region,
    } = createProperty;

    let imageLinks: any[] = [];

    if (images) {
      for (let i = 0; i < images.length; i++) {
        const upload = await v2.uploader.upload(images[i], {
          folder: `dieundsakeur/Properties/${user._id}/${name}`,
        });

        imageLinks.push({
          public_id: upload.public_id,
          url: upload.secure_url,
          format: upload.format,
          width: upload.width,
          height: upload.height,
        });
      }
    }

    const propertyField = {
      user: user._id,
      name: name && name,
      images: imageLinks,
      address: address && address,
      region: region && region,
      area: area && area,
      beds: beds && beds,
      baths: baths && baths,
      location: location && location,
      status: status && status,
      type: type && type,
      description: description && description,
      rating: rating && rating,
      price: price && price,
      balcony: balcony,
      airconditioning,
      cctv,
      elevator,
      emergencyexit,
      internet,
      laundry,
      parking,
      securityguard,
      terrace,
      video,
      rooms,
      pool,
    };

    let property = new this.propertyModel(propertyField);

    try {
      return await property.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // UPDATE PRODUCT
  async updateProduct(
    updateProperty: UpdatePropertyDto,
    id: string,
    user: any,
  ): Promise<Property> {
    const {
      name,
      images,
      address,
      area,
      beds,
      location,
      status,
      type,
      description,
      rating,
      baths,
      price,
      balcony,
      airconditioning,
      cctv,
      elevator,
      emergencyexit,
      internet,
      laundry,
      parking,
      securityguard,
      terrace,
      video,
      rooms,
      pool,
      region,
    } = updateProperty;

    let property = await this.propertyModel.findById(id);

    let imageLinks: any = [];

    if (
      images.length !== 0 &&
      property.user.toString() === user._id.toString()
    ) {
      for (let i = 0; property.images.length > i; i++) {
        await v2.uploader.destroy(property.images[i].public_id);
      }

      for (let i = 0; i < images.length; i++) {
        const upload = await v2.uploader.upload(images[i], {
          folder: `dieundsakeur/Properties/${user._id}/${name}`,
        });

        imageLinks.push({
          public_id: upload.public_id,
          url: upload.secure_url,
          format: upload.format,
        });
      }
    }

    if (property && property.user.toString() === user._id.toString()) {
      property.name = name || property.name;
      property.images = imageLinks.length !== 0 ? imageLinks : property.images;
      property.address = address || address;
      property.region = region || property.region;
      property.description = description || property.description;
      property.rating = rating || property.rating;
      property.price = price || property.price;
      property.area = area || property.area;
      property.beds = beds || property.beds;
      property.location = location || property.location;
      property.location = location || property.location;
      property.type = type || property.type;
      property.baths = baths || property.baths;
      property.status = status || property.status;
      property.balcony = balcony || property.balcony;
      property.airconditioning = airconditioning || property.airconditioning;
      property.cctv = cctv || property.cctv;
      property.elevator = elevator || property.elevator;
      property.emergencyexit = emergencyexit || property.emergencyexit;
      property.internet = internet || property.internet;
      property.laundry = laundry || property.laundry;
      property.parking = parking || property.parking;
      property.securityguard = securityguard || property.securityguard;
      property.terrace = terrace || property.terrace;
      property.video = video || property.video;
      property.rooms = rooms || property.rooms;
      property.pool = pool || property.pool;
    } else {
      throw new NotFoundException('Property not found');
    }

    try {
      return await property.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  //CREATE REVIEWS
  async createReviews(
    createReviewsDto: CreateReviewsDto,
    id: string,
    user: any,
  ): Promise<Property> {
    let property = await this.propertyModel.findById(id);
    const { rating, comment } = createReviewsDto;

    if (property) {
      const alreadyReviewed = property.reviews.find(
        (r) => r.user.toString() === user._id.toString(),
      );

      if (alreadyReviewed) {
        throw new InternalServerErrorException(
          'Vous avez dèjas donné votre avis sur ce produit !',
        );
      }

      property.reviews.push({
        user: user._id,
        name: user.firstname + ' ' + user.lastname,
        rating: Number(rating),
        comment: comment,
      });
      property.numbReviews = property.reviews.length;
      property.rating =
        property.reviews.reduceRight((acc, item) => item.rating + acc, 0) /
        property.reviews.length;
      try {
        return await property.save();
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    } else {
      throw new InternalServerErrorException('Property not found');
    }
  }

  //GET PROPERTY BY ID
  async getPropertyById(id: string): Promise<Property> {
    const product = await this.propertyModel.findById(id);
    if (product) {
      return product;
    } else {
      throw new InternalServerErrorException('Product not found');
    }
  }

  //DELETE PROPERTY
  async deleteProperty(id: string, user: any): Promise<Property> {
    const property = await this.propertyModel.findById(id);
    if (property && user._id.toString() === property.user.toString()) {
      for (let i = 0; property.images.length > i; i++) {
        await v2.uploader.destroy(property.images[i].public_id);
      }
      return await property.remove();
    } else {
      throw new InternalServerErrorException('Property not found');
    }
  }

  //GET TOP RATED PRODUCTS
  async getTopRatedProperty(): Promise<Property[]> {
    const property = await this.propertyModel
      .find({})
      .sort({ rating: -1 })
      .limit(3);
    return property;
  }
}
