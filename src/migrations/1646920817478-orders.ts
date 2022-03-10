import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class orders1646920817478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'code',
            type: 'varchar',
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

    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'userId',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'order_details',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'name',
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
        ],
      }),
      true,
    );

    await queryRunner.addColumn(
      'order_details',
      new TableColumn({
        name: 'orderId',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'order_details',
      new TableForeignKey({
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const orders = await queryRunner.getTable('orders');
    const ordersFK = orders.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    const details = await queryRunner.getTable('order_details');
    const detailsFK = details.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('orderId') !== -1,
    );
    await queryRunner.dropForeignKey('order_details', detailsFK);
    await queryRunner.dropColumn('order_details', 'orderId');
    await queryRunner.dropForeignKey('orders', ordersFK);
    await queryRunner.dropColumn('orders', 'userId');
    await queryRunner.dropTable('order_details');
    await queryRunner.dropTable('orders');
  }
}
