
export const getSinglePost = (id) => fetch("https://graphqlzero.almansi.me/api", {
    "method": "POST",
    "headers": { "content-type": "application/json" },
    "body": JSON.stringify({
        query: `{
            post(id: ${id}) {
              id
              title
              body
            }
          }`
    })
});

// export const getAllPosts = (page=1, limit=5) => {

//   const options = `{
//     "options": {
//       "paginate": {
//         "page": ${page},
//         "limit": ${limit}
//       }
//     }
//   }`

//   return fetch("https://graphqlzero.almansi.me/api", {
//     "method": "POST",
//     "headers": { "content-type": "application/json" },
//     "body": JSON.stringify({
//       query: `query (
//           $options: PageQueryOptions
//         ) {
//           posts(options: ${options}) {
//             data {
//               id
//               title
//             }
//             meta {
//               totalCounts
//             }
//           }
//         }`
//     })
//   })
// };

