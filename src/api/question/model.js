import mongoose, { Schema } from 'mongoose'

const types = ['mcq', 'obj']

const questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    enum: types,
    required: true,
    default: 'mcq'
  },
  options:[{
    type: String,
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

questionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      question: this.question,
      questionType: this.questionType,
      options: this.options,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Question', questionSchema)

export const schema = model.schema
export default model
