import * as React from 'react';
import { spacing, transitions } from '../../styles/theme';
import { StyleValue } from '../../types/styles';
import { getValueFromBreakpointArray } from '../../utils/screensize';

const StarImg = ({
  color = '#242424',
  side = spacing.xxxl,
}: {
  color?: string;
  side?: StyleValue;
}) => (
  <svg
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    width={getValueFromBreakpointArray(side)}
    height={getValueFromBreakpointArray(side)}
    viewBox="0 0 46.354 46.354">
    <g>
      <path
        d="M21.57,2.049c0.303-0.612,0.927-1,1.609-1c0.682,0,1.307,0.388,1.609,1l5.771,11.695c0.261,0.529,0.767,0.896,1.352,0.981   L44.817,16.6c0.677,0.098,1.237,0.572,1.448,1.221c0.211,0.649,0.035,1.363-0.454,1.839l-9.338,9.104   c-0.423,0.412-0.616,1.006-0.517,1.588l2.204,12.855c0.114,0.674-0.161,1.354-0.715,1.756c-0.553,0.4-1.284,0.453-1.89,0.137   l-11.544-6.07c-0.522-0.275-1.147-0.275-1.67,0l-11.544,6.069c-0.604,0.317-1.337,0.265-1.89-0.136   c-0.553-0.401-0.829-1.082-0.714-1.756l2.204-12.855c0.1-0.582-0.094-1.176-0.517-1.588L0.542,19.66   c-0.489-0.477-0.665-1.19-0.454-1.839c0.211-0.649,0.772-1.123,1.449-1.221l12.908-1.875c0.584-0.085,1.09-0.452,1.351-0.982   L21.57,2.049z"
        style={{ fill: color, transition: transitions.default }}
      />
    </g>
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
  </svg>
);

export default StarImg;
