import mongoose, { Schema } from 'mongoose'

const resultSchema = new Schema({
  answers: [{
    question: Schema.Types.ObjectId,
    answer: String
  }],
  score: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

resultSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      answers: this.answers,
      score: this.score,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Result', resultSchema)

export const schema = model.schema
export default model
