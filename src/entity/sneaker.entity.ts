import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sneaker {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    reference: string;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    brand: string;
}