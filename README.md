# loin
loin (short for LOcal INstall) is a small helper for local package installation.
In contrast to npm it just copies the files of the specified path into another modules folder and adds a reference to that copied folder to the `package.json` of your project.
This is helpful in cases, where linking to a directory is not a fitting solution.
Such scenarios may occur in mono-repos with shared code folders.

## Usage
The usage is very simple and straight foward:

### Install

`loin i[nstall] <relative package path>`

## TODO
- package uninstall/removal
- installing all packages saved in `.loin`