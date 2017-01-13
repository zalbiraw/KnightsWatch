FROM        node

MAINTAINER  Zaid Albirawi

ENV         PORT=3000

WORKDIR     /var/www

EXPOSE      $PORT

CMD         npm install && npm run serve
