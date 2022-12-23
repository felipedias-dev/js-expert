# a partir da pasta raiz
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt

# volta para a pasta do módulo 5
cp -r ../../Module-1/class-05-tdd-project-pt03/ .

CONTENT="'use strict';" \
find . -name *.js -not -path '*node_modules**' \
| npx ipt -o \
| xargs -I '{file}' sed -i "1s/^/$CONTENT\n\n/g" {file}

CONTENT="'use strict';" \
find . -name *.js -not -path '*node_modules**' \
| npx ipt -o \
| xargs -I {file} sed -i "1i $CONTENT\n" {file}