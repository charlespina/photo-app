# README

## About

This is a small client-side web application written with two goals:
* as a playground for testing out web technologies
* to provide a way for me to display my photographs on my website

Photoapp uses angular and jquery. It connects to Flickr to display a user's
photo stream, and any public photo sets that are available.

## Configuration

The app uses Flickr's public API, so no features require OAuth authentication,
just an API access code and user ID. To point Flickr at your own user profile, see the
configuration in js/services.js

## Running

Angular needs a webserver to run, to prevent access errors caused by its
AJAXyness. Opening index.html without a web-server will cause your browser to
complain about lacking Access-Control-Allow-Origin headers.

For this reason, there is a small webserver included with the project, in
scripts/web-server.js . Run it from the base directory with nodejs:

> node scripts/web-server.js

Any webserver will do, there is nothing special about the included script.
