import { Logger } from './config/logger'
import { app } from './http/app'

const logger = new Logger()

const bootstrap = () => {
  app.listen(3030, () => {
    logger.info('Server running on http://localhost:3030')
  })
  logger.info('Database opened')
}
bootstrap()
