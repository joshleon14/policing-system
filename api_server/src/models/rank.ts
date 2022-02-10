import mongoose, { SchemaTypes } from 'mongoose';

// Interface to define model Attributes
interface IRank {
    id: Number;
    name: String;
}

// Interface for Document that our model will use.
interface RankDoc extends mongoose.Document {
    id: Number;
    name: String;
}

// Interface for our model to use our build function to 
interface RankModelInterface extends mongoose.Model<RankDoc> {
    build(attr: IRank): any
}

// Our Model schema
const RankSchema = new mongoose.Schema({
    id: {
        type: Number,
        auto: true
    },
    name: {
        type: String,
        required: true
    }
});

// updating our schema to use the build function validate what we put in our database.
RankSchema.statics.build = (attr: IRank) => {
    return new Rank(attr);
};

// Create model.
const Rank = mongoose.model<any, RankModelInterface>('Rank', RankSchema);
export default Rank;
