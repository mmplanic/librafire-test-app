
export const getSinglePost = (id) => {

  let query = `{
    post(id: ${id}) {
      id
      title
      body
      user{
        name
        address{
          street
          city
          zipcode
        }
      }
      comments{
        data{
          name
          body
        }
      }
    }
  }`;
  
  return fetch("https://graphqlzero.almansi.me/api", {
    "method": "POST",
    "headers": { "content-type": "application/json" },
    "body": JSON.stringify({
        query
    })
  });
}


export const getAllPosts = (page=1, limit=5) => {

  let query = `query($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
        user {
          name
        }
      }
      meta {
        totalCount
      }
    }
  }`;

  let variables = {
    options: {
      paginate: {
        page,
        limit
      }
    }
  };
  
  return fetch("https://graphqlzero.almansi.me/api", {
    "method": "POST",
    "headers": { "content-type": "application/json" },
    "body": JSON.stringify({
      query,
      variables
    })
  })
};

