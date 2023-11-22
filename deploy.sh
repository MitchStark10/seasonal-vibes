#!/bin/bash

rm build.zip;
npm run build;
zip -r build.zip ./ -x '.vscode/*' -x '.git/*'
az webapp deploy --resource-group quarterlyvibes --name seasonalvibes --src-path ./build.zip;
