#!/bin/bash
set -e

# Install missing gems
bundle install --gemfile /server/Gemfile

# Remove a potentially pre-existing server.pid for Rails.
rm -f /server/tmp/pids/server.pid

# Execute the main process specified in CMD
exec "$@"