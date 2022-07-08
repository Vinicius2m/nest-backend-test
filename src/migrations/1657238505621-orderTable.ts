import { MigrationInterface, QueryRunner } from "typeorm";

export class orderTable1657238505621 implements MigrationInterface {
    name = 'orderTable1657238505621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("order_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" double precision NOT NULL, "timestamp" TIMESTAMP NOT NULL, "userUserId" uuid, CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`CREATE TABLE "orders_products_products" ("ordersOrderId" uuid NOT NULL, "productsProductId" uuid NOT NULL, CONSTRAINT "PK_596f5c5445311d7563263a84aa1" PRIMARY KEY ("ordersOrderId", "productsProductId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aaea55b68443d79efb09243caa" ON "orders_products_products" ("ordersOrderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_50acfe957edf6707a299171835" ON "orders_products_products" ("productsProductId") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_products_products" ADD CONSTRAINT "FK_aaea55b68443d79efb09243caaa" FOREIGN KEY ("ordersOrderId") REFERENCES "orders"("order_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_products_products" ADD CONSTRAINT "FK_50acfe957edf6707a2991718358" FOREIGN KEY ("productsProductId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_products_products" DROP CONSTRAINT "FK_50acfe957edf6707a2991718358"`);
        await queryRunner.query(`ALTER TABLE "orders_products_products" DROP CONSTRAINT "FK_aaea55b68443d79efb09243caaa"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_50acfe957edf6707a299171835"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aaea55b68443d79efb09243caa"`);
        await queryRunner.query(`DROP TABLE "orders_products_products"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
