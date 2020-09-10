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
const util = require('util');
const { copy } = require('fs-extra');

const fileExists = util.promisify(fs.exists);

function copyFilter(src, dest) {
  return !src.includes('node_modules');
}

async function installPackage(projectPath, relativePackagePath) {

  const packagePath = path.join(projectPath, relativePackagePath);
  const packPath = path.join(packagePath, 'package.json');
  const packageName =
    await fs.promises.readFile(packPath)
      .then(x => x.toString('utf8'))
      .then(x => JSON.parse(x).name);
  const loinFolder = path.join(projectPath, 'loin_modules', packageName);
  await copy(packagePath, loinFolder, { overwrite: true, filter: copyFilter });
  const projectPackPath = path.join(projectPath, 'package.json');
  const pack =
    await fs.promises.readFile(projectPackPath)
      .then(x => x.toString('utf8'))
      .then(x => JSON.parse(x));
  pack.dependencies[packageName] = 'file:loin_modules/' + packageName;
  await fs.promises.writeFile(projectPackPath, JSON.stringify(pack, undefined, 2));
  const loinConfig = await fs.promises.readFile(path.join(projectPath, '.loin')).then(x => JSON.parse(x.toString('utf-8')));
  if (!loinConfig.packages) {
    loinConfig.packages = {};
  }
  loinConfig.packages[packageName] = relativePackagePath;
  await fs.promises.writeFile(path.join(projectPath, '.loin'), JSON.stringify(loinConfig, undefined, 2));
  return packageName;
}

async function removePackage(a) {

}


module.exports = {
  installPackage,
  removePackage,
};
