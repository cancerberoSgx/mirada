# building  opencv doxygen

```
cd opencv
sed -i -e "s/GENERATE_XML *= NO/GENERATE_XML=YES/" $PWD/doc/Doxyfile.in
rm -rf build 
docker run --rm --workdir /code -v "$PWD":/code opencv.js python ./platforms/js/build_js.py build --build_doc
```

where Docker file is:

```
FROM trzeci/emscripten:latest
RUN apt-get update -y
RUN apt-get install -y doxygen
```