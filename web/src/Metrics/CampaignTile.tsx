import { useTileStyles } from "./tileStyles";

interface CampaignData {
  count: number;
}
export const CampaignTile = ({ data }: { data: CampaignData }) => {
  const style = useTileStyles();
  return (
    <div className={style.tile}>
      <div className={style.metricTitle}>Campaigns</div>
      <div className={style.metricHeroCount}>{data.count}</div>
    </div>
  );
};
