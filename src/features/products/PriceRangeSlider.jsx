import React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 1;
const MIN = 0;
const MAX = 1000;

const PriceRangeSlider = ({ priceFilter, setPriceFilter }) => {
  return (
    <div className="w-full max-w-xs select-none">
      <div className="flex justify-between mb-2 text-sm font-medium text-slate-600">
        <span>${priceFilter[0]}</span>
        <span>${priceFilter[1]}</span>
      </div>

      <Range
        values={priceFilter}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(vals) => setPriceFilter(vals)}
        renderTrack={({ props, children }) => {
          const { key, ...rest } = props;
          return (
            <div
              key={key}
              {...rest}
              className="relative h-2.5 w-full rounded-full bg-slate-200"
              style={{
                background: getTrackBackground({
                  values: priceFilter,
                  colors: ["#e2e8f0", "#0f766e", "#e2e8f0"],
                  min: MIN,
                  max: MAX,
                }),
              }}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          const { key, ...rest } = props;
          return (
            <div
              key={key}
              {...rest}
              className="h-5 w-5 rounded-full bg-teal-600 border-2 border-white shadow-md cursor-pointer hover:bg-teal-700 transition-colors"
            />
          );
        }}
      />
    </div>
  );
};

export default PriceRangeSlider;
