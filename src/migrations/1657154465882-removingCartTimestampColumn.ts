import { MigrationInterface, QueryRunner } from 'typeorm';

export class removingCartTimestampColumn1657154465882
  implements MigrationInterface
{
  name = 'removingCartTimestampColumn1657154465882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "timestamp"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "carts" ADD "timestamp" TIMESTAMP NOT NULL`,
    );
  }
}
