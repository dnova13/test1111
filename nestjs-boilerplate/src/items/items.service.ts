import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PaginatedResult } from '../users/users.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto, ownerId: number): Promise<Item> {
    const item = this.itemsRepository.create({
      ...createItemDto,
      ownerId,
    });
    return this.itemsRepository.save(item);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    userId?: number,
    isAdmin?: boolean,
  ): Promise<PaginatedResult<Item>> {
    const queryBuilder = this.itemsRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.owner', 'owner')
      .orderBy('item.createdAt', 'DESC');

    if (!isAdmin && userId) {
      queryBuilder.where('item.ownerId = :userId', { userId });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number, userId?: number, isAdmin?: boolean): Promise<Item> {
    const item = await this.itemsRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }

    if (!isAdmin && userId && item.ownerId !== userId) {
      throw new ForbiddenException('You do not have access to this item');
    }

    return item;
  }

  async update(
    id: number,
    updateItemDto: UpdateItemDto,
    userId: number,
    isAdmin: boolean,
  ): Promise<Item> {
    const item = await this.findOne(id, userId, isAdmin);

    if (!isAdmin && item.ownerId !== userId) {
      throw new ForbiddenException('You can only update your own items');
    }

    Object.assign(item, updateItemDto);
    return this.itemsRepository.save(item);
  }

  async remove(id: number, userId: number, isAdmin: boolean): Promise<void> {
    const item = await this.findOne(id, userId, isAdmin);

    if (!isAdmin && item.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own items');
    }

    await this.itemsRepository.remove(item);
  }
}
