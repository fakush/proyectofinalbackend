import knex from 'knex';
import dbConfig from '../../../../knexfile';
import { newChatObject, ChatObject, ChatBaseClass } from '../chat.interfaces';
import moment from 'moment';

export class PersistenciaSQLite3 implements ChatBaseClass {
  private chat;
  private table = 'chatLog';

  constructor() {
    const environment = process.env.NODE_ENV || 'ecommerce_sqLite3_dev';
    console.log(`SETTING ${environment} DB`);
    const options = dbConfig[environment];
    this.chat = knex(options);
    this.chat.schema.hasTable(this.table).then((exists: any) => {
      if (!exists) {
        console.log('SQLITE: Initializing table "chatLog"');
        this.chat.schema
          .createTable(this.table, (chatTable: any) => {
            chatTable.increments('_id');
            chatTable.string('timestamp').notNullable();
            chatTable.string('nombre').notNullable();
            chatTable.string('mensaje');
          })
          .then(() => {
            console.log('SQL: Done creating table "chatLog"');
          });
      }
    });
  }

  async find(id: number): Promise<Boolean> {
    const item: any = await this.chat(this.table).where('_id', Number(id));
    if (item == 0) return false;
    return true;
  }

  async add(data: newChatObject): Promise<ChatObject> {
    const newItemData: ChatObject = {
      timestamp: moment().format('MM DD hh:mm:ss'),
      nombre: data.nombre,
      mensaje: data.mensaje
    };
    const newItem = await this.chat(this.table).insert(newItemData);
    return (await this.chat(this.table).where('_id', Number(newItem))) as any;
  }
}
