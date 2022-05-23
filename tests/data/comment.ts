const commentData = {
    queries:{
        getCommentsByToDo:`
        query GetCommentsByToDo($getCommentsByToDoId: ObjectId!) {
          getCommentsByToDo(id: $getCommentsByToDoId) {
            _id
            text
            user{
              _id
            }
            toDo{
              _id
            }
      
            }
          }
          `,
    },
    mutations:{
        addComment:`
        mutation AddComment($addCommentInput: AddCommentInput!) {
          addComment(addCommentInput: $addCommentInput) {
              _id
              text
              user{
                _id
              }
              toDo{
                _id
              }
            }
          }
        `,

    },
    testData:{
        addComment:{
            "addCommentInput": {
              "toDo": "",
              "text": "user2 simple comment"
            }
          },
          getComments:{"getCommentsByToDoId":"" }

    }
};


export default commentData;