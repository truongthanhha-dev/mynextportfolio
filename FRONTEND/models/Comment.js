 
import mongoose, { Schema, models, model } from "mongoose";

const CommentSchema = new Schema(
  {
   name:{type:String, required: true},
   email:{type: String},
   title: { type: String },
   contentpera: {type:String},
   maincommnet:{type:Boolean},
   createdAt:{type:Date, default:Date.now},
   blog:{type:Schema.Types.ObjectId, ref:'Blog', require:true},
   parent:{type:Schema.Types.ObjectId, ref:'Comment'},//reference to parent comment
   children:{type:Schema.Types.ObjectId, ref:'Comment'},//Array of child comments
   parentName:{type:String}
  }
);

export const Comment = models.Comment || model('Comment', CommentSchema,'comments');
