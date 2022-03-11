import { EntityRepository, Repository } from "typeorm";
import { Images } from "./product-images.entity";

@EntityRepository(Images)
export class ProductImageRepository extends Repository<Images> {

}