import mongoose, { SchemaTypes } from 'mongoose';

// Interface to define model Attributes
interface IStation {
    id: Number;
    name: String;
    address: String;
    state: String;
    city: String;
    zip: String;
}

// Interface for Document that our model will use.
interface StationDoc extends mongoose.Document {
    id: Number;
    name: String;
    address: String;
    state: String;
    city: String;
    zip: String;
}

// Interface for our model to use our build function to 
interface StationModelInterface extends mongoose.Model<StationDoc> {
    build(attr: IStation): any
}


// Our Model schema
const stationSchema = new mongoose.Schema({
    id: {
        type: Number,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
});

// updating our schema to use the build function validate what we put in our database.
stationSchema.statics.build = (attr: IStation) => {
    return new Station(attr);
};

// Create model.
const Station = mongoose.model<any, StationModelInterface>('Station', stationSchema);

export default Station;