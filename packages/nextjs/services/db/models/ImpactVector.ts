import mongoose from "mongoose";
import { Vector } from "~~/app/types/data";

const ImpactVectorSchema = new mongoose.Schema<Vector>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sourceName: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
  fieldName: {
    type: String,
    required: true,
  },
  dataType: {
    type: String,
    required: true,
  },
});

export default mongoose.models.ImpactVector || mongoose.model<Vector>("ImpactVector", ImpactVectorSchema);
