import chalk from 'chalk'
import { formatDate } from '../utils/format-date'
export class Logger {
  info(message: string) {
    console.log(chalk.green(`[INFO] ${message} - ${formatDate(new Date())}`))
  }
  error(message: string) {
    console.log(chalk.red(`[ERROR] ${message} - ${formatDate(new Date())}`))
  }
}
