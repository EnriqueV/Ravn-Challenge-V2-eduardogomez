import { EntityRepository, Repository } from "typeorm";
import { Images } from "./product-images.entity";

@EntityRepository(Images)
export class ProductImagesRepository extends Repository<Images> {

}