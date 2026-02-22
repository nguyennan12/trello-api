import { env } from '~/config/environment'

export const WHITELIST_DOMAINS = [
  'https://trello-sage-delta.vercel.app'
]

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}

export const WEBSITE_DOMAIN = (env.BUILD_MODE === 'production') ? env.WEBSITE_DOMAIN_PRODUCTIONL : env.WEBSITE_DOMAIN_DEV