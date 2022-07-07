import { MigrationInterface, QueryRunner } from 'typeorm';

export class productTableNNCart1657162041780 implements MigrationInterface {
  name = 'productTableNNCart1657162041780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" character varying NOT NULL, "image" text NOT NULL, "material" character varying NOT NULL, "category" character varying, "department" character varying, "has_discount" boolean, "discount_value" character varying, "adjective" character varying, CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "carts_products_products" ("cartsCartId" uuid NOT NULL, "productsProductId" uuid NOT NULL, CONSTRAINT "PK_bcc413974284dd535e099c831aa" PRIMARY KEY ("cartsCartId", "productsProductId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a7ff97d8a0d3d157d2d9f4c78" ON "carts_products_products" ("cartsCartId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bc3261e4591ea57a459368c68c" ON "carts_products_products" ("productsProductId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "carts_products_products" ADD CONSTRAINT "FK_9a7ff97d8a0d3d157d2d9f4c780" FOREIGN KEY ("cartsCartId") REFERENCES "carts"("cart_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts_products_products" ADD CONSTRAINT "FK_bc3261e4591ea57a459368c68c5" FOREIGN KEY ("productsProductId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "carts_products_products" DROP CONSTRAINT "FK_bc3261e4591ea57a459368c68c5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts_products_products" DROP CONSTRAINT "FK_9a7ff97d8a0d3d157d2d9f4c780"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bc3261e4591ea57a459368c68c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9a7ff97d8a0d3d157d2d9f4c78"`,
    );
    await queryRunner.query(`DROP TABLE "carts_products_products"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
