export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text in tweet',
      type: 'string',
    },
    {
      name: 'blockTweet',
      title: 'Block Tweet',
      type: 'boolean',
      default: false
    },
    {
      name: 'user',
      title: 'User',
      description:'Reference to the user that created this tweet',
      type: 'reference',
      to: {type:'user'}
    },
    {
      name: 'image',
      title: 'image',
      type: 'string',
    },
  ]
}