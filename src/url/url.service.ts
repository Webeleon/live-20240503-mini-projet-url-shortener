import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
  ) {}

  async create(createUrlDto: CreateUrlDto): Promise<Url> {
    const url = this.urlRepository.create({
      ...createUrlDto,
      shortCode: uuid(),
    });

    await this.urlRepository.save(url);
    return url;
  }

  findAll() {
    return this.urlRepository.find();
  }

  findOne(id: string) {
    return this.urlRepository.findOne({
      where: {
        shortCode: id,
      },
    });
  }

  update(id: string, updateUrlDto: UpdateUrlDto) {
    return this.urlRepository.update(
      {
        shortCode: id,
      },
      updateUrlDto,
    );
  }

  remove(id: string) {
    return this.urlRepository.delete({
      shortCode: id,
    });
  }
}
