import DraftLog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readLine from 'readline';
import { stdin as input, stdout as output } from 'process';

import database from '../database.json' assert { type: 'json' };
import Person from './person.js';

DraftLog(console).addLineListener(process.stdin);

const DEFAULT_LANG = 'pt-BR';
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

const table = chalkTable(options, database.map(item => new Person(item).formatted(DEFAULT_LANG)));
const print = console.draft(table);

print();

const terminal = readLine.createInterface({
  input,
  output,
});

terminal.question('Qual é o seu nome? ', msg => {
  console.log('msg', msg);
})
