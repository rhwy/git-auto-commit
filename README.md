# git-auto-work

A git auto commit and publish tool. This tool can automatically do a commit to the current repo every defined interval. 
If specified it can also automatically push the changes to a remote target.

for exemple:

        `gaw -t 60 -p origin -b master` 

this means that every 60s it will commit all the changes to the current repository and push the changes to origin master

## Install

```shell
$ npm install -g git-auto-work
```

## Usage

```shell
gaw [options]
```

## Options
* `-t, --time <n>`: seconds between two commits, the default value is `300` which means that a commit will happend every 5 minutes
* `-p, --push <r>`: if present, a push will be done to the remote name specified after -p
* `-b, --branch <b>`: to use with -p, it will define the branch to push to remote, whereas it will be master
* `-h, --help`: output usage information

## License

The MIT License (MIT)

Copyright (c) 2017 Rui Carvalho

original ideas Copyright (c) 2015 Lingyu Wang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



    
       
      
