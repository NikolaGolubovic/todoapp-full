import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1683544817246 implements MigrationInterface {
    name = 'NewMigration1683544817246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "createdAt" TO "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "created_at" TO "createdAt"`);
    }

}
