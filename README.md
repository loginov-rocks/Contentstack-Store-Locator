# Contentstack Store Locator

Boilerplate Store Locator implementation for Contentstack based on Next.js and Google APIs.

[Primark Store Locator](https://www.primark.com/en-gb/stores) taken as demonstration example, no affiliation.

## Features

1. Configurable SEO-friendly pages per country, locality, and store details.
2. Dynamic stores map powered by Google Maps JavaScript API.
3. Distance-based geo search with key words suggestions powered by Google Geocoding and Places APIs.
4. Automatic redirect on locality click if it contains only one store.

## Getting Started

### Contentstack

Unfortunately, exported content types could not be imported without some adjustments:

1. Remove `format` property from `store_detail_page.json` for Latitude and Longitude (lines 87 and 106).
2. Remove `Brand Color` custom field completely (lines 122-135).
3. Import `store_detail_page.json` content type.
4. Enable (or make sure it's enabled) out-of-the-box `Color Picker` extension.
5. Add `Brand Color` custom field manually using `Color Picker` extension with configuration similar to the exported in JSON.
6. Import `store_locality_page.json` content type.
7. Import `store_country_page.json` content type.

Entries could not be imported into Contentstack as is, so just use data from JSON to create and deploy them manually.

Next, [Create a Delivery Token](https://www.contentstack.com/docs/developers/create-tokens/create-a-delivery-token).

### Google APIs

[Create API key](https://developers.google.com/maps/documentation/javascript/get-api-key) restricted to Geocoding API, Maps JavaScript API and Places API.

### Next.js

Copy `.env.local.sample` to `.env.local` and configure at least the following environment variables:

1. `CONTENTSTACK_API_KEY`
2. `CONTENTSTACK_DELIVERY_TOKEN`
3. `CONTENTSTACK_ENVIRONMENT`
4. `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Reference

1. https://github.com/contentstack/contentstack-nextjs-starter-app
2. https://www.99darshan.com/posts/interactive-maps-using-nextjs-and-google-maps
3. https://www.npmjs.com/package/@react-google-maps/api
4. https://www.npmjs.com/package/use-places-autocomplete
