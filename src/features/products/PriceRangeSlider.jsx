import React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 1;
const MIN = 0;
const MAX = 1000;

const PriceRangeSlider = ({ priceFilter, setPriceFilter }) => {
  return (
    <div className="w-full max-w-xs select-none">
      <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
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
              className="relative h-2 w-full rounded bg-gray-300"
              style={{
                background: getTrackBackground({
                  values: priceFilter,
                  colors: ["#d1d5db", "#6366f1", "#d1d5db"],
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
              className="h-5 w-5 rounded-full bg-indigo-600 border-2 border-white shadow cursor-pointer"
            />
          );
        }}
      />
    </div>
  );
};

export default PriceRangeSlider;
