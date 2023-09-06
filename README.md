# Contentstack Store Locator

Boilerplate Store Locator implementation for Contentstack based on Next.js and Google APIs.

[Primark Store Locator](https://www.primark.com/en-gb/stores) taken as demonstration example, no affiliation.

## Features

1. Configurable SEO-friendly pages per country, locality, and store details.
2. Dynamic stores map powered by Google Maps JavaScript API.
3. Distance-based geo search with keyword suggestions powered by Google Geocoding and Places APIs.
4. Automatic redirect on locality click if it contains only one store.

## Architecture

![Architecture](https://raw.githubusercontent.com/loginov-rocks/Contentstack-Store-Locator/main/docs/Architecture.png)

Contentstack serves as a data source and is integrated only on the server side with the help of Contentstack SDK.

Store Locator pages are built on top of the Contentstack entries on the server side at the moment of request. This enables SEO capabilities but also pages can be cached at the CDN level.

Store Locator API returns stores within the current country sourced from Contentstack based on proximity to the requested geo coordinates. Calculations are done on the server side, so the API can be cached at the HTTP layer.

Google Maps JavaScript API is used on the client side to build the map and show store markers dynamically based on the selected page or search.

Google Places API is used on the client side at the moment of the search query to suggest places for the user to select from, and then Google Geocoding API is used on the client side as well to translate selected address suggestions to geo coordinates to make a request to Store Locator API.

## Getting Started

### Contentstack

Unfortunately, exported content types could not be imported without some adjustments:

1. Remove `format` property from `store_detail_page.json` for Latitude and Longitude (lines 87 and 106).
2. Remove the `Brand Color` custom field completely (lines 122-135).
3. Import `store_detail_page.json` content type.
4. Enable (or make sure it's enabled) the out-of-the-box `Color Picker` extension.
5. Add the `Brand Color` custom field manually using the `Color Picker` extension with a configuration similar to the exported in JSON.
6. Import `store_locality_page.json` content type.
7. Import `store_country_page.json` content type.

Entries could not be imported into Contentstack as is, so just use data from JSON to create and deploy them manually.

Next, [Create a Delivery Token](https://www.contentstack.com/docs/developers/create-tokens/create-a-delivery-token).

### Google APIs

[Create API key](https://developers.google.com/maps/documentation/javascript/get-api-key) restricted to Geocoding API, Maps JavaScript API, and Places API.

### Next.js

Copy `.env.local.sample` to `.env.local` and configure at least the following environment variables:

1. `CONTENTSTACK_API_KEY`
2. `CONTENTSTACK_DELIVERY_TOKEN`
3. `CONTENTSTACK_ENVIRONMENT`
4. `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000/store-locator](http://localhost:3000/store-locator) with your browser to see the result.

## Reference

1. https://github.com/contentstack/contentstack-nextjs-starter-app
2. https://www.99darshan.com/posts/interactive-maps-using-nextjs-and-google-maps
3. https://www.npmjs.com/package/@react-google-maps/api
4. https://www.npmjs.com/package/use-places-autocomplete
