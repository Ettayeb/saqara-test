const toDoData = {

    queries:{
        getToDoByUser:`
        query GetToDosByUser {
            getToDosByUser {
              _id
              title
              content
              done
              user{
                  _id
              }
            }
          }
          `
    },
    mutations:{
        addToDo:`
        mutation AddToDo($addToDoInput: AddToDoInput!) {
            addToDo(AddToDoInput: $addToDoInput) {
              _id
              title
              content
              done
            }
          }
        `,
        updateToDo:`
        mutation UpdateToDo($updateToDoInput: UpdateToDoInput!) {
            updateToDo(UpdateToDoInput: $updateToDoInput) {
              _id
              title
              content
              done
              user{
                _id
              }
            }
          }
        `,
        shareToDo:`
        mutation ShareToDo($shareToDoInput: ShareToDoInput!) {
          shareToDo(ShareToDoInput: $shareToDoInput) {
            _id
              title
              content
              user{
                _id
              }
            }
          }
        `,
        deleteToDo:`
        mutation DeleteToDo($deleteToDoInput: DeleteToDoInput!) {
          deleteToDo(DeleteToDoInput: $deleteToDoInput) {
              _id
              title
              content
              done
              user{
                _id
              }
            }
          }
        `
    },
    testData:{
        addToDo : {
            "addToDoInput": {
              "title": "user1 todo1",
              "content": "todo1 created by user1"
            }
          },
          updateToDo:{
            "updateToDoInput": {
              "_id": "",
              "title": "user1 todo1 updated",
              "content": "todo1 created by user1 updated",
              "done": false
            }
          },
          shareToDo:{
            "shareToDoInput": {
             user : "",
             toDo : ""
            }
            },
            deleteToDo:{
                "deleteToDoInput": {
                  "_id": "",
                }
              }

    }

};

export default toDoData;