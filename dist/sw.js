importScripts('workbox-sw.prod.v2.1.1.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "google89ba77b3ded479ad.html",
    "revision": "ad3d77ec38605fd69c2e1aaf5e6fe5a2"
  },
  {
    "url": "index.html",
    "revision": "5428e8c23a8b64a8000c7889c8bb2ca6"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
