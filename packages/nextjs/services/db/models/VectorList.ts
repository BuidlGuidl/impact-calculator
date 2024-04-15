import mongoose from "mongoose";
import { IFilter, SelectedVector, VectorList } from "~~/app/types/data";

const FilterSchema = new mongoose.Schema<IFilter>({
  action: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const SelectedVectorSchema = new mongoose.Schema<SelectedVector>({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  dataType: {
    type: String,
    required: true,
  },
  filters: {
    type: [FilterSchema],
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
