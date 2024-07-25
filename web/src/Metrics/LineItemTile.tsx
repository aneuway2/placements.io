import { useTileStyles } from "./tileStyles";

interface LineItemData {
  count: number;
}
export const LineItemTile = ({ data }: { data: LineItemData }) => {
  const style = useTileStyles();
  return (
    <div className={style.tile}>
      <div className={style.metricTitle}>Line Items</div>
      <div className={style.metricHeroCount}>{data.count}</div>
    </div>
  );
};
