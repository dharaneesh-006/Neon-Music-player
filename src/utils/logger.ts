import { Platform } from 'react-native';

// In Expo Go development, always log. In production builds, control via environment.
const isDevelopment = true;

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = this.getTimestamp();
    const dataStr = data ? ` ${JSON.stringify(data)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${dataStr}`;
  }

  private addLog(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: this.getTimestamp(),
      level,
      message,
      data,
    };

    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  debug(message: string, data?: any) {
    const formatted = this.formatMessage('debug', message, data);
    if (isDevelopment) {
      console.log(formatted);
    }
    this.addLog('debug', message, data);
  }

  info(message: string, data?: any) {
    const formatted = this.formatMessage('info', message, data);
    console.log(formatted);
    this.addLog('info', message, data);
  }

  warn(message: string, data?: any) {
    const formatted = this.formatMessage('warn', message, data);
    console.warn(formatted);
    this.addLog('warn', message, data);
  }

  error(message: string, error?: any, data?: any) {
    const errorData = error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      ...data,
    } : { error, ...data };

    const formatted = this.formatMessage('error', message, errorData);
    console.error(formatted);
    this.addLog('error', message, errorData);
  }

  getLogs(level?: LogLevel): LogEntry[] {
    return level ? this.logs.filter(log => log.level === level) : this.logs;
  }

  clearLogs() {
    this.logs = [];
  }

  exportLogs(): string {
    return this.logs
      .map(log => this.formatMessage(log.level, log.message, log.data))
      .join('\n');
  }

  getPlatformInfo(): {
    platform: string;
    isDevelopment: boolean;
    appVersion: string;
  } {
    return {
      platform: Platform.OS,
      isDevelopment,
      appVersion: '1.0.0',
    };
  }
}

export const logger = new Logger();
export default logger;
