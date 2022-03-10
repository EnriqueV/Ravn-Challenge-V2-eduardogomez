import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class products1646920323170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'decimal',
            default: '0.00',
          },
          {
            name: 'discount',
            type: 'int',
            default: '0',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'products',
      new TableIndex({
        name: 'IDX_PRODUCT_NAME',
        columnNames: ['name'],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'products_images',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'url',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.addColumn(
      'products_images',
      new TableColumn({
        name: 'productId',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'products_images',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('products_images');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('productId') !== -1,
    );
    await queryRunner.dropForeignKey('products_images', foreignKey);
    await queryRunner.dropColumn('products_images', 'productId');
    await queryRunner.dropTable('products_images');
    await queryRunner.dropIndex('products', 'IDX_PRODUCT_NAME');
    await queryRunner.dropTable('products');
  }
}
