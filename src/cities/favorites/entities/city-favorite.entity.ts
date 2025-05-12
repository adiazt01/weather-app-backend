import { EntityAbstract } from "src/common/database/entities/entity-abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from 'src/core/users/entities/user.entity';

@Entity({
    name: "cities_favorites",
})
export class CityFavorite extends EntityAbstract {
    @PrimaryGeneratedColumn("uuid", {
        name: "id",
        comment: "Unique identifier for the favorite city"
    })
    id: string;

    @Column({
        name: "name",
        type: "text",
        comment: "Name of the city",
        nullable: false,
    })
    name: string;

    @Column({
        name: "region",
        type: "text",
        comment: "Region of the city",
        nullable: false,
    })
    region: string;

    @Column({
        name: "country",
        type: "text",
        comment: "Country of the city",
        nullable: false,
    })
    country: string;

    @Column({
        name: "latitude",
        type: "float",
        comment: "latitude of the city",
        nullable: false,
    })
    latitude: number;

    @Column({
        name: "longitude",
        type: "float",
        comment: "Longitude of the city",
        nullable: false,
    })
    longitude: number;

    @ManyToOne(() => User, (user) => user.cityFavorites, { nullable: false })
    user: User;
}
