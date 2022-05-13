export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },    
    {
      name: 'username',
      title: 'Username',
      description:'user that left comment',
      type: 'string',
    },
    {
      name: 'profilePic',
      title: 'ProfilePic',
      description:'Profile picture',
      type: 'string',
    },
    {
      name: 'tweet',
      title: 'Tweet',
      description:'Reference to the tweet this comment is for',
      type: 'reference',
      to: {type:'tweet'}
    },
]}