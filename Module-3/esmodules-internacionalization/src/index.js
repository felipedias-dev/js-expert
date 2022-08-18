import DraftLog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';

import database from '../database.json' assert { type: 'json' };

DraftLog(console).addLineListener(process.stdin);

const options = {
  leftPad: 2,
  columns: [
    { field: 'id', name: chalk.yellow('ID') },
    { field: 'vehicles', name: chalk.magenta('Vehicles') },
    { field: 'kmTraveled', name: chalk.red('Km Traveled') },
    { field: 'from', name: chalk.green('From') },
    { field: 'to', name: chalk.cyan('To') },
  ]
};

const table = chalkTable(options, database);
const print = console.draft(table);

print();
