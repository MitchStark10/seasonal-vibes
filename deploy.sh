#!/bin/bash

rm build.zip;
npm run build;
zip -r build.zip ./ -x './client/node_modules/*' -x './node_modules/*' -x '.vscode/*' -x '.git/*'
az webapp deploy --resource-group quarterlyvibes --name seasonalvibes --src-path ./build.zip --debug;
