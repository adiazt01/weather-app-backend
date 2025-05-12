import { EntityAbstract } from 'src/common/database/entities/entity-abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { CityFavorite } from 'src/cities/favorites/entities/city-favorite.entity';

@Entity({
  name: 'users',
})
export class User extends EntityAbstract {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Username of the user',
    unique: true,
  })
  username: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Email of the user',
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
    select: false,
    comment: 'Password of the user',
  })
  password: string;

  @OneToMany(() => CityFavorite, (cityFavorite) => cityFavorite.user)
  cityFavorites: CityFavorite[];
}
