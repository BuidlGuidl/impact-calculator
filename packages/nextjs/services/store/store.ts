import { create } from "zustand";
import { SelectedVector } from "~~/app/types/data";
import scaffoldConfig from "~~/scaffold.config";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type GlobalState = {
  hardCapPct: number;
  setHardCapPct: (newHardCap: number) => void;
  selectedVectors: SelectedVector[];
  setSelectedVectors: (newSelectedVectors: SelectedVector[]) => void;
  nativeCurrencyPrice: number;
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
};

export const useGlobalState = create<GlobalState>(set => ({
  hardCapPct: 0,
  setHardCapPct: (newHardCapPct: number) => set(() => ({ hardCapPct: newHardCapPct })),
  selectedVectors: [],
  setSelectedVectors: (newSelectedVectors: SelectedVector[]) => set(() => ({ selectedVectors: newSelectedVectors })),
  nativeCurrencyPrice: 0,
  setNativeCurrencyPrice: (newValue: number): void => set(() => ({ nativeCurrencyPrice: newValue })),
  targetNetwork: scaffoldConfig.targetNetworks[0],
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => set(() => ({ targetNetwork: newTargetNetwork })),
}));
