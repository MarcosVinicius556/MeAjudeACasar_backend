import Logger from './logger';

import mongoose from "mongoose";
import config from 'config';

async function startDatabaseConnection() {
    const dbURI = config.get<string>('dbURI');

    await mongoose.connect(dbURI)
                    .then(() => Logger.info('Conexão com o banco de dados estabelecida com sucesso!'))
                    .catch(err => Logger.error('Não foi possível iniciar a conexão com o banco de dados. Erro: ' + err));
}

export default startDatabaseConnection;
