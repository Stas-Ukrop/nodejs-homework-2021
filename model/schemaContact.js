const { Schema, model, SchemaTypes } = require("mongoose");
const { Gender } = require("../helpers/constants");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 1,
      required: [true, "Set name for contact"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      require: true,
    },
    work: [String],
    pets: [String],
    hobbies: [String],
    birthday: Date,
    favorite: {
      type: Boolean,
      default: false,
    },
    socialNetworks: {
      instagram: String,
      linkedin: String,
      facebook: String,
    },
    specificInformation: {
      type: String,
    },
    gender: {
      type: String,
      enum: [...Object.values(Gender)],
      default: Gender.UNCHECKED,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },

  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);
contactsSchema.plugin(mongoosePaginate);

const Contact = model("contact", contactsSchema);

module.exports = Contact;
