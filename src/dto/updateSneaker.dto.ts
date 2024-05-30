import { PartialType } from "@nestjs/mapped-types";
import { Sneaker } from "src/entity/sneaker.entity";

export class updateSneakerDto extends PartialType(Sneaker) {

}