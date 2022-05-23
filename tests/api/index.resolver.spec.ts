import * as db from "../db";
import { runQuery } from "../run"
import {Types} from "mongoose";
import authData from "../data/auth";
import toDoData from "../data/toDo";
import commentData from "../data/comment";

beforeAll( db.connectToDB)
afterAll(db.cleanDB)
afterAll(db.disconnectDB)

let user1Id= "";
let user1Token= "";
let user2Id= "";
let user2Token= "";
const headerUser1 = {};
const headerUser2 = {};
let user1ToDoId;
let user2CommentId;

describe("Testing Auth process", () => {

it("SignUp user1 successfully", async () => {
        
    const response =  await runQuery(authData["mutations"].signUp,authData["testData"].user1.signUp,{});

    expect(response).toHaveProperty("data");
    expect(response.data).toHaveProperty("signUp");
    expect(response.data.signUp).toHaveProperty("user");
    expect(response.data.signUp).toHaveProperty("token");
    expect(response.data.signUp.user).toHaveProperty("_id");
    expect(response.data.signUp.user).toHaveProperty("name");
    expect(response.data.signUp.user).toHaveProperty("email");
})
it("SignUp user2 successfully", async () => {
        
  const response =  await runQuery(authData["mutations"].signUp,authData["testData"].user2.signUp,{});

    expect(response).toHaveProperty("data");
    expect(response.data).toHaveProperty("signUp");
    expect(response.data.signUp).toHaveProperty("user");
    expect(response.data.signUp).toHaveProperty("token");
    expect(response.data.signUp.user).toHaveProperty("_id");
    expect(response.data.signUp.user).toHaveProperty("name");
    expect(response.data.signUp.user).toHaveProperty("email");
})

it("Login user1 successfully", async () => {
        
    const response =  await runQuery(authData["queries"].logIn,authData["testData"].user1.logIn,{});
    expect(response).toHaveProperty("data");
    expect(response.data).toHaveProperty("logIn");
    expect(response.data.logIn).toHaveProperty("user");
    expect(response.data.logIn).toHaveProperty("token");
    expect(response.data.logIn.user).toHaveProperty("_id");
    expect(response.data.logIn.user).toHaveProperty("name");
    expect(response.data.logIn.user).toHaveProperty("email");
    user1Id = response.data.logIn.user._id;
    user1Token = response.data.logIn.token;
    headerUser1["authorization"] = "Bearer " + user1Token;
})
it("Login user2 successfully", async () => {
        
  const response =  await runQuery(authData["queries"].logIn,authData["testData"].user2.logIn,{});
  expect(response).toHaveProperty("data");
    expect(response.data).toHaveProperty("logIn");
    expect(response.data.logIn).toHaveProperty("user");
    expect(response.data.logIn).toHaveProperty("token");
    expect(response.data.logIn.user).toHaveProperty("_id");
    expect(response.data.logIn.user).toHaveProperty("name");
    expect(response.data.logIn.user).toHaveProperty("email");
    user2Id = response.data.logIn.user._id;
    user2Token = response.data.logIn.token;
    headerUser2["authorization"] = "Bearer " + user2Token;

})

})

