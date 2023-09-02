/**
 * The following code is sourced from the Contentstack Next.js Starter App.
 * 
 * @see https://github.com/contentstack/contentstack-nextjs-starter-app/blob/master/helper/index.ts
 * @see https://github.com/contentstack/contentstack-nextjs-starter-app/blob/master/contentstack-sdk/index.ts
 * @see https://github.com/contentstack/contentstack-nextjs-starter-app/blob/master/contentstack-sdk/utils.ts
 */

import * as Utils from '@contentstack/utils';
import { Config, Region, Stack as ContentStack } from 'contentstack';
import getConfig from 'next/config';

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

type Page = {
  // page_components: Component[];
  uid: string;
  locale: string;
  url: string;
  // seo: Seo;
  title: string;
}

const { publicRuntimeConfig } = getConfig();

const envConfig = process.env.CONTENTSTACK_API_KEY ? process.env : publicRuntimeConfig;

const {
  CONTENTSTACK_API_KEY,
  CONTENTSTACK_DELIVERY_TOKEN,
  CONTENTSTACK_ENVIRONMENT,
  CONTENTSTACK_BRANCH,
  CONTENTSTACK_REGION,
} = envConfig;

// basic env validation
const isBasicConfigValid = () => {
  return (
    !!CONTENTSTACK_API_KEY &&
    !!CONTENTSTACK_DELIVERY_TOKEN &&
    !!CONTENTSTACK_ENVIRONMENT
  );
};

// set region
const setRegion = (): Region => {
  let region = "US" as keyof typeof Region;
  if (!!CONTENTSTACK_REGION && CONTENTSTACK_REGION !== "us") {
    region = CONTENTSTACK_REGION.toLocaleUpperCase().replace(
      "-",
      "_"
    ) as keyof typeof Region;
  }
  return Region[region];
};

// contentstack sdk initialization
const initializeContentStackSdk = (): ContentStack => {
  if (!isBasicConfigValid())
    throw new Error("Please set you .env file before running starter app");
  const stackConfig: Config = {
    api_key: CONTENTSTACK_API_KEY as string,
    delivery_token: CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: CONTENTSTACK_ENVIRONMENT as string,
    region: setRegion(),
    branch: CONTENTSTACK_BRANCH || "main",
  };
  return ContentStack(stackConfig);
};

// SDK initialization
export const Stack = initializeContentStackSdk();

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

/**
 *fetches specific entry from a content-type
 *
 * @param {* content-type uid} contentTypeUid
 * @param {* url for entry to be fetched} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 * @returns
 */
const getEntryByUrl = ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryByUrl) => {
  return new Promise((resolve, reject) => {
    const blogQuery = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
    const data = blogQuery.where("url", `${entryUrl}`).find();
    data.then(
      (result) => {
        jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
        resolve(result[0]);
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
};

const getPageRes = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "page",
    entryUrl,
    referenceFieldPath: ["page_components.from_blog.featured_blogs"],
    jsonRtePath: [
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
  })) as Page[];
  return response[0];
};
