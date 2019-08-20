# docker build assets/xsd2json -t xsd2json
# docker run --rm -u root --workdir /code -v "$PWD":/code xsd2json xsd2json assets/compound.xsd > tmp.json
FROM swipl

RUN apt-get update -y
RUN apt-get install -y curl build-essential libssl-dev sudo 
RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs
RUN mkdir tmp_test && cd tmp_test&& npm init -y && npm i xsd2json