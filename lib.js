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

const fs   = require('fs');
const path = require('path');
const util = require('util');
const { copy } = require('fs-extra');

const fileExists = util.promisify(fs.exists);

async function installPackage(projectPath, packagePath) {
  const packPath = path.join(packagePath, 'package.json');
  const pack =
          await fs.promises.readFile(packPath)
                  .then(x => x.toString('utf8'))
                  .then(x => JSON.parse(x));
  const loinFolder = path.join(projectPath, 'loin_modules', pack.name);
  await copy(pack, loinFolder);
  pack.dependencies[pack.name] = 'file:loin_modules/' + pack.name;
  await fs.promises.writeFile(packPath, JSON.stringify(pack, undefined, 2));
  return pack;
}

async function removePackage(a) {

}


module.exports = {
  installPackage,
  removePackage,
};
