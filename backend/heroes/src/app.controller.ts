import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Hero } from './hero';

@Controller('hero')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async getAll(): Promise<Hero[]> {
    return this.appService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Hero> {
    return this.appService.getById(id);
  }

  @Post()
  async create(@Body() hero: Hero): Promise<Hero> {
    return this.appService.create(hero);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() hero: Hero): Promise<Hero> {
    hero.id = id;
    return this.appService.update(hero);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.appService.delete(id);
  }

  @Delete()
  async deleteAll() {
    this.appService.deleteAll();
  }
}
