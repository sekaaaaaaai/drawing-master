FROM ruby:3.2.2
RUN mkdir /api
WORKDIR /api
COPY ./api/Gemfile Gemfile
COPY ./api/Gemfile.lock Gemfile.lock
RUN bundle install
COPY . /api
COPY ./api/entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]