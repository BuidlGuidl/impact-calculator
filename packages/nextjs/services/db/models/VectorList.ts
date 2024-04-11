import mongoose from "mongoose";
import { SelectedVector, VectorList } from "~~/app/types/data";

const SelectedVectorSchema = new mongoose.Schema<SelectedVector>({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

const VectorListSchema = new mongoose.Schema<VectorList>({
  creator: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  vectors: {
    type: [SelectedVectorSchema],
    required: true,
  },
});

export default mongoose.models.VectorList || mongoose.model<VectorList>("VectorList", VectorListSchema);
