import mongoose from 'mongoose'

const couseschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,

    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true

    },
    level: {
        type: String,
        enum: ["Beginer", "Intermediate", "Advanced"]
    },
    price: {
        type: Number,
    },
    thumbnail: {
        type: String
    },
    enrolledstudent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    lectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture"
    }],
    creator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    ispublished: {
        type: Boolean,
        default: false
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]

}, { timestamps: true })

const coursemodel = mongoose.model('Course', couseschema);
export default coursemodel;