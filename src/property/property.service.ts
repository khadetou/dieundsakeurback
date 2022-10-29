import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v2 } from 'cloudinary';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { GetPropertyFilterDto } from './dto/get-property.dto';
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

  //CREATE PRODUCT
  async createProperty(
    createProperty: CreatePropertyDto,
    user: any,
  ): Promise<Property> {
    const {
      name,
      image,
      address,
      area,
      beds,
      features,
      location,
      status,
      type,
      description,
      rating,
      baths,
      price,
    } = createProperty;

    let imageLinks: any[] = [];
    let splitFeatures: string[] = [];

    if (features)
      splitFeatures = features.split(',').map((feature) => feature.trim());

    if (image) {
      for (let i = 0; i < image.length; i++) {
        const upload = await v2.uploader.upload(image[i], {
          folder: `Market_senegal/Properties/${name}`,
        });

        imageLinks.push({
          public_id: upload.public_id,
          url: upload.secure_url,
          format: upload.format,
        });
      }
    }

    const propertyField = {
      user: user._id,
      name: name && name,
      image: imageLinks,
      address: address && address,
      area: area && area,
      beds: beds && beds,
      baths: baths && baths,
      features: splitFeatures,
      location: location && location,
      status: status && status,
      type: type && type,
      description: description && description,
      rating: rating && rating,
      price: price && price,
    };

    let property = new this.propertyModel(propertyField);

    try {
      return await property.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //   // UPDATE PRODUCT
  //   async updateProduct(
  //     updateProductDto: UpdateProductDto,
  //     id: string,
  //   ): Promise<Product> {
  //     const {
  //       name,
  //       image,
  //       brand,
  //       category,
  //       description,
  //       rating,
  //       price,
  //       countInStock,
  //     } = updateProductDto;

  //     let product = await this.productModel.findById(id);

  //     let imageLinks: any[] = [];

  //     if (image.length !== 0) {
  //       for (let i = 0; product.image.length > i; i++) {
  //         await v2.uploader.destroy(product.image[i].public_id);
  //       }

  //       for (let i = 0; i < image.length; i++) {
  //         const upload = await v2.uploader.upload(image[i], {
  //           folder: `Market_senegal/Products/${category}`,
  //         });

  //         imageLinks.push({
  //           public_id: upload.public_id,
  //           url: upload.secure_url,
  //           format: upload.format,
  //         });
  //       }
  //     }

  //     if (product) {
  //       product.name = name || product.name;
  //       product.image = imageLinks.length !== 0 ? imageLinks : product.image;
  //       product.brand = brand || brand;
  //       product.category = category || product.category;
  //       product.description = description || product.description;
  //       product.rating = rating || product.rating;
  //       product.price = price || product.price;
  //       product.countInStock = countInStock || product.countInStock;
  //     } else {
  //       throw new NotFoundException('Product not found');
  //     }

  //     try {
  //       return await product.save();
  //     } catch (error) {
  //       throw new InternalServerErrorException(error.message);
  //     }
  //   }
  //   //CREATE REVIEWS
  //   async createReviews(
  //     createReviewsDto: CreateReviewsDto,
  //     id: string,
  //     user: any,
  //   ): Promise<Product> {
  //     let product = await this.productModel.findById(id);
  //     const { rating, comment } = createReviewsDto;

  //     if (product) {
  //       const alreadyReviewed = product.reviews.find(
  //         (r) => r.user.toString() === user._id.toString(),
  //       );

  //       if (alreadyReviewed) {
  //         throw new InternalServerErrorException(
  //           'Vous avez dèjas donné votre avis sur ce produit !',
  //         );
  //       }

  //       product.reviews.push({
  //         user: user._id,
  //         name: user.firstname + ' ' + user.lastname,
  //         rating: Number(rating),
  //         comment: comment,
  //       });
  //       product.numbReviews = product.reviews.length;
  //       product.rating =
  //         product.reviews.reduceRight((acc, item) => item.rating + acc, 0) /
  //         product.reviews.length;
  //       try {
  //         return await product.save();
  //       } catch (error) {
  //         throw new InternalServerErrorException(error.message);
  //       }
  //     } else {
  //       throw new InternalServerErrorException('Product not found');
  //     }
  //   }

  //   //GET PRODUCT BY ID

  //   async getProductById(id: string): Promise<Product> {
  //     const product = await this.productModel.findById(id);
  //     if (product) {
  //       return product;
  //     } else {
  //       throw new InternalServerErrorException('Product not found');
  //     }
  //   }

  //   //DELETE PRODUCT
  //   async deleteProduct(id: string): Promise<Product> {
  //     const product = await this.productModel.findById(id);
  //     if (product) {
  //       for (let i = 0; product.image.length > i; i++) {
  //         await v2.uploader.destroy(product.image[i].public_id);
  //       }
  //       return await product.remove();
  //     } else {
  //       throw new InternalServerErrorException('Product not found');
  //     }
  //   }

  //   //GET TOP RATED PRODUCTS
  //   async getTopRatedProducts(): Promise<Product[]> {
  //     const products = await this.productModel
  //       .find({})
  //       .sort({ rating: -1 })
  //       .limit(3);
  //     return products;
  //   }
}
