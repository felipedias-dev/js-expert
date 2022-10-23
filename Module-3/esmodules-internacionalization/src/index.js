import database from '../database.json' assert { type: 'json' };
import TerminalController from './terminalController.js';

const DEFAULT_LANG = 'pt-BR';

const terminalController = new TerminalController();

terminalController.initializeTerminal(database, DEFAULT_LANG);
