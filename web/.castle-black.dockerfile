FROM        node

MAINTAINER  Zaid Albirawi

ARG         environment

ENV         HOME_PATH=/home
ENV         WORK_PATH=$HOME_PATH/node

WORKDIR     $WORK_PATH

RUN         npm i babel-cli knex -g
RUN         mkdir -p $HOME_PATH/scripts
RUN         echo "bash $WORK_PATH/scripts/$environment/init.sh" > $HOME_PATH/scripts/startup.sh

CMD         bash $HOME_PATH/scripts/startup.sh
