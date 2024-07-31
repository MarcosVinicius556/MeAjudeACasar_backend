import Logger from './logger';

import mongoose from "mongoose";
import config from 'config';

async function startDatabaseConnection() {
    const dbURI = config.get<string>('dbURI');
    try {
        await mongoose.connect(dbURI);
        Logger.info('Conexão com o banco de dados estabelecida com sucesso!');
    } catch(error: any) {
        Logger.error('Não foi possível iniciar a conexão com o banco de dados. Erro: ' + error);
        process.exit(1);
    }
}

export default startDatabaseConnection;
