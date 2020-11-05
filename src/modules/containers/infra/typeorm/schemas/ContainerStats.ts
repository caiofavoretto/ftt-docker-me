import {
  ObjectID,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
} from 'typeorm';

@Entity('container_stats')
class ContainerStats {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  container_id: string;

  @Column('number')
  memory_usage: number;

  @Column('number')
  cpu_usage: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ContainerStats;
