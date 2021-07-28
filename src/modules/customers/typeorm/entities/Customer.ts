import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Order from '@modules/orders/typeorm/entities/Order';

@Entity('customers')
export default class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  // DOC
  // @OneToMany(() => Photo, photo => photo.user)
  // photos: Photo[];

  @OneToMany(() => Order, order => order.customer)
  // @JoinColumn({ name: 'customer_id' })
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
