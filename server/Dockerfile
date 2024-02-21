# backend/Dockerfile

# Base image
FROM ruby:3.2.2

# Install dependencies
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# Set working directory

WORKDIR /server

# Adding gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Adding project files
COPY . .

# Add a script to be executed every time the container starts
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["/usr/bin/entrypoint.sh"]

# Start the main process
CMD ["rails", "server","-b","0.0.0.0","-p","5000"]