describe("Testing ToDo related functions", () => {
it("User1 should create a toDo", async () => {

const response =  await runQuery(toDoData["mutations"].addToDo,toDoData["testData"].addToDo,headerUser1);
expect(response).toHaveProperty("data");
expect(response.data).toHaveProperty("addToDo");
expect(response.data.addToDo).toHaveProperty("_id");
expect(response.data.addToDo).toHaveProperty("title");
expect(response.data.addToDo).toHaveProperty("content");

user1ToDoId = response.data.addToDo._id;

})

it("Should get toDos list of the user1", async () => {
   

  const response =  await runQuery(toDoData["queries"].getToDoByUser,{},headerUser1);
  expect(response).toHaveProperty("data");
  expect(response.data).toHaveProperty("getToDosByUser");
  expect(response.data.getToDosByUser).toBeInstanceOf(Array);
  expect(response.data.getToDosByUser[0]._id).toEqual(user1ToDoId);
  expect(response.data.getToDosByUser[0].user).toHaveProperty("_id");
  expect(response.data.getToDosByUser[0].user._id).toEqual(user1Id);

  })


it("User1 should be able to update the created toDo title and content", async () => {

  const user1ToDo1Updated = toDoData["testData"].updateToDo;
  user1ToDo1Updated.updateToDoInput._id = user1ToDoId;

const response =  await runQuery(toDoData["mutations"].updateToDo,user1ToDo1Updated,headerUser1);
expect(response).toHaveProperty("data");
expect(response.data).toHaveProperty("updateToDo");
expect(response.data.updateToDo).toHaveProperty("_id");
expect(response.data.updateToDo.title).toEqual(user1ToDo1Updated.updateToDoInput.title);
expect(response.data.updateToDo.content).toEqual(user1ToDo1Updated.updateToDoInput.content);

})
it("User1 should be able to update status of the created toDo", async () => {

    const user1ToDo1Updated = toDoData["testData"].updateToDo;
    user1ToDo1Updated.updateToDoInput._id = user1ToDoId;
    user1ToDo1Updated.updateToDoInput.done = true;
  

const response =  await runQuery(toDoData["mutations"].updateToDo,user1ToDo1Updated,headerUser1);

expect(response).toHaveProperty("data");
expect(response.data).toHaveProperty("updateToDo");
expect(response.data.updateToDo).toHaveProperty("_id");
expect(response.data.updateToDo.done).toEqual(user1ToDo1Updated.updateToDoInput.done);

})


    it("Should share the created user1 toDo to user2", async () => {
   
            const shareData = toDoData["testData"].shareToDo;
            shareData.shareToDoInput.user = user2Id;
            shareData.shareToDoInput.toDo = user1ToDoId;
            
        const response =  await runQuery(toDoData["mutations"].shareToDo,shareData,headerUser1);
        expect(response).toHaveProperty("data");
        expect(response.data).toHaveProperty("shareToDo");
        expect(response.data.shareToDo._id).toEqual(user1ToDoId);
        expect(response.data.shareToDo.user).toHaveProperty("_id");
        expect(response.data.shareToDo.user._id).toEqual(user2Id);
    
        })
    

})





describe("Testing Comment related functions", () => {
it("User2 should add a comment on his toDo", async () => {

  const addCommentData = commentData["testData"].addComment;
  addCommentData.addCommentInput.toDo = user1ToDoId;

const response =  await runQuery(commentData["mutations"].addComment,addCommentData,headerUser2);
expect(response).toHaveProperty("data");
expect(response.data).toHaveProperty("addComment");
expect(response.data.addComment).toHaveProperty("_id");
expect(response.data.addComment).toHaveProperty("user");
expect(response.data.addComment).toHaveProperty("toDo");
expect(response.data.addComment.user._id).toEqual(user2Id);
expect(response.data.addComment.toDo._id).toEqual(user1ToDoId);

user2CommentId = response.data.addComment._id;

})

it("Should get all the comments added to the toDo", async () => {
   
  const user2CommentData = commentData["testData"].getComments;
  user2CommentData.getCommentsByToDoId = user1ToDoId;
  
  const response =  await runQuery(commentData["queries"].getCommentsByToDo,user2CommentData,headerUser1);
  expect(response).toHaveProperty("data");
  expect(response.data).toHaveProperty("getCommentsByToDo");
  expect(response.data.getCommentsByToDo).toBeInstanceOf(Array);
  expect(response.data.getCommentsByToDo[0]._id).toEqual(user2CommentId);
  expect(response.data.getCommentsByToDo[0].user).toHaveProperty("_id");
  expect(response.data.getCommentsByToDo[0].user._id).toEqual(user2Id);
  expect(response.data.getCommentsByToDo[0].toDo).toHaveProperty("_id");
  expect(response.data.getCommentsByToDo[0].toDo._id).toEqual(user1ToDoId);
  })

})


describe("Last step! Delete the created toDo!", () => {
  it("toDo should be deleted + related comments", async () => {
  
      const deleteToDoData = toDoData["testData"].deleteToDo;
      deleteToDoData.deleteToDoInput._id = user1ToDoId;

  const response =  await runQuery(toDoData["mutations"].deleteToDo,deleteToDoData,headerUser2);
  expect(response).toHaveProperty("data");
  expect(response.data).toHaveProperty("deleteToDo");
  expect(response.data.deleteToDo).toHaveProperty("_id");  
  
  })
  
  })