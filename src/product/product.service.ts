import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductItemDto } from './dto/product-item.dto';
import { prisma } from 'src/prisma';
import { randomUUID } from 'crypto';
@Injectable()
export class ProductService {
  private readonly logger = new Logger('ProductService');

  async create(createProductDto: CreateProductDto) {
    try {
      this.logger.log(
        'Creating a new product with data: ' + JSON.stringify(createProductDto),
      );
      const product = await prisma.product.create({
        data: { id: randomUUID(), ...createProductDto },
      });
      await prisma.$disconnect();
      this.logger.log('Product created successfully with ID: ' + product.id);
      return product;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to create product', error.message);
      } else {
        this.logger.error('Failed to create product', String(error));
      }
      throw new NotFoundException('Product not found');
    }
  }

  async findAll(): Promise<ProductItemDto[]> {
    try {
      this.logger.log('Fetching all products from the database');
      const products = await prisma.product.findMany();
      await prisma.$disconnect();
      return products;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to fetch products', error.message);
      } else {
        this.logger.error('Failed to fetch products', String(error));
      }
      throw new NotFoundException('Products not found');
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log('Fetching product with ID: ' + id);
      const product = await prisma.product.findUnique({
        where: { id },
      });
      await prisma.$disconnect();
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to fetch product', error.message);
      } else {
        this.logger.error('Failed to fetch product', String(error));
      }
      throw new NotFoundException('Product not found');
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      this.logger.log('Updating product with ID: ' + id);
      const product = await prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
      await prisma.$disconnect();
      return product;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to update product', error.message);
      } else {
        this.logger.error('Failed to update product', String(error));
      }
      throw new NotFoundException('Product not found');
    }
  }

  async remove(id: string) {
    try {
      this.logger.log('Removing product with ID: ' + id);
      const product = await prisma.product.delete({
        where: { id },
      });
      await prisma.$disconnect();
      return product;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to remove product', error.message);
      } else {
        this.logger.error('Failed to remove product', String(error));
      }
      throw new NotFoundException('Product not found');
    }
  }
}
