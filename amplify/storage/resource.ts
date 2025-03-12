import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'picturesDatabase',
  access: (allow) => ({
    'images/': [allow.guest.to(['read', 'delete'])],
    'upload/': [allow.guest.to(['read', 'write'])],
  }),
});
