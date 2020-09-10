// This file is part of loin.
//
// loin is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// loin is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with loin.  If not, see <https://www.gnu.org/licenses/>.

const fs = require('fs');
const path = require('path');
const {
  removePackage,
  installPackage,
} = require('./lib');

if (process.argv.length < 3) {
  console.error('Please provide at least one argument!');
  return 1;
}

const projectDirectory = process.env.PWD;
const projectConfigPath = path.join(projectDirectory, '.loin');

const CMD_INSTALL = 0x00000001;
const CMD_REMOVE = 0x00000010;

let cmd = 0;
switch (process.argv[2]) {
  case 'i':
  case 'install':
    cmd |= CMD_INSTALL;
    break;
  case 'rm':
  case 'remove':
    cmd |= CMD_REMOVE;
    break;
}

if (cmd === 0) {
  console.error('Please provide a valid operation! Either \'install\' (i) or \'remove\' (rm).');
}

if (!fs.existsSync(projectConfigPath)) {
  fs.writeFileSync(projectConfigPath, '{}');
}

const config   = fs.readFileSync(projectConfigPath).toString('utf8');
const packages = config.packages || {};

(async () => {
  if (cmd & CMD_REMOVE) {

  }
  if (cmd & CMD_INSTALL) {
    if (process.argv[3]) {
      if (process.argv[3].startsWith('/')) {
        console.error('Please provide a relative path!');
        process.exit(1);
      }
      const packagePath = process.argv[3];
      console.log('Starting installation...');
      const packageName = await installPackage(projectDirectory, packagePath);
      console.log(`Successfully installed package '${packageName}'.`);
    }
  }
})();
