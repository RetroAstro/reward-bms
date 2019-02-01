/**
 * When building is finished ,
 * it can automatically separate index.html from static files .
 * client => server
 */

const env = process.env.NODE_ENV || 'development'
const DIST_PATH = 'client/dist'
const VIEWS_PATH = 'server/views'
