import { MigrationInterface, QueryRunner } from 'typeorm';

export class cartsTable1657152574637 implements MigrationInterface {
  name = 'cartsTable1657152574637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "carts" ("cart_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" double precision NOT NULL, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_2fb47cbe0c6f182bb31c66689e9" PRIMARY KEY ("cart_id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "cartCartId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_ef8f275f5aadb56ab58ee2ae39d" UNIQUE ("cartCartId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_ef8f275f5aadb56ab58ee2ae39d" FOREIGN KEY ("cartCartId") REFERENCES "carts"("cart_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_ef8f275f5aadb56ab58ee2ae39d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_ef8f275f5aadb56ab58ee2ae39d"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cartCartId"`);
    await queryRunner.query(`DROP TABLE "carts"`);
  }
}
