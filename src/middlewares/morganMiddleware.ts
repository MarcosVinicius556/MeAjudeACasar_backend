import morgan, { StreamOptions } from "morgan";
import config from 'config';
import Logger from "../../config/logger";
import { EnviromentType } from "../../config/enums/EnviromentType";

const stream: StreamOptions = {
    write: (message) => Logger.http(message)
}

const skip = () => {
    const env = config.get<string>('env') || EnviromentType.DEVELOPMENT;
    return env !== EnviromentType.DEVELOPMENT;
}

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
);

export default morganMiddleware;