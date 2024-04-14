import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("courses")
export class courses {
  @PrimaryGeneratedColumn()
  course_id!: number;

  @Column({ type: "varchar" })
  course_name!: string;

  @Column({ type: "varchar" })
  course_level!: string;

  @Column({ type: "varchar" })
  course_type!: string;

  @Column({ type: "varchar" })
  recommended_by!: string;

  @Column({ type: "varchar", unique: true })
  course_link!: string;
}
