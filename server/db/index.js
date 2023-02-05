const mongoose = require('mongoose');
const config = require('../config')
class MongoDB {
    static connect() {
        mongoose.set('useFindAndModify', false);
        mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', async () => {
            console.log('数据库连接成功');
        })
    }
}
module.exports = MongoDB;