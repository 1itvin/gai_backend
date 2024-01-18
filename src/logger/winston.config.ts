import * as winston from 'winston' 
import 'winston-daily-rotate-file' 
import * as winstonMongoDB from 'winston-mongodb' 
require('winston-mongodb') 
 
  export const logger = winston.createLogger({ 
    transports: [ 
      new winston.transports.File({ 
        filename: 'logs.log', 
        level: 'info', 
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()) 
      }), 
      new winston.transports.MongoDB({ 
        level: 'info', 
        db: 'mongodb://localhost:27017/traveler-logs', 
        collection: 'logs', 
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()), 
      }) 
    ] 
  })