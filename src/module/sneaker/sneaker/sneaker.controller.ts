import { Controller, Post, Query, Body } from '@nestjs/common';
import { SneakerService } from './sneaker.service';
import { Get } from '@nestjs/common';
import { Sneaker } from 'src/entity/sneaker.entity';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('/sneaker')
export class SneakerController {

    constructor(private readonly sneakerService: SneakerService){}

    @Get('/find/all')
    @ApiOperation({summary: "Search all the sneakers"})
    @ApiQuery({ name: 'page', required: false, description: 'Número de página' }) 
    @ApiQuery({ name: 'limit', required: false, description: 'Número de resultados por página' }) 
    async findSneakers(

        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,

    ):Promise<Sneaker[]>{

        return this.sneakerService.findAll(page, limit)
    }

    // @Get('/find/all/')
    // async findByString(
    //     @Query('field') searchField: string,
    //     @Query('value') value: any,
    //     @Query('orderField') orderField: string,
    //     @Query('orderDirection') orderDirection: 'ASC' | 'DESC',
    // ): Promise<any> {
    //     return this.sneakerService.findByString(
    //         {searchField, value},
    //         {fieldOrder: orderField, direction: orderDirection},
    //     );
    // }
    
    @Get('/find')
    @ApiOperation({summary: "Find the sneakers by means of a parameter"})
    @ApiQuery({ name: 'searchField', required: false, description: 'Campo por el cual buscar' }) 
    @ApiQuery({ name: 'searchValue', required: false, description: 'Valor de búsqueda' }) 
    @ApiQuery({ name: 'orderField', required: false, description: 'Campo por el cual ordenar' }) 
    @ApiQuery({ name: 'direction', required: false, description: 'Dirección del orden (ASC o DESC)' }) 
    async findBySearch(
        @Query('searchField') searchField: any,
        @Query('searchValue') searchValue: string,
        @Query('orderField') orderField: string,
        @Query('direction') direction: 'ASC' | 'DESC',

    ): Promise<any>{
        return this.sneakerService.findBysearch(
            {searchField, searchValue}, 
            {orderField, direction}
        )
    }

    @Post('/create')
    async createSneaker(@Body() sneaker: Sneaker){
        return this.sneakerService.create(sneaker)
    }

    

}
