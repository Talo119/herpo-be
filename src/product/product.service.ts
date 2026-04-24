import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductItemDto } from './dto/product-item.dto';
import { prisma } from 'src/prisma';
@Injectable()
export class ProductService {
  private readonly logger = new Logger('ProductService');

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(): Promise<ProductItemDto[]> {
    try {
      this.logger.log('Fetching all products from the database');
      const products = await prisma.product.findMany();
      await prisma.$disconnect();
      return products;
    } catch (error) {
      this.logger.error('Failed to fetch products', error);
      throw new NotFoundException('Products not found');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
