import mongoose, { SchemaTypes } from 'mongoose';

// Interface to define model Attributes
interface IProfile {
    id: Number;
    user: String;
    phone_number: string;
    rank: mongoose.Schema.Types.ObjectId;
    department: mongoose.Schema.Types.ObjectId;
}

// Interface for Document that our model will use.
interface ProfileDoc extends mongoose.Document {
    id: Number;
    user: String;
    phone_number: string;
    rank: mongoose.Schema.Types.ObjectId;
    department: mongoose.Schema.Types.ObjectId;
}

// Interface for our model to use our build function to 
interface ProfileModelInterface extends mongoose.Model<ProfileDoc> {
    build(attr: IProfile): any
}


// Our Model schema
const ProfileSchema = new mongoose.Schema({
    id: {
        type: Number,
        auto: true,
    },
    user: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: false
    },
    rank: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Rank'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department'
    }

});

// updating our schema to use the build function validate what we put in our database.
ProfileSchema.statics.build = (attr: IProfile) => {
    return new Profile(attr);
};

// Create model.
const Profile = mongoose.model<any, ProfileModelInterface>('Profile', ProfileSchema);
export default Profile;