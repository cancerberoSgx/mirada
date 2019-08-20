rm -rf tmp_test
mkdir tmp_test
cd tmp_test
npm init -y
npm i xsd2json
node -v 
npm -v 
npx xsd2json --help
ls ../assets/compound.xsd
npx xsd2json "$PWD/../assets/compound.xsd" > "$PWD/../tmp.json"