import { useTileStyles } from "./tileStyles";
export const LineItemTile = ({ data }: { data: any }) => {
  const style = useTileStyles();
  return (
    <div className={style.tile}>
      <div className={style.metricTitle}>Line Items</div>
      <div className={style.metricHeroCount}>{data.count}</div>
    </div>
  );
};
