import DraftLog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readLine from 'readline';
import { stdin as input, stdout as output } from 'process';

import Person from './person.js';

export default class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);
    
    this.terminal = readLine.createInterface({
      input,
      output,
    });

    this.initializeTable(database, language);
  }

  closeTerminal() {
    this.terminal.close();
  }

  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language));
    const table = chalkTable(this.getTableOptions(), data);
    
    this.data = data;
    this.print = console.draft(table);
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions(), this.data));
  }

  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve));
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.yellow('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.red('Km Traveled') },
        { field: 'from', name: chalk.green('From') },
        { field: 'to', name: chalk.cyan('To') },
      ]
    };
  }
}