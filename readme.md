# Spotify Search-O-Rama

"Spotify Search-O-Rama" was a little one-day exercise done during my stint at [SPICED Academy](https://www.spiced.academy/program/full-stack-web-development/). To speed things up a little, we're using a proxy to make API access easier.

---

## Siteflow

![Spotify Search-O-Rama](siteflow.gif) (https://videothrone.github.io/spotify-search/)

## Demo

https://videothrone.github.io/spotify-search/

## Tech

HTML, CSS, JavaScript, jQuery, Spotify API, AJAX

## Features

-   Users can search for artists or albums, the same way they can use the native search. The infocards, which are rendered after a search, can be clicked and link to the respective artists / albums on Spotify.

-   After twenty results a "more"-button is rendered. On click it renders another twenty results. If less than twenty results are available, the button is hidden afterwards.

-   A default image is rendered for artists without profile pictures

## Goals while doing the project

-   Learning to use an API to display data (this was the first API we used)

-   Working with AJAX and JSON and making an "infinite scroll" via the "more"-button
