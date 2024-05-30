import { Injectable } from '@nestjs/common';
import { Sneaker} from 'src/entity/sneaker.entity';
import { QueryBuilder, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class SneakerService {

    private validFields = ['id', 'reference', 'name', 'brand']

    constructor( @InjectRepository(Sneaker) 
    private RepositorySneaker: Repository<Sneaker>){}

    async findAll(page: number, limit: number): Promise<any> {

        const queryBuilder = this.RepositorySneaker.createQueryBuilder('sneaker')
        .skip((page - 1) * limit)
        .take(limit)
        console.log(queryBuilder.getQuery())
        const [results, total] = await queryBuilder.getManyAndCount();

        return {
            data: results,
            count: total,
            currentPage: page,
            totalPage: Math.ceil(total/limit),
        };
    };

    async findBysearch(

        search: {searchField: string, searchValue: string},
        order: {orderField: string, direction: 'ASC' | 'DESC'},

    ): Promise<Sneaker[]>{

        const {searchField: searchField, searchValue: searchValue} = search;
        const {orderField, direction} = order;

        return this.RepositorySneaker.createQueryBuilder('sneaker')
        .where(`sneaker.${searchField} LIKE :searchValue`, {searchValue: `%${searchValue}%`})
        .orderBy(`sneaker.${orderField}`, direction)
        .getMany();
    }

    findByString(
        filter: {searchField: string; value: any}, 
        order:{fieldOrder: string, direction: 'ASC' | 'DESC'}
    ):
        Promise<any>{
            const {searchField, value} = filter
            const {fieldOrder: orderField, direction} = order

            if(!this.validFields.includes(searchField)){
                throw new Error(`Invalid field ${searchField}`)
            }

            return this.RepositorySneaker.createQueryBuilder('sneaker')
            .where(`sneaker.${searchField}= :value`, {value})
            .orderBy(`user.${orderField}`, direction)
            .getMany();
    }

    findById(id: number): Promise<Sneaker> {
        return this.RepositorySneaker.findOne({where:{id: id}})
    }

    create(sneaker: Sneaker): Promise<Sneaker> {
        return this.RepositorySneaker.save(sneaker)
    }


}
