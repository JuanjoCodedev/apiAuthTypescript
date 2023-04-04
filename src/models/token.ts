import { model, Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IToken extends Document {
 token:string;
 hash_token:string;
 encryptToken(token: string): Promise<string>;
}

// *Quita el _id 
function transformValue(_doc: any, ret: { [key: string]: any }) {
  delete ret._id;
}

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    hash_token: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  }
);

tokenSchema.pre('save', async function (next) {
  if (!this.isModified('token')) {
    return next();
  }
  this.hash_token =  await bcrypt.hash(this.hash_token, 10)
  next();
});


export default model<IToken>("Token",tokenSchema);
