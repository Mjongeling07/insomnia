// import { ipcMain } from 'electron/main';
import type { LogFunctions } from 'electron-log';

import { database } from '../../common/database';

export interface MigrationBridgeAPI {
    prepare: () => void;
    start: () => void;
    pause: () => void;
    resume: () => void;
    end: () => void;
    progress: () => void;

    // open: (options: OpenWebSocketRequestOptions) => void;
    // close: typeof closeWebSocketConnection;
    // closeAll: typeof closeAllWebSocketConnections;
    // readyState: {
    //     getCurrent: typeof getWebSocketReadyState;
    // };
    // event: {
    //     findMany: typeof findMany;
    //     send: typeof sendWebSocketEvent;
    // };
}

type Logger = LogFunctions;
interface MigrationProgress {
    total: number;
    complete: number;
    inProgress: number;
    failed: number;
}
class MigrationQueue {
    // private _logger: Logger;
    public queue: Set<string> = new Set();
    public progress$ = new Event('migrationProgress');
    public status$ = new Event('migrationStatus');

    // constructor(logger: Logger) {
    // this._logger = logger;
    // }

    public prepare(teamProjectIds: string[]): void {
        // this._logger.info('[migration] preparing');
        teamProjectIds.forEach(id => {
            this.queue.add(id);
            // this._logger.info('[migration] team project queued');
        });
    }

    // for now, let's call them team projects
    public start(): void {
        if (this.queue.size === 0) {
            // this._logger.info('[migration] attempted to start without preparing');
        }
        // this._logger.info('[migration] start');
        this.queue.forEach((teamProjectId: string) => {
            database.find('project', { remoteId: teamProjectId }).then();
        });
    }

    public resume(): void {
        // this._logger.info('[migration] resume');
    }

    public pause(): void {
        // this._logger.info('[migration] pause');
    }

    public end(): void {
        // this._logger.info('[migration] end');
    }
}

export const MigrationJobber = new MigrationQueue();
export const registerMigrationHandlers = () => {
    // ipcMain.handle('webSocket.open', openWebSocketConnection);
    // ipcMain.handle('webSocket.event.send', (_, options: Parameters<typeof sendWebSocketEvent>[0]) => sendWebSocketEvent(options));
    // ipcMain.on('webSocket.close', (_, options: Parameters<typeof closeWebSocketConnection>[0]) => closeWebSocketConnection(options));
    // ipcMain.on('webSocket.closeAll', closeAllWebSocketConnections);
    // ipcMain.handle('webSocket.readyState', (_, options: Parameters<typeof getWebSocketReadyState>[0]) => getWebSocketReadyState(options));
    // ipcMain.handle('webSocket.event.findMany', (_, options: Parameters<typeof findMany>[0]) => findMany(options));
};