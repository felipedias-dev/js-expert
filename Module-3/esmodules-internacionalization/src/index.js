import database from '../database.json' assert { type: 'json' };
import Person from './person.js';
import TerminalController from './terminalController.js';
import { save } from './repository.js';

const DEFAULT_LANG = 'pt-BR';
const KILL_TERM = ':q';

const terminalController = new TerminalController();

terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question('Insert info: ');
    
    if (answer === KILL_TERM) {
      terminalController.closeTerminal();
      console.log('Process finished!');
      
      return;
    }

    const person = Person.generateInstanceFromString(answer);

    terminalController.updateTable(person.formatted(DEFAULT_LANG));
    await save(person);

    return await mainLoop();
  } catch (error) {
    console.log('Error:', error);
    
    return await mainLoop();
  }
}

await mainLoop();
