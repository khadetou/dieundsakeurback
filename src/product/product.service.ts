import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v2 } from 'cloudinary';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewsDto } from './dto/create-review.dto';
import { GetProductsFilterDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-produt.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  //GET ALL PRODUCTS
  async getProducts(getProductsFilterDto: GetProductsFilterDto): Promise<any> {
    let { pageSize, pageNumber, keyword, category } = getProductsFilterDto;

    pageSize = 8;
    const page = Number(pageNumber) || 1;

    keyword = keyword
      ? {
          name: { $regex: keyword, $options: 'i' },
        }
      : (keyword = category
          ? {
              category: { $regex: category, $options: 'i' },
            }
          : {});

    const count = await this.productModel.countDocuments({ ...keyword });
    const products = await this.productModel
      .find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return { products, page, pages: Math.ceil(count / pageSize) };
  }

  //CREATE PRODUCT
  async createProduct(
    createProductDto: CreateProductDto,
    user: any,
  ): Promise<Product> {
    const {
      name,
      image,
      brand,
      category,
      description,
      rating,
      price,
      countInStock,
    } = createProductDto;

    let imageLinks: any[] = [];

    if (image) {
      for (let i = 0; i < image.length; i++) {
        const upload = await v2.uploader.upload(image[i], {
          folder: `Market_senegal/Products/${category}`,
        });

        imageLinks.push({
          public_id: upload.public_id,
          url: upload.secure_url,
          format: upload.format,
        });
      }
    }

    const productField = {
      user: user._id,
      name: name && name,
      image: imageLinks,
      brand: brand && brand,
      category: category && category,
      description: description && description,
      rating: rating && rating,
      price: price && price,
      countInStock: countInStock && countInStock,
    };

    let product = new this.productModel(productField);
    try {
      return await product.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // UPDATE PRODUCT
  async updateProduct(
    updateProductDto: UpdateProductDto,
    id: string,
  ): Promise<Product> {
    const {
      name,
      image,
      brand,
      category,
      description,
      rating,
      price,
      countInStock,
    } = updateProductDto;

    let product = await this.productModel.findById(id);

    let imageLinks: any[] = [];

    if (image.length !== 0) {
      for (let i = 0; product.image.length > i; i++) {
        await v2.uploader.destroy(product.image[i].public_id);
      }

      for (let i = 0; i < image.length; i++) {
        const upload = await v2.uploader.upload(image[i], {
          folder: `Market_senegal/Products/${category}`,
        });

        imageLinks.push({
          public_id: upload.public_id,
          url: upload.secure_url,
          format: upload.format,
        });
      }
    }

    if (product) {
      product.name = name || product.name;
      product.image = imageLinks.length !== 0 ? imageLinks : product.image;
      product.brand = brand || brand;
      product.category = category || product.category;
      product.description = description || product.description;
      product.rating = rating || product.rating;
      product.price = price || product.price;
      product.countInStock = countInStock || product.countInStock;
    } else {
      throw new NotFoundException('Product not found');
    }

    try {
      return await product.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  //CREATE REVIEWS
  async createReviews(
    createReviewsDto: CreateReviewsDto,
    id: string,
    user: any,
  ): Promise<Product> {
    let product = await this.productModel.findById(id);
    const { rating, comment } = createReviewsDto;

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === user._id.toString(),
      );

      if (alreadyReviewed) {
        throw new InternalServerErrorException(
          'Vous avez dèjas donné votre avis sur ce produit !',
        );
      }

      product.reviews.push({
        user: user._id,
        name: user.firstname + ' ' + user.lastname,
        rating: Number(rating),
        comment: comment,
      });
      product.numbReviews = product.reviews.length;
      product.rating =
        product.reviews.reduceRight((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      try {
        return await product.save();
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    } else {
      throw new InternalServerErrorException('Product not found');
    }
  }

  //GET PRODUCT BY ID

  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (product) {
      return product;
    } else {
      throw new InternalServerErrorException('Product not found');
    }
  }

  //DELETE PRODUCT
  async deleteProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (product) {
      for (let i = 0; product.image.length > i; i++) {
        await v2.uploader.destroy(product.image[i].public_id);
      }
      return await product.remove();
    } else {
      throw new InternalServerErrorException('Product not found');
    }
  }

  //GET TOP RATED PRODUCTS
  async getTopRatedProducts(): Promise<Product[]> {
    const products = await this.productModel
      .find({})
      .sort({ rating: -1 })
      .limit(3);
    return products;
  }
}
