import { useTileStyles } from "./tileStyles";

export const CampaignTile = ({ data }: { data: any }) => {
  const style = useTileStyles();
  return (
    <div className={style.tile}>
      <div className={style.metricTitle}>Campaigns</div>
      <div className={style.metricHeroCount}>{data.count}</div>
    </div>
  );
};
