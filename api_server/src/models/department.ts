import mongoose, { SchemaTypes } from 'mongoose';

// Interface to define model Attributes
interface IDepartment {
    id: Number;
    name: String;
    supervisor: String;
    station: mongoose.Schema.Types.ObjectId;
}

// Interface for Document that our model will use.
interface DepartmentDoc extends mongoose.Document {
    id: Number;
    name: String;
    supervisor: String;
    station: mongoose.Schema.Types.ObjectId;
}

// Interface for our model to use our build function to 
interface DeparmentModelInterface extends mongoose.Model<DepartmentDoc> {
    build(attr: IDepartment): any
}

// Our Model schema
const DepartmentSchema = new mongoose.Schema({
    id: {
        type: Number,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    supervisor: {
        type: String,
    },
    station: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Station'
    }
});

// updating our schema to use the build function validate what we put in our database.
DepartmentSchema.statics.build = (attr: IDepartment) => {
    return new Department(attr);
};

// Create model.
const Department = mongoose.model<any, DeparmentModelInterface>('Department', DepartmentSchema);
export default Department;
