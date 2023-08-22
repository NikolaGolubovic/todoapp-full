import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1692733269574 implements MigrationInterface {
    name = 'NewMigration1692733269574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todos" ("id" SERIAL NOT NULL, "todo" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "type" character varying NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "refreshToken" character varying NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_4583be7753873b4ead956f040e3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_4583be7753873b4ead956f040e3"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "todos"`);
    }

}
