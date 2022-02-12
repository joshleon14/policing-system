import mongoose, { SchemaTypes } from 'mongoose';

// Interface to define model Attributes
interface IStation {
    name: string;
    address: string;
    state: string;
    city: string;
    zip: string;
}

// Interface for Document that our model will use.
interface StationDoc extends mongoose.Document {
    name: string;
    address: string;
    state: string;
    city: string;
    zip: string;
}

// Interface for our model to use our build function to
interface StationModelInterface extends mongoose.Model<StationDoc> {
    build(attr: IStation): StationDoc
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
const Station = mongoose.model<StationDoc, StationModelInterface>('Station', stationSchema);

export default Station;