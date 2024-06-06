import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum Departments {
  TECH = 'TECH',
  MARKETING = 'MARKETING',
}

@Entity()
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  jobTitle: string;

  @Column({ type: 'enum', enum: Departments, nullable: false })
  department: Departments;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdDate: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedDate: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  public deletedDate: Date;
}
