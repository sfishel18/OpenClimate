# OpenClimate API

This document covers the OpenClimate v1 API. OpenClimate uses a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)ful API
to provide access to its data, and to support its user interface.

# Servers

There are two public OpenClimate API servers:

- https://openclimate.network/ - public, stable, production environment.
  Use this unless you're a core developer!
- https://dev.openclimate.network/ - unstable, development environment.
  Use this for testing new features.

Web UIs run from the roots of these servers, and should use relative links to
access the API.

Out-of-browser apps can switch between them.

It's also possible to run the API server locally; use the local address in this case!

# Overview

## Version

The API uses [semantic versions](https://semver.org/). The major part of the
API version will be in the URL; currently, it's `/v1`.

Backwards-compatible changes like added endpoints, going from unordered to ordered results, or added data per endpoint, will keep the same major version.

Backwards-incompatible changes, like removing endpoints, removing properties returned by an endpoint, or changing the ordering of data, will generate a new major version.

There may be legacy API endpoints not listed here and not covered by semver. Don't use them.

## Status codes

HTTP status codes are used to represent the results of the API call for common values like 400, 404, 500, 304, etc.

## Default result structure

Data in the OpenClimate API is represented as [JSON](https://en.wikipedia.org/wiki/JSON).

All API endpoints return a JSON object with the following top-level information:

- **success**: a Boolean value. False if there was an error. Typically, true if HTTP status code is 2xx or 3xx.
- **message**: a string; when success is false, will give an explanation of  the error.
- **data**: If success is true, this is the data.

# Glossary

- **Actor**: an entity that is responsible for climate action. Examples include countries, regions like states and provinces, cities, private companies, and facilities like farms, office buildings, and factories.

- **Actor ID**: each actor has a unique ID. For countries, it's their 2-letter
ISO 3166-1 code. For states and provinces, it's their ISO 3166-2 code. For
cities, it's their UNLOCODE identifier.

# Endpoints

## Actor endpoints

### Actor parts /api/v1/actor/{actor_id}/parts(?type={part_type})

Returns the parts of an actor that has parts. For a country, it returns the top-level administrative parts, like states or provinces. For a US state, it returns cities and companies in that state.

To filter the results by type, provide the **type** parameter.

#### Output

Standard output. `data` is an array of JSON objects, ordered by `name` property, with the following properties:

- `actor_id`: ID for the part object; good for feeding to this or other API endpoints.
- `name`: name of the part object; good for showing to humans.
- `type`: type of the part object; one of 'planet', 'country', 'adm1', 'adm2', 'city', 'organization', 'site'.

### Actor overview /api/v1/actor/{actor_id}

Returns climate-related data, including historical data, for an actor.

#### Output

Standard output. `data` is an object representing the actor, with the following properties:

- `actor_id`: Unique ID for this actor. Should be identical to the one
   provide in the URL.
- `name`: Default name for this actor.
- `type`: type code for the actor; one of 'planet', 'country', 'adm1', 'adm2', 'city', 'organization', 'site'.
- `is_part_of`: actor_id of the most immediate container for this actor.
- `area`: If the actor is a geographical unit like a city or state, this is the area of that unit, in km².
- `lat`: Decimal latitude of the actor; usually a centroid or a capital.
- `lng`: Decimal longitude of the actor; usually a centroid or a capital.
- `emissions`: a JSON object. Each key is the code for a data source. Each value is an object with the following properties:
  - `datasource_id`: ID code for the datasource; should be identical to the key.
  - `name`: name for the data source.
  - `publisher`: Publisher code for the data source.
  - `published`: Date this data source was published.
  - `URL`: URL to retrieve the data source or learn more about it. For humans,
    not computers.
  - `tags`: an array of tags for this data source. Each tag is an object with
    the following properties:
    - `tag_id`: short tag.
    - `tag_name`: description of the tag.
  - `data`: an array of emissions data provided by this data source, in
    descending order by year. Each element is a JSON object with these properties:
    - `year`: year the emissions were made.
    - `total_emissions`: total CO2E emissions for the actor this year.
    - `tags`: an array of tags for this year. Each tag is an object with the following properties:
      - `tag_id`: short tag.
      - `tag_name`: description of the tag.
- `population`: An array of population data elements, sorted in descending
  order by year. Unique by year. Each element is a JSON object with the following properties:
  - `population`: population value, number, in units. 1000 => 1000 people.
  - `year`: year of population value; YYYY.
  - `datasource_id`: ID of the data source for this population measurement.
- `gdp`: An array of GDP data elements, sorted in descending
  order by year. Unique by year. Each element is a JSON object with the following properties:
  - `gdp`: GDP for the actor, in USD, contemporary.
  - `year`: year of the GDP value; YYYY.
  - `datasource_id`: ID of the data source for this GDP measurement.
- `targets`: an array of targets that the actor is trying to achieve. Ordered by target year, then baseline year, then target type, then target value. Each target has the following properties:
  - `target_id`: unique ID for the target
  - `target_type`: type of target. One of "absolute", "percentage", "percapita", ...
  - `target_year`: year the target will be achieved; YYYY.
  - `baseline_year`: comparison year, YYYY.
  - `target_value`: value of the target.
  - `baseline_value`: value of the metric in the baseline year, for comparison.
  - `datasource_id`: data source for the target.

## Search endpoints

### Actor search /api/v1/search/actor?name={name}(&language={language})
### Actor search /api/v1/search/actor?identifier={identifier}(&namespace={namespace})
### Actor search /api/v1/search/actor?q={q}

Searches for actors with the given criteria. Must include one of `q`, `name`,
or `identifier`.

With `name`, searches for actors with exact name match. Can be filtered
by `language` to only return actors with that language code.

With `identifier`, searches for actors with exact identifier match. Can be filtered by `namespace` to only return actor identifiers within that namespace.

With `q`, does a full search of identifiers and names that include the
search parameter.

A search with no matches will return a 200 HTTP code, a `success` value of `true`, and a `data` property that is an empty list (see below).

#### Output

Standard output. `data` is an object representing the list of matching actors, each with the following properties:

- `actor_id`: unique identifier for the actor
- `name`: default name for the actor; an OK fallback if no language
  match
- `type`: the type code for the actor, such as "country" or "city"
- `icon`: a small-ish image representing the actor, such as a flag or corporate logo
- `is_part_of`: actor ID of the containing actor; a city in a state
  will have the state's actor_id in this property
- `datasource_id`: actor data source.
- `created`: when this actor was created.
- `last_updated`: when this actor was last updated.
- `names`: an array of actor name objects, each with the following
  properties:
  - `name`: the name string
  - `language`: the ISO language code of the language of the name; 'und' means undetermined
  - `preferred`: is this the preferred name in this language? true or
    false
  - `datasource_id`: the source of this name
  - `created`: when this name was imported to the database
  - `last_updated`: when this name was last updated
- `identifiers`: an array of actor identifier objects, each with the
  following properties:
  - `identifier`: the identifier string
  - `namespace`: the vocabulary this identifier is from
  - `datasource_id`: the source of the identifier
  - `created`: when this identifier record was first imported
  - `last_updated`: when this identifier was last updated